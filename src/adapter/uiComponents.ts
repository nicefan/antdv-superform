import { h } from 'vue'
import type {
  UIAdapter,
  UIComponentDefinitions,
  UIComponentRender,
  UIComponentRenders,
  UIRenderContext,
  UIRenderers,
} from './types'

// 这些协议将原生属性放在 attrs 内；其它协议直接传递属性对象。
const stateNames = new Set<keyof UIRenderers>(['group', 'card', 'tabs', 'collapse', 'descriptions'])

/** 业务覆盖与组件声明共用上下文协议，内部调用签名只在此转换。 */
export function normalizeUIRenderers(render: UIComponentRenders = {}) {
  return normalizeUIComponents(Object.fromEntries(Object.entries(render).map(([name, fn]) => [name, { render: fn }])))
    .render
}

/** 创建时确定调用路径，渲染时只合成当前上下文，不猜测组件或函数类型。 */
export function normalizeUIComponents(definitions: UIComponentDefinitions = {}) {
  const render: Partial<UIRenderers> = {}
  const result: Pick<UIAdapter, 'render' | 'form' | 'modal' | 'upload' | 'table' | 'defaults'> = { render }
  for (const name of Object.keys(definitions) as (keyof UIRenderers)[]) {
    const definition = definitions[name]
    if (!definition) continue
    if (definition.service) Object.assign(result, { [name]: definition.service })
    if (definition.schemaDefaults) result.defaults = { ...definition.schemaDefaults }
    const { defaults, adaptProps } = definition
    const structured = stateNames.has(name)
    const renderNode = definition.render as UIComponentRender<typeof name> | undefined
    const component = definition.component
    Object.assign(render, {
      [name]: (props: Obj = {}, slots = {}) => {
        const originalAttrs = structured ? props.attrs || {} : props
        const context = {
          type: name,
          attrs: defaults ? { ...defaults, ...originalAttrs } : originalAttrs,
          state: props,
          slots: structured ? props.slots || slots : slots,
        } as UIRenderContext<typeof name>
        if (adaptProps) context.attrs = adaptProps(context.attrs, context as never)
        // 老的结构渲染辅助函数也消费合成后的 attrs；业务状态不混入原生 props。
        if (structured) context.state = { ...props, attrs: context.attrs, slots: context.slots } as typeof context.state
        return renderNode ? renderNode(context) : h(component!, context.attrs, context.slots)
      },
    })
  }
  return result
}
