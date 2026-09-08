<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

const [register, form] = useForm({
  subSpan: 12,
  subItems: [
    { type: 'DatePicker', field: 'date', label: '标准日期' },
    {
      type: 'DatePicker',
      field: 'month',
      label: '月份选择',
      attrs: { picker: 'month', format: 'YYYY年MM月', valueFormat: 'YYYY-MM' },
    },
    {
      type: 'DatePicker',
      field: 'meetingAt',
      label: '日期时间',
      attrs: { showTime: true, valueFormat: 'YYYY-MM-DD HH:mm:ss' },
    },
    { type: 'TimePicker', field: 'remindAt', label: '时间点', attrs: { minuteStep: 15 } },
    { type: 'DateRangePicker', field: 'validRange', label: '范围数组', span: 24 },
    {
      type: 'DateRangePicker',
      field: 'startDate',
      endField: 'endDate',
      label: '开始/结束字段',
      span: 24,
    },
    {
      type: 'DateRangePicker',
      field: 'rangeText',
      label: '逗号字符串',
      span: 24,
      stringifyValue: true,
    },
    {
      type: 'TimeRangePicker',
      field: 'startTime',
      endField: 'endTime',
      label: '时间双字段',
      span: 24,
    },
  ],
})
const model = form.dataSource
</script>
