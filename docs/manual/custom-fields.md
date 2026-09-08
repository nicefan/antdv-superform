# 自定义字段

项目组件通过运行时注册提供实现，通过模块扩展声明字段类型。

<span id="选择组件接入方式"></span>

## 选择注册方式 {#选择合适的入口}

| 需求 | 入口 |
| --- | --- |
| 官方 Rate、Slider 等 UI 字段 | 自动导入或 `initialize({ components })` |
| 多页面复用的业务字段 | `registerComponent(s)` |
| 自定义字段 Props 提示 | `CustomFormComponentProps` 模块扩展 |
| 只改某类字段默认属性 | `configure({ defaultProps })` |
| 单页面一次性特殊内容 | `InputSlot` / `InfoSlot` |
| 接入新的 UI 框架或替换底层协议 | 自定义 UI Adapter |

<span id="注册与类型声明"></span>

## 注册项目组件 {#注册项目组件}

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

项目组件接收合并后的字段属性和受控值，不注入 `option`、`model`、`effectData` 等 Core 内部对象。需要业务上下文时，应通过明确的 props、事件或组合式函数设计组件接口。

## 补充字段 Props 类型 {#补充-schema-类型}

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

<span id="组件职责与使用范围"></span>

## 组件命名与职责边界 {#与-adapter-字段的边界}

项目组件不能覆盖 Core 或 Adapter 已保留的名称。例如不能通过 `registerComponent("Input", ProjectInput)` 替换官方 Input。这样可以避免绕过 Select options、范围值拆分、Upload 等增强处理器。

统一默认属性见[全局配置](/manual/global-config#defaultprops-合并顺序)；替换底层 UI 协议见 [UI Adapter](/manual/ui-decoupling#何时需要自定义-adapter)。


<span id="自定义字段开发"></span>
