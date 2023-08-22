import { h } from 'vue'
import { ButtonGroup } from '../components/buttons'

export default function (config: ExButtonGroup) {
  const vNode = () => h(ButtonGroup, { config })
  return [vNode]
}
