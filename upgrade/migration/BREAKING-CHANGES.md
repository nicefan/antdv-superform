# 不兼容变化与迁移记录

> 升级已完成，本文保留为历史记录。最终架构统一见 [架构总览](../ARCHITECTURE.md)，后续改造进入 [独立任务](../../tasks/README.md)，人工确认完成后再同步正式文档。

当前状态：P010 已按消费场景完成汇总。

本文件只记录用户可观察的 API、类型或行为变化，不重复 Git diff。每项变化必须包含影响、迁移方式和兼容策略；直接移除时明确记录不保留兼容即可。

## 从旧版本升级

按以下顺序迁移，可以避免包入口、组件注册和 Schema 名称同时变化时难以定位问题：

1. 选择一个官方产品包。AntDV 项目安装 `superform-antdv`、`antdv-next`；Element Plus 项目安装 `superform-element-plus`、`element-plus`。业务运行时不再额外导入 Core `superform`。
2. 将所有公共 API 改为从所选产品包导入，删除 `app.use(superForm, options)` 和官方包场景下的 `useAdapter(antdvAdapter)`；在应用挂载前调用 `superForm.initialize()`，把旧安装配置中的全局行为移到 `configure()`。
3. 选择字段组件来源。Vite 项目优先使用产品包 `/unplugin`；不用插件时在 `initialize({ components })` 中手动提供字段，或从 `/components` 导入 `fieldComponents` 全量登记。
4. 将业务组件迁到 `registerComponent(s)`，删除 `Ext` 前缀、`registComponent`、`registerFormComponents` 和 `configureComponents`。业务组件不能覆盖 Core 或 Adapter 字段。
5. 按“UI 组件 Schema 类型使用真实组件名”替换旧字段别名；Element Plus 使用去掉 `El` 前缀的字段名。把 Radio/Checkbox 的组选项场景改为 `RadioGroup`/`CheckboxGroup`。
6. 按本文件后续各节处理表单初始值、Table 查询与 CRUD、Upload、Modal、布局属性和按钮配置。删除的 UI 专属透传没有兼容层，必须按当前 Adapter Props 或业务组件重新表达。
7. 运行类型检查和生产构建。构建插件只支持 Vite；Rollup、Webpack 入口已经删除。动态 Schema 无法扫描时通过插件 `types` 显式声明字段名。

第三方 UI Adapter 不使用官方产品初始化入口：安装独立 `superform`，通过 `superform/sdk` 定义 Adapter，并在渲染前调用 `superForm.useAdapter(customAdapter)`。

## 移除 customIcon 全局图标注册表

阶段：P003 回补
状态：已实施
影响版本：下一大版本

### 以前

可通过 `configure()` 为字符串图标注册全局解析函数：

```ts
superform.configure({
  customIcon: (name) => iconRegistry[name]?.(),
})
```

### 现在

`customIcon` 和 `IconAdapterContext` 已移除。业务图标直接作为 Schema 或按钮的 `icon` 传入组件或节点；Core 内置交互继续由 Adapter 的语义图标提供。

### 影响

依赖字符串名称映射业务图标的配置、类型声明和第三方 Adapter 实现需要修改。字符串图标不再调用宿主项目注册表。

### 迁移

```ts
import { DownloadOutlined } from '@antdv-next/icons'

const actions = {
  export: { label: '导出', icon: DownloadOutlined, onClick: exportCurrentData },
}
```

第三方 Adapter 将 `icons.render(icon, context)` 改为 `icons.render(icon)`，并自行处理它支持的组件或节点。

### 兼容策略

不保留全局注册表兼容。该入口只在 AntDV Adapter 中生效，无法形成跨 Adapter 的一致图标协议。

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

是否保留兼容；不保留时说明直接移除的原因。
```

## 项目组件注册与自动导入来源分离

阶段：P005
状态：已实施
影响版本：下一大版本

### 以前

- `components` 同时承担项目组件注册和 AntDV 底层组件替换。
- `registerComponent`、`registComponent`、`registerFormComponents` 和 `configureComponents` 可以从不同入口修改同一份注册状态。
- `registerComponent('UserPicker', component)` 同时生成 `UserPicker` 和 `ExtUserPicker`，旧组件还能收到 `option`、`model`、`effectData` 等 Core 内部参数。
- Vite 自动导入组件与项目显式组件都记录为 `custom` 来源。

### 现在

- `superform.registerComponent(s)` 只注册项目 Schema 组件，注册名就是 `schema.type`。
- Vite 自动导入组件进入独立 `auto` 来源；Core、增强、`custom`、`auto` 按 ADR-0002 的优先级解析。
- 项目组件和自动导入组件只接收合并后的字段属性及声明的 model 绑定，不注入 `option`、`model`、`effectData`。
- Vite 插件排除 Core 和增强类型；动态 Schema 继续使用 `types`，非默认 model 使用 resolver 的 `model`，多应用配置可用 `virtualId` 隔离虚拟模块。

### 影响

依赖旧注册方法、`Ext` 前缀、安装配置覆盖 Adapter 底层组件，或直接读取 Core 内部参数的项目组件需要迁移。把 `Table`、`Input` 等保留名称放入 `components` 会明确报错。

### 迁移

```ts
superform.registerComponents({
  UserPicker,
  MarkdownEditor: {
    component: MarkdownEditor,
    model: { prop: 'modelValue', event: 'update:modelValue' },
  },
})
```

Schema 直接使用 `type: 'UserPicker'` 或 `type: 'MarkdownEditor'`。需要替换 UI 框架组件时修改或实现 Adapter，不再放入 `components`。

### 兼容策略

旧注册方法、底层覆盖和 `Ext` 前缀解析直接移除，不提供废弃期或双路径。分离来源可以保证增强处理器不会被项目注册或自动导入意外绕过。

### Adapter 字段组件改为按需注册

Adapter 现在只直接引入 Form、布局、容器、Action、Presentation 等 Core 固定 UI 原语。Input、Select、Switch、Rate 等 Schema 字段由 Adapter 声明支持和适配协议，但实际组件必须通过 Vite 插件自动导入，或由 Adapter 工厂显式提供：

```ts
import superform from 'superform-antdv'
import { Input, Rate, Select } from 'antdv-next'

superform.initialize({ components: { Input, Select, Rate } })
```

Vite 用户可从 `superform-antdv/unplugin` 或 `superform-element-plus/unplugin` 使用对应 resolver。即使已使用自动导入，也仍需在渲染前调用无参 `initialize()` 初始化 Adapter。Adapter 已声明但未注册的字段会在运行时明确报错。项目自定义组件改用 `superform.registerComponent(s)`。

需要快速全量引入时，从产品包的 `/components` 子路径导入统一命名的字段表：

```ts
import superform from 'superform-element-plus'
import { fieldComponents } from 'superform-element-plus/components'

superform.initialize({ components: fieldComponents })
```

Element Plus Schema 名称不携带组件库导出的 `El` 前缀，例如 `ElInput`、`ElInputNumber`、`ElCascader`、`ElRate` 分别使用 `Input`、`InputNumber`、`Cascader`、`Rate`。

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

## 官方 UI 包直接提供完整 SuperForm

阶段：P001 回补
状态：已调整
影响版本：下一大版本

### 以前

省略安装配置时会隐式使用 AntDV Adapter，并且重复安装可以切换当前 Adapter。

```ts
app.use(superForm)
```

### 现在

官方 UI 实现已拆成独立产品包，并把 Core 打入各自构建结果。应用只导入所选产品包，不再单独安装 Core；包导入不会立即绑定 Adapter，需在渲染前显式调用 `initialize()`，也不通过 Vue `app.use()` 承担初始化职责。

```ts
import superform from 'superform-antdv'

superform.initialize()
superform.configure({ defaultProps, dictApi })
superform.registerComponents({ UserSelect })
```

### 影响

应用只安装 `superform-antdv` 或 `superform-element-plus`。原 `app.use(superForm, options)` 需拆为产品包导入、`initialize`、`configure` 和按需的 `registerComponent(s)`；同一应用不能混用两个官方产品包。

### 迁移

根据项目实际使用的 UI 框架安装并导入对应产品包。未使用自动导入插件时，在 `initialize({ components })` 中手动提供字段组件，或从产品包的 `/components` 子路径导入 `fieldComponents`。第三方 Adapter 开发者仍可依赖 `superform/sdk`，使用独立 Core 的 `useAdapter(customAdapter)`。

### 兼容策略

不保留同时安装 Core 与官方 Adapter 的旧组合用法，也不支持两个官方产品包共存或运行时切换。

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

## Form、Field 与 Layout 公共类型分层

阶段：P004
状态：已实施
影响版本：下一大版本

### 以前

`exaTypes.d.ts` 直接继承 AntDV 的 Form、FormItem、Row、Col、Space 和各普通输入组件 Props，并单独导出 `ExtInputOption`、`ExtTreeOption` 等 UI 名称类型。

### 现在

- Core 导出 `FormSchemaProps`、`FormItemSchemaProps`、`LayoutRowProps`、`LayoutColProps` 和 `LayoutSpaceProps` 稳定类型。
- AntDV Adapter 通过 `UIContainerComponentProps`、`UIFormComponentProps` 和 `UIFormComponentOptionExtensions` 预声明它支持的真实组件 Props 与 Core 增强配置。
- 类型目录只影响类型提示；Vite 插件仍只导入 Schema 实际使用的普通 UI 组件。

### 影响

AntDV 用户的 Form、Layout 和普通字段 `attrs` 提示保持，但直接导入 `ExtInputOption` 或 `ExtTreeOption` 的代码需要更换类型写法。Adapter 实现者需要显式声明支持的字段类型目录。

### 迁移

```ts
type InputOption = OptionType['Input']
type TreeSelectOption = OptionType['TreeSelect']
```

新 Adapter 通过 `SuperFormTypeRegistry` 声明合并注册 UI Props；需要 Select、Range 等 SuperForm 增强时，同时映射对应的 `SelectFieldOption`、`RangeFieldOption` 等稳定类型。

### 兼容策略

不保留 `ExtInputOption`、`ExtTreeOption` 别名或新旧双路径。组件实际 Props 始终以当前 Adapter 类型目录为准。

## Container 与 Action 公共类型收缩

阶段：P004
状态：已实施
影响版本：下一大版本

### 以前

Descriptions 和 Table Tabs 分别继承完整 `DescriptionsProps` 和 `TabsProps`；Button、Tooltip、Dropdown 类型也由 Core 直接引用 AntDV Props。Tabs 根配置声明了实际未传给 UI 组件的 `attrs` 和 `forceRender`。

### 现在

- Descriptions 只声明布局、展示模式和标签样式等实际消费的稳定属性。
- Tabs 根只保留受控状态、按钮和子项；`forceRender` 放在具体 Tab 子项的 `attrs` 中。
- Button、Tooltip 和 Dropdown Props 由 Adapter 的 `UIActionComponentProps` 类型目录提供。

### 影响与迁移

- 删除 Descriptions 的 `labelBgColor` 和 `borderColor`；改用项目主题或 `--descriptions-bg-color` / `--descriptions-border-color` CSS 变量。
- Tabs 根节点的 `attrs` 与 `forceRender` 原本没有传到底层 Tabs，现在直接移除；需要预渲染时将 `forceRender` 放到对应 Tab 子项 `attrs`。

### 兼容策略

不保留无效透传或已废弃颜色属性；Action 的有效 UI Props 仍由当前 Adapter 完整提供。

## 安装配置与 Adapter 运行时导出收缩

阶段：P004
状态：已实施
影响版本：下一大版本

### 以前

`InstallConfig.locale` 直接使用 AntDV `Locale`，但注入后没有任何组件消费。包根同时导出了 `getUI*`、`renderUI*`、`resolveUI*`、`mapUI*` 和表单实例桥接函数。

### 现在

- `configure` 只保留 Core 全局配置和 `defaultProps`；`defaultProps` 使用框架无关的 `AdapterDefaultProps`。官方产品包通过 `initialize` 显式绑定 Adapter，项目组件继续使用 `registerComponent(s)`。
- Core 包只导出 `defineUIAdapter` 和 Adapter capability 类型。具体 Adapter 使用独立 npm 包与构建产物；Core 调用的渲染、解析、映射与实例函数仍保留在内部模块，不再构成公开 API。

### 影响与迁移

- 移除安装配置中的 `locale`。AntDV 项目应在 `ConfigProvider` 中设置 locale，其他 UI 框架使用各自的全局化入口。
- 如果业务代码曾从包根调用上述底层函数，应改为实现 `UIAdapter` capability，由 SuperForm Core 调用。
- 官方产品应用不再直接操作 Adapter 实例；分别从 `superform-antdv` 或 `superform-element-plus` 导入产品实例并调用 `initialize()`。只有独立 Core、第三方组合或 Adapter 测试才使用 `useAdapter()`。

### 兼容策略

不保留无消费者的 locale 注入或底层运行时函数代理。

## Modal、Table 与 Upload 公共类型分层

阶段：P004
状态：已实施
影响版本：下一大版本

### 以前

公共 Schema 直接引用 AntDV 的 `ModalProps`、`ModalFuncProps`、`TableProps`、`TableColumnType`、`PaginationProps` 和 `UploadProps`；表格动作的 `meta` 也被错误标注为弹窗属性。

### 现在

- Core 分别导出 `ModalSchemaProps`、`TableSchemaProps`、`TablePaginationSchemaProps` 和 `UploadSchemaProps`，只描述自身消费的业务属性。
- AntDV Adapter 通过 `UIModalComponentProps`、`UITableComponentProps` 和 `UIUploadComponentProps` 提供完整 UI 属性提示。
- 表格动作 `meta` 恢复为普通业务对象，不再错误绑定 AntDV 弹窗类型。

### 影响与迁移

AntDV 项目的现有 Schema 属性仍从内置 Adapter 获得提示。自定义 Adapter 需要按实际支持范围补充上述三个类型目录；不要再依赖 Core 类型隐式携带 AntDV 类型。

```ts
declare global {
  namespace SuperFormTypeRegistry {
    interface UITableComponentProps {
      Table: MyTableProps
      Column: MyTableColumnProps
      Pagination: MyPaginationProps
    }

    interface UIModalComponentProps {
      Modal: MyModalProps
    }

    interface UIUploadComponentProps {
      Upload: MyUploadProps
    }
  }
}
```

### 兼容策略

不保留 AntDV 类型别名或双路径。此次只调整公共类型边界，Modal、Table、Upload 的运行时迁移分别在 P006、P007 完成。
## P006：复杂 UI capability

- 第三方 Adapter 如果需要表单错误提示、按钮确认、命令式弹窗或 Upload，需要实现 `services`、`modal`、`upload` 和 `preview` capability。
- Modal 的 Core 受控协议固定为 `visible/onUpdate:visible`；具体 UI 框架的 `open`、`modelValue` 及关闭事件由 Adapter 转换。
- Upload 的 `LIST_IGNORE`、组件事件、预览组件和上传图标不再由 Core 假定为 AntDV 协议。
- `src/compat/icons.ts` 与 `src/compat/antdv.ts` 均已删除。

## P007：Table capability 与最终 UI 解耦

- Core Table 统一使用 `data`、`columns`、`selection`、`pagination`、`expandedKeys` 和更新回调协议。
- AntDV 的 `dataSource/rowSelection/expandedRowKeys` 与 Element Plus 的列、选择、展开和分页事件均由各自 Adapter 映射。
- Core 不再包含具体 UI 框架导入、私有 class 或 compat；AntDV 专属样式迁入 `superform-antdv`。
- 第三方 Adapter 若提供 SuperTable，需要实现 `table.render`、`table.renderFilter` 和自动高度所需的选择器声明。

## 2026-09-16 接受的补充变化

- 图标统一为 () => VNodeChild，旧字符串和组件对象需改写渲染函数。七个默认动作无需再配置图标。移除图标库直接依赖不代表 UI 框架不再传递依赖图标包。
- 第三方 Adapter 的 Icon 仅配置 semantic 渲染函数；复合字段局部校验实现 FormAdapter.validateField(instance, path)。旧 render 转发协议不保留。
- useTable 的 query/reload/goPage 等异步方法等待注册并返回结果；确保对应组件挂载。
- SuperDetail 支持整体替换 schema，显式 dataSource 优先，无 subItems 时清空旧模型。
- InputGroup 保留行级及子字段规则，局部校验只作用于该路径。行按钮模型不携带 propChain。
- 表格编辑保持源记录和模型身份，删除未匹配的记录时跳过。

完成依据与未执行的回归范围见 [更新归档](../status/ACCEPTED-2026-09-16.md)。
