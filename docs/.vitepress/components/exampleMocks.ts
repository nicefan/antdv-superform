export const sharedMockCode = `export interface MockRequestContext {
  signal?: AbortSignal
}

type MockRecord = Record<string, unknown>
type MatchMode = 'contains' | 'equals'
type MatchRules = Record<string, MatchMode>

export const statusOptions = [
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
]

export const departmentOptions = [
  { label: '研发中心', value: 1 },
  { label: '产品中心', value: 2 },
  { label: '运营中心', value: 3 },
]

export const departmentNameOptions = departmentOptions.map(({ label }) => ({
  label,
  value: label,
}))

export const customerOptions = [
  { label: '星海科技有限公司', value: 101 },
  { label: '远山制造有限公司', value: 102 },
]

export const mockUsers = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  name: ['张明', '李华', '王芳'][index % 3] + ' ' + (index + 1),
  status: index % 2,
  department: departmentOptions[index % departmentOptions.length].label,
}))

export const mockCustomers = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: '客户 ' + (index + 1),
  status: index % 2,
}))

export const mockDepartments = departmentOptions.map(({ label, value }) => ({
  id: value,
  name: label,
}))

export const mockEmployees = [
  { id: 11, departmentId: 1, name: '张明', position: '前端工程师' },
  { id: 12, departmentId: 1, name: '李华', position: '后端工程师' },
  { id: 21, departmentId: 2, name: '王芳', position: '产品经理' },
  { id: 31, departmentId: 3, name: '赵强', position: '运营经理' },
]

export const mockOrderItems = [
  { id: 1, product: '企业版许可', quantity: 1, price: 12800 },
  { id: 2, product: '实施服务', quantity: 2, price: 3000 },
]

export const mockPaymentPlans = [
  { id: 1, stage: '首付款', ratio: 30 },
  { id: 2, stage: '验收款', ratio: 70 },
]

export function cloneMock<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function mockDelay(ms = 180, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    const finish = () => {
      signal?.removeEventListener('abort', abort)
      resolve()
    }
    const timer = window.setTimeout(finish, ms)
    const abort = () => {
      window.clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    signal?.addEventListener('abort', abort, { once: true })
  })
}

export function filterMockRows<T extends MockRecord>(
  rows: T[],
  params: MockRecord,
  rules: MatchRules
) {
  return rows.filter((row) =>
    Object.entries(rules).every(([field, mode]) => {
      const expected = params[field]
      if (expected === undefined || expected === null || expected === '') return true

      const actual = row[field]
      if (mode === 'contains') {
        return String(actual ?? '')
          .toLowerCase()
          .includes(String(expected).toLowerCase())
      }
      return actual === expected
    })
  )
}

export async function mockList<T extends MockRecord>(
  rows: T[],
  params: MockRecord,
  context: MockRequestContext = {},
  rules: MatchRules = {}
) {
  await mockDelay(180, context.signal)
  return cloneMock(filterMockRows(rows, params, rules))
}

export async function mockPage<T extends MockRecord>(
  rows: T[],
  params: MockRecord,
  context: MockRequestContext = {},
  rules: MatchRules = {}
) {
  const records = await mockList(rows, params, context, rules)
  const current = Number(params.current || 1)
  const size = Number(params.size || 10)
  const start = (current - 1) * size

  return {
    current,
    size,
    total: records.length,
    records: records.slice(start, start + size),
  }
}

export const mockApis = {
  users: {
    page: (params: MockRecord, context?: MockRequestContext) =>
      mockPage(mockUsers, params, context, { name: 'contains', status: 'equals' }),
    list: (params: MockRecord, context?: MockRequestContext) =>
      mockList(mockUsers, params, context, {
        name: 'contains',
        status: 'equals',
        department: 'equals',
      }),
  },
  customers: {
    list: (params: MockRecord, context?: MockRequestContext) =>
      mockList(mockCustomers, params, context, { name: 'contains', status: 'equals' }),
  },
  employees: {
    list: (params: MockRecord, context?: MockRequestContext) =>
      mockList(mockEmployees, params, context, { departmentId: 'equals' }),
  },
}`
