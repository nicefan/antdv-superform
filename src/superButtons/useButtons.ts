import { h } from 'vue'
import { ButtonGroup } from '../components/buttons'
import type { ExtButtonGroup } from '../exaTypes'

export default function useButtons(config: ExtButtonGroup) {
  const vNode = () => h(ButtonGroup, { config })
  return [vNode]
}
