<template>
  <SuperForm @register="register" @submit="result = $event" />
  <pre>{{ result }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperForm, useForm } from 'superform-antdv'

const result = ref()
const [register] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'InputNumber', field: 'age', label: '年龄', attrs: { min: 0 } },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      initialValue: 1,
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    { type: 'TextArea', field: 'remark', label: '备注', span: 24 },
  ],
})
</script>
