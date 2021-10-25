/// <reference types="./types" />

import { ModalProps } from 'ant-design-vue'
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

declare function install(app: App): void
export default install
