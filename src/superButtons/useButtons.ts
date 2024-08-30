import { h } from 'vue'
import type { ExtButtonGroup } from '../exaTypes'
import SuperButtons from './SuperButtons.vue'

export default function useButtons(option: ExtButtonGroup) {
  const vNode = () => h(SuperButtons, option as any)
  return [vNode]
}
