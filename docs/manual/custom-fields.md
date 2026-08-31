# 自定义字段开发

普通 UI 表单组件可以在安装时注册，配置名直接对应 Schema 的 `type`。核心统一负责字段绑定、动态属性、校验容器和插槽；只有需要 options 转换、默认值或特殊数据结构的字段才使用内置增强组件。

## 直接注册 UI 组件

```ts
import SuperFormPlugin from "antdv-superform";
import { Rate } from "antdv-next";

app.use(SuperFormPlugin, {
  components: {
    Rate,
  },
});
```

注册后无需再编写包装组件：

```ts
{
  type: 'Rate',
  field: 'score',
  label: '评分',
  initialValue: 3,
  attrs: {
    allowHalf: true,
  },
}
```

普通组件默认使用 `value` / `update:value`。组件只接收合并后的属性、字段值和 Schema 插槽，不会收到 `option`、`model` 等 SuperForm 内部对象。

## 配置不同的 v-model 协议

其他组件库可能使用 `modelValue` / `update:modelValue`，可在注册时声明：

```ts
app.use(SuperFormPlugin, {
  components: {
    RichEditor: {
      component: RichEditor,
      model: {
        prop: "modelValue",
        event: "update:modelValue",
      },
    },
  },
});
```

Schema 仍只需要配置 `type: "RichEditor"`，内部会把主字段绑定转换为目标协议。`labelField` 和 `vModelFields` 等附加模型保持各自声明的名称。

## 为 attrs 增加 TypeScript 类型

运行时配置无法自动改变另一个文件中 Schema 的静态类型。项目可通过模块扩展建立 `type` 与组件 Props 的对应关系：

```ts
// src/superform-components.d.ts
import type { RateProps } from "antdv-next";

declare module "antdv-superform" {
  interface CustomFormComponentProps {
    Rate: RateProps;
  }
}

export {};
```

此后 `type: "Rate"` 的 `attrs` 会按 `RateProps` 检查并提供编辑器提示。每增加一种直接字段，只需在该接口中增加一项。

## 哪些组件仍由内部增强

以下类型保留 SuperForm 的现有增强行为：

- `Input`：搜索按钮、默认 placeholder 和 loading；
- `Select`、`Radio`、`Checkbox`、`AutoComplete`、`TreeSelect`：options 与字典归一化；
- `Switch`：选项值、标签和值转换；
- `DateRange`、`TimeRange`：范围值和结束字段拆分；
- `Upload`、`TagInput`、`TagSelect`：专用数据转换和交互。

在 `components` 中配置这些同名组件时，会替换增强器使用的底层 UI 组件，不会绕过增强逻辑。

## 带业务上下文的扩展字段

需要直接读取 `option`、`effectData` 或处理只读模式的业务组件，仍可使用 `registerComponent`：

```ts
SuperFormPlugin.registerComponent("UserPicker", UserPicker);
```

新 Schema 可以直接使用 `type: "UserPicker"`；旧的 `type: "ExtUserPicker"` 继续兼容。此类组件会收到：

- `option`、`effectData`；
- `value` / `onUpdate:value`；
- `labelValue` 和 `vModelFields` 声明的附加模型；
- 全局默认、`attrs`、事件和 `dynamicAttrs` 的合并结果。

`Ext` 前缀仅用于历史兼容，新代码不再需要主动添加。

## 选择合适的扩展方式

| 需求 | 方式 |
| --- | --- |
| Rate、Slider 等标准受控组件 | `components` 直接注册 |
| 替换所有 Input 的底层实现 | `components.Input` |
| 需要 options、范围或上传增强 | 使用对应内置类型 |
| 需要 Schema 上下文的业务字段 | `registerComponent` |
| 一个页面的一次性特殊渲染 | `InputSlot` |

普通 UI 组件优先使用直接注册，这能让新增组件不依赖 SuperForm 发布新的包装组件。

组件较多时可使用 [Schema 组件自动导入](/manual/auto-components)，由构建插件扫描 `type`、按需生成导入并同步维护 `attrs` 类型声明。
