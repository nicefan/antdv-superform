# 快速开始

## 创建表单

下面的代码可以直接送入演练场。

```vue playground
<template>
  <SuperForm @register="register" />
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register, form] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '名称', required: true },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  ],
  onSubmit(data) {
    console.log('提交', data)
  },
})
</script>
```

`useForm` 只接收 schema。外部模型通过 schema 的 `dataSource` 绑定。

## 创建表格

```vue
<template><SuperTable @register="register" /></template>

<script setup lang="ts">
import { SuperTable, useTable } from 'antdv-superform'

const [register, table] = useTable({
  immediate: true,
  pagination: { pageSize: 20 },
  attrs: { rowKey: 'id' },
  apis: {
    query: (params, { signal }) => api.queryUsers(params, { signal }),
  },
  columns: [
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Select', field: 'status', label: '状态', options: ['启用', '停用'] },
  ],
})
</script>
```
