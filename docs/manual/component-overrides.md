# 组件与 Adapter 边界

SuperForm 1.0 不再开放一个混合的 `components` 配置来任意替换所有底层组件。组件来源按职责分开，避免业务注册意外覆盖 Adapter 协议。

## 三种组件来源

| 来源 | 负责内容 | 配置入口 |
| --- | --- | --- |
| Adapter 固定能力 | Form、FormItem、Modal、Table、布局、反馈等基础能力 | 官方产品内置，或自定义 Adapter 实现 |
| Adapter 字段 | Input、Select、Rate 等 Adapter 已声明字段 | Vite 自动导入或 `initialize({ components })` |
| 项目业务字段 | UserPicker、RichEditor 等业务组件 | `registerComponent(s)` |

`initialize({ components })` 的组件名必须已经由当前 Adapter 声明，不能加入任意项目组件：

```ts
import superform from "superform-antdv";
import { Input, Rate } from "antdv-next";

superform.initialize({ components: { Input, Rate } });
```

项目组件使用独立入口：

```ts
superform.registerComponents({ UserPicker, RichEditor });
```

## 修改默认属性

不改变组件协议时，优先使用 `defaultProps`：

```ts
superform.configure({
  defaultProps: {
    Input: { allowClear: true },
    Select: { allowClear: true },
    Table: { size: "small", bordered: true },
  },
});
```

单个字段的 `attrs` 会覆盖全局默认值。

## 何时需要自定义 Adapter

以下需求属于 Adapter，而不是项目组件注册：

- 替换所有 Form、Modal 或 Table 的底层实现。
- 改变 `value`、`checked`、`modelValue` 等 model 协议。
- 映射 UI 框架专属事件、插槽和实例方法。
- 接入新的消息、确认框、上传、预览或表格能力。
- 让某个字段名称使用不同的 UI 实现，同时保留 Core 增强处理器。

第三方 Adapter 依赖独立 Core：

```ts
import superform from "superform";
import { defineUIAdapter } from "superform/sdk";

const adapter = defineUIAdapter({
  name: "my-ui",
  // capabilities、fields、processors、defaults...
});

superform.useAdapter(adapter);
```

官方产品用户不需要也不应再调用 `useAdapter()`。

## 迁移旧覆盖配置

- `components.Input` 等普通字段：改为 Vite 自动导入或 `initialize({ components })`。
- `components.UserPicker` 等业务字段：改为 `registerComponent(s)`。
- `components.Form`、`components.Table`、`components.Modal` 等基础能力替换：迁到自定义 Adapter。
- 只修改 props 的覆盖：迁到 `configure({ defaultProps })`。

这种分层使类型声明、运行时注册和 UI 协议各有唯一入口。
