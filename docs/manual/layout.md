# 布局与结构

布局配置描述的是“业务字段之间的空间关系”，而不是写死 DOM。SuperForm 根据连续字段自动生成 Row/Col，容器再负责分组语义，因此同一份 Schema 可以在保持数据结构不变的前提下调整页面密度。

## 自动栅格分组

表单使用 Ant Design Vue 的 24 栅格。普通字段会按声明顺序进入当前 Row，并使用以下优先级确定宽度：

```text
字段 span
  ↓ 未提供
父容器 subSpan
  ↓ 未提供
上级继承的 subSpan
  ↓ 未提供
全局 Col.span
  ↓ 未提供
8（一行三项）
```

```ts
{
  subSpan: 12,
  gutter: 16,
  subItems: [
    { type: 'Input', field: 'name', label: '名称' }, // 继承 12，占半行
    { type: 'Select', field: 'type', label: '类型' }, // 继承 12，占半行
    { type: 'Textarea', field: 'remark', label: '备注', span: 24 }, // 独占一行
  ],
}
```

`gutter` 默认是 `16`，也可以通过 `rowProps` 配置 Row，通过 `colProps` 配置单个 Col：

```ts
{
  type: 'Input',
  field: 'name',
  label: '名称',
  colProps: { xs: 24, md: 12, xl: 8 },
}
```

响应式断点直接沿用 Ant Design Vue Col 的能力，适合一份 Schema 同时覆盖桌面和移动端。

## block 与 breakAfter

两者都能影响换行，但语义不同：

| 配置               | 结果                                       | 适合场景                |
| ------------------ | ------------------------------------------ | ----------------------- |
| `block: true`      | 节点脱离前后 Row，作为独立区块渲染         | Card、Table、整行操作区 |
| `breakAfter: true` | 当前节点仍在当前 Row，但下一个节点新起一行 | 某字段后强制截断        |

```ts
subItems: [
  { type: "Input", field: "code", label: "编码", span: 8, breakAfter: true },
  { type: "Input", field: "name", label: "名称", span: 8 }, // 从新 Row 开始
  { type: "InfoSlot", block: true, render: () => "整行说明" },
];
```

未设置 `span` 的布局容器默认独立成块，因此 Card、Tabs、Collapse 等通常无需重复写 `block: true`。给容器设置 `span` 后，它可以像普通字段一样进入栅格。

`span: 'auto'` 适用于按钮或辅助节点；也可以使用 `colProps.flex` 让 Col 按内容或剩余空间伸缩。

## 容器只组织结构，不改变字段语义

```ts
{
  type: 'Card',
  label: '收货信息',
  subSpan: 12,
  subItems: [
    { type: 'Input', field: 'receiver.name', label: '收件人' },
    { type: 'Input', field: 'receiver.mobile', label: '手机号' },
  ],
}
```

Card 增加视觉分组和标题，两个字段仍按各自 `field` 写入模型。若希望容器自身对应一个对象，可以把 `field` 放在容器上，让子项改用相对路径：

```ts
{
  type: 'Group',
  field: 'receiver',
  subItems: [
    { type: 'Input', field: 'name', label: '收件人' },
    { type: 'Input', field: 'mobile', label: '手机号' },
  ],
}
```

两种写法最终模型都可以是 `receiver.name`，但第二种让子项回调中的 `current` 直接指向 `receiver`，更适合整个业务对象内的联动。

## 嵌套时会继承什么

容器会向后代传递：

- `subSpan`：子字段的默认宽度。
- `disabled`：父容器禁用时，后代全部禁用。
- 响应上下文：子项可通过 `parent` 访问上一级上下文。

父级 `disabled: true` 的优先级高于子项自己的 `disabled: false`。这是有意的约束：禁用整个业务分组时，不会因某个子字段忘记处理而留下可编辑入口。

`hidden` 不作为普通继承配置传播；隐藏一个容器会直接停止渲染该容器。`Fragment` 是例外，它没有视觉外壳，会把自身的 `hidden` 和 `disabled` 状态应用到展开后的直接子项。

## Fragment：复用一组结构

Fragment 用于把一组字段插入当前位置，不产生 Card、Row 标题等视觉包装：

```ts
const auditFields = {
  type: "Fragment",
  subItems: [
    { type: "Text", field: "createdBy", label: "创建人" },
    { type: "Text", field: "createdAt", label: "创建时间" },
  ],
};
```

它适合复用字段集合或给一组直接子项统一加 `hidden` / `disabled`，不适合表达有独立数据边界的对象；后者应使用带 `field` 的 Group。

## 数组容器使用 columns

`List`、`ListGroup`、`InputList` 和 `Table` 通过 `columns` 描述每个数组元素。数组行会克隆列模型，并给回调提供当前 `record` 和 `index`：

```ts
{
  type: 'InputList',
  field: 'contacts',
  columns: [
    { type: 'Input', field: 'name', label: '联系人' },
    { type: 'Input', field: 'mobile', label: '手机号' },
  ],
}
```

选择哪一种数组容器、如何编辑与校验，见[数组与表格](/manual/fields/collections)。页面级 SuperTable 并不是这里的布局容器，它拥有独立查询数据和 API 生命周期，见[表格 SuperTable](/manual/super-table)。

## InputGroup 的紧凑布局

InputGroup 默认启用紧凑模式。它不会为每个子项生成普通 Col，而是根据 `span` 换算百分比宽度后直接组合控件，适合区号 + 电话、协议 + 地址等复合输入。关闭 `attrs.compact` 后，子项恢复常规布局语义。

更多容器专属配置见[布局容器](/manual/fields/containers)，可运行效果见[布局与容器示例](/examples?example=containers)。
