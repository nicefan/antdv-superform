# `colProps.span` 缺省覆盖修复

日期：2026-09-24。状态：专项浏览器验收通过。

标准栅格中，未设置顶层 `span` 时保留 `colProps.span`；显式设置顶层 `span` 时仍由顶层配置覆盖。

2026-10-11 两套 UI 浏览器验收通过：colProps.span=6 在无顶层 span 时保留，显式 span=12 时覆盖；对应 Checklist 已勾选。证据见 [测试结果](./validation-2026-10-11.md)。
