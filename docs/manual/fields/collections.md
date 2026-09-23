# 数组容器

InputList、GroupList、CardList、TabList、CollapseList 和 Table 都用 `field` 绑定数组，用 `columns` 描述每个元素。

## 选型对比

| 类型 | 最适合 | 空数组行为 | 编辑方式 |
| --- | --- | --- | --- |
| InputList | 字段少，一项能在一行完成 | 至少保留一项 | 直接编辑 |
| GroupList | 一项需要多行 Group 布局 | 至少保留一项 | 直接编辑 |
| CardList | 卡片式对象列表 | 允许为空 | 直接编辑或 editModal |
| TabList | 页签式对象列表 | 允许为空 | 直接编辑或 editModal |
| CollapseList | 折叠式对象列表 | 允许为空 | 直接编辑或 editModal |
| Table | 字段多、列结构明确 | 允许为空 | 表格编辑能力 |

```ts
initialValue: () => []
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

<span id="grouplist"></span>

## GroupList

GroupList 沿用原分组列表语义：每项渲染为独立 Group，空数组会补一项，支持 `attrs.labelIndex`、`attrs.rowKey`、行内新增/删除以及 Group 自定义 `component`。它不提供 `titleField` 或 `editModal`。

```ts
{
  type: 'GroupList',
  field: 'addresses',
  title: ({ index }) => `地址 ${index + 1}`,
  subSpan: 12,
  attrs: { labelIndex: true, rowKey: 'addressId' },
  rowButtons: { actions: ['delete', 'add'] },
  columns: [
    { type: 'Hidden', field: 'addressId' },
    { type: 'Input', field: 'city', label: '城市' },
    { type: 'Input', field: 'detail', label: '详细地址', span: 24 },
  ],
}
```

<span id="cardlist"></span>
<span id="tablist"></span>
<span id="collapselist"></span>

## CardList / TabList / CollapseList

三个列表分别以卡片、标签页和折叠面板展示数组项，允许空数组。`titleField` 可读取当前记录的字段作为标题，并支持点路径；未配置时显示序号。记录有唯一标识时，可通过 `attrs.rowKey` 指定字段名，默认使用 `id`。

```ts
{
  type: 'CardList',
  field: 'members',
  label: '成员',
  titleField: 'profile.name',
  attrs: { rowKey: 'id', span: 12 },
  editModal: { modalProps: { width: 640 } },
  columns: [
    { type: 'Input', field: 'profile.name', label: '姓名', required: true },
    { type: 'Input', field: 'note', label: '备注', exclude: ['description'] },
  ],
}
```

- 默认直接编辑；配置 `editModal` 后列表内展示详情，新增/编辑在弹窗表单中完成。
- 弹窗编辑取消后不写回列表，保存前会校验字段。
- 列表标题旁的新增固定插入头部；当前行的新增固定插在当前行之后。
- CardList 的 `attrs.span` 只控制每张卡片的 24 栅格宽度；Schema 顶层 `span` 仍控制整个字段宽度。默认卡片网格 gutter 为 `[16, 16]`。
- TabList 的当前行新增、编辑、删除入口位于标签栏；新增后激活新行，删除激活项后回退相邻项。
- CollapseList 新增后展开新行。
- 查看模式只展示详情，不提供内置增删编辑入口；`exclude: ['form' | 'description']` 继续控制字段场景。

`buttons: false` 可以关闭列表级操作，`rowButtons: false` 关闭行操作。三个列表的 `editModal.form` 可覆盖弹窗表单配置，默认复用 `columns`。

## Table 数组容器
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
