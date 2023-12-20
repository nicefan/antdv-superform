import type { ExtDescriptionsOption } from '../exaTypes'

export { default as SuperDetail } from './SuperDetail.vue'
export { useDetail } from './useDetail'
export function defineDetail(option: ExtDescriptionsOption) {
  return option
}
