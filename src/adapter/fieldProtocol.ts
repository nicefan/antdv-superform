import type { PropType } from 'vue'
import type { ComponentModelConfig, FieldAdapter, FieldAdapterContext, FieldPropsAdapter } from './types'

/** 独立字段适配组件的公共入参；保留 required 字面量以便 Vue 推导必填类型。 */
export const fieldComponentProps = {
  type: { type: String, required: true },
  option: { type: Object as PropType<FieldAdapterContext['option']>, required: true },
  model: { type: Object as PropType<FieldAdapterContext['model']>, required: true },
  effectData: { type: Object as PropType<FieldAdapterContext['effectData']>, required: true },
  binding: { type: Object as PropType<FieldAdapterContext['binding']>, required: true },
  state: { type: Object as PropType<FieldAdapterContext['state']>, required: true },
  attrs: { type: Object as PropType<Obj>, required: true },
} as const

/** 原生监听器保留原参数；专项入口先执行，避免原生事件覆盖模型写回。 */
export function combineFieldHandlers(primary: Function, native: unknown) {
  return (...args: any[]) => {
    const result = primary(...args)
    for (const handler of Array.isArray(native) ? native : [native]) {
      if (typeof handler === 'function' && handler !== primary) handler(...args)
    }
    return result
  }
}

/** 由 UI package 在组装协议时调用，提前固定属性名与事件名。 */
export function createFieldPropsAdapter(
  { prop = 'value', event = 'update:value' }: ComponentModelConfig = {},
  adaptProps?: FieldPropsAdapter
): FieldPropsAdapter {
  const listener = event.startsWith('on') ? event : `on${event[0].toUpperCase()}${event.slice(1)}`
  return (attrs, context) => {
    const mapped = { ...(adaptProps ? adaptProps(attrs, context) : attrs) }
    const { binding, state, option, effectData } = context
    if (state.disabled !== undefined) mapped.disabled = state.disabled
    if (option.disabledDate !== undefined) {
      // 原生日期和临时选择参数保持顺序，专项回调额外取得表单上下文。
      mapped.disabledDate = (...args: any[]) => option.disabledDate(effectData, ...args)
    }
    for (const [name, value] of Object.entries(binding)) {
      if (option.labelField && (name === 'labelValue' || name === 'onUpdate:labelValue')) continue
      const target = name === 'value' ? prop : name === 'onUpdate:value' ? listener : name
      mapped[target] = name.startsWith('onUpdate:') && typeof value === 'function'
        ? combineFieldHandlers(value, mapped[target])
        : value
    }
    return mapped
  }
}

/** 字段只声明 model 差异，UI package 定义时固化转换，Core 不动态解释。 */
export function defineFieldAdapters(
  fields: Record<string, FieldAdapter & { model?: ComponentModelConfig }>,
  defaultModel?: ComponentModelConfig
): Record<string, FieldAdapter> {
  return Object.fromEntries(Object.entries(fields).map(([name, { model, ...field }]) => [name, {
    ...field,
    // 独立适配组件自行处理标准绑定，不套用原始组件的协议。
    adaptProps: field.component && typeof field.component !== 'string'
      ? field.adaptProps
      : createFieldPropsAdapter(model ?? defaultModel, field.adaptProps),
  }]))
}
