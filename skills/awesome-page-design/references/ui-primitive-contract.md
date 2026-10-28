# UI 基础控件契约

新增、改变或审查控件行为、反馈和浮层时使用。仅调整已有区域的外观且不改变行为时，按入口的简短路径检查即可。本参考负责基础控件验收和反模式扫描；详细行为由各专项组件契约负责。

## 按使用场景选择实现

- **现有项目：**优先复用已有组件、Token 和无障碍行为。简单选择可保留适合该项目的原生 Select；不要仅因本库演示采用自定义控件，就替换项目正常工作的组件。
- **本库风格演示：**Dropdown 与日期选择器使用符合该页风格的自定义菜单或日历，关闭和展开状态都需设计。数字步进器、Checkbox、Radio、Range 和 Progress 实际支持的默认、选中、禁用与焦点外观也需融入页面。
- **系统能力：**允许保留语义化原生 Input 和 Progress 作为底层；自定义外观不等于重写所有行为。文件选择窗口等系统交互可保留，页面内入口应与产品一致。

## 验收规则

- 产品流程中的浏览器 `alert(...)`、`confirm(...)`、`prompt(...)` 及其 `window.*` 形式，应替换为与产品集成的反馈、确认或恢复 UI。临时调试不属于这条产品 UI 规则的范围。
- 不要把未经设计的原生 `<select>` 当作成品 Dropdown 交付。先按上面的场景边界选择实现，再按[选择控件契约](patterns/select-and-combobox.md)处理简单与复杂选择。
- 原生 File Input、Checkbox 和 Radio 应遵循周围产品已有的样式或封装约定。
- 保留可见焦点。只有明确提供了满足无障碍要求的 `focus-visible` 替代样式，才允许重置 Outline；扫描命中本身不能证明存在缺陷。
- 明确指定需要动画的属性，不要使用 `transition: all`。

创建替代控件前，通过[现有项目集成](existing-project-integration.md)寻找产品已有封装。当前系统能够支持局部功能时，不要引入新的组件引擎。

## 选择合适的基础控件

| 需求 | 优先采用的产品模式 |
|---|---|
| 轻量保存或复制结果 | Toast、Snackbar 或 Status，并使用适当的状态播报 |
| 字段或 Form 错误 | 行内校验；有帮助时补充错误摘要 |
| 页面警告、权限问题、服务中断 | 受影响区域中的 Banner 或 Alert |
| 破坏性操作决策 | 项目已有 Confirmation、行内确认或撤销 |
| 简单选择 | 现有项目优先已有封装，适用时保留原生 Select；本库演示使用风格一致的自定义 Listbox |
| 日期、数量与连续数值 | 优先已有 Date Picker、Stepper 和 Slider；本库演示补齐日历弹层、加减操作、轨道与滑块样式 |
| 可搜索、异步或复杂选择 | 已有且满足无障碍要求的 Select、Combobox 或 Autocomplete |
| 每页条数或 Table 筛选 | 已有 Pagination、Filter 或 Select 基础控件 |
| 剪贴板失败 | 有兼容的复制替代方式时使用它；否则提供可恢复的页面级状态，不能调用浏览器 Prompt |
| 浮层 | 已有且经过设计的 Modal、Drawer 或 Popover，提供适当的焦点和关闭行为 |

只阅读对应契约：[选择控件](patterns/select-and-combobox.md)、[浮层与确认](patterns/modal-drawer-and-confirmation.md)、[反馈](patterns/toast-alert-and-feedback.md)，或[Table 与分页](patterns/data-table-and-pagination.md)。原生 `<dialog>` 经设计后可以使用，前提是焦点、Backdrop、Escape、滚动和移动端行为满足浮层契约。

## 定向扫描

收尾前扫描本次修改的 UI 文件：

```bash
rg -n '(^|[^[:alnum:]_])(alert|confirm|prompt)[[:space:]]*\(|<select\b|type=("|\x27)(date|number|range|checkbox|radio)("|\x27)|<progress\b|outline[[:space:]]*:[[:space:]]*none|outline-none|transition[[:space:]]*:[[:space:]]*all' <changed-ui-files>
```

将结果视为待检查项，不要自动判为失败。结合场景判断原生控件是否允许保留，检查渲染后的触发器、展开面板、轨道、滑块及选中标记，不能只看外层边框或 `accent-color`。同时确认浏览器 Dialog 调用与无关函数的区别，以及 Outline 重置后的可见替代样式。修复实际缺陷；交付时简述检查范围与有意保留的例外，无法扫描时说明人工检查范围。
