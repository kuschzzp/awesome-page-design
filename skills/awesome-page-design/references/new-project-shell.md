# 新项目外壳

新建网站、Web App、数据看板、管理后台、落地页或审查外壳完整性时，使用本文件。浏览器标签页标识和文档元数据是完整 UI 的一部分，不是可选的收尾工作。

## 框架对应关系

| 技术栈 | 元数据位置 | Favicon 输出 |
|---|---|---|
| 原生 HTML | 每个入口文档中的 `<html lang>` 和 `<head>` | 在公开入口旁纳入 `favicon.ico`，并链接 `/favicon.ico` |
| Vite | 根目录 `index.html`；应用代码可更新路由标题 | 把 `favicon.ico` 放入 `public/`，并链接 `/favicon.ico` |
| Next.js App Router | 从 `app/layout.*` 导出 `metadata`；路由专属标题使用路由元数据 | 添加 `app/favicon.ico`，或使用文档规定的 metadata icon 路由输出浏览器标签图标 |
| Nuxt | 在 `nuxt.config.*` 配置 `app.head`；需要时使用路由 head 元数据 | 把 `favicon.ico` 放入 `public/`，并在 head links 注册 `/favicon.ico` |
| Astro | 在共享 Layout 的 `<head>` 设置外壳元数据，通过 props 传入页面专属值 | 把 `favicon.ico` 放入 `public/`，并链接 `/favicon.ico` |

项目结构不同时，沿用项目既有的等效方式。检查实际输出的 HTML 和公开资源，不要假设源文件命名正确就代表已经接入。

## 必备基础项

- 用 `lang` 设置正确的文档语言。
- 包含 UTF-8 字符集和响应式 viewport 声明。
- 使用产品专属标题和简洁描述；多页面产品支持路由专属标题。
- 通过 `favicon.ico` 或框架的 favicon 路由输出有效的浏览器标签图标。
- 移除脚手架标题、示例 Logo、框架默认 favicon、占位 manifest 和模板产品名。
- 需要安装、添加到主屏幕或产品有明确要求时，补充应用图标、触控图标和 manifest 元数据。

## Favicon 规则

- 原生 HTML 和常规 public 目录应生成真正的 `favicon.ico`。SVG 图标可以补充，但不能代替它。
- 在 16×16 和 32×32 下保持可辨认。优先使用简单轮廓、首字母或产品符号，不要使用复杂插画。
- 与产品配色一致，同时在浅色和深色浏览器界面上保持对比。
- 标签页不能残留 Vite、React、Next.js、Nuxt、Astro 或通用空白品牌标识。
- 框架路由能输出浏览器标签图标、无需纳入根目录 `favicon.ico` 时，记录该路由，并验证其响应或构建产物。

## 按需添加的元数据

- 仅在有意设计浏览器界面颜色时添加 `theme-color`；产品支持浅深主题时，提供对应的 media 变体。
- 只有在对应方案中验证了浏览器原生表面和 Form 控件后，才声明 `color-scheme`。
- 页面公开且产品要求需要时，再添加 Open Graph、社交分享卡、canonical、robots 或结构化元数据。
- 应用可安装时，保持 manifest 的名称、简称、颜色和图标同步。

## 验证

- 检查渲染后的文档 head 或框架构建产物中的 title、description、charset、viewport 和 `lang`。
- 请求或打开实际 favicon 路径，确认它是有效、非空的图标，而不是脚手架资源。
- 多路由应用检查一个深层路由，确保首页之外不会丢失元数据。
- 使用主题元数据或透明图标时，检查浅色和深色浏览器环境。
- 扫描源码和公开资源，检查是否残留框架脚手架名称及默认图标。
- 报告 favicon 位置或路由，以及有意省略的可选元数据。
