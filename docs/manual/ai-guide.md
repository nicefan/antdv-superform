# AI 编码指引

组件包内置 `AI_GUIDE.md`，它是面向 AI 编码工具的现行公开 API 约束，包含默认值、组件类型、接口签名和生成后检查。业务项目应让 AI 先读本地安装版本，而不是凭历史代码猜用法。

## 初始化项目指令

```bash
npx antdv-superform init-ai
```

命令会检测并更新已有的 AGENTS.md、CLAUDE.md、GEMINI.md、Copilot 或 Cursor 指令入口。

安全规则：

- 不覆盖既有项目约束，只维护组件库自己的标记区。
- 没有检测到入口时不创建文件，而是输出可手工添加的提示词。
- 标记不完整时拒绝改写，避免破坏文件。
- 检测到 Cursor rules 目录时创建独立规则文件。
- 重复执行保持幂等。

## 建议补充的项目事实

```md
- 项目统一通过 src/plugins/super-form.ts 安装，不在页面重复配置 dictApi。
- 分页请求字段是 pageNum/pageSize，响应为 data.list/data.total。
- 业务主键来自接口类型，禁止根据 label 猜字段。
- 可用扩展字段：ExtUserPicker、ExtOrgTree。
- Upload 默认接口和最大文件大小已全局配置。
```

这些事实比“请写一个表格”更能约束生成结果。

## 公共导出

```ts
import {
  SuperForm,
  useForm,
  defineForm,
  SuperTable,
  useTable,
  defineTable,
  SuperDetail,
  useDetail,
  defineDetail,
  createModal,
  useModal,
  useModalForm,
  SuperButtons,
  useButtons,
  diagnoseSchema,
} from "antdv-superform";
```

默认导出是插件对象，提供 `install`、`registerComponent`、`setDefaultProps`。类型也从包根导入。

## 生成 Schema 的顺序

1. 确认页面场景：Form、Table、Detail 或 ModalForm。
2. 从业务接口类型确定 `field`、rowKey 和请求参数。
3. 选择字段/数组容器，不虚构内置 type。
4. 复用项目字典、权限、上传和默认配置。
5. 只添加覆盖默认行为所需的 attrs。
6. 为关联值明确 `labelField`、`endField`、`vModelFields`。
7. 用诊断工具和 TypeScript 检查。

```ts
// 推荐：意图明确，无冗余默认
{
  type: 'Input',
  field: 'name',
  label: '名称',
  required: true,
}

// 不推荐：重复默认或无内容
{
  type: 'Input',
  field: 'name',
  label: '名称',
  attrs: { placeholder: '请输入名称' },
  options: [],
  hidden: false,
}
```

## exaTypes 属性覆盖导航

下面按 `src/exaTypes.d.ts` 的声明归属列出全部 Schema 相关属性。外部继承的 Ant Design Vue Props 不在本文件逐项展开，统一通过 `attrs` 进入对应底层组件。

### ExtBaseOption / ExtRow

| 属性组                                             | 文档                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| `type`、`field`、`initialValue`、`vModelFields`    | [Schema 与数据模型](/manual/schema#字段与数据路径)               |
| `label`、`labelSlot`、`tooltip`                    | [展示与辅助](/manual/fields/display#字段标签与提示)              |
| `rules`、`required`                                | [校验机制](/manual/validation)                                   |
| `attrs`、`dynamicAttrs`                            | [响应式与联动](/manual/reactivity#dynamicattrs-计算底层组件属性) |
| `hidden`、`disabled`、`computed`、`onUpdate`       | [响应式与联动](/manual/reactivity#字段状态与联动)                |
| `exclude`                                          | [Schema 场景](/manual/schema#一份字段-多种页面场景)              |
| `on`、`onXxx`                                      | [事件与上下文](/manual/reactivity#两种事件写法)                  |
| `colProps`、`span`、`block`、`breakAfter`、`align` | [布局与结构](/manual/layout)                                     |
| `slots`、`viewRender`                              | [渲染与插槽](/manual/rendering)                                  |
| `rowProps`、`subSpan`、`gutter`                    | [布局与结构](/manual/layout#自动栅格分组)                        |

### 详情、分组与表单

| 类型                    | 直接声明属性                                                                                               | 详细页面                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `ExtDescriptionsProps`  | `mode`、`wrapperCol`、`labelCol`、`labelAlign`、`tableLayout`、`noInput`、`span`                           | [SuperDetail](/manual/super-detail#extdescriptionsprops-细节) |
| `ExtGroupBaseOption`    | `title`、`buttons`、`subItems`、`descriptionsProps`                                                        | [布局容器](/manual/fields/containers#group)                   |
| `ExtGroupOption`        | `component`、`ignoreTableTitle`、`contentAttrs`                                                            | [布局容器](/manual/fields/containers#group)                   |
| `ExtDescriptionsOption` | `title`、`dataSource`、`buttons`、`mode`、`attrs`、`isContainer`、`subItems`                               | [Descriptions](/manual/fields/containers#descriptions)        |
| `ExtFormOption`         | `dataSource`、`attrs`、`isContainer`、`compact`、`ignoreRules`、`subItems`、`buttons`、`descriptionsProps` | [SuperForm](/manual/super-form#根-schema-属性)                |

### 按钮

| 类型             | 直接声明属性                                                                                                                                                                                                          | 详细页面                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `ButtonItem`     | `label`、`name`、`customRender`、`confirmText`、`roleName`、`unauthorized`、`color`、`visibleIn`、`dropdown`、`tooltip`、`disabledTooltip`、`icon`、`attrs`、`hidden`、`disabled`、`meta`、`onClick`                  | [单个按钮](/manual/super-buttons#单个-buttonitem-全部属性) |
| `ExtButtonGroup` | `attrs`、`limit`、`buttonType`、`buttonShape`、`size`、`align`、`visibleIn`、`placement`、`divider`、`labelMode`、`moreLabel`、`unauthorized`、`hidden`、`disabled`、`targetSlot`、`methods`、`effectData`、`actions` | [按钮组属性](/manual/super-buttons#按钮组全部属性)         |

### Table、SuperTable 与标签筛选

| 类型              | 直接声明属性                                                                                                                                                    | 详细页面                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `TableApis`       | `query`、`info`、`save`、`update`、`delete`                                                                                                                     | [接口与数据适配](/manual/backend-contracts)             |
| `TabsHeader`      | `field`、`initialValue`、`bordered`、`options`、`dictName`、`labelAsValue`、`activeKey`、`slots`、`customTab`                                                   | [SuperTable tabs](/manual/super-table#tabs-标签筛选)      |
| `ExtColumnsItem`  | `viewRender`、`columnProps`                                                                                                                                     | [Table 列](/manual/fields/collections#列-extcolumnsitem)  |
| `ExtTableOption`  | `field`、`title`、`attrs`、`editable`、`rowEditor`、`columns`、`tabs`、`columnProps`、`indexColumn`、`buttons`、`rowButtons`、`modalProps`、`descriptionsProps` | [Table 容器](/manual/fields/collections#table-数组容器)   |
| `rowEditor`       | `editMode`、`addMode`、`form`、`modalProps`、`onSave`、`onCancel`                                                                                               | [四种编辑方式](/manual/fields/collections#四种编辑方式)   |
| `TableScanHight`  | `maxHeight`、`isScanHeight`、`resizeHeightOffset`、`isFixedHeight`、`inheritHeight`                                                                             | [SuperTable 高度](/manual/super-table#页面容器与高度策略) |
| `RootTableOption` | `isContainer`、`apis`、`dataSource`、`params`、`immediate`、`beforeQuery`、`afterQuery`、`onLoaded`、`searchForm`、`pagination`、`attrs`                        | [SuperTable](/manual/super-table#根配置总览)              |
| `searchForm`      | `subItems`、`searchOnChange`、`teleport`、`limit` 及 Form 属性                                                                                                  | [搜索表单](/manual/super-table#搜索表单)                  |

### 数组容器

| 类型                  | 直接声明属性                                                                       | 详细页面                                             |
| --------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `ExtListOption`       | `field`、`title`、`attrs`、`buttons`、`columns`、`rowButtons`、`descriptionsProps` | [List](/manual/fields/collections#list)              |
| `ExtListGroupOption`  | `field`、`attrs.labelIndex`、`attrs.rowKey`、`rowButtons`、`columns`               | [ListGroup](/manual/fields/collections#listgroup)    |
| `ExtInputList`        | `title`、`attrs.labelIndex`、`rowButtons`、`columns` 及 FormItem 属性              | [InputList](/manual/fields/collections#inputlist)    |
| `ExtInputGroupOption` | `subItems` 及 Row 属性                                                             | [InputGroup](/manual/fields/basic-inputs#inputgroup) |

### Tabs 与 Collapse 容器

| 类型                | 直接声明属性                                                    | 详细页面                                              |
| ------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| `ExtTabsOption`     | `activeKey`、`buttons`、`subItems`                              | [Tabs](/manual/fields/containers#tabs)                |
| `ExtTabItem`        | `label`、`key`、`icon`、`subItems` 及 GroupBase 属性            | [页签项](/manual/fields/containers#页签项-exttabitem) |
| `ExtCollapseOption` | `title`、`activeKey`、`subItems`                                | [Collapse](/manual/fields/containers#collapse)        |
| `CollapseItem`      | `label`、`key`、`icon`、`subItems`、`buttons` 及 GroupBase 属性 | [Collapse](/manual/fields/containers#collapse)        |

### 通用字段与输入字段

| 类型                    | 直接声明属性                                                                         | 详细页面                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `ExtFormItemOption`     | `value`、`labelField`、`tagViewer`、`formItemProps`、`descriptionsProps`、`editable` | [数据绑定](/manual/schema#字段级-ref)、[展示辅助](/manual/fields/display) |
| `ExtInputOption`        | `onSearch`、`attrs: InputProps`                                                      | [Input](/manual/fields/basic-inputs#input)                                |
| `ExtAutoCompleteOption` | `options`、`dictName`、`attrs: AutoCompleteProps`                                    | [AutoComplete](/manual/fields/basic-inputs#autocomplete)                  |
| `ExtSlotOption`         | `render`                                                                             | [InputSlot / InfoSlot](/manual/fields/display#inputslot)                  |

### 选择字段

| 类型                       | 直接声明属性                                                                 | 详细页面                                                    |
| -------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `DefaultOptionType`        | `label`、`value`、`children`、`disabled` 及业务扩展字段                      | [options 格式](/manual/fields/selections#通用-options-格式) |
| `ExtSelect`                | `options`、`dictName`、`valueToNumber`、`labelAsValue`、`stringifyValue`     | [通用值转换](/manual/fields/selections#通用值转换属性)      |
| `ExtSelectOption`          | `attrs: SelectProps`                                                         | [Select](/manual/fields/selections#select)                  |
| `ExtTagSelectOption.attrs` | `multiple`、`stringifyValue`                                                 | [TagSelect](/manual/fields/selections#tagselect)            |
| `ExtTagInputOption.attrs`  | `stringifyValue`、`newLabel`、`closable`                                     | [TagInput](/manual/fields/basic-inputs#taginput)            |
| `ExtTreeOption`            | `labelField`、`attrs: TreeSelectProps`、`treeData`                           | [TreeSelect](/manual/fields/selections#treeselect)          |
| `ExtSwitchOption`          | `valueLabels`、`attrs.firstIsChecked`、`attrs.defaultChecked` 及 SwitchProps | [Switch](/manual/fields/selections#switch)                  |
| `ExtRadioOption`           | `attrs: RadioGroupProps` 及 ExtSelect                                        | [Radio / Checkbox](/manual/fields/selections#radio)         |

### 日期范围与 Upload

| 类型                     | 直接声明属性                                                                                                                                | 详细页面                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `ExtDateRange`           | `endField`、`stringifyValue`                                                                                                                | [范围值模式](/manual/fields/date-time#daterange-的三种值模式) |
| `ExtUpload.vModelFields` | `fileList`                                                                                                                                  | [Upload 字段值](/manual/fields/upload#字段值形态)             |
| `ExtUpload.attrs.apis`   | `upload`、`delete`、`download`                                                                                                              | [Upload 接口](/manual/fields/upload#apis-契约)                |
| `ExtUpload.attrs`        | `infoNames`、`valueKey`、`minSize`、`maxSize`、`isSingle`、`hideOnMax`、`uploadMode`、`tip`、`title`、`repeatable`、`isView` 及 UploadProps | [文件上传](/manual/fields/upload)                             |

### 类型注册表与内部模型声明

`WrapperTypes` 声明 `InfoSlot`、`Form`、`Group`、`Fragment`、`Card`、`List`、`ListGroup`、`Tabs`、`Table`、`Collapse`、`Descriptions`；`WidgetTypes` 声明 `Buttons`、`Hidden`、`InputSlot`、`InfoSlot`、`Text`、`HTML`、`Textarea`、`Input`、`AutoComplete`、`InputNumber`、`DatePicker`、`TimePicker`、`DateRange`、`TimeRange`、`Select`、`TreeSelect`、`Radio`、`Checkbox`、`Switch`、`Upload`、`InputGroup`、`InputList`、`TagInput`、`TagSelect`。

`ModelData`、`ModelDataGroup`、`ModelChildren` 是内部建模类型，不是 Schema 配置。其声明属性 `refData`、`refName`、`parent`、`index`、`initialValue`、`fieldName`、`propChain`、`rules`、`children`、`listData`、`modelsMap` 用于组件库内部模型图；业务回调只使用公开的 effectData，不应直接构造这些对象。

## 废弃属性迁移

| 旧属性/API                | 现行写法                                   |
| ------------------------- | ------------------------------------------ |
| `hideInTable`             | `exclude: ['table']`                       |
| `hideInForm`              | `exclude: ['form']`                        |
| `hideInDescription`       | `exclude: ['description']`                 |
| `blocked`                 | `block`                                    |
| `wrapping`                | `breakAfter`                               |
| `valueToLabel`            | `labelAsValue`                             |
| `valueToString`           | `stringifyValue`                           |
| TreeSelect `data`         | `treeData`                                 |
| DateRange `keepField`     | `endField`                                 |
| `validOn`                 | `visibleIn`                                |
| `invalidDisabled`         | `unauthorized: 'disable'`                  |
| `roleMode`                | `unauthorized`                             |
| `forSlot`                 | `targetSlot`                               |
| 表格 `edit`               | `editable` 或 `rowEditor`                  |
| 根 `editMode` / `addMode` | `rowEditor.editMode` / `rowEditor.addMode` |
| `editForm`                | `rowEditor.form`                           |
| `searchSchema`            | `searchForm`                               |
| `form.setData`            | `form.resetFields`                         |
| `registComponent`         | `registerComponent`                        |
| `labelBgColor`            | 项目主题或样式变量                         |
| `borderColor`             | 项目主题或样式变量                         |

类型中保留旧属性用于迁移，不代表新代码应继续使用。

## 生成后自检

1. 所有导入来自包根或项目统一封装。
2. type 是内置类型或已注册 Ext\*。
3. field、rowKey、接口参数来自业务类型。
4. 分页需求显式配置 pagination。
5. params、immediate、searchForm 位于 SuperTable 根级。
6. 没有生成重复默认值和空配置。
7. CRUD、Upload、字典契约与接口一致。
8. 需要提交的隐藏字段已声明 Hidden。
9. 动态回调只读取当前场景提供的 effectData。
10. 执行 [Schema 诊断](/manual/schema-diagnostics)和 TypeScript 检查。
