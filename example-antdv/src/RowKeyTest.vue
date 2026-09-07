<template>
  <section class="row-key-test">
    <h2>无 rowKey 增删回归测试</h2>
    <p>数据源中的记录均不包含 <code>id</code>。按钮通过外部 tableAction 调用行内新增、编辑和删除方法。</p>

    <Space class="test-actions">
      <Button type="primary" data-testid="add-row" @click="addRow">新增一行</Button>
      <Button data-testid="edit-selected" @click="editSelected">编辑选中</Button>
      <Button danger data-testid="delete-selected" @click="deleteSelected">删除选中</Button>
      <Button data-testid="reverse-rows" @click="reverseRows">反转顺序</Button>
    </Space>

    <SuperTable @register="register" />

    <Alert
      :type="dataIsClean ? 'success' : 'error'"
      :message="dataIsClean ? 'PASS：业务数据未被写入内部 key' : 'FAIL：业务数据出现了 id 或 _ID_ 字段'"
      show-icon
      data-testid="mutation-result"
    />
    <p data-testid="row-count">当前业务数据：{{ rows.length }} 行</p>
    <pre data-testid="source-data">{{ sourceSnapshot }}</pre>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, Button, Space } from 'antdv-next'
import { SuperTable, useTable } from 'superform-antdv'

type TestRow = {
  name: string
  amount: number
}

const rows = ref<TestRow[]>([
  { name: 'Alpha', amount: 10 },
  { name: 'Beta', amount: 20 },
])
const sequence = ref(2)

const [register, tableAction] = useTable({
  title: '无 rowKey 表格',
  dataSource: rows,
  attrs: {
    pagination: false,
    rowSelection: {},
  },
  rowEditor: {
    editMode: 'inline',
  },
  rowButtons: {
    actions: ['add', 'edit', 'delete'],
  },
  columns: [
    { type: 'Input', label: '名称', field: 'name', editable: true },
    { type: 'InputNumber', label: '数量', field: 'amount', editable: true },
  ],
})

const addRow = () => {
  sequence.value += 1
  tableAction.add({
    resetData: {
      name: `新增行 ${sequence.value}`,
      amount: sequence.value * 10,
    },
  })
}

const deleteSelected = () => tableAction.delete()
const editSelected = () => tableAction.edit()
const reverseRows = () => {
  rows.value = [...rows.value].reverse()
}

const dataIsClean = computed(() =>
  rows.value.every((record) => !Reflect.ownKeys(record).some((key) => key === 'id' || key === '_ID_'))
)
const sourceSnapshot = computed(() => JSON.stringify(rows.value, null, 2))
</script>

<style scoped>
.row-key-test {
  display: grid;
  gap: 16px;
}

.test-actions {
  margin-bottom: 4px;
}

pre {
  margin: 0;
  padding: 12px;
  overflow: auto;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
