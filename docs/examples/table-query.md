# 表格查询与刷新

```vue playground
<template>
  <div class="toolbar">
    <button @click="table.query()">查询第一页</button>
    <button @click="table.reload()">刷新当前页</button>
  </div>
  <SuperTable @register="register" />
</template>

<script setup>
import { SuperTable, useTable } from 'antdv-superform'

const rows = Array.from({ length: 35 }, (_, index) => ({
  id: index + 1,
  name: `成员 ${index + 1}`,
}))

const [register, table] = useTable({
  immediate: true,
  attrs: { rowKey: 'id' },
  pagination: { pageSize: 8 },
  apis: {
    async query(params) {
      const current = params.current ?? 1
      const size = params.size ?? 8
      return {
        current,
        size,
        total: rows.length,
        records: rows.slice((current - 1) * size, current * size),
      }
    },
  },
  columns: [
    { field: 'id', label: '编号' },
    { type: 'Input', field: 'name', label: '姓名' },
  ],
})
</script>

<style>
.toolbar { display: flex; gap: 8px; margin-bottom: 16px; }
.toolbar button { padding: 6px 12px; }
</style>
```
