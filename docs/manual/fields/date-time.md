# 日期与范围值

本页集中说明范围值映射与日期格式。AntDV 声明 DatePicker、DateRangePicker、DateMonthPicker、DateQuarterPicker、DateWeekPicker、DateYearPicker、TimePicker、TimeRangePicker；Element Plus 使用 DatePicker、TimePicker 及其 UI 范围模式，TimeSelect 按 UI 协议使用。

以下专用范围组件名、默认格式和示例采用 AntDV。Element Plus 的范围选择通过 DatePicker 的 `type` 或 TimePicker 的 `isRange` 配置，并按组件要求显式设置 `valueFormat`；不能直接使用 AntDV 的 DateRangePicker 名称。

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

`disabledDate` 会额外获得当前字段上下文：

```ts
attrs: {
  disabledDate(currentDate, { current }) {
    return currentDate.isBefore(current.contractStart, 'day')
  },
}
```

第一个参数是日期对象，第二个参数是 effectData，适合同一 Schema 内的日期边界联动。

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

RangePicker 的 `disabledDate(currentDate, effectData)` 同样支持上下文。

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
| 与其他字段联动禁选 | `disabledDate(date, effectData)` |

可运行对比见[日期与时间示例](/examples?example=date-time)。

<span id="日期与时间"></span>
