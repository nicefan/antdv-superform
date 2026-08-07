# List

`List` 使用 Ant Design Vue List 展示和编辑对象数组。它适合单项字段较多、需要列表标题或顶部操作区，并希望每项保持独立列表外观的场景。

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
      type: 'List',
      field: 'contacts',
      title: '联系人',
      initialValue: () => [{ id: 'contact-1', name: '', mobile: '' }],
      attrs: {
        rowKey: 'id',
      },
      buttons: {
        actions: ['add'],
      },
      rowButtons: {
        actions: ['delete'],
      },
      columns: [
        { type: 'Input', field: 'name', label: '姓名', required: true },
        { type: 'Input', field: 'mobile', label: '手机号', rules: { type: 'mobile' } },
        { type: 'Input', field: 'remark', label: '备注' },
      ],
    },
  ],
})
</script>
```

绑定数据的形态为：

```ts
{
  contacts: [
    { id: 'contact-1', name: '张三', mobile: '13800138000', remark: '' },
  ],
}
```

## 顶部按钮

`buttons` 渲染在列表标题区域。`List` 不会默认生成按钮；需要新增入口时显式配置 `add`：

```ts
buttons: {
  actions: ['add'],
}
```

内置 `add` 会在数组末尾加入一个空对象。若新行需要业务默认值，可以自定义按钮并直接修改 `effectData.current`：

```ts
buttons: {
  actions: [
    {
      label: '新增联系人',
      attrs: { type: 'primary' },
      onClick({ value }) {
        value.push({ name: '', mobile: '', enabled: true })
      },
    },
  ],
}
```

## 行按钮

`rowButtons` 位于每个列表项右侧。`List` 默认不显示行按钮，必须显式配置。

```ts
rowButtons: {
  buttonType: 'link',
  actions: [
    'delete',
    {
      name: 'edit',
      onClick({ record, index }) {
        openEditor(record, index)
      },
    },
  ],
}
```

- `delete` 有内置删除行为，默认带确认提示。
- `edit` 只提供默认按钮外观，不会自动打开编辑器；需要配置 `onClick`。
- 行按钮回调可以读取 `record`、`index`、`current` 和 `formData`。
- `List` 允许删除最后一项。如业务要求至少保留一项，应在按钮回调中拦截，或配置数组级校验。

保留至少一项的示例：

```ts
rowButtons: {
  actions: [
    {
      name: 'delete',
      disabled: ({ current }) => current.length === 1,
    },
  ],
}
```

## 行主键

通过 `attrs.rowKey` 指定对象中的主键字段：

```ts
attrs: {
  rowKey: 'contactId',
}
```

未配置时默认读取 `id`。记录没有对应主键时，组件会按原始对象身份生成内部 key；内部 key 不会写回表单数据。为了让回显、重排和局部更新更容易追踪，后端数据存在稳定主键时应显式配置 `rowKey`。

## 布局

`columns` 使用标准 24 栅格布局。可以在 List 上设置子项默认宽度，也可以为单列单独覆盖：

```ts
{
  type: 'List',
  field: 'addresses',
  subSpan: 12,
  gutter: 16,
  columns: [
    { type: 'Input', field: 'province', label: '省份' },
    { type: 'Input', field: 'city', label: '城市' },
    { type: 'Input', field: 'address', label: '详细地址', span: 24 },
  ],
}
```

- `subSpan`：列的默认跨度。
- `gutter`：列间距。
- `rowProps`：传给内部 Ant Design Vue Row。
- `attrs.rowKey`：指定对象主键字段。虽然当前类型兼容 `ListProps`，但除 `rowKey` 外的属性尚未透传给底层 List。

## 校验

`columns` 中的字段规则会按每一行执行：

```ts
{
  type: 'List',
  field: 'contacts',
  columns: [
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'Input', field: 'mobile', label: '手机号', rules: { type: 'mobile' } },
  ],
}
```

List 当前不会把容器自身的 `rules` 生成数组级 FormItem。需要限制数组数量时，应在提交前进行业务校验，并用按钮的 `disabled` 或 `onClick` 约束增删。

## 动态字段

列回调中的 `current` 是当前行对象，`index` 是行下标：

```ts
columns: [
  {
    type: 'InputNumber',
    field: 'quantity',
    label: '数量',
    initialValue: 1,
  },
  {
    type: 'InputNumber',
    field: 'price',
    label: '单价',
  },
  {
    type: 'InputNumber',
    field: 'amount',
    label: '金额',
    disabled: true,
    computed: (_value, { current }) => (current.quantity || 0) * (current.price || 0),
  },
]
```

## 只读展示

同一份 schema 用于 `SuperDetail` 或详情场景时，List 会逐项使用详情布局展示。可以通过 `descriptionsProps` 调整每项的只读布局：

```ts
descriptionsProps: {
  column: 2,
  bordered: true,
  tableLayout: 'fixed',
}
```

字段仍可使用 `viewRender`、`options`、`tagViewer` 和 `exclude: ['description']` 控制只读内容。

## 配置项

| 配置                | 类型                             | 说明                                      |
| ------------------- | -------------------------------- | ----------------------------------------- |
| `field`             | `string`                         | 必填，绑定对象数组字段                    |
| `columns`           | `UniWidgetOption[]`              | 必填，描述每项对象的字段                  |
| `title`             | `VSlot`                          | 列表标题；省略时使用 `label`              |
| `initialValue`      | `any[] \| (() => any[])`         | 初始数组，推荐函数形式                    |
| `attrs.rowKey`      | `string`                         | 对象主键字段名；当前实际消费的 List attrs |
| `buttons`           | `ExtButtons<'add' \| 'refresh'>` | 标题区域按钮；无默认动作                  |
| `rowButtons`        | `ExtButtons<'delete' \| 'edit'>` | 行操作按钮；无默认动作                    |
| `subSpan`           | `number \| 'auto'`               | 列默认跨度                                |
| `gutter`            | `number`                         | 栅格间距                                  |
| `rowProps`          | `RowProps`                       | 内部 Row 属性                             |
| `descriptionsProps` | `ExtDescriptionsProps`           | 只读详情布局                              |

## 注意事项

- `List` 只用于对象数组，不支持 `$index` 普通数组；普通数组使用 [`InputList`](/components/input-list)。
- 当前 `List` 没有把 `attrs` 中除 `rowKey` 外的 ListProps 传给底层组件。
- 内置新增只加入 `{}`，不会自动生成业务主键或业务默认字段。
- 需要随表单提交的隐藏字段（例如行 id）应在 `columns` 中声明为 `Hidden`。
- `rowButtons.edit` 没有内置编辑流程；复杂编辑流程通常更适合 [`Table`](/components/table)。
