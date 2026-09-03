import { computed, ref, toRef, unref, watch, watchEffect } from 'vue'
import { throttle, set as objectSet } from 'lodash-es'
import { useOptions } from '../utils/useOptions'
import { toNode } from '../utils/toNode'

export interface FieldModelBehavior {
  /** 将范围值拆分到 field 和 endField */
  splitRange?: boolean
}

export interface FieldProcessorContext {
  option: Obj
  effectData: Obj
  attrs: Obj
  model: ModelData
}

export interface FieldProcessorState {
  modelBehavior: FieldModelBehavior
  transformProps: (props: Obj) => Obj
}

type FieldProcessor = (context: FieldProcessorContext) => Partial<FieldProcessorState> | undefined

/** labelField 只供 Core 同步模型，不应透传为底层 UI 组件属性。 */
function omitLabelModelProps(props: Obj) {
  const rest = { ...props }
  delete rest.labelValue
  delete rest['onUpdate:labelValue']
  return rest
}

function getOptionLabels(options: Obj[], value: unknown) {
  const getLabel = (current: unknown) => options.find((item) => Object.is(item.value, current))?.label
  return Array.isArray(value) ? value.map(getLabel) : getLabel(value)
}

const processors: Record<string, FieldProcessor> = {
  picker: ({ option, effectData }) => ({
    modelBehavior: {
      splitRange: Boolean(option.endField ?? option.keepField),
    },
    transformProps(props) {
      const disabledDate = props.disabledDate
      if (typeof disabledDate !== 'function') return props
      return {
        ...props,
        disabledDate: (currentDate) => disabledDate(currentDate, effectData),
      }
    },
  }),
  input: ({ attrs }) => {
    const loading = ref(false)
    const onSearch = attrs.onSearch
    const search = typeof onSearch === 'function'
    const searchHandler = search
      ? async (...args) => {
          loading.value = true
          try {
            await onSearch(...args)
          } finally {
            loading.value = false
          }
        }
      : undefined
    return {
      transformProps: (props) => ({
        ...props,
        search,
        searchLoading: loading.value,
        ...(searchHandler && { onSearch: searchHandler }),
      }),
    }
  },
  autoComplete: ({ option, effectData, attrs }) => {
    const { optionsRef } = useOptions({ ...option, labelAsValue: true }, attrs.options, effectData)
    return {
      transformProps: (props) => ({ ...props, options: optionsRef.value }),
    }
  },
  select: ({ option, effectData, attrs }) => {
    const { optionsRef, setOptions } = useOptions(option, attrs.options, effectData)
    const explicitSearch =
      typeof attrs.onSearch === 'function' ? throttle(attrs.onSearch, 600, { leading: false }) : undefined
    const remoteSearch =
      attrs.showSearch && !explicitSearch && typeof option.options === 'function'
        ? throttle(
            (keyword) => {
              Promise.resolve(option.options(effectData, keyword)).then(setOptions)
            },
            600,
            { leading: false }
          )
        : undefined
    let boundProps: Obj = {}
    const onValueChange = (value) => {
      if (option.labelField) boundProps['onUpdate:labelValue']?.(getOptionLabels(optionsRef.value, value))
    }
    return {
      transformProps(props) {
        boundProps = props
        const rest = omitLabelModelProps(props)
        return {
          ...rest,
          options: optionsRef.value,
          onValueChange,
          onSearch: explicitSearch || remoteSearch,
        }
      },
    }
  },
  radioGroup: ({ option, effectData, attrs }) => {
    const { optionsRef } = useOptions(option, attrs.options, effectData)
    let boundProps: Obj = {}
    const onValueChange = (value) => {
      if (option.labelField) boundProps['onUpdate:labelValue']?.(getOptionLabels(optionsRef.value, value))
    }
    return {
      transformProps(props) {
        boundProps = props
        const rest = omitLabelModelProps(props)
        return {
          ...rest,
          options: optionsRef.value.map((item) => ({
            ...item,
            label: toNode(item.label, effectData),
          })),
          onValueChange,
        }
      },
    }
  },
  checkboxGroup: ({ option, effectData, attrs }) => {
    const { optionsRef } = useOptions(option, attrs.options, effectData)
    let boundProps: Obj = {}
    const onValueChange = (value) => {
      if (option.labelField) boundProps['onUpdate:labelValue']?.(getOptionLabels(optionsRef.value, value))
    }
    return {
      transformProps(props) {
        boundProps = props
        const rest = omitLabelModelProps(props)
        return {
          ...rest,
          options: optionsRef.value,
          onValueChange,
        }
      },
    }
  },
  treeSelect: ({ option, effectData }) => {
    const dataRef = ref<any[]>([])
    const treeData = option.treeData ?? option.data
    if (typeof treeData === 'function') {
      watchEffect(() => {
        Promise.resolve(treeData(effectData)).then((data) => (dataRef.value = data || []))
      })
    } else if (treeData) {
      watch(
        () => unref(treeData),
        (data) => (dataRef.value = data || []),
        { immediate: true }
      )
    }
    let boundProps: Obj = {}
    const onValueChange = (_value, labels) => {
      if (option.labelField) boundProps['onUpdate:labelValue']?.(labels)
    }
    return {
      transformProps(props) {
        boundProps = props
        const rest = omitLabelModelProps(props)
        return { ...rest, treeData: dataRef.value, onValueChange }
      },
    }
  },
  switch: ({ option, effectData, attrs, model }) => {
    const { optionsRef } = useOptions(option, attrs.options, effectData)
    const modelValue = toRef(model, 'refData')
    const [falseName, trueName] = option.valueLabels || []
    const valueToNumber = option.valueToNumber ?? attrs.valueToNumber
    const trueDefault = valueToNumber ? 1 : true
    const falseDefault = valueToNumber ? 0 : false
    const state = computed(() => {
      const [first, second] = optionsRef.value
      return attrs.firstIsChecked
        ? {
            trueLabel: first?.label ?? trueName,
            falseLabel: second?.label ?? falseName,
            trueValue: first?.value ?? trueDefault,
            falseValue: second?.value ?? falseDefault,
          }
        : {
            trueLabel: second?.label ?? trueName,
            falseLabel: first?.label ?? falseName,
            trueValue: second?.value ?? trueDefault,
            falseValue: first?.value ?? falseDefault,
          }
    })
    const syncLabel = (value) => {
      if (!option.labelField) return
      const item = optionsRef.value.find((item) => Object.is(item.value, value))
      const label =
        item?.label ??
        (Object.is(value, state.value.trueValue)
          ? state.value.trueLabel
          : Object.is(value, state.value.falseValue)
          ? state.value.falseLabel
          : undefined)
      objectSet(model.parent, option.labelField, label)
    }
    const hasOptionsSource = computed(
      () => attrs.options !== undefined || option.options !== undefined || Boolean(option.dictName)
    )
    watch(
      [modelValue, optionsRef],
      ([value, options]) => {
        if (value === undefined) {
          if (hasOptionsSource.value && !options.length) return
          const initial = attrs.defaultChecked ? state.value.trueValue : state.value.falseValue
          model.refData = initial
          syncLabel(initial)
        } else {
          syncLabel(value)
        }
      },
      { immediate: true }
    )
    let boundProps: Obj = {}
    const updateValue = (value) => {
      boundProps['onUpdate:value']?.(value)
      syncLabel(value)
    }
    return {
      transformProps(props) {
        boundProps = props
        const rest = omitLabelModelProps(props)
        return { ...rest, ...state.value, 'onUpdate:value': updateValue }
      },
    }
  },
}

/** 处理器按 Adapter 声明顺序组合，后续处理器接收前一个处理器的属性结果。 */
export function resolveFieldProcessors(names: string[], context: FieldProcessorContext): FieldProcessorState {
  const states = names.map((name) => processors[name]?.(context)).filter(Boolean) as Partial<FieldProcessorState>[]
  return {
    modelBehavior: Object.assign({}, ...states.map(({ modelBehavior }) => modelBehavior)),
    transformProps: (props) =>
      states.reduce((current, state) => (state.transformProps ? state.transformProps(current) : current), props),
  }
}
