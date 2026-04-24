# 容器类型

容器类型用于组织字段布局，而不是直接输入值。

## 常见容器

- `Form`
- `Group`
- `Card`
- `Descriptions`
- `Tabs`
- `Collapse`
- `List`
- `ListGroup`
- `InputGroup`
- `InputList`
- `Table`

## 何时使用

- `Group`：常规分组
- `Card`：带标题和按钮区的块
- `Descriptions`：详情描述块
- `Tabs`：分页签布局
- `Collapse`：折叠面板
- `InputGroup`：一行多字段组合输入
- `InputList` / `ListGroup`：可重复行数据录入
- `Table`：表单中的子表格

## 容器常见字段

- `title`
- `buttons`
- `subItems`
- `subSpan`
- `gutter`
- `rowProps`
- `contentAttrs`
- `descriptionsProps`

## `subSpan` 的继承规则

当前源码中的实际字段名是 `subSpan`，不是 `subSpans`。

它用于表单和详情场景下的栅格宽度继承，含义是：

- 当前容器内的子项默认按 `subSpan` 作为栅格宽度排版
- 子字段如果自己声明了 `span`，则字段自身的 `span` 优先
- 子容器如果自己声明了 `subSpan`，则会向下覆盖继承值

可以理解为：

- `subSpan` 是“给后代的默认列宽”
- `span` 是“当前字段自己的最终列宽”

## 示例

```ts
{
  type: 'Group',
  title: '基础信息',
  subSpan: 12,
  subItems: [
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Input', field: 'phone', label: '电话' },
    { type: 'Input', field: 'memo', label: '备注', span: 24 },
  ],
}
```

这个例子里：

- `name` 默认继承 `subSpan: 12`
- `phone` 默认继承 `subSpan: 12`
- `memo` 自己声明了 `span: 24`，所以最终占满一整行

## 在详情中的含义

在详情模式下，`subSpan` 同样会影响分栏布局。详情渲染还会叠加：

- `descriptionsProps.span`
- `descriptionsProps.column`
- `descriptionsProps.mode`

共同决定最终展示效果。
