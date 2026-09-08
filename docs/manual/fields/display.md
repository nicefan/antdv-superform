# 展示与辅助

本页包括 Text、HTML、Hidden、InputSlot 和 InfoSlot，并补充所有字段共享的标签、提示、FormItem 与只读属性。

## 字段标签与提示

### label

```ts
{ type: 'Input', field: 'name', label: '姓名' }
```

`label` 可以是字符串或上下文函数。字符串还能为输入占位符和必填消息提供默认文案。

### labelSlot

```ts
{
  type: 'Input',
  field: 'taxNo',
  labelSlot: ({ current }) => h('span', [
    '税号',
    current.overseas ? h('small', '（境外）') : null,
  ]),
}
```

`labelSlot` 完全接管 FormItem 标签；使用函数标签时，自动 placeholder 无法得到稳定文本，建议显式设置 `attrs.placeholder`。

### tooltip

```ts
// 简单内容
tooltip: '用于合同和发票抬头'

// TooltipProps + 自定义图标
tooltip: {
  title: ({ formData }) => `当前主体：${formData.companyName}`,
  placement: 'top',
  color: 'blue',
  icon: () => h(QuestionCircleOutlined),
}
```

tooltip 可以是字符串/函数，或包含 `title`、`icon` 及 Ant Design Vue TooltipProps 的对象。

### formItemProps 与 descriptionsProps

```ts
{
  type: 'Input',
  field: 'code',
  label: '编码',
  formItemProps: {
    validateFirst: false,
    extra: '编码保存后不可修改',
  },
  descriptionsProps: {
    span: 24,
    labelAlign: 'left',
  },
}
```

`formItemProps` 只影响编辑表单的 FormItem；`descriptionsProps` 只影响详情布局。不要把这两类属性塞入控件 `attrs`。

## Text

Text 展示当前字段值，不提供输入控件：

```ts
{
  type: 'Text',
  field: 'code',
  label: '编码',
  attrs: { class: 'mono-text' },
  dynamicAttrs: ({ value }) => ({ title: `完整编码：${value}` }),
}
```

`attrs` / `dynamicAttrs` 传给外层 span，默认 title 使用当前文本。Text 仍可使用 `tagViewer` 转为 Tag。

## HTML

```ts
{
  type: 'HTML',
  field: 'content',
  label: '内容',
  attrs: { class: 'rich-content' },
}
```

字段值通过 `innerHTML` 写入 span，组件不会清洗内容。只允许可信 HTML；用户输入和远程富文本必须先做白名单过滤与 XSS 防护。

## Hidden

Hidden 建立和维护模型字段，但不生成 FormItem：

```ts
subItems: [
  { type: "Hidden", field: "id" },
  { type: "Hidden", field: "version", initialValue: 0 },
];
```

适合主键、乐观锁版本和提交上下文。Hidden 仍会执行值绑定，因此 `value`、`initialValue`、`labelField`、`vModelFields` 等模型配置依然有意义；布局、标签和校验配置没有可见效果。

## InputSlot

通过必填的 `render` 接管输入控件，保留字段模型、校验和 FormItem。可以使用根插槽名：

```ts
{ type: "InputSlot", field: "address", render: "addressEditor" }
```

函数签名与 `props` 透传要求见 [InputSlot 渲染](/manual/rendering#inputslot-完全接管输入控件)。

## InfoSlot

用于非输入内容，支持 `attrs`、`dynamicAttrs`、`hidden`、`span`、`block` 等通用配置：

```ts
{ type: "InfoSlot", render: "orderSummary", block: true }
```

模型边界与渲染示例见 [InfoSlot 渲染](/manual/rendering#infoslot-插入非字段内容)。

## viewRender 与 editable

```ts
{
  type: 'Input',
  field: 'name',
  editable: ({ current }) => current.status === 'draft',
  viewRender: ({ value }) => h('strong', value || '-'),
}
```

`editable: false` 时字段使用只读渲染而不是禁用控件。`viewRender` 可为函数或根插槽名，完整优先级见[渲染与插槽](/manual/rendering)。

## 何时注册自定义字段

InputSlot 适合一次性输入；多个页面重复使用、需要多 v-model 或明确只读模式时，应[注册自定义字段](/manual/custom-fields)。

完整用法见[自定义渲染示例](/examples?example=rendering)。

<!-- 章节定位标识。 -->
<span id="何时注册-ext-字段"></span>
