<template>
  <section class="test-page">
    <header>
      <p class="eyebrow">P007 · TABLE CAPABILITY</p>
      <h2>表格选择、展开与行内编辑</h2>
      <p>验证 Table 的组件树、选择和展开协议均由 AntDV Adapter 提供，Core 只维护领域状态。</p>
    </header>

    <SuperTable :default-expand-level="1" @register="registerTable" />

    <pre>选中行：{{ selectedRows }}</pre>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { SuperTable, useTable } from 'superform-antdv'

const rows = ref([
  {
    id: 1,
    name: 'Adapter 协议',
    status: '完成',
    children: [{ id: 11, name: '展开事件映射', status: '完成' }],
  },
  { id: 2, name: 'Core 查询逻辑', status: '保持不变' },
])

const [registerTable, table] = useTable({
  title: 'P007 验证表格',
  dataSource: rows,
  attrs: {
    rowKey: 'id',
    rowSelection: {},
    pagination: false,
  },
  rowEditor: {
    editMode: 'inline',
  },
  rowButtons: {
    actions: ['edit'],
  },
  columns: [
    { type: 'Input', field: 'name', label: '能力', editable: true },
    { type: 'Text', field: 'status', label: '状态' },
  ],
})

const selectedRows = computed(() => table.selectedRows.value?.map((row) => row.name) || [])
</script>

<style scoped>
.test-page {
  display: grid;
  gap: 20px;
}

.test-page header,
.test-page h2,
.test-page p {
  margin: 0;
}

.eyebrow {
  color: #1677ff;
  font-weight: 700;
}

pre {
  margin: 0;
  padding: 12px;
  background: #f5f5f5;
}
</style>
