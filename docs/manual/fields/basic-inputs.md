# UI 输入组件

`type` 使用当前 Adapter 声明的 UI 组件名称。AntDV 与 UI 导出同名；Element Plus 的 Schema 名称去掉 `El` 前缀，例如 `ElInput` 对应 `Input`。实际组件由 [unplugin](/manual/auto-components) 或 `initialize({ components })` 提供。

## AntDV 支持清单

`Input`、`TextArea`、`InputNumber`、`InputOTP`、`InputPassword`、`InputSearch`、`AutoComplete`、`Cascader`、`ColorPicker`、`Select`、`Radio`、`RadioGroup`、`Checkbox`、`CheckboxGroup`、`DatePicker`、`DateRangePicker`、`DateMonthPicker`、`DateQuarterPicker`、`DateWeekPicker`、`DateYearPicker`、`TimePicker`、`TimeRangePicker`、`TreeSelect`、`Switch`、`Rate`、`Mentions`、`Segmented`、`Slider`、`Transfer`。

## Element Plus 支持清单

`Input`、`InputNumber`、`InputOtp`、`InputTag`、`Autocomplete`、`Mention`、`Switch`、`Select`、`SelectV2`、`Cascader`、`TreeSelect`、`Radio`、`RadioGroup`、`Checkbox`、`CheckboxGroup`、`DatePicker`、`TimePicker`、`TimeSelect`、`ColorPicker`、`Rate`、`Slider`、`Segmented`、`Transfer`。

同名不代表两套产品具有完全相同的 Props 或增强能力；`AutoComplete` / `Autocomplete`、`InputOTP` / `InputOtp` 的大小写按清单填写。

## SuperForm 适配能力

| 字段 | AntDV | Element Plus |
| --- | --- | --- |
| Input | 默认提示、搜索动作与等待状态 | 默认提示、搜索动作与附加按钮 |
| TextArea / InputNumber | 提示、宽度等默认属性 | 多行输入使用 Input 的 UI 属性；InputNumber 使用 UI 协议 |
| AutoComplete | 选项与标签值处理 | Autocomplete 使用 UI 建议接口 |
| Select / RadioGroup / CheckboxGroup | [选项处理](/manual/fields/selections) | 对应字段及 SelectV2 接入[选项处理](/manual/fields/selections) |
| TreeSelect | 树选项与关联标签处理 | UI 树选择协议 |
| Switch | 业务值、标签与 checked 映射 | 业务值、标签与 modelValue 映射 |
| 日期与时间 | picker 值处理与格式默认值 | DatePicker / TimePicker 接入 picker，格式由 UI 属性指定 |
| Radio / Checkbox / Transfer | checked 或 targetKeys 受控值映射 | modelValue 受控值映射 |
| 其他清单字段 | 通用 Schema 绑定与 UI Props | 通用 Schema 绑定与 UI Props |

通用模型、联动和校验见[核心指南](/manual/schema)。UI 原生 Props 放在 `attrs`，动态 Props 使用 `dynamicAttrs`；本页不重复列出每个 UI 组件的全部属性。

## Input

Input 适合单行字符串，按 label 生成输入提示。以下搜索按钮与事件示例采用 AntDV 写法；Element Plus 通过附加按钮提供搜索入口。

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

`attrs` 使用当前 UI 库的 Input Props。

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

### 场景示例：输入值变化 {#事件示例}

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

## TextArea

AntDV TextArea 默认宽度为 100%、允许清空，并按 label 生成提示。Element Plus 多行输入使用 `Input` 的 `attrs.type: "textarea"`。

## InputNumber

AntDV InputNumber 补充宽度与输入提示。控件的 min/max 等输入限制与 Schema rules 校验各有职责；外部回填数据仍需业务校验。

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

## 内置输入入口

<span id="inputgroup"></span>

[InputGroup](/manual/fields/built-in-inputs#inputgroup)

<span id="taginput"></span>

[TagInput](/manual/fields/built-in-inputs#taginput)

<span id="对象绑定与当前对象绑定"></span>
<span id="数组与字符串模式"></span>

<span id="基础输入"></span>
