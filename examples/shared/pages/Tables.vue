<template>
  <section class="demo-section">
    <h2>成员管理</h2>
    <div class="demo-guide">
      搜索姓名或选择状态分类，查询结果与分页一起更新。勾选行后可批量删除；编辑支持行内、弹窗、整表三种模式。全部请求由内存数据模拟，结果可在观察窗追踪。
    </div>
    <div class="demo-actions">
      <label class="demo-control-label"
        >编辑方式<select class="demo-control-input" v-model="mode">
          <option value="inline">行内编辑</option>
          <option value="modal">弹窗编辑</option>
          <option value="all">整表编辑</option>
        </select></label
      ><button class="demo-control" @click="run('刷新', () => table?.reload())">刷新当前页</button
      ><button class="demo-control" @click="run('下一页', () => table?.goPage(page + 1))">下一页</button
      ><button class="demo-control" @click="run('选择首行', () => table?.setSelectedRows(table.getData().slice(0, 1)))">
        选择首行</button
      ><button class="demo-control" @click="run('清空选择', () => table?.setSelectedRows([]))">清空选择</button
      ><button class="demo-control" @click="run('整表校验', () => table?.validate())" :disabled="mode !== 'all'">
        整表校验</button
      ><button class="demo-control" @click="onlyEnabled = !onlyEnabled">
        {{ onlyEnabled ? '显示所有成员' : '动态条件：仅启用' }}
      </button>
    </div>
    <SuperTable :key="`${mode}:${remote}`" :schema="schema" @register="register"
      ><template #demoFooter
        ><small class="demo-muted"
          >业务 footer 插槽 · 当前来源：{{ remote ? '模拟分页接口' : '本地数组' }} · 数据共 {{ rows.length }} 条</small
        ></template
      ></SuperTable
    >
    <p role="status" class="demo-status">{{ status }}</p>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 请求失败、编辑状态与外部变化</h2>
        <div class="dev-controls">
          <label class="demo-control-label"
            ><input
              class="demo-control-input"
              v-model="remote"
              type="checkbox"
            />模拟分页接口（关闭后验证本地插入）</label
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="failSave" type="checkbox" />保存失败</label
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="vetoSave" type="checkbox" />onSave 返回 false</label
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="vetoCancel" type="checkbox" />onCancel 返回 false</label
          ><label class="demo-control-label"
            >延迟(ms)<input class="demo-control-input" v-model.number="delay" type="number" min="0" max="5000"
          /></label>
        </div>
        <div class="dev-controls">
          <button class="demo-control" :disabled="remote" @click="rows.reverse()">反转本地数据</button
          ><button
            class="demo-control"
            :disabled="remote"
            @click="rows = rows.map((row) => ({ ...row, name: row.name + '（外部）' }))"
          >
            同 ID 替换</button
          ><label class="demo-control-label"
            >目标 ID<input class="demo-control-input" v-model.number="targetId" type="number" /></label
          ><button class="demo-control" :disabled="remote" @click="rows = rows.filter((row) => row.id !== targetId)">
            移除目标/锚点</button
          ><button class="demo-control" :disabled="remote" @click="rows = rows.slice(0, 1)">缩为一行</button
          ><button class="demo-control" :disabled="remote" @click="rows = []">清空数据</button
          ><button class="demo-control" @click="replaceColumns">切换附加列</button>
        </div>
        <ol>
          <li>保存失败应保留草稿和编辑状态，关闭失败后重试；保存期间连续点击不应重复请求。</li>
          <li>新增后取消不应删除原行；本地模式行内新增后重排或删除锚点，观察插入位置。</li>
          <li>
            编辑中替换/移除目标、勾选后换页或缩短数据，记录选择与编辑的实际变化。这些是待回归边界，不代表已验证通过。
          </li>
          <li>onSave/onCancel 拦截在不同编辑方式下分别观察；切换方式或数据源会重建表格。</li>
        </ol>
      </div></Teleport
    >
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref, shallowRef } from 'vue'
import { SuperTable, type RootTableOption } from '@demo/product'
import { useDemo } from '../context'
const rows = ref(
  Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: ['陈清禾', '林小满', '许星河'][index % 3] + (index + 1),
    category: index % 2 ? '开发' : '设计',
    city: index % 2 ? '杭州' : '上海',
    enabled: index % 3 !== 0,
    amount: (index + 1) * 100,
    start: '2026-09-01',
    end: '2026-09-30',
    note: '可在弹窗中编辑',
    extraNote: '附加列示例',
    files: [],
  }))
)
const mode = ref('inline'),
  remote = ref(true),
  onlyEnabled = ref(false)
const failSave = ref(false),
  vetoSave = ref(false),
  vetoCancel = ref(false),
  delay = ref(350),
  targetId = ref(1),
  page = ref(1)
const table = shallowRef<any>(),
  lastQuery = ref({})
const { isElement, run, event, status } = useDemo(() => ({
  source: rows.value,
  displayed: table.value?.getData?.(),
  selectedKeys: table.value?.selectedRowKeys,
  selectedRows: table.value?.selectedRows,
  query: lastQuery.value,
  page: page.value,
}))
let sequence = 20,
  request = 0
function register(actions: unknown) {
  table.value = actions
}
async function persist(name: string, data: unknown) {
  const id = ++request
  event(`${name} #${id} 开始`, data)
  await new Promise((resolve) => setTimeout(resolve, Math.max(0, Math.min(5000, delay.value || 0))))
  if (failSave.value) {
    const error = new Error('模拟保存失败，草稿应保留')
    status.value = error.message
    event(`${name} #${id} 失败`, error)
    throw error
  }
  event(`${name} #${id} 成功`, data)
}
const columns: RootTableOption['columns'] = [
  { type: 'Text', field: 'id', label: 'ID', columnProps: { width: 70 } },
  { type: 'Input', field: 'name', label: '姓名', editable: true, required: true, columnProps: { width: 150 } },
  { type: 'Select', field: 'category', label: '职责', editable: true, options: { source: ['设计', '开发'] } },
  {
    type: 'Select',
    field: 'city',
    label: '城市',
    editable: true,
    options: {
      source: async () => {
        await new Promise((resolve) => setTimeout(resolve, 200))
        return ['上海', '杭州', '深圳']
      },
    },
  },
  {
    type: 'Select',
    field: 'regions',
    label: '服务区域',
    editable: true,
    stringifyValue: true,
    options: { source: ['华东', '华南', '华北'] },
    attrs: isElement ? { multiple: true } : { mode: 'multiple' },
  },
  { type: 'Switch', field: 'enabled', label: '启用', editable: true },
  {
    type: 'InputNumber',
    field: 'amount',
    label: '额度',
    editable: ({ current }) => current.enabled,
    attrs: { min: 0 },
  },
  {
    type: 'DateRangePicker',
    field: 'start',
    endField: 'end',
    label: '有效期',
    attrs: { valueFormat: 'YYYY-MM-DD' },
    exclude: ['table'],
  },
  { type: 'Upload', field: 'files', label: '附件', attrs: { uploadMode: 'custom' }, exclude: ['table'] },
  {
    type: 'TextArea',
    field: 'note',
    label: '说明',
    exclude: ['table'],
    span: 24,
  },
]
const schema = computed<RootTableOption>(() => ({
  title: '成员列表',
  columns,
  dataSource: remote.value ? undefined : rows,
  editable: mode.value === 'all',
  params: reactive({ onlyEnabled }),
  pagination: {
    pageSize: 5,
    onChange: (current) => {
      page.value = current
      event('分页变化', current)
    },
  },
  attrs: {
    rowKey: 'id',
    rowSelection: { onChange: (keys) => event('选择变化', keys) },
    ...(isElement
      ? {}
      : {
          onResizeColumn: (width, column) => {
            column.width = width
          },
        }),
  },
  columnProps: { ellipsis: true, ...(isElement ? {} : { resizable: true }) },
  searchForm: {
    subSpan: 8,
    limit: 2,
    subItems: ['name', 'category', 'city'],
    onSubmit: (value) => event('搜索提交', value),
  },
  tabs: {
    field: 'category',
    options: {
      source: [
        { value: '', label: '全部' },
        { value: '设计', label: '设计' },
        { value: '开发', label: '开发' },
      ],
    },
  },
  slots: { footer: 'demoFooter' },
  buttons: { actions: ['add', 'edit', 'delete'] },
  rowButtons: {
    actions: [
      ...(remote.value ? ['edit', 'delete', 'detail'] : ['add', 'edit', 'delete', 'detail']),
      {
        label: '检查',
        disabled: ({ record }) => !record.enabled,
        onClick: ({ record }) => event('检查当前行', record),
      },
    ],
    labelMode: 'label',
  },
  rowEditor: {
    editMode: mode.value === 'modal' ? 'modal' : 'inline',
    addMode: mode.value === 'modal' ? 'modal' : 'inline',
    onSave: () => {
      event('onSave', { veto: vetoSave.value })
      return vetoSave.value ? false : undefined
    },
    onCancel: () => {
      event('onCancel', { veto: vetoCancel.value })
      return vetoCancel.value ? false : undefined
    },
    modalProps: { width: 760 },
    form: { subSpan: 12 },
  },
  apis: {
    ...(remote.value
      ? {
          query: async (params, context) => {
            lastQuery.value = { ...params }
            event('查询请求', params)
            await new Promise((resolve) => setTimeout(resolve, 250))
            if (context?.signal?.aborted) throw new DOMException('查询已取消', 'AbortError')
            const filtered = rows.value.filter(
              (row) =>
                (!params.name || row.name.includes(params.name)) &&
                (!params.category || row.category === params.category) &&
                (!params.city || row.city === params.city) &&
                (!params.onlyEnabled || row.enabled)
            )
            const current = Number(params.current || 1),
              size = Number(params.size || 5)
            page.value = current
            return {
              records: filtered.slice((current - 1) * size, current * size),
              total: filtered.length,
              current,
              size,
            }
          },
          save: async (data) => {
            await persist('新增', data)
            rows.value.push({ ...data, id: ++sequence } as (typeof rows.value)[number])
          },
        }
      : {}),
    update: async (data) => {
      await persist('更新', data)
      const old = rows.value.find((row) => row.id === data.id)
      if (old) Object.assign(old, data)
    },
    delete: async (keys) => {
      await persist('删除', keys)
      rows.value = rows.value.filter((row) => !keys.includes(row.id))
    },
    info: async (id) => {
      event('读取详情', id)
      return { ...rows.value.find((row) => row.id === id) }
    },
  },
}))
let extraColumn = false
function replaceColumns() {
  extraColumn = !extraColumn
  table.value?.setColumns(extraColumn ? [...columns, { type: 'Text', field: 'extraNote', label: '附加说明' }] : columns)
  event('更新列配置', { extraColumn })
}
</script>
