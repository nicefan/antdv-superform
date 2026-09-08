# 布局与结构

布局配置描述的是“业务字段之间的空间关系”，而不是写死 DOM。SuperForm 根据连续字段自动生成 Row/Col，容器再负责分组语义，因此同一份 Schema 可以在保持数据结构不变的前提下调整页面密度。

<span id="栅格与换行"></span>

## span / subSpan：栅格 {#自动栅格分组}

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
    { type: 'TextArea', field: 'remark', label: '备注', span: 24 }, // 独占一行
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

## 独占一行与换行 {#block-与-breakafter}

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

## Row / Col 布局属性 {#布局组件属性}

Row 常用 `justify`、`wrap`；Col 常用 `flex`、`offset`、`order`、`pull`、`push`；Space 常用 `direction`。这些属性由 Adapter 映射到当前 UI 框架的布局能力。

<!-- 章节定位标识。 -->
<span id="容器只组织结构-不改变字段语义"></span>
<span id="fragment-复用一组结构"></span>
<span id="数组容器使用-columns"></span>

<span id="嵌套与组合布局"></span>

## 容器与数据结构 {#容器与数据结构}

布局容器负责视觉组织；是否形成嵌套对象由 `field` 决定。模型路径见[相对路径与嵌套上下文](/manual/fields-and-paths#相对路径与嵌套上下文)，容器选型见[布局容器](/manual/fields/containers#布局选择)。

## 嵌套布局的继承 {#嵌套时会继承什么}

容器会向后代传递：

- `subSpan`：子字段的默认宽度。
- `disabled`：父容器禁用时，后代全部禁用。
- 响应上下文：子项可通过 `parent` 访问上一级上下文。

父级 `disabled: true` 的优先级高于子项自己的 `disabled: false`。这是有意的约束：禁用整个业务分组时，不会因某个子字段忘记处理而留下可编辑入口。

`hidden` 不作为普通继承配置传播；隐藏一个容器会直接停止渲染该容器。`Fragment` 是例外，它没有视觉外壳，会把自身的 `hidden` 和 `disabled` 状态应用到展开后的直接子项。

## 结构复用与数组布局 {#复用结构与数组布局}

复用不带视觉外壳的字段集合使用 [Fragment](/manual/fields/containers#fragment)；组织数组元素使用 `columns`，组件差异见[数组容器](/manual/fields/collections#选型对比)。

## InputGroup：紧凑布局 {#inputgroup-的紧凑布局}

InputGroup 默认启用紧凑模式。它不会为每个子项生成普通 Col，而是根据 `span` 换算百分比宽度后直接组合控件，适合区号 + 电话、协议 + 地址等复合输入。关闭 `attrs.compact` 后，子项恢复常规布局语义。

更多容器专属配置见[布局容器](/manual/fields/containers)，可运行效果见[布局与容器示例](/examples?example=containers)。

