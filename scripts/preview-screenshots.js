const { spawn } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const { assertPngHasVisibleContent } = require("./png-quality");
const { formatRenderAuditErrors, renderAuditExpression } = require("./render-audit");

// Capture screenshot settings when an engine is created, as the entry point did
// at module load. Playwright override discovery remains lazy inside the engine.
function createScreenshotEngine(config = {}) {
  const requestedChromePath = process.env.CHROME_PATH || "";
  const {
    bundledNodeModules = path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules"),
    chromePath = requestedChromePath || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    allowSystemChrome = process.env.PREVIEW_USE_SYSTEM_CHROME === "1" || Boolean(requestedChromePath),
    screenshotEngine = process.env.PREVIEW_SCREENSHOT_ENGINE || "auto",
    viewportWidth = Number(process.env.PREVIEW_WIDTH || 1440),
    viewportHeight = Number(process.env.PREVIEW_HEIGHT || 1200),
    chromeWait = Number(process.env.PREVIEW_WAIT || 5000),
    allowUnauditedCli = process.env.PREVIEW_ALLOW_UNAUDITED_CLI === "1",
  } = config;

  function toFileUrl(filePath) {
    return `file://${filePath.split(path.sep).map(encodeURIComponent).join("/")}`;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function waitForProcessExit(child, timeoutMs) {
    if (!child || child.exitCode !== null || child.signalCode !== null) return Promise.resolve(true);

    return new Promise((resolve) => {
      const finish = (exited) => {
        clearTimeout(timer);
        child.removeListener("exit", onExit);
        child.removeListener("error", onError);
        resolve(exited);
      };
      const onExit = () => finish(true);
      const onError = () => finish(!child.pid);
      const timer = setTimeout(() => finish(false), timeoutMs);
      child.once("exit", onExit);
      child.once("error", onError);
    });
  }

  async function stopProcess(child) {
    if (!child || child.exitCode !== null || child.signalCode !== null) return;
    child.kill("SIGTERM");
    if (!(await waitForProcessExit(child, 1500))) {
      child.kill("SIGKILL");
      if (!(await waitForProcessExit(child, 1500))) {
        throw new Error("Chrome did not exit after SIGKILL; its profile directory was retained.");
      }
    }
  }

  async function removeDirectoryWithRetry(dir) {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        return;
      } catch (error) {
        if (attempt === 5) throw error;
        await sleep(120 * (attempt + 1));
      }
    }
  }

  async function waitForDevtoolsPort(userDataDir, timeoutMs, child) {
    const startedAt = Date.now();
    const portFile = path.join(userDataDir, "DevToolsActivePort");
    let lastError;

    while (Date.now() - startedAt < timeoutMs) {
      if (child && (child.exitCode !== null || child.signalCode !== null)) {
        throw new Error(`Chrome exited before DevTools became ready: ${child.exitCode ?? child.signalCode}`);
      }
      try {
        const [portLine] = fs.readFileSync(portFile, "utf8").trim().split(/\r?\n/);
        const port = Number(portLine);
        if (Number.isInteger(port) && port > 0) return port;
      } catch (error) {
        lastError = error;
      }
      await sleep(100);
    }

    throw new Error(`Chrome DevTools port file did not become ready: ${lastError?.message || "timeout"}`);
  }

  async function waitForChromeJson(port, timeoutMs) {
    const startedAt = Date.now();
    let lastError;

    while (Date.now() - startedAt < timeoutMs) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1000);
      try {
        const response = await fetch(`http://127.0.0.1:${port}/json`, { signal: controller.signal });
        if (response.ok) {
          const tabs = await response.json();
          if (Array.isArray(tabs) && tabs.length > 0) return tabs;
        }
      } catch (error) {
        lastError = error;
      } finally {
        clearTimeout(timer);
      }
      await sleep(100);
    }

    throw new Error(`Chrome DevTools did not become ready on port ${port}: ${lastError?.message || "timeout"}`);
  }

  function encodeWebSocketFrame(text) {
    const payload = Buffer.from(text);
    const headerLength = payload.length < 126 ? 2 : payload.length < 65536 ? 4 : 10;
    const frame = Buffer.alloc(headerLength + 4 + payload.length);
    let offset = 2;

    frame[0] = 0x81;
    if (payload.length < 126) {
      frame[1] = 0x80 | payload.length;
    } else if (payload.length < 65536) {
      frame[1] = 0x80 | 126;
      frame.writeUInt16BE(payload.length, 2);
      offset = 4;
    } else {
      frame[1] = 0x80 | 127;
      frame.writeBigUInt64BE(BigInt(payload.length), 2);
      offset = 10;
    }

    const mask = crypto.randomBytes(4);
    mask.copy(frame, offset);
    for (let index = 0; index < payload.length; index += 1) {
      frame[offset + 4 + index] = payload[index] ^ mask[index % 4];
    }
    return frame;
  }

  function readWebSocketFrame(buffer) {
    if (buffer.length < 2) return null;

    const opcode = buffer[0] & 0x0f;
    const masked = (buffer[1] & 0x80) !== 0;
    let length = buffer[1] & 0x7f;
    let offset = 2;

    if (length === 126) {
      if (buffer.length < 4) return null;
      length = buffer.readUInt16BE(2);
      offset = 4;
    } else if (length === 127) {
      if (buffer.length < 10) return null;
      length = Number(buffer.readBigUInt64BE(2));
      offset = 10;
    }

    const maskOffset = masked ? offset : -1;
    if (masked) offset += 4;
    if (buffer.length < offset + length) return null;

    const payload = Buffer.from(buffer.subarray(offset, offset + length));
    if (masked) {
      const mask = buffer.subarray(maskOffset, maskOffset + 4);
      for (let index = 0; index < payload.length; index += 1) {
        payload[index] ^= mask[index % 4];
      }
    }

    return { opcode, payload, consumed: offset + length };
  }

  function createNativeSocket(webSocketUrl, onMessage) {
    const ws = new WebSocket(webSocketUrl);
    const opened = new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });
    ws.addEventListener("message", (event) => onMessage(event.data));

    return {
      opened,
      sendText(text) {
        ws.send(text);
      },
      close() {
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close();
      },
    };
  }

  function createNodeSocket(webSocketUrl, onMessage) {
    const url = new URL(webSocketUrl);
    const key = crypto.randomBytes(16).toString("base64");
    const socket = net.createConnection({
      host: url.hostname,
      port: Number(url.port || 80),
    });

    let buffer = Buffer.alloc(0);
    let handshakeComplete = false;
    let rejectOpen;
    const opened = new Promise((resolve, reject) => {
      rejectOpen = reject;
      socket.once("connect", () => {
        socket.write(
          `GET ${url.pathname}${url.search} HTTP/1.1\r\n` +
            `Host: ${url.host}\r\n` +
            "Upgrade: websocket\r\n" +
            "Connection: Upgrade\r\n" +
            `Sec-WebSocket-Key: ${key}\r\n` +
            "Sec-WebSocket-Version: 13\r\n\r\n"
        );
      });
      socket.on("data", (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);
        if (!handshakeComplete) {
          const headerEnd = buffer.indexOf("\r\n\r\n");
          if (headerEnd === -1) return;

          const header = buffer.subarray(0, headerEnd).toString("utf8");
          if (!header.startsWith("HTTP/1.1 101")) {
            reject(new Error(`Chrome WebSocket handshake failed: ${header.split("\r\n")[0]}`));
            socket.destroy();
            return;
          }

          handshakeComplete = true;
          buffer = buffer.subarray(headerEnd + 4);
          resolve();
        }

        let frame = readWebSocketFrame(buffer);
        while (frame) {
          buffer = buffer.subarray(frame.consumed);
          if (frame.opcode === 1) onMessage(frame.payload.toString("utf8"));
          if (frame.opcode === 8) socket.end();
          frame = readWebSocketFrame(buffer);
        }
      });
      socket.once("error", reject);
    });

    socket.once("error", (error) => {
      if (!handshakeComplete) rejectOpen?.(error);
    });

    return {
      opened,
      sendText(text) {
        socket.write(encodeWebSocketFrame(text));
      },
      close() {
        socket.end();
        socket.destroy();
      },
    };
  }

  function createCdpClient(webSocketUrl) {
    let nextId = 1;
    const pending = new Map();

    function handleMessage(raw) {
      const data = JSON.parse(raw);
      if (!data.id || !pending.has(data.id)) return;

      const { method, resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) {
        reject(new Error(`${method} failed: ${data.error.message || JSON.stringify(data.error)}`));
      } else {
        resolve(data.result || {});
      }
    }

    const socket =
      typeof WebSocket === "function"
        ? createNativeSocket(webSocketUrl, handleMessage)
        : createNodeSocket(webSocketUrl, handleMessage);

    function send(method, params = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { method, resolve, reject });
        socket.sendText(JSON.stringify({ id, method, params }));
      });
    }

    return {
      opened: socket.opened,
      send,
      close() {
        socket.close();
      },
    };
  }

  async function waitForDocumentReady(send, timeoutMs) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
      const result = await send("Runtime.evaluate", {
        expression: "document.readyState",
        returnByValue: true,
      });
      if (result.result?.value === "complete") return;
      await sleep(100);
    }
  }

  let cachedPlaywright;

  function loadPlaywright() {
    if (cachedPlaywright !== undefined) return cachedPlaywright;

    const candidates = [
      process.env.PLAYWRIGHT_MODULE,
      "playwright",
      path.join(bundledNodeModules, "playwright"),
    ].filter(Boolean);

    for (const candidate of candidates) {
      try {
        cachedPlaywright = require(candidate);
        return cachedPlaywright;
      } catch {
        // Try the next candidate. The bundled Codex runtime is optional outside Codex.
      }
    }

    cachedPlaywright = null;
    return cachedPlaywright;
  }

  function collectExecutableFiles(rootDirToSearch, matches) {
    if (!rootDirToSearch || !fs.existsSync(rootDirToSearch)) return [];

    const found = [];
    const stack = [rootDirToSearch];
    while (stack.length > 0) {
      const current = stack.pop();
      let entries;
      try {
        entries = fs.readdirSync(current, { withFileTypes: true });
      } catch {
        continue;
      }

      for (const entry of entries) {
        const absolute = path.join(current, entry.name);
        if (entry.isDirectory()) {
          stack.push(absolute);
        } else if (entry.isFile() && matches(absolute)) {
          found.push(absolute);
        }
      }
    }
    return found;
  }

  function browserExecutablePriority(executablePath) {
    if (executablePath.includes("Google Chrome for Testing.app")) return 0;
    if (executablePath.includes("Chromium.app")) return 1;
    if (path.basename(executablePath) === "chrome-headless-shell") return 2;
    return 3;
  }

  function findChromiumExecutable(playwright) {
    const explicit = process.env.PLAYWRIGHT_CHROMIUM_PATH;
    if (explicit && fs.existsSync(explicit)) return explicit;

    const candidates = [];
    try {
      const defaultExecutable = playwright.chromium.executablePath?.();
      if (defaultExecutable) candidates.push(defaultExecutable);
    } catch {
      // Fall through to cache scanning.
    }

    candidates.push(
      ...collectExecutableFiles(path.join(os.homedir(), "Library", "Caches", "ms-playwright"), (candidate) =>
        candidate.endsWith("Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing") ||
        candidate.endsWith("Chromium.app/Contents/MacOS/Chromium") ||
        path.basename(candidate) === "chrome-headless-shell"
      ),
      ...collectExecutableFiles(path.join(os.homedir(), ".cache", "puppeteer", "chrome"), (candidate) =>
        candidate.endsWith("Chromium.app/Contents/MacOS/Chromium") ||
        path.basename(candidate) === "chrome"
      )
    );

    return candidates
      .filter((candidate, index, list) => candidate && fs.existsSync(candidate) && list.indexOf(candidate) === index)
      .sort((a, b) => browserExecutablePriority(a) - browserExecutablePriority(b) || b.localeCompare(a))[0];
  }

  function assertRenderAuditResult(result, htmlFile, width, height) {
    const label = `${path.basename(htmlFile)} ${width}x${height}`;
    const errors = formatRenderAuditErrors(result, label);
    if (errors.length > 0) {
      throw new Error(errors.join("; "));
    }
  }

  async function screenshotWithPlaywright(htmlFile, options = {}) {
    const playwright = loadPlaywright();
    if (!playwright) {
      throw new Error(
        "Playwright was not found. Install playwright, set PLAYWRIGHT_MODULE, set PREVIEW_SCREENSHOTS=0, or explicitly opt into Chrome with CHROME_PATH."
      );
    }

    const outputPath = htmlFile.replace(/\.html$/, `${options.suffix || ""}.png`);
    const width = options.width || viewportWidth;
    const height = options.height || viewportHeight;
    const targetUrl = toFileUrl(htmlFile);
    let browser;
    const chromiumExecutable = findChromiumExecutable(playwright);
    const launchOptions = {
      headless: true,
      args: [
        "--disable-gpu",
        "--disable-extensions",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
      ],
    };

    if (!chromiumExecutable) {
      throw new Error(
        "No Playwright Chromium executable was found. Set PLAYWRIGHT_CHROMIUM_PATH, set PREVIEW_SCREENSHOTS=0, or explicitly opt into Chrome with CHROME_PATH."
      );
    }
    launchOptions.executablePath = chromiumExecutable;

    try {
      browser = await playwright.chromium.launch(launchOptions);
      const page = await browser.newPage({
        viewport: { width, height },
        deviceScaleFactor: 1,
        isMobile: width <= 600,
      });
      await page.goto(targetUrl, { waitUntil: "load" });
      await page.waitForLoadState("networkidle", { timeout: Math.max(15000, chromeWait + 5000) }).catch(() => {});
      await page.waitForTimeout(chromeWait);
      const auditResult = await page.evaluate(renderAuditExpression());
      assertRenderAuditResult(auditResult, htmlFile, width, height);
      if (!options.auditOnly) {
        await page.screenshot({
          path: outputPath,
          fullPage: false,
          animations: "disabled",
        });
      }
      await page.close();
    } finally {
      await browser?.close();
    }

    if (options.auditOnly) return null;
    assertPngHasVisibleContent(outputPath, `Playwright screenshot for ${path.basename(htmlFile)}`);
    return outputPath;
  }

  async function screenshot(htmlFile, options = {}) {
    const outputPath = htmlFile.replace(/\.html$/, `${options.suffix || ""}.png`);
    const width = options.width || viewportWidth;
    const height = options.height || viewportHeight;
    const targetUrl = toFileUrl(htmlFile);
    let chrome;
    let client;

    if (!allowSystemChrome) {
      throw new Error("System Google Chrome screenshot fallback is disabled. Set CHROME_PATH or PREVIEW_USE_SYSTEM_CHROME=1 to opt in.");
    }

    if (!fs.existsSync(chromePath)) {
      throw new Error(`Chrome was not found: ${chromePath}`);
    }

    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "awesome-page-design-chrome-"));

    try {
      chrome = spawn(
        chromePath,
        [
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        "--run-all-compositor-stages-before-draw",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
          "--remote-debugging-port=0",
          `--user-data-dir=${userDataDir}`,
          `--window-size=${Math.max(width, 800)},${Math.max(height, 600)}`,
          "about:blank",
        ],
        { stdio: "ignore" }
      );

      // A failed spawn emits an error before DevTools polling can finish.
      // Observe it here; polling detects the exited process and enters cleanup.
      chrome.once("error", () => {});
      const devtoolsPort = await waitForDevtoolsPort(userDataDir, Math.max(15000, chromeWait + 5000), chrome);
      const tabs = await waitForChromeJson(devtoolsPort, Math.max(15000, chromeWait + 5000));
      const tab = tabs.find((item) => item.type === "page") || tabs[0];
      client = createCdpClient(tab.webSocketDebuggerUrl);
      await client.opened;
      await client.send("Page.enable");
      await client.send("Runtime.enable");
      await client.send("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width <= 600,
        screenWidth: width,
        screenHeight: height,
      });
      await client.send("Page.navigate", { url: targetUrl });
      await waitForDocumentReady(client.send, Math.max(15000, chromeWait + 5000));
      await sleep(chromeWait);

      const auditResponse = await client.send("Runtime.evaluate", {
        expression: renderAuditExpression(),
        returnByValue: true,
      });
      if (auditResponse.exceptionDetails) {
        throw new Error(`Render audit evaluation failed: ${auditResponse.exceptionDetails.text || "unknown browser error"}`);
      }
      assertRenderAuditResult(auditResponse.result?.value, htmlFile, width, height);

      if (!options.auditOnly) {
        const image = await client.send("Page.captureScreenshot", {
          format: "png",
          fromSurface: true,
          captureBeyondViewport: false,
        });
        fs.writeFileSync(outputPath, Buffer.from(image.data, "base64"));
      }
    } finally {
      client?.close();
      await stopProcess(chrome);
      await removeDirectoryWithRetry(userDataDir);
    }

    if (options.auditOnly) return null;
    assertPngHasVisibleContent(outputPath, `Chrome screenshot for ${path.basename(htmlFile)}`);
    return outputPath;
  }

  async function screenshotWithChromeCli(htmlFile, options = {}) {
    const outputPath = htmlFile.replace(/\.html$/, `${options.suffix || ""}.png`);
    const width = options.width || viewportWidth;
    const height = options.height || viewportHeight;
    const targetUrl = toFileUrl(htmlFile);
    let chrome;
    let stderr = "";

    if (options.auditOnly) {
      throw new Error("Chrome CLI cannot run a non-persisted render audit");
    }

    if (!allowSystemChrome) {
      throw new Error("System Google Chrome CLI fallback is disabled. Set CHROME_PATH or PREVIEW_USE_SYSTEM_CHROME=1 to opt in.");
    }
    if (!fs.existsSync(chromePath)) {
      throw new Error(`Chrome was not found: ${chromePath}`);
    }
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "awesome-page-design-chrome-"));

    try {
      chrome = spawn(
        chromePath,
        [
          "--headless=new",
          "--no-sandbox",
          "--disable-gpu",
          "--disable-extensions",
          "--disable-dev-shm-usage",
          "--hide-scrollbars",
          "--no-first-run",
          "--no-default-browser-check",
          "--run-all-compositor-stages-before-draw",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
          `--user-data-dir=${userDataDir}`,
          `--window-size=${Math.max(width, 800)},${Math.max(height, 600)}`,
          `--virtual-time-budget=${chromeWait}`,
          `--screenshot=${outputPath}`,
          targetUrl,
        ],
        { stdio: ["ignore", "ignore", "pipe"] }
      );

      chrome.stderr?.on("data", (chunk) => {
        stderr += chunk.toString("utf8");
      });

      const exited = await waitForProcessExit(chrome, Math.max(20000, chromeWait + 12000));
      if (!exited && chrome.exitCode === null && chrome.signalCode === null) {
        chrome.kill("SIGKILL");
        await waitForProcessExit(chrome, 1500);
      }
      if (!exited || chrome.exitCode !== 0) {
        throw new Error(`Chrome CLI screenshot failed: ${stderr.trim() || `exit ${chrome.exitCode ?? chrome.signalCode ?? "unknown"}`}`);
      }
    } finally {
      await stopProcess(chrome);
      await removeDirectoryWithRetry(userDataDir);
    }

    assertPngHasVisibleContent(outputPath, `Chrome CLI screenshot for ${path.basename(htmlFile)}`);
    return outputPath;
  }

  async function screenshotWithRetry(htmlFile, options = {}, attempts = 2) {
    let lastError;
    if (screenshotEngine !== "chrome") {
      for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
          return await screenshotWithPlaywright(htmlFile, options);
        } catch (error) {
          lastError = error;
          if (attempt === attempts) break;
          process.stdout.write(`retry ${attempt}/${attempts - 1}... `);
          await sleep(400 * attempt);
        }
      }

      if (!allowSystemChrome || screenshotEngine === "playwright") {
        throw new Error(
          `${lastError?.message || "Playwright screenshot failed"}. System Google Chrome fallback is disabled by default to avoid macOS crash reports.`
        );
      }
    }

    process.stdout.write("fallback chrome... ");
    try {
      return await screenshot(htmlFile, options);
    } catch (cdpError) {
      if (options.auditOnly || !allowUnauditedCli) {
        throw new Error(
          `${cdpError?.message || lastError?.message || "CDP screenshot failed"}. Chrome CLI fallback cannot satisfy render auditing; set PREVIEW_ALLOW_UNAUDITED_CLI=1 only for an intentional screenshot-only override.`
        );
      }
      process.stdout.write("fallback cli... ");
      try {
        return await screenshotWithChromeCli(htmlFile, options);
      } catch (fallbackError) {
        fallbackError.message = `${fallbackError.message}; CDP error: ${cdpError?.message || lastError?.message || "unknown"}`;
        throw fallbackError;
      }
    }
  }

  return { screenshot, screenshotWithChromeCli, waitForProcessExit, stopProcess, screenshotWithRetry };
}

module.exports = { createScreenshotEngine };
