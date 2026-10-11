# Element Plus 查询及简化表单间距修复

日期：2026-09-24。状态：已修复，局部浏览器回归通过。

表格查询表单与 `ignoreRules` 表单缺少 Element Plus 的 FormItem 间距适配，仍使用原生 18/22px 下边距。按现有 AntDV 行为统一为上下各 6px，通过 FormItem 间距变量兼容已有嵌套 FormItem 样式，仅修改 UI 包样式。

2026-10-11 已恢复查询及 ignoreRules 作用域内的 margin-top:6px 和嵌套间距变量 6px；两类表单浏览器计算样式上下均为 6px，行编辑回归通过。其他 size、嵌套及普通表单隔离组合尚待验收。证据见 [测试结果](./validation-2026-10-11.md)。
