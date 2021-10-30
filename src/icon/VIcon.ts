import icons, { IconNames } from './icons'
import Icon from '@ant-design/icons-vue/es/components/Icon'
import { FunctionalComponent, h } from 'vue'
const registerIcon = (function () {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.position = 'absolute'
  svg.style.width = '0'
  svg.style.height = '0'
  svg.style.overflow = 'hidden'
  function insertRoot() {
    document.body.insertBefore(svg, document.body.firstChild)
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertRoot)
  } else {
    insertRoot()
  }
  const regNames: Obj = {}
  const append = function (name) {
    if (icons[name]) {
      svg.insertAdjacentHTML('beforeend', icons[name])
      icons[name] = null
      regNames[name] = svg.lastElementChild?.id
    }
  }
  return function (name: string) {
    append(name)
    return regNames[name]
    // return icons[name]
  }
})()

interface VIconProps {
  type: IconNames | string
  spin?: boolean
  rotate?: number
  twoToneColor?: string
}
const VIcon: FunctionalComponent<VIconProps> = (props, context) => {
  const iconId = registerIcon(props.type)
  const content = h('use', { 'xlink:href': '#' + iconId })

  return h(Icon, context.attrs, { default: () => content })
}
VIcon.props = ['type']
export default VIcon
// export default {
//   components: { AntdIcon },
//   setup() {
//     return () => h(AntdIcon, { ...props, ...context.attrs, icon: icons[props.type] })
//   }
// }
