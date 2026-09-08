<template><SuperForm @register="register" /></template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

const [register] = useForm({
  subItems: [
    {
      type: 'InputList',
      field: 'emails',
      label: '通知邮箱',
      initialValue: () => [''],
      columns: [{ type: 'Input', field: '$index', rules: { type: 'email' } }],
    },
    {
      type: 'ListGroup',
      field: 'experiences',
      title: '工作经历',
      initialValue: () => [{}],
      attrs: { labelIndex: true },
      columns: [
        { type: 'Input', field: 'company', label: '公司', required: true },
        { type: 'Input', field: 'position', label: '职位' },
        { type: 'DateRangePicker', field: 'startDate', endField: 'endDate', label: '任职时间' },
      ],
    },
  ],
})
</script>
