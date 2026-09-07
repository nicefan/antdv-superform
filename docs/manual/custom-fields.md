# 自定义字段开发

项目业务字段与 UI Adapter 字段是两套注册来源。`Input`、`Select`、`Rate` 等由当前 Adapter 声明；`UserPicker`、`RichEditor` 等项目组件通过 `registerComponent(s)` 注册。

## 注册项目组件

```ts
import superform from "superform-antdv";
import UserPicker from "./UserPicker.vue";

superform.registerComponent("UserPicker", UserPicker);
```

```ts
{
  type: "UserPicker",
  field: "userId",
  label: "用户",
}
```

批量注册：

```ts
superform.registerComponents({
  UserPicker,
  DeptTree,
  RichEditor: {
    component: RichEditor,
    model: {
      prop: "modelValue",
      event: "update:modelValue",
    },
  },
});
```

项目组件接收合并后的字段属性和受控值，不再注入 `option`、`model`、`effectData` 等 Core 内部对象。需要业务上下文时，应通过明确的 props、事件或组合式函数设计组件接口。

## 补充 Schema 类型

运行时注册与 TypeScript 类型是两件事。项目通过模块扩展声明自定义字段 Props：

```ts
// src/superform.d.ts
import "superform-antdv";

declare module "superform-antdv" {
  interface CustomFormComponentProps {
    UserPicker: {
      multiple?: boolean;
      userType?: "all" | "active";
    };
    DeptTree: {
      checkable?: boolean;
      rootId?: string;
    };
  }
}

export {};
```

声明文件告诉 TypeScript 名称和 Props；`registerComponent(s)` 告诉运行时实际 Vue 组件。两者缺一时分别表现为缺少提示或运行时未注册。

## 与 Adapter 字段的边界

项目组件不能覆盖 Core 或 Adapter 已保留的名称。例如不能通过 `registerComponent("Input", ProjectInput)` 替换官方 Input。这样可以避免绕过 Select options、范围值拆分、Upload 等增强处理器。

如果只是给所有 Input 设置默认属性，使用：

```ts
superform.configure({
  defaultProps: {
    Input: { allowClear: true },
  },
});
```

如果必须改变底层 UI 组件实现，应创建或扩展 Adapter；参见[组件与 Adapter 边界](/manual/component-overrides)。

## 选择合适的入口

| 需求 | 入口 |
| --- | --- |
| 官方 Rate、Slider 等 UI 字段 | 自动导入或 `initialize({ components })` |
| 多页面复用的业务字段 | `registerComponent(s)` |
| 自定义字段 Props 提示 | `CustomFormComponentProps` 模块扩展 |
| 只改某类字段默认属性 | `configure({ defaultProps })` |
| 单页面一次性特殊内容 | `InputSlot` / `InfoSlot` |
| 接入新的 UI 框架或替换底层协议 | 自定义 UI Adapter |

旧的 `Ext*` 前缀、`registComponent`、`registerFormComponents` 和 `configureComponents` 已移除，不保留兼容入口。
