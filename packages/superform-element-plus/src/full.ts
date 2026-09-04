import { ElInput, ElRate, ElSelect, ElSwitch } from 'element-plus'
import type { Component } from 'vue'
import { createElementPlusAdapter, elementPlusAdapter } from './index'

export { createElementPlusAdapter, elementPlusAdapter }

/** Element Plus 字段全量注册表，字段名遵循 SuperForm Schema 的无前缀约定。 */
export const elementPlusUIComponents: Record<string, Component> = {
  Input: ElInput,
  Select: ElSelect,
  Switch: ElSwitch,
  Rate: ElRate,
}

/** 已附带全部字段组件，可直接传给 superform.useAdapter。 */
export const elementPlusFull = createElementPlusAdapter({ components: elementPlusUIComponents })

export default elementPlusFull
