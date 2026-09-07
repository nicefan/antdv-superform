# 基础输入

本页重点介绍 Input、TextArea、InputNumber、AutoComplete、InputGroup 和 TagInput。AntDV Adapter 还声明了 `InputOTP`、`InputPassword`、`InputSearch`、`Mentions` 等真实组件名；普通字段同样共享 `field`、`value`、`initialValue`、校验、状态、布局和事件等[通用字段配置](/manual/schema#从一项声明到完整行为)。

## Input

Input 适合单行字符串。默认生成“请输入 + label”占位符并开启 `allowClear` 的全局默认能力。

```ts
{
  type: 'Input',
  field: 'name',
  label: '姓名',
  attrs: {
    maxlength: 30,
    showCount: true,
  },
  // 未配置 placeholder，运行时根据 label 自动得到“请输入姓名”
}
```

`attrs` 属于 Ant Design Vue InputProps，常用项包括 `placeholder`、`maxlength`、`allowClear`、`prefix`、`suffix`、`addonBefore`、`addonAfter`、`type` 和 `status`。

### 普通输入与搜索输入

```ts
// 普通 Input
{ type: 'Input', field: 'code', label: '编码' }

// 配置 onSearch 后切换为 Input.Search
{
  type: 'Input',
  field: 'keyword',
  label: '关键词',
  attrs: { enterButton: '查询' },
  onSearch: async ({ value }, keyword) => {
    await api.search(keyword ?? value)
  },
}
```

`onSearch(effectData, value)` 存在时组件使用 Input.Search，并在 Promise 等待期间维护搜索按钮 loading。`enterButton` 通过 `attrs.enterButton` 控制搜索按钮；没有 `enterButton` 时，`addonAfter` 也可被复用为搜索入口。

需要密码或独立搜索组件时，也可以直接使用 Adapter 已声明的 `InputPassword`、`InputSearch`。这些字段仍需由自动导入插件或 `initialize({ components })` 提供实际组件。

## TextArea

TextArea 适合多行字符串，默认宽度 100%、开启 `allowClear`，占位符为“请输入 + label”。

```ts
{
  type: 'TextArea',
  field: 'remark',
  label: '备注',
  span: 24,
  attrs: {
    rows: 4,
    maxlength: 500,
    showCount: true,
    autoSize: { minRows: 3, maxRows: 8 },
  },
}
```

固定 `rows` 适合稳定表单布局；`autoSize` 适合内容长度变化较大的录入。只读模式使用保留换行的内容展示。

## InputNumber

InputNumber 负责数字交互，通常存储 `number | undefined`。默认宽度 100%，占位符为“请输入 + label”。

```ts
{
  type: 'InputNumber',
  field: 'price',
  label: '单价',
  attrs: {
    min: 0,
    max: 999999,
    step: 0.01,
    precision: 2,
    addonAfter: '元',
  },
  rules: { type: 'twoDecimal' },
}
```

控件限制与数据校验应区分：

- `attrs.min/max/precision` 改善输入体验。
- `rules.min/max/type` 负责提交前校验。
- `formatter/parser` 适合货币、百分比展示与解析。

只配置控件 `min/max` 不能替代业务校验，外部回填仍可能带入越界值。

## AutoComplete

AutoComplete 是“文本输入 + 建议列表”，最终值按标签语义输入，不等同于 Select 的 ID 选择。

```ts
{
  type: 'AutoComplete',
  field: 'city',
  label: '城市',
  options: ['北京', '上海', '深圳'],
  attrs: {
    backfill: true,
    allowClear: true,
  },
}
```

专属 Schema 属性为 `options`、`dictName` 和 `attrs: AutoCompleteProps`。`options` 支持数组、对象字典、Ref、函数或 Promise，内部按 label 作为输入值并默认 `filterOption: true`。

```ts
// 响应式建议
options: cityOptions;

// 异步建议；函数收到 effectData，但 AutoComplete 不提供 Select 的自动关键词节流协议
options: ({ current }) => api.getCitySuggestions(current.province);

// 全局字典
dictName: "cities";
```

需要远程关键词搜索、保存独立 value 时优先使用 [Select 远程搜索](/manual/fields/selections#远程搜索)；需要自由文本且业务协议特殊时使用 InputSlot。

## InputGroup

InputGroup 是紧凑输入容器，不是页面根 Form。它使用 `subItems` 组合多个字段，并继承 `subSpan`、`gutter`、`rowProps`。

```ts
{
  type: 'InputGroup',
  field: 'phone',
  label: '联系电话',
  subItems: [
    { type: 'Input', field: 'areaCode', span: 8 },
    { type: 'Input', field: 'number', span: 16 },
  ],
}
```

### 对象绑定与当前对象绑定

```ts
// 有 field：形成 phone.areaCode / phone.number
{ type: 'InputGroup', field: 'phone', subItems: [...] }

// 无 field：子项直接写入当前对象
{ type: 'InputGroup', subItems: [...] }
```

默认紧凑模式将子项 `span` 换算为百分比宽度并拼接控件。通过 `attrs.compact: false` 使用普通 Row/Col，适合子项需要间距或响应式断点的情况。

InputGroup 会把子项规则汇总到统一 FormItem；`required`、`disabled` 也可由容器统一控制。

## TagInput

TagInput 适合用户自由创建标签，不依赖预设 options。

```ts
{
  type: 'TagInput',
  field: 'keywords',
  label: '关键词',
  attrs: {
    newLabel: '添加关键词',
    closable: (tag, index) => index > 0 && tag !== 'system',
  },
}
```

### 数组与字符串模式

```ts
// 推荐：模型为 string[]
{ type: 'TagInput', field: 'tags' }

// 提交为逗号分隔字符串：模型为 'vue,typescript'
{
  type: 'TagInput',
  field: 'tags',
  attrs: { stringifyValue: true },
}
```

| attrs 属性       | 类型             | 默认值   | 说明                             |
| ---------------- | ---------------- | -------- | -------------------------------- |
| `newLabel`       | string/function  | `'添加'` | 新增入口内容                     |
| `closable`       | boolean/function | `true`   | 是否可删除，也可按标签和下标判断 |
| `stringifyValue` | boolean          | `false`  | 是否把标签数组保存为逗号字符串   |

重复标签会被忽略。字符串模式没有逗号转义，标签自身可能含逗号时必须使用数组。

## 事件示例

基础字段的顶层 `onChange` 会先收到 effectData，再收到组件事件参数：

```ts
{
  type: 'Input',
  field: 'code',
  onChange: ({ current }, event) => {
    current.codeTouched = Boolean(event.target.value)
  },
  onUpdate: ({ value }) => console.log('实际模型值', value),
}
```

完整可运行代码见[基础输入示例](/examples?example=basic-inputs)。
