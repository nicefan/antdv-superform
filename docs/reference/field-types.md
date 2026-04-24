# 字段类型

这一页关注两件事：

1. 每种字段的 `attrs` 对应哪个 Ant Design Vue 3 组件
2. 在标准组件 props 之外，本库又增强了哪些配置

完整类型定义见 `src/exaTypes.d.ts`。

## 通用字段能力

大多数字段类型都继承这些通用能力：

- `field`
- `label`
- `rules`
- `attrs`
- `hidden`
- `disabled`
- `computed`
- `viewRender`
- `span`
- `colProps`
- `slots`

输入型字段通常还支持：

- `formItemProps`
- `descriptionsProps`
- `editable`

## 基础输入类

### `Input`

- `attrs` 对应：`InputProps & HTMLAttributes`
- 增强项：
  - `onSearch(effectData, value)`
  - `attrs.enterButton`
  - `slots`

### `Textarea`

- `attrs` 运行时透传到底层文本输入组件
- 当前类型声明未像 `Input` 一样单独收窄，但使用方式仍按 Ant Design Vue 文本域 props 理解

### `InputNumber`

- `attrs` 运行时透传到底层数字输入组件
- 常与 `computed`、`rules`、`viewRender` 配合使用

### `AutoComplete`

- `attrs` 对应：`AutoCompleteProps & HTMLAttributes`
- 增强项：
  - `options`
  - `dictName`

## 选择类

选择类字段通常共享这些增强能力：

- `options`
- `dictName`
- `labelField`
- `valueToNumber`
- `valueToLabel`
- `valueToString`

## `labelField`

`labelField` 用于“值字段 + 标签字段”同步场景，尤其适合：

- 选择组件实际提交 `id`
- 同时需要把选中项的显示名称同步保存到另一字段
- 表格查看态或详情态优先显示名称，而不是原始 id

典型场景：

- 字段 `deptId` 保存部门 id
- 字段 `deptName` 保存部门名称
- 配置 `labelField: 'deptName'`

这样在编辑态中：

- 会渲染为选择框
- 选择后同步保存 `deptId` 和 `deptName`

在查看态、表格列展示或详情展示时：

- 会优先读取 `labelField` 指向的字段显示
- 不直接显示原始 id

### `Select`

- `attrs` 对应：`SelectProps & HTMLAttributes`
- 增强项：
  - `options`
  - `dictName`
  - `labelField`
  - `valueToNumber`
  - `valueToLabel`
  - `valueToString`

### `TagSelect`

- `attrs` 是组件增强配置，不是原生 `SelectProps`
- 增强项：
  - `multiple`
  - `valueToString`
  - `options`
  - `dictName`
  - `valueToNumber`
  - `valueToLabel`

### `TagInput`

- `attrs` 为增强配置
- 增强项：
  - `valueToString`
  - `newLabel`
  - `closable`

### `Radio`

- `attrs` 对应：`RadioGroupProps & HTMLAttributes`
- 增强项：
  - `options`
  - `dictName`
  - `labelField`
  - `valueToNumber`
  - `valueToLabel`
  - `valueToString`

### `Checkbox`

- 类型层复用了 `Radio` 的定义方式
- 实际使用上应按“多选组 + 选择类增强配置”理解
- 常见增强项：
  - `options`
  - `labelField`
  - `valueToString`

### `Switch`

- `attrs` 对应：`SwitchProps & HTMLAttributes`
- 增强项：
  - `valueLabels`
  - `firstIsChecked`
  - `defaultChecked`
  - `options`
  - `valueToNumber`
  - `valueToLabel`

### `TreeSelect`

- `attrs` 对应：`TreeSelectProps & HTMLAttributes`
- 增强项：
  - `treeData`
  - `labelField`

## 日期时间

### `DatePicker`

- `attrs` 运行时透传到底层日期组件

### `TimePicker`

- `attrs` 运行时透传到底层时间组件

### `DateRange`

- 复用日期字段能力
- 增强项：
  - `keepField`

`keepField` 用于把区间结束值同步到另一个字段，适合提交时拆成开始和结束两个字段。

## 上传

### `Upload`

- `attrs` 基于：`UploadProps`
- 增强项：
  - `apis.upload`
  - `apis.delete`
  - `apis.download`
  - `infoNames`
  - `valueKey`
  - `minSize`
  - `maxSize`
  - `isSingle`
  - `hideOnMax`
  - `uploadMode`
  - `tip`
  - `title`
  - `repeatable`
  - `isView`

详细说明见 [Upload 扩展](/reference/upload)。

## 特殊字段

### `Hidden`

- 用于保存数据但不渲染 UI

### `InfoSlot`

- 使用 `render` 或根插槽做自定义展示

### `InputSlot`

- 用于接入自定义输入渲染

### `Buttons`

- 字段级按钮组，配置规则与按钮系统一致

## 一个实际建议

`attrs` 主要表达“底层组件怎么渲染”，增强项主要表达“业务层怎么存值或怎么交互”。这两层不要混着理解。

例如：

```ts
{
  type: 'Select',
  field: 'deptId',
  labelField: 'deptName',
  label: '部门',
  options: [
    { label: '研发部', value: 1 },
    { label: '销售部', value: 2 },
  ],
  attrs: {
    placeholder: '请选择部门',
    allowClear: true,
  },
}
```

这里：

- `options` / `labelField` 是增强项
- `placeholder` / `allowClear` 是底层组件 props
