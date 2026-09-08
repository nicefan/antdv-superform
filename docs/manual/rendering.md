# 渲染与插槽

Schema 不会把所有内容强制变成内置控件。默认渲染解决常规输入和展示；`viewRender`、`slots`、`InputSlot`、`InfoSlot` 分别覆盖只读内容、组件局部插槽、完整输入控件和非字段内容。

<span id="编辑与只读展示"></span>

## 编辑与只读模式 {#先理解编辑与只读两条路径}

同一字段在不同场景会走不同渲染路径：

```text
编辑模式
Schema → 内置/扩展输入控件 → v-model → 数据模型

只读模式
数据模型 → labelField / endField / options 映射 → 默认内容或 viewRender
```

因此一个 Select 在编辑时绑定 ID，在详情和表格中可以自动显示选项标签；一个配置了 `endField` 的 DateRangePicker 在只读时会显示完整范围。只有默认结果不足时才需要自定义渲染。

## 默认只读展示 {#默认只读映射}

只读模式会根据字段配置选择显示内容，常见优先关系如下：

1. 配置 `labelField` 时，显示关联的文本字段。
2. 配置 `endField` 时，显示“开始值 - 结束值”。
3. Select、Radio、Checkbox 等根据 `options` 或字典把值转换为标签。
4. Switch 配置 `options` 时按选项显示标签；没有选项时才使用 `valueLabels` 补充只读文案。
5. Text、HTML、TextArea、Upload 等使用各自展示方式。
6. 配置 `viewRender` 时，以自定义结果为准。

```ts
{
  type: 'Select',
  field: 'departmentId',
  labelField: 'departmentName',
  label: '部门',
  options: departments,
}
```

详情中优先显示 `departmentName`。`labelField` 的模型结构见[Schema 与数据模型](/manual/fields-and-paths#labelfield-同时保存值与显示文本)，选项显示规则见[选择输入](/manual/fields/selections)。

```ts
{
  type: 'DateRangePicker',
  field: 'startDate',
  endField: 'endDate',
  label: '有效期',
}
```

只读时自动组合两个字段。范围的存储方式见[日期与时间：值模式](/manual/fields/date-time#daterangepicker-的三种值模式)。

## tagViewer：只读 Tag 展示 {#tagviewer-只读配置}

```ts
// 关闭 Tag，显示普通文本
tagViewer: false

// 按值映射颜色
tagViewer: { enabled: 'green', disabled: 'default' }

// 颜色数组，按选项顺序循环
tagViewer: ['blue', 'green', 'orange']

// 完整条目
tagViewer: [
  { value: 1, label: '启用', color: 'green', icon: () => h(CheckOutlined) },
]

// 动态规则：函数参数是当前值
tagViewer: (value) => ({
  label: value ? '启用' : '停用',
  color: value ? 'green' : 'red',
})
```

配置 `options` 或 `dictName` 后默认开启 Tag，字段级配置优先于全局。函数只接收当前值：返回颜色字符串时保留选项标签，返回对象时可覆盖 `label`、`color` 和 `icon`。全局策略通过 `configure({ tagViewer })` 设置，例如：

```ts
superform.configure({
  tagViewer(value) {
    const statusMap: Record<string, { label: string; color: string }> = {
      0: { label: "停用", color: "default" },
      1: { label: "启用", color: "green" },
      2: { label: "异常", color: "red" },
    };
    return statusMap[String(value)];
  },
});
```

## viewRender：只读渲染 {#viewrender-自定义只读内容}

函数形式直接接收 `effectData`：

```ts
import { h } from 'vue'

{
  type: 'Select',
  field: 'status',
  label: '状态',
  options: statusOptions,
  viewRender: ({ text, record }) => {
    return h('span', { class: `status status-${record.status}` }, text)
  },
}
```

在表格中，`text` 是当前单元格经过默认选项映射后可用的显示值，`record` 是当前行。详情中则可通过 `value`、`current` 和 `formData` 获取上下文。

字符串形式引用根组件同名插槽：

```ts
{
  type: 'Select',
  field: 'status',
  label: '状态',
  viewRender: 'status',
}
```

```vue
<SuperTable @register="register">
  <template #status="{ record, text }">
    <StatusTag :status="record.status">{{ text }}</StatusTag>
  </template>
</SuperTable>
```

`viewRender` 只改变显示结果，不修改数据。需要生成并提交派生值时应使用 [`computed`](/manual/reactivity#computed-计算并写回字段)。

<span id="插槽与自定义内容"></span>

## slots：控件内部插槽 {#slots-定制底层组件局部区域}

`slots` 会传给当前内置或扩展组件。每个插槽可以是函数，也可以是根组件插槽名：

```ts
{
  type: 'Select',
  field: 'userId',
  label: '用户',
  options: users,
  slots: {
    option: ({ option, current }) => `${option.label} · ${current.departmentName}`,
    notFoundContent: 'emptyUsers',
  },
}
```

插槽函数参数会合并两部分：当前字段的 `effectData` 与底层组件提供的插槽参数。因此既可以读取 `current`，也可以读取 Select 传入的 `option`。完整上下文字段见[响应式与联动](/manual/events-and-context#effectdata-上下文)。

## InputSlot：自定义输入 {#inputslot-完全接管输入控件}

InputSlot 仍是表单字段：它拥有 `field`、v-model、校验、状态和 FormItem，只把控件本身交给 `render`。

```ts
{
  type: 'InputSlot',
  field: 'score',
  label: '评分',
  required: true,
  render: ({ props, current }) => {
    // props 已包含 value、onUpdate:value、disabled 等合并后的控件属性
    return h(MyScore, {
      ...props,
      level: current.level,
    })
  },
}
```

`props` 已包含：

- 当前字段的 `value` 与 `onUpdate:value`。
- `attrs` 和 `dynamicAttrs`。
- `disabled` 等计算状态。
- Schema 中转发的组件事件。

因此应把 `props` 传给实际输入组件，不要另建一套脱离模型的本地值。需要在多个页面复用、提供类型声明或支持额外 v-model 时，注册扩展字段比长期使用 InputSlot 更合适，见[注册自定义字段](/manual/custom-fields)。

## InfoSlot：自定义内容 {#infoslot-插入非字段内容}

InfoSlot 不绑定值，适合说明、操作区、统计摘要或任意 VNode：

```ts
{
  type: 'InfoSlot',
  block: true,
  render: ({ current }) => {
    return h('p', { class: 'form-tip' }, `当前名称：${current.name || '-'}`)
  },
}
```

它不会进入模型、校验或提交。若内容需要占用栅格，可以配置 `span`；独立整行使用 `block: true`。InputSlot 与 InfoSlot 的字段差异也见[展示与辅助](/manual/fields/display)。

## render：函数与插槽名 {#render-字符串与函数}

InputSlot、InfoSlot 等的 `render` 可以直接写函数，也可以写根插槽名：

```ts
{ type: 'InfoSlot', render: 'formHelp', block: true }
```

函数适合与 Schema 一起复用；字符串插槽适合内容依赖当前页面模板、路由组件或较复杂的 Vue 模板结构。

<span id="选择方式与内容安全"></span>

## 如何选择渲染方式 {#如何选择扩展方式}

| 需求                       | 推荐入口                                        |
| -------------------------- | ----------------------------------------------- |
| 改表格/详情中的只读内容    | `viewRender`                                    |
| 改内置组件的某个插槽       | `slots`                                         |
| 一次性自定义输入控件       | `InputSlot`                                     |
| 插入不绑定数据的内容       | `InfoSlot`                                      |
| 多处复用的业务控件         | 注册自定义字段                                  |
| 替换某个内置字段的底层实现 | [替换底层组件](/manual/ui-decoupling)     |

可运行场景见[自定义渲染示例](/examples?example=rendering)。
