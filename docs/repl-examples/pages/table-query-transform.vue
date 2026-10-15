<template>
  <div class="demo-note">
    筛选部门或点击 ID 排序，再翻页、刷新或查看导出条件。接口使用 offset/limit，响应先转换再进入
    afterQuery；慢请求期间旧数据保留旧索引。表格工具栏刷新会清除列条件并回到第一页，保留搜索和分类；密度与列设置调整视图。
  </div>
  <p>
    <button @click="table.reload()">刷新当前页</button>
    <button @click="table.query({ preview: true })">临时参数查询</button>
    <button @click="exportParams = table.getQueryParams()">查看导出条件</button>
    已发起 {{ requestCount }} 次查询
  </p>
  <SuperTable @register="register" />
  <pre class="demo-model">{{
    JSON.stringify({ requestParams, exportParams, change, stages }, null, 2)
  }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperTable, useTable } from 'superform-antdv'
import { cloneMock, departmentNameOptions, mockDelay, mockUsers, statusOptions } from './mock'

const requestParams = ref({})
const exportParams = ref({})
const requestCount = ref(0)
const change = ref()
const stages = ref([])

const [register, table] = useTable({
  indexColumn: true,
  attrs: {
    tableTools: ['refresh', 'density', 'columnSetting'],
    rowKey: 'id',
    pagination: { pageSize: 6, pageSizeOptions: [6, 12, 18], showSizeChanger: true },
    filterSortTransform: ({ filters, sorters }) => ({
      departmentValues: filters.department ?? [],
      orderBy: sorters,
    }),
    pageTransform: ({ current, size }) => ({ offset: (current - 1) * size, limit: size }),
    resultTransform: (response) => {
      stages.value = ['resultTransform']
      return {
        current: response.data.pageNum,
        size: response.data.pageSize,
        total: response.data.totalCount,
        records: response.data.list,
      }
    },
    onTableChange: (value) => {
      change.value = value
    },
  },
  apis: {
    query: async (params, { signal }) => {
      requestCount.value += 1
      requestParams.value = cloneMock(params)
      await mockDelay(650, signal)
      const rows = mockUsers.filter(
        (row) =>
          (!params.name || row.name.includes(params.name)) &&
          (params.status == null || params.status === '' || row.status === params.status) &&
          (!params.departmentValues?.length || params.departmentValues.includes(row.department))
      )
      const sorter = params.orderBy?.find((item) => item.field === 'id')
      if (sorter)
        rows.sort((left, right) => (left.id - right.id) * (sorter.order === 'asc' ? 1 : -1))
      const size = Number(params.limit || 6)
      const offset = Number(params.offset || 0)
      return {
        data: {
          pageNum: Math.floor(offset / size) + 1,
          pageSize: size,
          totalCount: rows.length,
          list: cloneMock(rows.slice(offset, offset + size)),
        },
      }
    },
  },
  beforeQuery: (params) => ({ ...params, client: 'members-demo' }),
  afterQuery: (result) => {
    // afterQuery 接收标准结果；返回 void 时继续使用该结果。
    stages.value.push('afterQuery：' + result.records.length + ' 条记录')
  },
  onLoaded: () => {
    stages.value.push('onLoaded')
  },
  searchForm: { subItems: ['name', 'status'] },
  columns: [
    { field: 'id', label: 'ID', columnProps: { sorter: true } },
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Select', field: 'status', label: '状态', options: { source: statusOptions } },
    {
      field: 'department',
      label: '部门',
      columnProps: {
        filters: departmentNameOptions.map(({ label, value }) => ({ text: label, value })),
      },
    },
  ],
})
</script>
