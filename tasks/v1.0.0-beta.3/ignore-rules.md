# Form `ignoreRules` 适配

日期：2026-09-24。状态：专项浏览器验收通过。

必填标记已映射到 AntDV 和 Element Plus 实际支持的表单属性。AntDV 使用 `validateTrigger: false`；普通字段和 InputGroup 的规则在两套 UI 下屏蔽输入时的自动触发，显式 `validate` 和 `submit` 仍校验规则。

2026-10-11 两套 UI 浏览器验收通过：配置 ignoreRules 的表单隐藏必填标记，输入后清空及失焦不自动报错，显式 validate 仍返回 FormValidationError；对应 Checklist 已勾选。证据见 [测试结果](./validation-2026-10-11.md)。
