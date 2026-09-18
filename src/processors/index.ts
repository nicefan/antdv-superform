import { computed, ref, unref, watch, watchEffect } from 'vue'
import { findOption, useOptions } from '../utils/useOptions'
import type { FieldState } from '../adapter/types'

export interface FieldProcessorContext {
  option: Obj
  effectData: Obj
  model: ModelData
  attrs?: Obj
}

export interface FieldProcessorState {
  bindModel?: (binding: Obj) => void
  state?: Readonly<Ref<FieldState>>
}

type FieldProcessor = (context: FieldProcessorContext) => FieldProcessorState | undefined

/** 标签通过标准模型入口写回，序列化和字段路径统一交给 useVModel。 */
function optionsProcessor({ option, effectData, attrs }: FieldProcessorContext): FieldProcessorState | undefined {
  const configured = option.options !== undefined
  if (!configured && !option.labelField) return
  // 原生选项仅供标签查找，不进入专项状态，也不归一化或覆盖组件 props。
  const nativeAttrs = attrs ?? option.attrs ?? {}
  const optionsRef = configured
    ? useOptions(option.options, effectData).optionsRef
    : computed<Obj[]>(() => unref(nativeAttrs.options) ?? [])
  return {
    state: configured ? computed(() => ({ options: optionsRef.value })) : undefined,
    bindModel(binding) {
      const updateLabel = binding['onUpdate:labelValue']
      if (!updateLabel) return
      // 模型绑定建立后再监听，初始值、外部赋值和异步选项均走同一标签同步路径。
      watch([() => unref(binding.value), optionsRef, () => configured ? undefined : unref(nativeAttrs.fieldNames)], ([value, options, fieldNames]) => {
        const labelOf = (value: unknown) => findOption(options, value, option.stringifyValue, fieldNames)?.[fieldNames?.label ?? 'label']
        updateLabel(Array.isArray(value) ? value.map(labelOf) : labelOf(value))
      }, { immediate: true, deep: true })
    },
  }
}

const processors: Record<string, FieldProcessor> = {
  options: optionsProcessor,
  picker: ({ option }) => ({
    state: computed(() => ({ placeholder: `请选择${option.label ?? ''}` })),
  }),
  range: ({ option }) => ({
    state: computed(() => ({
      placeholder: [`请选择开始${option.label ?? ''}`, `请选择结束${option.label ?? ''}`] as [string, string],
    })),
  }),
  tree: ({ option, effectData }) => {
    const source = option.treeData
    if (source === undefined) return
    const dataRef = ref<any[]>([])
    watchEffect(() => {
      const data = typeof source === 'function' ? source(effectData) : unref(source)
      Promise.resolve(data).then(value => { dataRef.value = value ?? [] })
    })
    return { state: computed(() => ({ treeData: dataRef.value })) }
  },
  switch: (context) => {
    const options = optionsProcessor(context)
    if (!options?.state) return options
    return {
      bindModel: options.bindModel,
      state: computed(() => {
        const [unchecked = { value: false }, checked = { value: true }] = options.state!.value.options!
        return { switch: {
          unchecked: { value: unchecked.value, label: unchecked.label },
          checked: { value: checked.value, label: checked.label },
        } }
      }),
    }
  },
}

/** 处理器仅输出专项状态；原生属性的合成与覆盖交给 UI package。 */
export function resolveFieldProcessors(names: string[], context: FieldProcessorContext) {
  const states = names.map(name => processors[name]?.(context)).filter(Boolean) as FieldProcessorState[]
  return {
    bindModel: (binding: Obj) => states.forEach(item => item.bindModel?.(binding)),
    state: computed<FieldState>(() => Object.assign({}, ...states.map(item => item.state?.value))),
  }
}
