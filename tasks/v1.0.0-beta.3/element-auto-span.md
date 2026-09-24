# Element Plus 的 `span: 'auto'` 适配

日期：2026-09-24。状态：源码已修改，待人工验证。

ElCol 的 `span` 只接受数字，省略时默认生成 `el-col-24`。遇到 Schema 的 `span: 'auto'` 时，适配器显式传入 `span: null`，避免产生 24 栅格类，并用弹性样式让 Col 占据剩余空间。AntDV 沿用原有 `ant-col-auto` 行为。

本轮未运行测试或构建。
