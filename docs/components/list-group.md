# ListGroup

`ListGroup` 把对象数组的每一项渲染为一个独立 Group。它适合单项需要多行布局、标题、内容容器样式，或者希望在每个分组内部放置新增和删除按钮的场景。

## 基础用法

```vue
<template>
  <SuperForm @register="register" />
</template>

<script setup lang="ts">
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subItems: [
    {
      type: 'ListGroup',
      field: 'experiences',
      title: '工作经历',
      initialValue: () => [{ id: 'exp-1', company: '', position: '', description: '' }],
      attrs: {
        rowKey: 'id',
        labelIndex: true,
      },
      subSpan: 12,
      columns: [
        { type: 'Hidden', field: 'id' },
        { type: 'Input', field: 'company', label: '公司', required: true },
        { type: 'Input', field: 'position', label: '职位', required: true },
        { type: 'DateRange', field: 'startDate', endField: 'endDate', label: '任职时间' },
        { type: 'Textarea', field: 'description', label: '工作内容', span: 24 },
      ],
    },
  ],
})
</script>
```

绑定数据的形态为：

```ts
{
  experiences: [
    {
      id: 'exp-1',
      company: '示例科技',
      position: '前端工程师',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      description: '',
    },
  ],
}
```

## 默认行为

`ListGroup` 默认提供每行的 `add` 和 `delete` 操作：

- `add` 在当前分组后插入一个空对象。
- `delete` 删除当前分组。
- 只剩一项时隐藏删除按钮。
- 数组为空时自动加入一个空对象，因此始终至少渲染一个分组。

不需要行按钮时显式关闭：

```ts
rowButtons: false
```

## 分组标题与序号

配置字符串 `title`，再开启 `attrs.labelIndex`，组件会自动在标题后追加从 1 开始的序号：

```ts
{
  type: 'ListGroup',
  field: 'members',
  title: '成员',
  attrs: { labelIndex: true },
  columns: [
    { type: 'Input', field: 'name', label: '姓名' },
  ],
}
```

渲染结果为“成员 1”“成员 2”……。需要自定义标题时使用函数：

```ts
title: ({ record, index }) => `${record.company || '未填写公司'} · 第 ${index + 1} 段`
```

函数标题已经可以读取 `index`，一般不要再同时开启 `labelIndex`。

## 行按钮

可以调整默认按钮的顺序、展示模式和拦截逻辑：

```ts
rowButtons: {
  align: 'left',
  buttonType: 'link',
  labelMode: 'both',
  actions: [
    'add',
    {
      name: 'delete',
      confirmText: '确定删除这段经历吗？',
    },
  ],
}
```

若自定义 `onClick`，第二个参数是内置动作，可在业务检查通过后继续执行：

```ts
rowButtons: {
  actions: [
    'add',
    {
      name: 'delete',
      onClick({ index }, remove) {
        if (isLocked(index)) return
        return remove()
      },
    },
  ],
}
```

## 行主键

对象存在稳定主键时，通过 `attrs.rowKey` 指定：

```ts
attrs: {
  rowKey: 'experienceId',
}
```

未配置或当前记录没有该字段时，组件会按原始对象身份生成内部 key。内部 key 不会写入业务数据。对象重排时，组件 key 会跟随对象，不与数组下标拼接。

## 布局与容器样式

ListGroup 继承 Group 的布局能力：

```ts
{
  type: 'ListGroup',
  field: 'projects',
  subSpan: 8,
  gutter: 16,
  rowProps: { align: 'top' },
  contentAttrs: {
    class: 'project-group',
    style: 'border-top: 1px solid #eee; padding-top: 12px',
  },
  columns: [
    { type: 'Input', field: 'name', label: '项目名称' },
    { type: 'Select', field: 'role', label: '角色', options: roleOptions },
    { type: 'InputNumber', field: 'months', label: '持续月数' },
    { type: 'Textarea', field: 'summary', label: '项目说明', span: 24 },
  ],
}
```

- `subSpan` 设置列的默认跨度。
- `span` 可以在某一列覆盖默认跨度。
- `gutter` 和 `rowProps` 控制内部栅格。
- `contentAttrs` 设置每个 Group 内容区的 HTML 属性和样式。

## 动态联动

列回调的 `current` 是当前对象行：

```ts
columns: [
  { type: 'InputNumber', field: 'quantity', label: '数量' },
  { type: 'InputNumber', field: 'price', label: '单价' },
  {
    type: 'InputNumber',
    field: 'amount',
    label: '小计',
    disabled: true,
    computed: (_value, { current }) => (current.quantity || 0) * (current.price || 0),
  },
  {
    type: 'Textarea',
    field: 'reason',
    label: '备注',
    hidden: ({ current }) => (current.amount || 0) < 10000,
    span: 24,
  },
]
```

跨行统计时使用 `formData` 访问完整数组，不要根据组件内部模型结构取值。

## 校验

```ts
{
  type: 'ListGroup',
  field: 'projects',
  columns: [
    { type: 'Input', field: 'name', label: '项目名称', required: true },
  ],
}
```

列级 `required` 和 `rules` 会约束每个对象的字段。ListGroup 当前不会把容器自身的 `rules` 生成数组级 FormItem；组件已经自动保留至少一项，其他数量限制应通过行按钮或提交前业务校验实现。

## 只读展示

详情场景下，每个分组使用详情布局展示。可配置：

```ts
descriptionsProps: {
  column: 2,
  bordered: true,
  tableLayout: 'fixed',
}
```

列可继续使用 `viewRender`、`options`、`tagViewer` 和 `exclude: ['description']`。

## 配置项

| 配置                | 类型                                     | 说明                     |
| ------------------- | ---------------------------------------- | ------------------------ |
| `field`             | `string`                                 | 必填，绑定对象数组字段   |
| `columns`           | `UniWidgetOption[]`                      | 必填，描述每项对象的字段 |
| `title`             | `VSlot`                                  | 每个分组的标题           |
| `initialValue`      | `any[] \| (() => any[])`                 | 初始数组，推荐函数形式   |
| `attrs.labelIndex`  | `boolean`                                | 字符串标题后自动追加序号 |
| `attrs.rowKey`      | `string`                                 | 对象主键字段名           |
| `rowButtons`        | `false \| ExtButtons<'add' \| 'delete'>` | 行按钮，默认新增和删除   |
| `subSpan`           | `number \| 'auto'`                       | 列默认跨度               |
| `gutter`            | `number`                                 | 栅格间距                 |
| `rowProps`          | `RowProps`                               | 内部 Row 属性            |
| `contentAttrs`      | `HTMLAttributes`                         | 每个 Group 内容区属性    |
| `descriptionsProps` | `ExtDescriptionsProps`                   | 只读详情布局             |

## 注意事项

- `ListGroup` 只用于对象数组，不支持 `$index` 普通数组。
- 空数组会被补成 `[{}]`；确实需要允许空数组时应使用 [`List`](/components/list) 或 [`Table`](/components/table)。
- 内置新增插入 `{}`，不会自动生成业务主键。需要提交的 id 应在 `columns` 中声明为 `Hidden`。
- 一项内容能够在单行内完成时，优先使用 [`InputList`](/components/input-list)。
