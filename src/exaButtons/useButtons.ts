import { h } from 'vue'
import { ButtonGroup } from '../components/buttons'

export default function useButtons(config: ExButtonGroup) {
  const vNode = () => h(ButtonGroup, { config })
  return [vNode]
}
