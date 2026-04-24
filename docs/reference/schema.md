# Schema 总览

`antdv-superform` 的核心是 schema。同一套配置可以驱动表单、详情、表格和弹窗场景。

## 基本结构

```ts
{
  type: 'Input',
  field: 'name',
  label: '姓名',
  initialValue: '',
  rules: { required: true },
  attrs: {
    placeholder: '请输入姓名',
  },
}
```

## 最常见字段

- `type`: 当前节点类型
- `field`: 字段名，支持嵌套路径
- `label`: 标签文本或函数
- `initialValue`: 初始值
- `rules`: 校验规则
- `attrs`: 透传给底层组件的属性
- `hidden`: 是否隐藏
- `disabled`: 是否禁用
- `computed`: 基于上下文的派生值计算
- `onUpdate`: 值变更后的回调
- `viewRender`: 查看态自定义渲染
- `exclude`: 排除在 `form` / `table` / `description` 中显示
- `slots`: 内部插槽映射

## `attrs` 的基本规则

`attrs` 的主要职责是把配置透传到底层实际渲染的 Ant Design Vue 3 组件。

常见对应关系：

- `Input.attrs` 对应 `InputProps`
- `Select.attrs` 对应 `SelectProps`
- `TreeSelect.attrs` 对应 `TreeSelectProps`
- `Radio.attrs` 对应 `RadioGroupProps`
- `AutoComplete.attrs` 对应 `AutoCompleteProps`
- `Switch.attrs` 对应 `SwitchProps`
- `Upload.attrs` 基于 `UploadProps`，并做了业务增强
- `Form.attrs` 对应 `FormProps`
- `Table.attrs` 对应 `TableProps`

需要注意：

1. 当前源码中不是每个字段都在 TypeScript 上把 `attrs` 精确收窄到对应组件类型，但运行时整体遵循这个透传规则。
2. 部分字段会在 `attrs` 之外再补增强项，例如 `Select` 的值转换选项、`Upload` 的上传协议选项。

## 同一字段在不同场景下的差异

一个字段除了 `attrs`，还可能有这些场景化配置：

- `formItemProps`: 只在表单显示时作用于 `Form.Item`
- `columnProps`: 只在表格显示时作用于当前列
- `descriptionsProps`: 只在详情显示时作用于描述项布局

详细说明见 [场景差异配置](/reference/context-props)。

## 联动上下文

函数型配置通常可以拿到这些上下文：

- `formData`: 整个表单数据
- `current`: 当前字段所在对象
- `parent`: 父级上下文
- `value`: 当前值
- `field`: 当前字段名
- `index`: 列表索引
- `record`: 表格或列表场景的当前记录
- `isView`: 是否处于查看态

## 节点类型

schema 节点大致分两类：

- 字段类型：输入、选择、日期、上传等
- 容器类型：分组、卡片、Tabs、表格、列表等

继续阅读：

- [Schema 约定](/reference/schema-conventions)
- [场景差异配置](/reference/context-props)
- [字段类型](/reference/field-types)
- [容器类型](/reference/container-types)
