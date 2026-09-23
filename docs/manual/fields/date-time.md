# 日期与范围值

本页集中说明范围值映射与日期格式。AntDV 声明 DatePicker、DateRangePicker、DateMonthPicker、DateQuarterPicker、DateWeekPicker、DateYearPicker、TimePicker、TimeRangePicker；Element Plus 支持 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 及原生 UI 范围模式，TimeSelect 按 UI 协议使用。

以下默认格式以 AntDV 为主。Element Plus 的 `DateRangePicker` 和 `TimeRangePicker` 分别使用日期、时间范围模式；单值模式使用 `DatePicker` 或 `TimePicker`。

## 默认值格式

| 字段       | 默认 `attrs.valueFormat` | 常见模型                       |
| ---------- | ------------------------ | ------------------------------ |
| DatePicker | `YYYY-MM-DD`             | `'2026-08-08'`                 |
| DateRangePicker | `YYYY-MM-DD`             | `['2026-08-01', '2026-08-31']` |
| TimePicker | `HH:mm:ss`               | `'09:30:00'`                   |
| TimeRangePicker | `HH:mm:ss`               | `['09:00:00', '18:00:00']`     |

`attrs.format` 只控制界面显示，`attrs.valueFormat` 控制模型值：

```ts
{
  type: 'DatePicker',
  field: 'birthday',
  label: '出生日期',
  attrs: {
    format: 'YYYY年MM月DD日',
    valueFormat: 'YYYY-MM-DD',
  },
}
```

业务接口要求时间戳时，可以明确设置底层格式，或在 API 适配层转换；不要同时让不同页面保存不同类型。

## DatePicker

```ts
{
  type: 'DatePicker',
  field: 'month',
  label: '结算月份',
  attrs: {
    picker: 'month',
    format: 'YYYY-MM',
    valueFormat: 'YYYY-MM',
    allowClear: true,
  },
}
```

`attrs` 继承 Ant Design Vue DatePicker 属性，常用 `picker`、`format`、`valueFormat`、`showTime`、`allowClear`、`disabledDate`、`disabledTime`。

需要表单上下文时使用字段顶层 `disabledDate`：

```ts
{
  type: 'DatePicker',
  field: 'date',
  disabledDate(effectData, currentDate, ...nativeArgs) {
    return currentDate.isBefore(effectData.current.contractStart, 'day')
  },
}
```

顶层回调固定先接收 effectData，后面保持 UI 框架提供的原生参数顺序，并在存在时覆盖原生 `attrs.disabledDate`。如果只需要 UI 原生签名，直接配置 `attrs.disabledDate`，SuperForm 不改写它。

## DateRangePicker 的三种值模式

### 数组模式

```ts
{
  type: 'DateRangePicker',
  field: 'validPeriod',
  label: '有效期',
}

// 模型
{ validPeriod: ['2026-08-01', '2026-08-31'] }
```

适合后端直接接受范围数组，也是信息最完整的单字段表示。

### endField 双字段模式

```ts
{
  type: 'DateRangePicker',
  field: 'startDate',
  endField: 'endDate',
  label: '有效期',
}

// 模型
{ startDate: '2026-08-01', endDate: '2026-08-31' }
```

控件仍使用数组，模型分别保存。外部修改任一字段都会同步回控件；只读模式显示“开始 - 结束”。适合多数分页查询和数据库字段接口。

### 逗号字符串模式

```ts
{
  type: 'DateRangePicker',
  field: 'validPeriod',
  stringifyValue: true,
  label: '有效期',
}

// 模型
{ validPeriod: '2026-08-01,2026-08-31' }
```

字符串模式不支持值内逗号转义。`endField` 与 `stringifyValue` 同时存在时优先双字段模式。

## DateRangePicker 常用 attrs

```ts
{
  type: 'DateRangePicker',
  field: 'createdAt',
  attrs: {
    allowEmpty: [true, true],
    presets: [{ label: '最近 7 天', value: [start, end] }],
    separator: '至',
    showTime: { format: 'HH:mm' },
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  },
}
```

RangePicker 需要上下文时同样使用顶层 `disabledDate(effectData, ...原生参数)`；`attrs.disabledDate` 始终保持 UI 原生签名。

## TimePicker

```ts
{
  type: 'TimePicker',
  field: 'meetingTime',
  label: '会议时间',
  attrs: {
    format: 'HH:mm',
    valueFormat: 'HH:mm:ss',
    minuteStep: 15,
    secondStep: 10,
    use12Hours: false,
  },
}
```

TimePicker 适合单个时间点；日期和时间都需要时用 DatePicker 的 `showTime`，避免拆成无法明确时区/日期关系的两个字段。

## TimeRangePicker

TimeRangePicker 使用 AntDV Next 的范围时间组件，而不是两个独立 TimePicker：

```ts
{
  type: 'TimeRangePicker',
  field: 'startTime',
  endField: 'endTime',
  label: '营业时间',
  attrs: {
    minuteStep: 30,
    valueFormat: 'HH:mm:ss',
  },
}
```

它支持与 DateRangePicker 相同的数组、`endField`、`stringifyValue` 三种模式。

## 选择建议

| 接口形态           | 推荐配置                         |
| ------------------ | -------------------------------- |
| 一个范围字段       | 默认数组模式                     |
| 独立开始/结束字段  | `endField`                       |
| 逗号字符串     | `stringifyValue`                 |
| 只显示特殊格式     | 只设置 `format`                  |
| 改变存储格式       | 设置 `valueFormat`               |
| 与其他字段联动禁选 | 顶层 `disabledDate(effectData, ...原生参数)` |

可运行对比见[日期与时间示例](/examples?example=date-time)。

<span id="日期与时间"></span>

## 范围提示与注册

AntDV 日期/时间使用原生默认提示，显式 placeholder 优先。Element Plus 范围字段支持 `placeholder: ["开始", "结束"]`，也可以分别设置 `attrs.startPlaceholder` 和 `attrs.endPlaceholder`；显式设置的单端提示优先。

范围字段可自动导入，手动注册时提供对应的 `DatePicker` 或 `TimePicker` 组件即可。
