<template><SuperDetail :schema="schema" :data-source="record" /></template>

<script setup>
import { SuperDetail } from 'superform-antdv'

const record = {
  name: 'Antdv SuperForm',
  status: 1,
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  description: '同一份字段 Schema 可以服务于输入和只读展示。',
}
const schema = {
  mode: 'table',
  attrs: { bordered: true },
  subSpan: 12,
  subItems: [
    { field: 'name', label: '名称' },
    { field: 'status', label: '状态', options: { source: { 0: '停用', 1: '启用' } } },
    { type: 'DateRangePicker', field: 'startDate', endField: 'endDate', label: '有效期' },
    { type: 'TextArea', field: 'description', label: '说明', span: 24 },
  ],
}
</script>
