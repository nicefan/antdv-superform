import { h } from 'vue'
import { globalConfig } from '../plugin'

export function getIconNode(icon) {
  if (typeof icon === 'string') {
    return globalConfig.customIcon?.(icon) || h('span', { class: 'anticon ' + icon })
  } else {
    return icon && h(icon)
  }
}
