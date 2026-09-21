# UI Adapter

Schema 语义、Core 领域逻辑和 UI 框架协议分别由独立层负责。Core 通过 Adapter 使用具体 UI 能力。

```text
Schema
  ↓
Core：模型、联动、校验、options、查询与 CRUD 流程
  ↓
UI Adapter：组件、Props、model、事件、默认值和服务协议
  ↓
AntDV Next / Element Plus / 第三方 UI
```

<span id="adapter-架构与组件来源"></span>

## Core 与官方产品包 {#发布方式}

- `superform`：独立 Core 与 Adapter SDK，面向第三方 Adapter 开发。
- `superform-antdv`：包含 Core 与 AntDV Adapter 的完整产品包。
- `superform-element-plus`：包含 Core 与 Element Plus Adapter 的完整产品包。

业务项目只选择一个官方产品包。两个官方产品不能在同一应用中混用，也不支持运行时切换。

## 初始化与注册职责 {#初始化与注册}

官方产品使用 `initialize()` 初始化，`configure()` 设置全局行为，`registerComponent(s)` 登记项目字段。分别见[全局配置](/manual/global-config#统一应用入口)和[unplugin 自动导入](/manual/auto-components)。官方包导入本身不会修改全局状态。

## 组件来源 {#三种组件来源}

| 来源 | 负责内容 | 配置入口 |
| --- | --- | --- |
| Adapter 固定渲染 | Form、FormItem、Modal、Table、布局、容器、反馈等固定 UI | `UIAdapter.render`，官方产品内置或自定义 Adapter 实现 |
| Adapter 字段 | Input、Select、Rate 等 Adapter 已声明字段 | Vite 自动导入或 `initialize({ components })` |
| 项目业务字段 | UserPicker、RichEditor 等业务组件 | `registerComponent(s)` |

`initialize({ components })` 只能提供当前 Adapter 已声明的字段；项目组件使用 `registerComponent(s)`，不能覆盖 Core 或 Adapter 的保留名称。

## type：解析字段组件 {#schema-组件解析}

字段按以下来源解析：

1. Core 内置节点，例如 `Text`、`Hidden`、`Fragment`、`Group`。
2. 当前 Adapter 声明并指定处理器的增强字段，例如 `Select`、`Switch`、`DateRangePicker`、`Upload`。
3. `registerComponent(s)` 注册的项目业务字段。
4. Vite 插件自动导入的普通 UI 字段。

UI 字段使用真实组件名，例如 `TextArea`、`DateRangePicker`、`TimeRangePicker`、`RadioGroup` 和 `CheckboxGroup`。

Element Plus 的 Schema 名称去掉导出上的 `El` 前缀，例如 `ElInput` 对应 `Input`。

## 字段声明与组件引入 {#字段声明不等于组件引入}

Adapter 声明某个字段表示：

- Schema 可以获得字段名和 Props 提示。
- Adapter 知道 model、事件、默认值和增强处理器。

它不会自动把实际 UI 组件打进产品根入口。运行时组件由 Vite 插件按需导入，或通过 `initialize({ components })` 手动提供；缺少时会明确提示组件未注册。

<span id="开发第三方-adapter"></span>

## 自定义 Adapter 接入 {#何时需要自定义-adapter}

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
  // 按目标 UI 框架实现基础能力、字段协议、处理器和默认配置
});

superform.useAdapter(adapter);
```

官方产品用户不需要也不应再调用 `useAdapter()`。

### 固定 UI render 与业务覆盖

固定 UI 统一登记在 `UIAdapter.render`：`form/formItem`、布局、Group/Card/Tabs/Collapse/Descriptions、按钮、提示、Modal、Upload、Table 等都使用同一张类型化 `UIRenderers` 表。Core 通过 `getUIRender(name)` 取得渲染函数，渲染协议集中在这一处。

复杂 UI 结构可以在 Adapter 包内部拆到 `components/Tabs.ts`、`components/Table.ts` 等文件，但对 Core 仍只有一个 render 入口。字段自动导入与固定 UI 渲染保持独立。

官方产品可在**首次初始化**时覆盖单个渲染器：

```ts
import { h } from 'vue'
import superForm from 'superform-antdv'
import BusinessGroup from './BusinessGroup.vue'

superForm.initialize({
  overrides: {
    render: {
      group: state => h(BusinessGroup, state.attrs, {
        title: state.title,
        actions: state.extra,
        default: () => h('div', state.contentAttrs, state.content()),
      }),
    },
  },
})
```

Group 的优先级为 Schema `option.component` → `overrides.render.group` → UI 包 `render.group` → Core 默认 Group。render 按项浅合并；form/services/modal/upload/table 等非 render 协议覆盖时整项替换，不做递归深合并。首次初始化后不能再带 overrides 切换协议，无参数重复 initialize 仍保持幂等。

### 局部校验与语义图标

支持 InputGroup 局部校验时，实现 `form.validateField(instance, path)`。其中 `path` 为 `(string | number)[]`，方法只校验该路径并返回 Promise。

`icons.semantic` 将语义名映射为 `() => VNodeChild`。可从 `superform/sdk` 导入 `builtInIcons` 复用默认图标。

## 跨框架复用范围 {#第三方-adapter}

第三方包依赖 `superform`，通过 `superform/sdk` 实现 UIAdapter。Core 只调用 `UIRenderers` 与 form/services/modal/icons/upload/table 等明确协议，不认识具体 UI 组件、CSS class 或实例 API。

切换 Adapter 不承诺整份 Schema 原样复用。Core 容器和业务语义保持稳定，UI 组件名称、`attrs` 与事件仍以目标框架为准。

架构设计见仓库中的 `upgrade/ARCHITECTURE.md`。



<!-- 章节定位标识。 -->
<span id="ui-adapter-架构"></span>
