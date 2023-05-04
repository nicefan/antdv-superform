import { useVModel } from './controls/useControl'
import { Component, defineComponent, h, reactive } from 'vue'
import { innerComps } from './components'
import { addComponent } from './controls'
const { FormItem } = innerComps

interface RegistPram {
  option: Obj
  /** 表单数据 */
  effectData: {
    formData: Obj
    /** 当前值 */
    record?: any
  }
  /** 绑定到组件上的动态属性 */
  attrs: Obj
}
export default function (name: string, component: ((param: RegistPram) => Component) | VNode) {
  addComponent(
    name,
    defineComponent({
      name,
      props: ['option', 'model', 'effectData', 'attrs'],

      setup({ option, model, effectData, attrs }) {
        const valueProps = useVModel({ option, model })
        const allAttrs = reactive({ valueProps, ...attrs })

        return () =>
          h(FormItem, {}, () =>
            typeof component === 'function' ? component({ option, effectData, attrs: allAttrs }) : h(component, attrs)
          )
      },
    })
  )
}
