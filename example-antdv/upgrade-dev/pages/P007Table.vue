<template>
  <section class="test-page">
    <h2>Form / Table 定向验证 · AntDV</h2>
    <ol>
      <li>编辑名称为空后保存，应显示必填错误且不调用持久化；整表校验区展示统一错误详情。</li>
      <li>开启保存失败，修改后保存：草稿和编辑按钮应保留，源数据不变；关闭失败后重试。</li>
      <li>设置延迟 2000ms 后连续点保存、尝试取消，检查单次请求和编辑锁；普通取消应丢弃草稿。</li>
      <li>分别开启 onSave / onCancel 返回 false，检查阻止退出；关闭后可继续操作。</li>
      <li>
        新增后取消不应删除原行；切换到本地数组模式，行内新增后重排或删除锚点，再保存，记录插入结果。模拟 API
        模式由示例接口追加到末尾。
      </li>
      <li>下一阶段观察：编辑中反转、同 ID 替换、删除目标、缩短数据；勾选后翻页/缩短数据，检查选择与页码。</li>
    </ol>
    <div class="controls">
      <label
        >新增持久化<select :value="persistence" @change="changePersistence">
          <option value="api">模拟 API（失败/重试）</option>
          <option value="local">本地数组（插入锚点）</option>
        </select></label
      >
      <label><input v-model="failSave" type="checkbox" />保存失败</label>
      <label><input v-model="vetoSave" type="checkbox" />onSave 返回 false</label>
      <label><input v-model="vetoCancel" type="checkbox" />onCancel 返回 false</label>
      <label>保存延迟(ms)<input v-model.number="delay" type="number" min="0" max="10000" /></label>
    </div>
    <div class="controls">
      <button @click="rows.reverse()">外部反转</button>
      <button
        @click="
          rows = rows.map((row) => ({
            ...row,
            name: row.name + '（外部替换）',
          }))
        "
      >
        同 ID 替换对象
      </button>
      <label>目标 ID<input v-model.number="targetId" type="number" /></label>
      <button @click="rows = rows.filter((row) => row.id !== targetId)">外部删除目标/锚点</button>
      <button @click="rows = rows.slice(0, 1)">缩为一行</button>
      <button @click="rows = []">清空数据</button>
      <button @click="table.setSelectedRows(rows.slice(0, 1))">外部选择首行</button>
      <button @click="table.setSelectedRows([])">清空选择</button>
      <button @click="reset">重置本页</button>
    </div>
    <SuperTable @register="registerTable" />
    <pre>
分页事件：{{ pageState }}；选中 keys：{{ table.selectedRowKeys.value }}；选中行：{{ table.selectedRows.value }}</pre
    >
    <pre>源数据：{{ rows }}</pre>
    <pre role="status">{{ logs.join('\n') }}</pre>
    <h3>整表编辑校验</h3>
    <p>清空名称再校验，对比 fields.path/messages；填回名称应返回 void。</p>
    <button @click="validateTable">整表校验</button>
    <SuperTable @register="registerEditable" />
    <pre>{{ validation }}</pre>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormValidationError, SuperTable, useTable } from 'superform-antdv'

const initialRows = () =>
  Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `成员 ${index + 1}`,
    status: '原始数据',
  }))
const rows = ref(initialRows())
const failSave = ref(true)
const vetoSave = ref(false)
const vetoCancel = ref(false)
const delay = ref(700)
const targetId = ref(1)
const pageState = ref({ current: 1, pageSize: 2 })
const persistence = new URLSearchParams(location.search).get('persistence') === 'local' ? 'local' : 'api'
function changePersistence(event: Event) {
  const url = new URL(location.href)
  url.searchParams.set('persistence', (event.target as HTMLSelectElement).value)
  location.href = url.href
}
const logs = ref<string[]>([])
let sequence = 10
let requests = 0
function log(message: string) {
  logs.value = [...logs.value.slice(-19), message]
}
async function persist(action: string, data: unknown) {
  const request = ++requests
  log(`#${request} ${action} 开始 ${JSON.stringify(data)}`)
  await new Promise((resolve) => setTimeout(resolve, Math.max(0, Math.min(10000, delay.value || 0))))
  if (failSave.value) {
    log(`#${request} 失败（模拟）`)
    throw new Error('模拟保存失败')
  }
  log(`#${request} 成功`)
}
const [registerTable, table] = useTable({
  title: '行内编辑（默认 small，显式覆盖为 large）',
  dataSource: rows,
  pagination: {
    pageSize: 2,
    onChange: (current: number, pageSize: number) => {
      pageState.value = { current, pageSize }
      log(`分页：${current} / ${pageSize}`)
    },
  },
  attrs: {
    rowKey: 'id',
    size: 'large',
    rowSelection: { onChange: (keys) => log(`选择：${JSON.stringify(keys)}`) },
  },
  buttons: { actions: ['add'] },
  rowEditor: {
    editMode: 'inline',
    onSave: ({ isNew }) => {
      log(`onSave isNew=${!!isNew} veto=${vetoSave.value}`)
      return vetoSave.value ? false : undefined
    },
    onCancel: () => {
      log(`onCancel veto=${vetoCancel.value}`)
      return vetoCancel.value ? false : undefined
    },
  },
  rowButtons: { actions: ['add', 'edit', 'delete'], labelMode: 'label' },
  apis: {
    // 本地模拟接口不写业务服务器；新增成功后由外部数据源推入结果。
    ...(persistence === 'api'
      ? {
          save: async (data: Record<string, unknown>) => {
            await persist('新增', data)
            rows.value.push({
              ...data,
              id: ++sequence,
            } as (typeof rows.value)[number])
          },
        }
      : {}),
    update: (data) => persist('更新', data),
  },
  columns: [
    { type: 'Text', field: 'id', label: 'ID' },
    {
      type: 'Input',
      field: 'name',
      label: '姓名',
      editable: true,
      required: true,
    },
    { type: 'Text', field: 'status', label: '状态' },
  ],
})
function reset() {
  // 完整重建页面，避免把正在保存的回调或编辑缓存带入下一次人工复现。
  location.reload()
}
const validation = ref('尚未校验')
const [registerEditable, editable] = useTable({
  title: '整表校验',
  dataSource: [{ id: 1, name: '' }],
  editable: true,
  pagination: false,
  attrs: { rowKey: 'id' },
  columns: [{ type: 'Input', field: 'name', label: '必填姓名', required: true }],
})
async function validateTable() {
  try {
    const value = await editable.validate()
    validation.value = `校验成功：${String(value)}`
  } catch (error) {
    validation.value =
      error instanceof FormValidationError
        ? JSON.stringify(
            {
              name: error.name,
              fields: error.fields,
              hasCause: error.cause != null,
            },
            null,
            2
          )
        : String(error)
  }
}
</script>

<style scoped>
.test-page {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: white;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
input[type='number'] {
  width: 90px;
}
pre {
  margin: 0;
  padding: 12px;
  background: #f4f6fa;
  overflow: auto;
  max-height: 320px;
}
</style>
