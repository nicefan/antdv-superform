<template>
  <div class="demo-note">修改关键词、状态或部门，表格会自动刷新，无需点击查询。</div>
  <SuperTable @register="register" />
</template>

<script setup>
import { SuperTable, useTable } from 'superform-antdv'
import { departmentNameOptions, mockApis, statusOptions } from './mock'

const [register] = useTable({
  isScanHeight: false,
  pagination: false,
  attrs: { rowKey: 'id' },
  apis: { query: mockApis.users.list },
  searchForm: {
    searchOnChange: true,
    subSpan: 8,
    subItems: [
      { type: 'Input', field: 'name', label: '姓名' },
      {
        type: 'Select',
        field: 'status',
        label: '状态',
        options: statusOptions,
      },
      {
        type: 'Select',
        field: 'department',
        label: '部门',
        options: departmentNameOptions,
      },
    ],
  },
  columns: [
    { field: 'name', label: '姓名' },
    { field: 'department', label: '部门' },
    { field: 'status', label: '状态', options: statusOptions },
  ],
})
</script>
