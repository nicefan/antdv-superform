<template>
  <SuperTable @register="register" />
</template>

<script setup>
import { SuperTable, useTable } from 'superform-antdv'
import { mockApis, statusOptions } from './mock'

const [register] = useTable({
  pagination: { pageSize: 8 },
  attrs: { rowKey: 'id' },
  apis: { query: mockApis.users.page },
  searchForm: { subItems: ['name', 'status'] },
  columns: [
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Select', field: 'status', label: '状态', options: { source: statusOptions } },
  ],
})
</script>
