import ExaTable from './ExaTable.vue'
import { useTable } from './useTable'

export { ExaTable, useTable }
export function defineTable(option: RootTableOption) {
  return option
}
