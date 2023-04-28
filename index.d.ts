/// <reference types="./types" />

import { ModalProps } from 'ant-design-vue'
import { Locale } from 'ant-design-vue/es/locale-provider'
import { App, FunctionalComponent } from 'vue'

interface VIconProps {
  type: string
  spin?: boolean
  rotate?: number
  twoToneColor?: string
}
export declare const VIcon: FunctionalComponent<VIconProps>

export declare function useModal(
  content: any,
  config?: ModalProps
): {
  openModal: (option?: ModalProps | undefined) => void
}
export declare function defineForm(option: FormOption): FormOption
export declare function buildForm(optionData: any): {
  FormComponent: () => VNode
  onSubmit: () => any
}
export declare function buildModel(optionData: any): {
  openModal: (option?: ModalProps | undefined) => void
  onSubmit: () => any
}

interface RegistPram {
  label?: string
  /** 表单数据 */
  formData: Obj
  /** 绑定到组件上的动态属性 */
  attrs: Obj
  /** 当前值 */
  effectData: {
    current: any
  }
}
interface SuperForm {
  install(app: App, config?: { locale: Locale; components?: object }): void
  registComponent(name: string, component: ((param: RegistPram) => Vnode) | VNode): void
}
export default SuperForm
