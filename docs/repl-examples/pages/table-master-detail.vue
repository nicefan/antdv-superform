<template>
  <div class="demo-note">选择左侧部门后，右侧员工表才会发起查询。</div>
  <div class="linked-tables">
    <SuperTable @register="registerDepartments" />
    <SuperTable @register="registerEmployees" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SuperTable, useTable } from 'superform-antdv'
import { mockApis, mockDepartments } from './mock'

const departmentId = ref()

const [registerDepartments] = useTable(
  {
    title: '部门',
    isScanHeight: false,
    pagination: false,
    attrs: {
      rowKey: 'id',
      rowSelection: {
        type: 'radio',
        onSelect: (record, selected) => selected && (departmentId.value = record.id),
      },
    },
    columns: [{ field: 'name', label: '部门名称' }],
  },
  mockDepartments
)

const [registerEmployees] = useTable({
  title: '部门员工',
  isScanHeight: false,
  pagination: false,
  immediate: false,
  attrs: { rowKey: 'id' },
  apis: { query: mockApis.employees.list },
  params: { departmentId },
  columns: [
    { field: 'name', label: '姓名' },
    { field: 'position', label: '岗位' },
  ],
})
</script>

<style>
.linked-tables {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 2fr;
  gap: 16px;
}
@media (max-width: 720px) {
  .linked-tables {
    grid-template-columns: 1fr;
  }
}
</style>
