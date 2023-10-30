import type { RootTableOption } from '../exaTypes'
import SuperTable from './SuperTable.vue'
import { useTable } from './useTable'

export { SuperTable, useTable }
export function defineTable(option: RootTableOption) {
  return option
}
