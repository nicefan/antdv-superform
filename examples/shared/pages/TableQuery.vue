<template>
  <section class="demo-section">
    <h2>查询条件与接口转换</h2>
    <div class="demo-guide">
      搜索姓名、切换状态分类、筛选部门或点击 ID
      排序。翻页和刷新保留这些条件；查看导出条件时不包含分页、本次临时参数和请求前补充的 client。
    </div>
    <div class="demo-actions">
      <button class="demo-control" @click="run('刷新当前页', () => table?.reload())">
        刷新当前页
      </button>
      <button class="demo-control" @click="run('临时查询', () => table?.query({ preview: true }))">
        临时参数查询
      </button>
      <button class="demo-control" @click="run('导出条件', () => table?.getQueryParams())">
        查看导出条件
      </button>
      <label class="demo-control-label">
        <input v-model="onlyEnabled" class="demo-control-input" type="checkbox" />动态条件：仅启用
      </label>
    </div>
    <SuperTable
      :key="filterEnabled ? 'enabled' : 'disabled'"
      :schema="schema"
      @register="register"
    />
    <p class="demo-status" role="status">已发起 {{ requestCount }} 次查询。{{ status }}</p>
    <Teleport to="#demo-test-content">
      <div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 转换顺序、分页与导出条件</h2>
        <div class="dev-controls">
          <label class="demo-control-label">
            <input
              v-model="filterEnabled"
              class="demo-control-input"
              type="checkbox"
            />开启列筛选排序转换（切换后重建表格）
          </label>
          <label class="demo-control-label">
            <input v-model="failQuery" class="demo-control-input" type="checkbox" />查询失败
          </label>
          <label class="demo-control-label">
            请求延迟(ms)<input
              v-model.number="delay"
              class="demo-control-input"
              type="number"
              min="0"
              max="5000"
            />
          </label>
        </div>
        <ol>
          <li>
            一次分页交互只增加一次查询；修改每页条数回到第一页。增加延迟后观察旧数据的索引，成功回写时才换号。
          </li>
          <li>
            筛选部门后刷新或翻页，查询条件仍保留；查看导出条件，确认与请求中的
            departmentValues/orderBy 一致。
          </li>
          <li>
            临时查询的 preview、beforeQuery 添加的 client 和 offset/limit 只出现在请求参数中。
          </li>
          <li>
            观察事件顺序：resultTransform 解包响应，afterQuery 接收标准分页结果并返回 void，最后
            onLoaded 通知数据回写。
          </li>
          <li>
            关闭列转换后操作筛选排序，只记录统一事件，不额外查询或传递列条件；查询失败和快速翻页时旧索引保持不变。
          </li>
        </ol>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, shallowRef } from 'vue'
import { SuperTable, type RootTableOption, type UITableChange } from '@demo/product'
import { useDemo } from '../context'

const departments = ['研发中心', '产品中心', '运营中心']
const rows = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  name: ['张明', '李华', '王芳'][index % 3] + ' ' + (index + 1),
  status: index % 2,
  department: departments[index % departments.length],
}))
const statusOptions = [
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
]
const onlyEnabled = ref(false)
const filterEnabled = ref(true)
const failQuery = ref(false)
const delay = ref(650)
const requestCount = ref(0)
const lastRequest = ref({})
const lastChange = shallowRef<UITableChange>()
const table = shallowRef<any>()
const params = reactive({ onlyEnabled })
const { isElement, event, run, status } = useDemo(() => ({
  displayed: table.value?.getData?.(),
  requestCount: requestCount.value,
  lastRequest: lastRequest.value,
  queryConditions: table.value?.getQueryParams?.(),
  lastChange: lastChange.value,
}))

function register(actions: unknown) {
  table.value = actions
}

const schema = computed<RootTableOption>(() => ({
  title: '成员查询',
  indexColumn: true,
  attrs: {
    rowKey: 'id',
    pagination: { pageSize: 6, pageSizeOptions: [6, 12, 18], showSizeChanger: true },
    filterSortTransform: filterEnabled.value
      ? ({ filters, sorters }) => ({ departmentValues: filters.department ?? [], orderBy: sorters })
      : false,
    pageTransform: ({ current, size }) => ({ offset: (current - 1) * size, limit: size }),
    resultTransform: (response) => {
      const result = {
        current: response.data.pageNum,
        size: response.data.pageSize,
        total: response.data.totalCount,
        records: response.data.list,
      }
      event('resultTransform：响应转为标准分页', result)
      return result
    },
    onTableChange: (change) => {
      lastChange.value = change
      event('统一表格事件', change)
    },
  },
  apis: {
    query: async (query, context) => {
      requestCount.value += 1
      lastRequest.value = { ...query }
      event('查询请求', query)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(0, Math.min(5000, delay.value || 0)))
      )
      if (context?.signal?.aborted) throw new DOMException('查询已取消', 'AbortError')
      if (failQuery.value) {
        const error = new Error('模拟查询失败，旧数据与索引应保留')
        status.value = error.message
        event('查询失败', error)
        throw error
      }
      const filtered = rows.filter(
        (row) =>
          (!query.name || row.name.includes(query.name)) &&
          (query.status == null || query.status === '' || row.status === query.status) &&
          (!query.onlyEnabled || row.status === 1) &&
          (!query.departmentValues?.length || query.departmentValues.includes(row.department))
      )
      const sorter = query.orderBy?.find((item) => item.field === 'id')
      if (sorter)
        filtered.sort((left, right) => (left.id - right.id) * (sorter.order === 'asc' ? 1 : -1))
      const size = Number(query.limit || 6)
      const offset = Number(query.offset || 0)
      // 模拟非标准响应，由 resultTransform 解包并映射分页字段。
      return {
        data: {
          pageNum: Math.floor(offset / size) + 1,
          pageSize: size,
          totalCount: filtered.length,
          list: filtered.slice(offset, offset + size).map((row) => ({ ...row })),
        },
      }
    },
  },
  params,
  beforeQuery: (query) => ({ ...query, client: 'members-demo' }),
  afterQuery: (result) => {
    // 返回 void 保留已转换的结果，观察业务钩子收到的标准结构。
    event('afterQuery：标准分页结果', result)
  },
  onLoaded: (result) => {
    status.value = '数据已回写，可以查看请求参数和导出条件。'
    event('onLoaded：数据已回写', result)
  },
  searchForm: { subItems: ['name'] },
  tabs: {
    field: 'status',
    defaultActiveKey: '',
    options: { source: [{ label: '全部', value: '' }, ...statusOptions] },
  },
  columns: [
    {
      field: 'id',
      label: 'ID',
      columnProps: isElement ? { sortable: 'custom' } : { sorter: true },
    },
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Select', field: 'status', label: '状态', options: { source: statusOptions } },
    {
      field: 'department',
      label: '部门',
      columnProps: { filters: departments.map((name) => ({ text: name, value: name })) },
    },
  ],
}))
</script>
