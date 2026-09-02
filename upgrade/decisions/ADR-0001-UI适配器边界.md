# ADR-0001：UI 适配器边界

状态：已接受
日期：2026-09-01

## 背景

项目已经通过 `compat/antdv.ts` 集中 AntDV 运行时导入，但核心组件仍直接依赖 AntDV 的组件、服务、model、事件和公开类型。单纯把 import 改成 `adapter` 不能支持其他 UI 框架。

## 决策

- Core 只实现 Schema、模型、联动、选项、校验编排及 Form/Table/Upload 等领域逻辑。
- UIAdapter 负责 UI 组件、属性映射、model 与事件协议、默认值、实例 API、消息、弹窗和图标。
- Core 不直接导入 `antdv-next`、`@antdv-next/icons` 或它们的公开类型。
- 增强字段先产出框架无关状态，再由 Adapter 转换为具体 UI props。
- 调用方安装 SuperForm 时必须显式传入 Adapter；Core 不隐式选择默认 UI 框架。
- Adapter 在首次安装时初始化并锁定。重复使用同一 Adapter 实例安装可以幂等执行，传入不同实例视为配置错误，不支持运行时切换。

## 后果

- 需要逐步重构当前直接渲染 UI 组件的 `.vue` 包装。
- 公开 Schema 类型需要独立阶段解耦，不能只改运行时。
- Form、Table、Upload 的适配器能力会比普通字段复杂，应分阶段设计。
- 现有省略 `adapter` 的安装代码需要显式传入对应 UI 框架 Adapter。
- 不公开 Adapter setter；初始化前读取 Adapter 或初始化后传入不同 Adapter 都应尽早报错。
