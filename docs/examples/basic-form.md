# 基础表单

```vue playground
<template>
  <SuperForm @register="register" />
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  title: '用户资料',
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Input', field: 'name', label: '姓名', required: true },
    {
      type: 'Select',
      field: 'role',
      label: '角色',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '成员', value: 'member' },
      ],
    },
    { type: 'DatePicker', field: 'birthday', label: '生日' },
    { type: 'Textarea', field: 'remark', label: '备注', attrs: { rows: 3 } },
  ],
  onSubmit(values) {
    console.log('提交数据', values)
  },
})
</script>
```
