const os = require("node:os");
const path = require("node:path");

function readPreviewConfig(env = process.env) {
  const bundledNodeModules = path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules");
  const requestedChromePath = env.CHROME_PATH || "";
  const chromePath = requestedChromePath || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const allowSystemChrome = env.PREVIEW_USE_SYSTEM_CHROME === "1" || Boolean(requestedChromePath);
  const screenshotEngine = env.PREVIEW_SCREENSHOT_ENGINE || "auto";
  const isCodexSeatbeltSandbox = env.CODEX_SANDBOX === "seatbelt";
  const allowSandboxBrowser = env.PREVIEW_ALLOW_SANDBOX_BROWSER === "1";
  const requestedScreenshots =
    env.PREVIEW_SCREENSHOTS === undefined
      ? !isCodexSeatbeltSandbox
      : env.PREVIEW_SCREENSHOTS !== "0";
  const screenshotsBlockedBySandbox = isCodexSeatbeltSandbox && requestedScreenshots && !allowSandboxBrowser;
  const generateScreenshots = requestedScreenshots && !screenshotsBlockedBySandbox;
  const viewportWidth = Number(env.PREVIEW_WIDTH || 1440);
  const viewportHeight = Number(env.PREVIEW_HEIGHT || 1200);
  const mobileViewportWidth = Number(env.PREVIEW_MOBILE_WIDTH || 390);
  const mobileViewportHeight = Number(env.PREVIEW_MOBILE_HEIGHT || 844);
  const generateMobileScreenshots = env.PREVIEW_MOBILE !== "0";
  const chromeWait = Number(env.PREVIEW_WAIT || 5000);
  const allowUnauditedCli = env.PREVIEW_ALLOW_UNAUDITED_CLI === "1";
  const auditViewportWidths = [
    ...new Set(
      (env.PREVIEW_AUDIT_WIDTHS || "")
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value) && value > 0)
    ),
  ];

  return { bundledNodeModules, chromePath, allowSystemChrome, screenshotEngine, isCodexSeatbeltSandbox, screenshotsBlockedBySandbox, generateScreenshots, viewportWidth, viewportHeight, mobileViewportWidth, mobileViewportHeight, generateMobileScreenshots, chromeWait, allowUnauditedCli, auditViewportWidths };
}

module.exports = { readPreviewConfig };
