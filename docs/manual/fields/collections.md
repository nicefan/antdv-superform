# 数组容器

List、ListGroup、InputList 和 Table 都用 `field` 绑定数组，用 `columns` 描述每个元素。它们共享字段校验、只读映射和按钮体系，但布局、空数组行为和编辑能力不同。

## 选型对比

| 类型      | 最适合                             | 数据形态             | 空数组行为   |
| --------- | ---------------------------------- | -------------------- | ------------ |
| InputList | 字段少，一项能在一行完成           | 对象数组或原始值数组 | 至少保留一项 |
| ListGroup | 一项需要多行、标题或分组           | 对象数组             | 至少保留一项 |
| List      | 内容较多，需要列表外观和工具栏     | 对象数组             | 允许为空     |
| Table     | 字段多、列结构明确、选择或编辑复杂 | 对象数组             | 允许为空     |

```ts
initialValue: () => [];
```

数组初始值建议使用函数，避免多个表单实例共享引用。

## 公共数据规则

- `columns` 中的 `field` 相对于当前行对象。
- 行回调提供 `current`、`record`、`index`。
- 需要随行提交的主键也应以 Hidden 列声明。
- `viewRender`、options/dict、`tagViewer` 和 `exclude` 在只读场景继续生效。
- 内置新增默认插入 `{}`，不会生成业务主键；默认值通过列 `initialValue` 或新增动作 `resetData` 提供。

## InputList

InputList 将每个数组元素排成紧凑输入行，适合联系人、价格明细等短结构。

```ts
{
  type: 'InputList',
  field: 'contacts',
  label: '联系人',
  title: '联系人列表',
  subSpan: 12,
  gutter: 8,
  attrs: { labelIndex: true },
  rowButtons: { actions: ['delete', 'add'] },
  columns: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'Input', field: 'mobile', label: '手机号' },
  ],
}
```

| 属性                 | 类型                          | 默认值       | 说明                     |
| -------------------- | ----------------------------- | ------------ | ------------------------ |
| `field`              | string                        | 必填         | 数组字段，继承自表单项   |
| `columns`            | array                         | 必填         | 行内字段                 |
| `title`              | string/function               | —            | 列表标题                 |
| `attrs.labelIndex`   | boolean                       | `false`      | 标签后追加行序号         |
| `rowButtons`         | boolean/array/object          | 内置增删按钮 | 行操作按钮；`false` 关闭 |
| `subSpan`            | number/string                 | `'auto'`     | 行内字段默认栅格         |
| `gutter`             | number                        | `16`         | 行内栅格间距             |
| `rowProps`           | object                        | `{}`         | 行内 Row 属性            |
| `rules` / `required` | object/array/boolean/function | —            | 数组字段校验配置         |

### 原始值数组

唯一列的 `field` 精确为 `$index` 时直接绑定元素：

```ts
{
  type: 'InputList',
  field: 'emails',
  columns: [
    {
      type: 'Input',
      field: '$index',
      label: '邮箱',
      rules: { type: 'email' },
    },
  ],
}

// ['a@example.com', 'b@example.com']
```

对象数组不要使用 `$index`。InputList 至少保留一行不等于这一行必填，是否允许空值由列规则控制。

## ListGroup

ListGroup 把每项渲染成独立 Group，适合地址、合同分段等多行结构。

```ts
{
  type: 'ListGroup',
  field: 'addresses',
  title: ({ index }) => `地址 ${index + 1}`,
  subSpan: 12,
  attrs: {
    labelIndex: true,
    rowKey: 'addressId',
  },
  contentAttrs: { class: 'address-group' },
  rowButtons: { actions: ['delete', 'add'] },
  columns: [
    { type: 'Hidden', field: 'addressId' },
    { type: 'Input', field: 'city', label: '城市' },
    { type: 'Input', field: 'detail', label: '详细地址', span: 24 },
  ],
}
```

除 `field`、`columns`、`attrs.labelIndex`（`labelIndex`）、`attrs.rowKey`、`rowButtons` 外，它还继承 Group 的 `title`、`buttons`、`component`、`ignoreTableTitle`、`contentAttrs`、布局和 `descriptionsProps`。

`rowKey` 用于保持行身份，应选择稳定业务字段。ListGroup 空数组会补成 `[{}]`；需要校验每一项时，把规则配置在对应列字段上。

## List

List 使用 1.0 内置的轻量列表外观，允许空数组，适合内容块和顶部操作。

```ts
{
  type: 'List',
  field: 'members',
  title: '成员',
  attrs: {
    rowKey: 'id',
    itemClass: 'member-item',
    itemStyle: { minHeight: '56px' },
  },
  buttons: { actions: ['add', 'refresh'] },
  rowButtons: { actions: ['edit', 'delete'] },
  subSpan: 12,
  columns: [],
  descriptionsProps: { mode: 'form' },
}
```

| 属性                | 类型            | 默认值 | 说明                                   |
| ------------------- | --------------- | ------ | -------------------------------------- |
| `field`             | string          | 必填   | 数组字段                               |
| `title`             | string/function | —      | 列表标题                               |
| `attrs.rowKey`      | string          | `'id'` | 指定行主键                             |
| `attrs.itemClass`   | string/object   | —      | 每个列表项的 class                     |
| `attrs.itemStyle`   | string/object   | —      | 每个列表项的 style                     |
| `buttons`           | array/object    | —      | 顶部 `add` / `refresh`，无默认动作列表 |
| `rowButtons`        | array/object    | —      | 每项 `delete` / `edit`，无默认动作列表 |
| `columns`           | array           | 必填   | 每项字段                               |
| `subSpan`           | number/string   | `8`    | 每项内部默认栅格                       |
| `gutter`            | number          | `16`   | 每项内部栅格间距                       |
| `rowProps`          | object          | `{}`   | 每项内部 Row 属性                      |
| `descriptionsProps` | object          | —      | 只读项布局                             |

`itemClass` 和 `itemStyle` 分别设置每个列表项的 class 与 style，二者都放在 `attrs` 中。

List 允许删除最后一项。`rowKey` 缺失时默认读取 `id`，再回退内部 key；业务数据应显式设置稳定字段。

## Table 数组容器

[Table 的列、编辑与 CRUD 配置](/manual/fields/table#table-数组容器)。

<span id="列-extcolumnsitem"></span>
<span id="attrs、选择与展开"></span>
<span id="序号与按钮"></span>
<span id="四种编辑方式"></span>
<span id="modalprops-与-descriptionsprops"></span>
<span id="tabs-表格标签"></span>
<span id="crud-接口"></span>

---

<span id="相关示例"></span>

**相关示例**

[数组编辑示例](/examples?example=collections)比较列表容器；[Table 容器示例](/examples?example=table-local)展示列、选择与编辑。进一步可查看[销售订单](/examples?example=business-order)中的行金额联动，以及[合同登记](/examples?example=business-contract)中的付款计划。

<!-- 章节定位标识。 -->
<span id="数组与表格"></span>
