# InputList

`InputList` 是紧凑的数组输入组件，适合一项只有少量字段、可以在一行内完成编辑的场景。它既支持对象数组，也支持通过 `$index` 直接绑定字符串、数字等普通数组。

## 对象数组

```vue
<template>
  <SuperForm @register="register" />
</template>

<script setup lang="ts">
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subItems: [
    {
      type: 'InputList',
      field: 'items',
      label: '订单明细',
      compact: true,
      initialValue: () => [{ productName: '', quantity: 1, price: 0 }],
      columns: [
        { type: 'Input', field: 'productName', label: '商品', required: true, span: 10 },
        { type: 'InputNumber', field: 'quantity', label: '数量', required: true, span: 6 },
        { type: 'InputNumber', field: 'price', label: '单价', required: true, span: 6 },
      ],
    },
  ],
})
</script>
```

数据形态为：

```ts
{
  items: [
    { productName: '键盘', quantity: 2, price: 399 },
  ],
}
```

## 普通数组与 `$index`

当 `columns` 只有一项，并且该列的 `field` 为 `$index` 时，控件直接绑定数组当前下标的值，不会把每项包装成对象。

```ts
{
  type: 'InputList',
  field: 'emailList',
  label: '通知邮箱',
  initialValue: () => [''],
  columns: [
    {
      type: 'Input',
      field: '$index',
      label: '邮箱',
      rules: { type: 'email' },
    },
  ],
}
```

数据形态为：

```ts
{
  emailList: ['dev@example.com', 'ops@example.com'],
}
```

`$index` 模式有以下约束：

- `columns` 必须只有一个字段。
- 字段名必须精确写为 `$index`。
- 行模型按数组下标绑定，重复值不会造成 key 冲突。
- 编辑字段值不会改变当前索引槽位的内部 key。
- 需要多个字段时改用对象数组，不要为普通数组虚构属性名。

## 紧凑与普通布局

对象数组可以通过 `compact` 选择布局：

```ts
{
  type: 'InputList',
  field: 'ranges',
  compact: true,
  columns: [
    { type: 'InputNumber', field: 'min', label: '最小值', span: 10 },
    { type: 'InputNumber', field: 'max', label: '最大值', span: 10 },
  ],
}
```

- `compact: true`：每项使用 InputGroup 紧凑排列，适合短字段组合。
- 省略或设置为 `false`：每项使用普通 Group 栅格布局。
- `subSpan` 设置列默认跨度；列自身的 `span` 优先。
- `gutter` 和 `rowProps` 控制内部栅格。

## 标签与行序号

默认情况下，InputList 自身的 `label` 作为整个数组字段的表单标签。

开启 `attrs.labelIndex` 后，每一行生成独立标签，并在字符串标签后追加从 1 开始的序号：

```ts
{
  type: 'InputList',
  field: 'contacts',
  label: '联系人',
  attrs: {
    labelIndex: true,
  },
  columns: [
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Input', field: 'mobile', label: '手机号' },
  ],
}
```

需要完全控制标签时使用 `labelSlot`：

```ts
labelSlot: ({ index }) => `第 ${index + 1} 位联系人`
```

`labelIndex` 会改变标签排版方式，建议同时检查编辑和详情两种场景。

## 默认行按钮

InputList 默认在每一行末尾生成 `add` 和 `delete`：

- `add` 在当前行后插入一个空值或空对象。
- 对象数组插入 `{}`；`$index` 普通数组插入 `undefined`。
- `delete` 删除当前行。
- 只剩一行时删除按钮禁用。
- 空数组会自动补一行。

关闭按钮：

```ts
rowButtons: false
```

自定义按钮：

```ts
rowButtons: {
  buttonType: 'link',
  labelMode: 'both',
  actions: [
    'add',
    {
      name: 'delete',
      confirmText: '确定删除当前明细吗？',
    },
  ],
}
```

自定义删除逻辑时，可以在检查通过后调用第二个参数执行内置删除：

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

## 动态联动

对象数组的列回调中，`current` 是当前行对象：

```ts
columns: [
  { type: 'InputNumber', field: 'quantity', label: '数量' },
  { type: 'InputNumber', field: 'price', label: '单价' },
  {
    type: 'InputNumber',
    field: 'amount',
    label: '金额',
    disabled: true,
    computed: (_value, { current }) => (current.quantity || 0) * (current.price || 0),
  },
]
```

`$index` 普通数组中，回调可以读取 `value` 和 `index`：

```ts
{
  type: 'Input',
  field: '$index',
  labelSlot: ({ index }) => `邮箱 ${index + 1}`,
  onUpdate({ value, index }) {
    console.log('当前下标和值', index, value)
  },
}
```

## 校验

数组级规则与列级规则可以组合：

```ts
{
  type: 'InputList',
  field: 'emailList',
  label: '通知邮箱',
  rules: { min: 2, message: '至少填写两个邮箱' },
  columns: [
    {
      type: 'Input',
      field: '$index',
      required: true,
      rules: { type: 'email' },
    },
  ],
}
```

- 数组级 `rules` 校验整个列表，例如 `min`、`max`。
- 对象数组的列规则按 `field` 校验当前对象属性。
- `$index` 的列规则按当前数组下标校验。
- InputList 至少保留一行不等于该行必填；空值是否允许仍由列规则决定。
- 数组级规则依赖外层 FormItem；使用整体 `label` 或 `labelSlot`，并保持 `attrs.labelIndex` 关闭。

### 两个字段至少填写一个

对于 `{ value1: '', value2: '' }` 这样的对象行，可以在其中一个字段上读取当前行并执行交叉校验：

```ts
{
  type: 'InputList',
  field: 'list',
  label: '至少填写一项',
  compact: true,
  initialValue: () => [{ value1: '', value2: '' }],
  columns: [
    {
      type: 'Input',
      field: 'value1',
      label: '值一',
      rules: {
        validator: ({ current }) => {
          const hasValue1 = String(current.value1 || '').trim()
          const hasValue2 = String(current.value2 || '').trim()
          return hasValue1 || hasValue2 || new Error('value1 或 value2 至少填写一项')
        },
      },
    },
    {
      type: 'Input',
      field: 'value2',
      label: '值二',
    },
  ],
}
```

对应的数据结构：

```ts
{
  list: [
    { value1: '', value2: '' },
  ],
}
```

这里把规则放在 `value1` 上，是为了让空行只显示一条错误；`compact: true` 让两个字段处于同一个紧凑行模型中，修改任一字段后可以联动刷新这条规则。校验器中的 `current` 是当前行对象；填写 `value1` 或 `value2` 任一项后，规则都会通过。如果希望两个输入框都显示错误，可以在两个字段上复用同一个校验器，但通常会产生重复提示。

## 只读展示

对象数组在详情场景下按行展示列内容，并可以使用 `descriptionsProps`：

```ts
descriptionsProps: {
  column: 3,
  bordered: true,
  tableLayout: 'fixed',
}
```

`$index` 普通数组会逐项展示当前值。列配置的 `label`、`labelSlot` 和 `breakAfter` 可控制只读排版；当前 `$index` 专用只读分支不执行列的 `viewRender`。

## 行身份

InputList 不要求业务数据提供 `rowKey`：

- 对象数组按原始对象身份生成稳定内部 key；对象重排、移除后重新加入时仍复用该 key。
- `$index` 普通数组按索引槽位维护内部 key，字段值和重复值不参与 key 计算。
- 内部 key 不会写入业务数据，也不会随表单提交。

如果对象数组本身具有 id，仍应把 id 声明为 `Hidden`，以便提交和回显；它不是 InputList 的公开 `rowKey` 配置。

## 配置项

| 配置                | 类型                                     | 说明                             |
| ------------------- | ---------------------------------------- | -------------------------------- |
| `field`             | `string`                                 | 必填，绑定数组字段               |
| `columns`           | `UniWidgetOption[]`                      | 必填，对象列或唯一的 `$index` 列 |
| `initialValue`      | `any[] \| (() => any[])`                 | 初始数组，推荐函数形式           |
| `label`             | `VSlot`                                  | 整个数组字段或各行的标签         |
| `labelSlot`         | `Fn`                                     | 自定义动态标签                   |
| `compact`           | `boolean`                                | 对象行是否使用紧凑 InputGroup    |
| `attrs.labelIndex`  | `boolean`                                | 是否为每行生成带序号标签         |
| `rowButtons`        | `false \| ExtButtons<'add' \| 'delete'>` | 行按钮，默认新增和删除           |
| `subSpan`           | `number \| 'auto'`                       | 列默认跨度                       |
| `gutter`            | `number`                                 | 栅格间距                         |
| `rowProps`          | `RowProps`                               | 内部 Row 属性                    |
| `rules`             | `RuleConfig \| RuleConfig[]`             | 整个数组的校验规则               |
| `required`          | `boolean \| Fn<boolean>`                 | 数组字段是否必填                 |
| `formItemProps`     | `FormItemProps`                          | 外层表单项属性                   |
| `descriptionsProps` | `ExtDescriptionsProps`                   | 只读详情布局                     |

## 注意事项

- InputList 会修改绑定数组；外部通过 `push`、`splice` 等方式原地增删也会同步更新行结构。
- 对象数组新增项默认为 `{}`，普通数组新增项默认为 `undefined`。业务默认值应通过外部赋值或自定义按钮补充。
- 空数组会自动补一行。如果业务必须允许空数组，使用 [`List`](/components/list) 或 [`Table`](/components/table)。
- 字段较多、需要复杂行操作或明确列结构时，改用 [`Table`](/components/table)。
