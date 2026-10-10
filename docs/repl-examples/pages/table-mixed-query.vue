<template>
  <div class="demo-note">
    输入名称后点击查询；切换状态通过 params 自动调度查询，约 300ms 后刷新。
  </div>
  <SuperTable @register="register" />
</template>

<script setup>
import { reactive, toRef } from 'vue'
import { SuperTable, useTable } from 'superform-antdv'
import { mockApis, statusOptions } from './mock'

const filters = reactive({ status: undefined })
const status = toRef(filters, 'status')

const [register] = useTable({
  attrs: { rowKey: 'id', pagination: false },
  apis: { query: mockApis.customers.list },
  params: { status },
  searchForm: {
    subItems: [
      { type: 'Input', field: 'name', label: '客户名称' },
      {
        type: 'Select',
        field: 'status',
        label: '状态',
        value: status,
        options: { source: statusOptions },
      },
    ],
  },
  columns: [
    { field: 'name', label: '客户名称' },
    { field: 'status', label: '状态', options: { source: statusOptions } },
  ],
})
</script>
