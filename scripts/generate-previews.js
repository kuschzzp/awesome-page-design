#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const skillDir = path.join(rootDir, "skills", "awesome-page-design");
const stylesDir = path.join(skillDir, "assets", "styles");
const outputDir = path.join(skillDir, "assets", "previews");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewportWidth = Number(process.env.PREVIEW_WIDTH || 1440);
const viewportHeight = Number(process.env.PREVIEW_HEIGHT || 1200);
const chromeWait = Number(process.env.PREVIEW_WAIT || 5000);

const styleCatalog = {
  "version-a-classic": {
    version: "A",
    name: "Classic News",
    zhName: "经典新闻",
    bestFor: "editorial sites, authority content, calm product pages",
    zhBestFor: "新闻、内容站、权威信息页",
  },
  "version-b-grid": {
    version: "B",
    name: "Card Grid",
    zhName: "卡片网格",
    bestFor: "dashboards, catalogs, overview pages",
    zhBestFor: "仪表盘、目录页、概览页",
  },
  "version-c-feed": {
    version: "C",
    name: "Feed Layout",
    zhName: "信息流布局",
    bestFor: "feeds, communities, updates, article streams",
    zhBestFor: "信息流、社区、动态、文章流",
  },
  "version-d-bento": {
    version: "D",
    name: "Bento Grid",
    zhName: "Bento 网格",
    bestFor: "product showcases, Apple-like overview pages",
    zhBestFor: "产品展示、Apple 风概览页",
  },
  "version-e-glass": {
    version: "E",
    name: "Glassmorphism",
    zhName: "毛玻璃",
    bestFor: "immersive dark landing pages, AI products",
    zhBestFor: "沉浸式暗色落地页、AI 产品",
  },
  "version-f-brutalism": {
    version: "F",
    name: "Neo-Brutalism",
    zhName: "新粗野主义",
    bestFor: "bold campaigns, indie products, playful utilities",
    zhBestFor: "强品牌活动、独立产品、趣味工具",
  },
  "version-g-aurora": {
    version: "G",
    name: "Aurora Gradient",
    zhName: "极光渐变",
    bestFor: "futuristic products, AI tools, premium dark experiences",
    zhBestFor: "未来感产品、AI 工具、高级暗色体验",
  },
  "version-h-y2k": {
    version: "H",
    name: "Retro Y2K",
    zhName: "复古 Y2K",
    bestFor: "music, fashion, youth culture, playful campaigns",
    zhBestFor: "音乐、潮流、青年文化、活动页",
  },
  "version-i-swiss": {
    version: "I",
    name: "Swiss Editorial",
    zhName: "瑞士编辑风",
    bestFor: "portfolios, cultural sites, design studios, serious content",
    zhBestFor: "作品集、文化机构、严肃内容",
  },
  "version-j-terminal": {
    version: "J",
    name: "Terminal Hacker",
    zhName: "黑客终端",
    bestFor: "developer tools, CLI products, security, open source",
    zhBestFor: "开发者工具、CLI、安全、开源",
  },
  "version-k-clay": {
    version: "K",
    name: "Claymorphism",
    zhName: "软泥拟态",
    bestFor: "friendly SaaS, education, wellness, approachable tools",
    zhBestFor: "教育、健康、友好型 SaaS",
  },
  "version-l-cutealism": {
    version: "L",
    name: "Cute-alism",
    zhName: "可爱主义",
    bestFor: "playful brands, creator tools, youth products",
    zhBestFor: "玩法品牌、创作者工具、年轻产品",
  },
  "version-m-stark": {
    version: "M",
    name: "Resonant Stark",
    zhName: "共鸣极简",
    bestFor: "premium dark portfolios, art, high-end product teasers",
    zhBestFor: "高级暗色作品集、艺术、精品预告页",
  },
  "version-n-skeuomorph": {
    version: "N",
    name: "Light Skeuomorphism",
    zhName: "轻拟物",
    bestFor: "Apple-like tools, device apps, tactile product UI",
    zhBestFor: "Apple 风工具、设备应用、触感 UI",
  },
  "version-o-scribble": {
    version: "O",
    name: "Human Scribble",
    zhName: "手写涂鸦",
    bestFor: "workshops, education, human-centered notes, maker pages",
    zhBestFor: "工作坊、教育、Maker、手写笔记",
  },
  "version-p-material-you": {
    version: "P",
    name: "Material You",
    zhName: "Material You",
    bestFor: "Android-like apps, friendly product UI, general-purpose tools",
    zhBestFor: "Android 风应用、通用工具、生活方式产品",
  },
  "version-q-fluent-cloud": {
    version: "Q",
    name: "Fluent Cloud",
    zhName: "Fluent 云应用",
    bestFor: "Microsoft-like productivity tools, cloud apps",
    zhBestFor: "生产力工具、云控制台、桌面应用",
  },
  "version-r-carbon-enterprise": {
    version: "R",
    name: "Carbon Enterprise",
    zhName: "Carbon 企业",
    bestFor: "serious enterprise software, analytics, dense operations UI",
    zhBestFor: "企业软件、数据平台、工业系统",
  },
  "version-s-polaris-commerce": {
    version: "S",
    name: "Polaris Commerce",
    zhName: "Polaris 商务",
    bestFor: "merchant tools, ecommerce admin, business workflows",
    zhBestFor: "电商后台、商家工具、运营系统",
  },
  "version-t-atlassian-workbench": {
    version: "T",
    name: "Atlassian Workbench",
    zhName: "Atlassian 工作台",
    bestFor: "collaboration tools, planning apps, team dashboards",
    zhBestFor: "协作工具、项目管理、团队看板",
  },
  "version-u-gov-service": {
    version: "U",
    name: "Gov Service",
    zhName: "政府服务",
    bestFor: "public service, legal, forms, accessibility-first sites",
    zhBestFor: "政务、公共服务、法律、表单",
  },
  "version-v-spectrum-creative": {
    version: "V",
    name: "Spectrum Creative",
    zhName: "Spectrum 创意",
    bestFor: "creative software, media tools, asset managers",
    zhBestFor: "创作软件、素材管理、媒体工具",
  },
  "version-w-lightning-crm": {
    version: "W",
    name: "Lightning CRM",
    zhName: "Lightning CRM",
    bestFor: "CRM, sales tools, customer operations",
    zhBestFor: "CRM、销售、客服、客户运营",
  },
  "version-x-primer-dev": {
    version: "X",
    name: "Primer Dev",
    zhName: "Primer 开发者",
    bestFor: "developer platforms, docs, repo browsers, issue trackers",
    zhBestFor: "开发者平台、文档、仓库、Issue",
  },
  "version-y-ant-pro": {
    version: "Y",
    name: "Ant Pro",
    zhName: "Ant Pro",
    bestFor: "enterprise admin, data tables, management consoles",
    zhBestFor: "企业中台、管理后台、数据表格",
  },
};

function toFileUrl(filePath) {
  return `file://${filePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function findHtmlFiles() {
  if (!fs.existsSync(stylesDir)) {
    return [];
  }

  return fs
    .readdirSync(stylesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^version-[a-z]+-/.test(entry.name))
    .flatMap((entry) => {
      const styleDir = path.join(stylesDir, entry.name);
      return fs
        .readdirSync(styleDir)
        .filter((file) => /^version-[a-z]+-.*\.html$/.test(file))
        .map((file) => path.join(styleDir, file));
    })
    .sort((a, b) => a.localeCompare(b, "en"));
}

function screenshot(htmlFile) {
  const inputPath = htmlFile;
  const outputPath = inputPath.replace(/\.html$/, ".png");

  execFileSync(
    chromePath,
    [
      "--headless",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--timeout=${chromeWait}`,
      `--window-size=${viewportWidth},${viewportHeight}`,
      `--screenshot=${outputPath}`,
      toFileUrl(inputPath),
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      timeout: Math.max(30000, chromeWait + 15000),
      killSignal: "SIGKILL",
    }
  );

  return outputPath;
}

function writeIndex(imageFiles) {
  const cards = imageFiles
    .map((imageFile) => {
      const slug = path.basename(imageFile, ".png");
      const style = styleCatalog[slug] || {
        version: slug.replace(/^version-/, "").slice(0, 1).toUpperCase(),
        name: slug,
        zhName: slug,
        bestFor: "web UI work",
        zhBestFor: "Web UI work",
      };
      const imageHref = path.relative(outputDir, imageFile).split(path.sep).join("/");
      const htmlHref = imageHref.replace(/\.png$/, ".html");
      const prompt = `Use awesome-page-design style: Version ${style.version} - ${style.name}. Apply its visual language, but do not copy the sample layout.`;
      const zhPrompt = `使用 awesome-page-design 风格：Version ${style.version} - ${style.name}（${style.zhName}）。请应用它的视觉语言，但不要复制示例布局。`;
      return `      <article class="card">
        <a class="preview" href="${escapeHtml(htmlHref)}" aria-label="Open Version ${escapeHtml(style.version)} ${escapeHtml(style.name)} HTML preview">
          <img src="${escapeHtml(imageHref)}" alt="Version ${escapeHtml(style.version)} - ${escapeHtml(style.name)} preview" loading="lazy">
        </a>
        <div class="card-body">
          <div class="card-kicker"><span data-i18n="version">Version</span> ${escapeHtml(style.version)}</div>
          <h2><span data-en="${escapeHtml(style.name)}" data-zh="${escapeHtml(style.zhName)}">${escapeHtml(style.name)}</span></h2>
          <p data-en="${escapeHtml(style.bestFor)}" data-zh="${escapeHtml(style.zhBestFor)}">${escapeHtml(style.bestFor)}</p>
          <div class="actions">
            <button type="button" data-copy-en="${escapeHtml(prompt)}" data-copy-zh="${escapeHtml(zhPrompt)}" data-i18n="copy">Copy style prompt</button>
            <a href="${escapeHtml(htmlHref)}" data-i18n="openHtml">Open HTML</a>
          </div>
        </div>
      </article>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Web Style Templates Previews</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 32px;
  background: #f5f6fa;
  color: #1f2937;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.header {
  max-width: 1440px;
  margin: 0 auto 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
h1 {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  letter-spacing: 0;
}
.meta {
  margin: 8px 0 0;
  color: #667085;
  font-size: 14px;
}
.hint {
  max-width: 720px;
  margin: 10px 0 0;
  color: #475467;
  font-size: 14px;
  line-height: 1.6;
}
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(15,23,42,0.06);
}
.lang-toggle button {
  min-width: 48px;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #667085;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.lang-toggle button.active {
  background: #4f46e5;
  color: #ffffff;
}
.grid {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.card {
  overflow: hidden;
  color: inherit;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.08);
}
.preview {
  display: block;
  color: inherit;
  text-decoration: none;
}
.preview img {
  display: block;
  width: 100%;
  aspect-ratio: ${viewportWidth} / ${viewportHeight};
  object-fit: cover;
  object-position: top;
  background: #e5e7eb;
}
.card-body {
  padding: 14px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.card-kicker {
  color: #4f46e5;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.card h2 {
  margin: 4px 0 6px;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: 0;
}
.card p {
  min-height: 42px;
  margin: 0;
  color: #667085;
  font-size: 14px;
  line-height: 1.5;
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}
.actions button,
.actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 6px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
.actions button {
  color: #ffffff;
  background: #4f46e5;
  border: 1px solid #4f46e5;
  cursor: pointer;
}
.actions button.copied {
  background: #059669;
  border-color: #059669;
}
.actions a {
  color: #344054;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.12);
}
@media (max-width: 640px) {
  body { padding: 16px; }
  .header { display: block; }
  .lang-toggle { margin-top: 14px; }
  .grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
</head>
<body>
  <header class="header">
    <div>
      <h1>Web Style Templates Previews</h1>
      <p class="meta">${imageFiles.length} previews, viewport ${viewportWidth}x${viewportHeight}</p>
      <p class="hint">Compare the styles visually. Click <strong>Copy style prompt</strong>, send it to your AI agent, and it can apply that style without copying the sample layout.</p>
    </div>
    <div class="lang-toggle" aria-label="Language">
      <button type="button" class="active" data-lang="en">EN</button>
      <button type="button" data-lang="zh">中文</button>
    </div>
  </header>
  <main class="grid">
${cards}
  </main>
  <script>
  const copy = {
    en: {
      title: 'Web Style Templates Previews',
      meta: '${imageFiles.length} previews, viewport ${viewportWidth}x${viewportHeight}',
      hint: 'Compare the styles visually. Click <strong>Copy style prompt</strong>, send it to your AI agent, and it can apply that style without copying the sample layout.',
      version: 'Version',
      copy: 'Copy style prompt',
      copied: 'Copied',
      openHtml: 'Open HTML',
      promptFallback: 'Copy this style prompt:'
    },
    zh: {
      title: '网页视觉风格预览',
      meta: '${imageFiles.length} 个预览，视口 ${viewportWidth}x${viewportHeight}',
      hint: '直观看图比较所有风格。点击 <strong>复制风格提示词</strong>，发送给你的 AI，它会应用该风格的视觉语言但不复制示例布局。',
      version: '版本',
      copy: '复制风格提示词',
      copied: '已复制',
      openHtml: '打开 HTML',
      promptFallback: '复制这个风格提示词：'
    }
  };
  let activeLang = 'en';

  function applyLanguage(lang) {
    activeLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelector('h1').textContent = copy[lang].title;
    document.querySelector('.meta').textContent = copy[lang].meta;
    document.querySelector('.hint').innerHTML = copy[lang].hint;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = copy[lang][node.dataset.i18n];
    });
    document.querySelectorAll('[data-en][data-zh]').forEach((node) => {
      node.textContent = node.dataset[lang];
    });
    document.querySelectorAll('.lang-toggle button').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
  }

  document.querySelectorAll('.lang-toggle button').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  document.querySelectorAll('[data-copy-en]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute(activeLang === 'zh' ? 'data-copy-zh' : 'data-copy-en');
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = copy[activeLang].copied;
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = copy[activeLang].copy;
          button.classList.remove('copied');
        }, 1600);
      } catch {
        window.prompt(copy[activeLang].promptFallback, value);
      }
    });
  });
  </script>
</body>
</html>
`;

  fs.writeFileSync(path.join(outputDir, "index.html"), html);
}

function main() {
  if (!fs.existsSync(chromePath)) {
    throw new Error(`Chrome was not found: ${chromePath}\nSet CHROME_PATH=/path/to/chrome to use another browser path.`);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const htmlFiles = findHtmlFiles();
  if (htmlFiles.length === 0) {
    throw new Error("No version-*.html files were found under skills/awesome-page-design/assets/styles/.");
  }

  console.log(`Generating ${htmlFiles.length} previews...`);
  const imageFiles = [];

  for (const htmlFile of htmlFiles) {
    process.stdout.write(`- ${path.relative(rootDir, htmlFile)} -> `);
    const imageFile = screenshot(htmlFile);
    imageFiles.push(imageFile);
    process.stdout.write(`${path.relative(rootDir, imageFile)}\n`);
  }

  writeIndex(imageFiles);
  console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
}

main();
