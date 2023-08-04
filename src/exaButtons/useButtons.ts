import { h } from 'vue'
import { ButtonGroup } from '../controls/buttons'

export default function (config: ExButtonGroup) {
  const vNode = () => h(ButtonGroup, { config })
  return [vNode]
}
