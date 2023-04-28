import useControl from './controls/useControl'
import { Component, PropType, defineComponent, h, reactive } from 'vue'
import { innerComps } from './components'
import { addComponent } from './controls'
const { FormItem } = innerComps

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
export default function (name: string, component: ((param: RegistPram) => Component) | VNode) {
  addComponent(
    name,
    defineComponent({
      name,
      props: ['option', 'model'],

      setup(props) {
        const { formData, attrs, ruleName, label, effectData } = useControl(props)

        return () =>
          h(FormItem, reactive({ name: ruleName, label }), () =>
            typeof component === 'function' ? component({ formData, attrs, effectData, label }) : h(component, attrs)
          )
      },
    })
  )
}
