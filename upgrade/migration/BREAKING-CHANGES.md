# 不兼容变化与迁移记录

当前状态：已开始记录 P002 实施的不兼容 Schema 类型命名调整。

本文件只记录用户可观察的 API、类型或行为变化，不重复 Git diff。每项变化必须包含影响、迁移方式、兼容策略和计划移除版本。

## 记录模板

```md
## 变化名称

阶段：P00X
状态：计划中 / 已实施
影响版本：待定

### 以前

旧用法或旧行为。

### 现在

新用法或新行为。

### 影响

哪些用户、Schema、类型或运行时行为会受影响。

### 迁移

可执行的迁移步骤和代码示例。

### 兼容策略

兼容入口、警告方式和计划移除版本。
```

## 已知潜在变化

以下项目只是计划风险，不代表已经实施；进入对应阶段后必须给出最终方案。

- 安装配置可能从 `components` 同时承担底层替换和自定义注册，调整为 `adapter` 与用户组件注册分离。
- `InputNumber`、`TextArea`、`TimePicker` 等纯 UI Schema 类型的解析来源将从 Core 包装改为 Adapter 或自动导入。
- 公开 Schema Props 将从直接继承 AntDV 类型改为稳定通用类型加 Adapter 扩展类型。
- `registerFormComponents`、`registerComponent`、`Ext` 前缀等兼容 API 可能进入废弃流程。
- UI 默认属性的配置归属和索引名称可能调整。

## UI 组件 Schema 类型使用真实组件名

阶段：P002
状态：已实施
影响版本：下一大版本

### 以前

部分 Schema 类型使用 SuperForm 别名：

```text
Textarea
DateRange
TimeRange
Radio
Checkbox
```

### 现在

UI 组件型 Schema 类型必须与当前 UI 库的实际组件名一致：

```text
TextArea
DateRangePicker
TimeRangePicker
RadioGroup
CheckboxGroup
```

### 影响

使用以上旧类型名的 Schema、类型标注和动态 Schema 数据需要同步修改。范围字段的 `endField` 仍然有效。

### 迁移

按以下关系直接替换：

```text
Textarea  → TextArea
DateRange → DateRangePicker
TimeRange → TimeRangePicker
Radio     → RadioGroup
Checkbox  → CheckboxGroup
```

`Radio` 和 `Checkbox` 仍可作为 UI 库中真实存在的单控件名称使用，但不再承载原有的分组选项增强；需要 `options` 和标签同步时必须改用 `RadioGroup`、`CheckboxGroup`。

### 兼容策略

不保留旧名称兼容。项目已经开放 UI 组件库自由绑定，保留与实际组件不一致的别名会破坏跨 UI 框架的一致解析规则。

## 安装时必须显式传入 Adapter

阶段：P001 回补
状态：已实施
影响版本：下一大版本

### 以前

省略安装配置时会隐式使用 AntDV Adapter，并且重复安装可以切换当前 Adapter。

```ts
app.use(superForm)
```

### 现在

安装时必须显式传入 Adapter，首次初始化后不能切换为其他 Adapter。

```ts
import superForm, { antdvAdapter } from 'antdv-superform'

app.use(superForm, { adapter: antdvAdapter })
```

### 影响

所有省略 `adapter` 的应用安装代码都需要调整。运行期间依赖重新安装插件切换 UI 框架的代码将明确报错。

### 迁移

根据项目实际使用的 UI 框架导入对应 Adapter，并在 `app.use` 初始化配置中显式传入。

### 兼容策略

不保留隐式默认 Adapter，也不提供运行时切换兼容入口。同一 Adapter 实例的重复安装仍允许执行。

## RadioGroup 不再推断 UI 专属属性

阶段：P002 审查回补
状态：已实施
影响版本：下一大版本

### 以前

`RadioGroup` 会自动把 Schema 字段名传为 UI 组件的 `name`，并在设置 `buttonStyle` 时自动补充 `optionType: 'button'`。

### 现在

Core 不再生成这两个 UI 专属属性。需要按钮样式或原生名称时，通过当前 UI 组件 attrs 明确传入：

```ts
{
  type: 'RadioGroup',
  field: 'status',
  attrs: {
    name: 'status',
    optionType: 'button',
    buttonStyle: 'solid',
  },
}
```

### 影响

只配置 `buttonStyle` 的 AntDV Schema 不再自动切换为按钮模式；依赖自动生成 DOM `name` 的代码需要显式配置。

### 迁移

按实际需要显式增加 `attrs.optionType` 或 `attrs.name`。不依赖这两项行为的 Schema 无需修改。

### 兼容策略

不保留自动推断和自动注入逻辑，避免 Core 为特定 UI 框架维护隐式规则。

## 复合组件不再复制内部 UI 属性

阶段：P003 审查回补
状态：已实施
影响版本：下一大版本

### 以前

- TagInput 和 TagSelect 会把未声明 attrs 复制到每一个 Tag/CheckableTag。
- TagInput、TagSelect 仍接受 `valueToString` 旧别名。
- ButtonItem 的 `color` 会拼接为 `ant-btn-*` class。
- Collections 和 Group 会把同一份 attrs 扩散到 Row、section 和嵌套内容。

### 现在

- TagInput、TagSelect 只接收自身声明的业务属性，不开放内部 Tag 的任意属性透传。
- 字符串存储统一使用 `stringifyValue`。
- ButtonGroup 不再解释 `color`，按钮 UI 属性仍可通过 `item.attrs` 直接传给当前 UI 组件。
- 容器属性只作用于其明确目标，不再跨布局层级复制。

### 影响

依赖 Tag 上的自定义 class/style/DOM 事件、按钮 `color` 生成 class、`valueToString`，或依赖容器 attrs 同时修改多个内部节点的代码需要调整。

### 迁移

- 将 `valueToString` 改为 `stringifyValue`。
- 按钮颜色或状态使用当前 UI 组件支持的 `item.attrs`。
- 布局使用既有 `rowProps`、`colProps`、`contentAttrs` 等对应配置；不再依赖 attrs 隐式下沉。

### 兼容策略

不保留内部节点任意透传和 AntDV class 拼接兼容，以避免复合组件继续暴露不稳定的 UI 实现细节。

## Action/Presentation Adapter 改为语义渲染接口

阶段：P003 审查回补
状态：已实施
影响版本：下一大版本

### 以前

- Action Adapter 公开 Button、Tooltip、Dropdown、Menu、MenuItem、Divider 的组件映射和 popup slot 名称。
- Presentation Adapter 公开 Tag、CheckableTag 的组件映射。
- Core 直接拼装上述 UI 原语，并处理 AntDV `domEvent`、`checked/onChange`、`closable/onClose` 等协议。

### 现在

- Action Adapter 只实现 `render('group' | 'tooltip', props, slots)`。
- Presentation Adapter 只实现 `render('tag' | 'checkableTag', props, slots)`。
- Core 传递业务视图模型，具体组件树、slot 和事件映射由 Adapter 完成。
- ButtonGroup 折叠菜单只保留标签、图标、禁用和点击行为，不再把按钮 Tooltip 与任意 `item.attrs` 复制到菜单项。

### 影响

自行实现 UI Adapter 时，需要将原有 `components/slots` 配置改为语义 `render` 实现。此前短期导出的 `resolveUIActionComponent`、`getUIActionSlot`、`resolveUIPresentationComponent` 不再提供。

### 兼容策略

这些 API 属于升级分支中的过渡设计，不保留兼容层；粗粒度接口可避免 Core 固化某个 UI 库的内部组件树。

## 容器内部样式改用 Core 语义 class

阶段：P003 审查回补
状态：已实施
影响版本：下一大版本

### 以前

Collapse 标题、轻量 List 内容和操作区复用了 `.ant-descriptions-header`、`.ant-list-item-meta`、`.ant-list-item-action`，按钮分隔线使用无命名空间的 `.buttons-divider`；`SuperList` 还暴露在公共基础组件覆盖表中。

### 现在

- Collapse 标题使用 `.sup-titlebar.sup-title`。
- List 内容和操作区分别使用 `.sup-list-item-content`、`.sup-list-item-actions`。
- 按钮分隔线使用 `.sup-buttons-divider`。
- `SuperList/SuperListItem` 是 AntDV Adapter 私有兼容实现，不再作为公共基础组件覆盖项。

### 迁移

如有针对旧内部 class 的样式覆盖，请改用对应的 `sup-*` 语义 class。不要再通过安装配置覆盖 `SuperList/SuperListItem`；需要替换完整列表渲染时，应实现 Adapter 的 `list/listItem` Container capability。

## 构建插件仅保留 Vite

阶段：P004
状态：已实施
影响版本：下一大版本

### 以前

包同时导出：

- `antdv-superform/unplugin/vite`
- `antdv-superform/unplugin/rollup`
- `antdv-superform/unplugin/webpack`

### 现在

只保留 `antdv-superform/unplugin/vite`。Rollup、Webpack 插件入口和相关声明不再发布。

### 迁移

Vite 项目无需修改。直接使用 Rollup 或 Webpack 的项目需要自行接入 Schema 组件注册，或迁移到 Vite 构建入口；本次不保留兼容代理包。
