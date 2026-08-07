# 日期与时间范围

`DateRange` 和 `TimeRange` 可把一个范围拆到两个模型字段。

```ts
{
  type: 'TimeRange',
  field: 'startTime',
  endField: 'endTime',
  label: '值班时间'
}
```

TimeRange 使用 Ant Design Vue 的 TimeRangePicker，默认 `valueFormat` 为 `HH:mm:ss`。
