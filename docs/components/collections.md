# 数组编辑组件

`List`、`ListGroup` 和 `InputList` 都用于编辑数组字段。它们共享字段 schema、校验、动态属性和只读展示能力，但适用的数据结构和布局不同。

## 如何选择

| 类型                                  | 推荐场景                                           | 数据形态           | 默认行操作     | 空数组行为   |
| ------------------------------------- | -------------------------------------------------- | ------------------ | -------------- | ------------ |
| [`List`](/components/list)            | 单项内容较多，希望使用列表标题、工具栏和独立列表项 | 对象数组           | 不生成         | 允许为空     |
| [`ListGroup`](/components/list-group) | 单项需要多行、标题或分组块展示                     | 对象数组           | 新增、删除     | 自动保留一项 |
| [`InputList`](/components/input-list) | 字段较少，一项可以在一行内完成                     | 对象数组或普通数组 | 新增、删除     | 自动保留一项 |
| [`Table`](/components/table)          | 字段多、列结构明确，或需要选择、分页和复杂 CRUD    | 对象数组           | 由表格配置决定 | 允许为空     |

## 共同规则

- `field` 绑定整个数组，`columns` 描述数组中每一项的字段。
- 对象数组的列使用普通字段名，例如 `name`、`amount`。
- 只有 `InputList` 支持把单个 `$index` 列直接绑定到普通数组元素。
- `initialValue` 推荐使用函数返回新数组，避免多个表单实例共享同一个数组引用。
- 列内可以继续使用 `required`、`rules`、`options`、`hidden`、`disabled`、`computed` 和事件回调。
- 动态回调中，`current` 是当前对象行，`index` 是当前下标，`formData` 是整个表单模型。
- 列级 `rules` 校验当前行的具体字段。只有生成外层 FormItem 的 `InputList` 会消费数组级 `rules`；`List` 和 `ListGroup` 当前不使用容器自身的数组级规则。

```ts
{
  type: 'InputList',
  field: 'contacts',
  label: '联系人',
  initialValue: () => [{ name: '', mobile: '' }],
      rules: { min: 1 },
  columns: [
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'Input', field: 'mobile', label: '手机号', rules: { type: 'mobile' } },
  ],
}
```

## 行身份

对象数组应尽量包含稳定主键。`List` 和 `ListGroup` 可通过 `attrs.rowKey` 指定主键字段；没有主键时，组件会按对象身份生成内部 key，且不会把临时 key 写入业务数据。

`InputList` 的对象数组同样按对象身份维护内部 key。使用 `$index` 绑定普通数组时，行 key 绑定索引槽位，不依赖当前字段值，因此重复值和编辑值不会造成 key 冲突或变化。

## 下一步

- [List 详细用法](/components/list)
- [ListGroup 详细用法](/components/list-group)
- [InputList 详细用法](/components/input-list)
