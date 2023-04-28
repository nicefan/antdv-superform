import registComponent from './registComponent'
export * from './ExaForm'
export { useModal } from './Modal'
export { default as VIcon } from './icon/VIcon'
import { install } from './globalContext'
export default {
  install,
  registComponent,
}
