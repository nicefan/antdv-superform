<template><SuperForm @register="register" /></template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

const [register] = useForm({
  subSpan: 12,
  subItems: [
    {
      type: 'RadioGroup',
      field: 'result',
      label: '审核结果',
      initialValue: 'pass',
      options: [
        { label: '通过', value: 'pass' },
        { label: '驳回', value: 'reject' },
      ],
    },
    {
      type: 'TextArea',
      field: 'reason',
      label: '驳回原因',
      span: 24,
      hidden: ({ current }) => current.result !== 'reject',
      required: ({ current }) => current.result === 'reject',
    },
    { type: 'InputNumber', field: 'quantity', label: '数量', initialValue: 1 },
    { type: 'InputNumber', field: 'price', label: '单价', initialValue: 100 },
    {
      type: 'InputNumber',
      field: 'amount',
      label: '金额',
      disabled: true,
      computed: (_value, { current }) => current.quantity * current.price,
    },
  ],
})
</script>
