import TreeSelectField from './TreeSelectField'
import { elementPlusFieldAliases } from './fieldNames'
import {
  createFieldPropsAdapter,
  defineFieldAdapters,
  type UIAdapter,
  type FieldPropsAdapter,
} from 'superform/sdk'

const model = { prop: 'modelValue', event: 'update:modelValue' }
export const adaptElementPlusFieldProps = createFieldPropsAdapter(model)

// 范围字段已由配置确定；这里只映射协议，不读取 type/isRange 重新识别别名。
const adaptRangePlaceholder: FieldPropsAdapter = ({ placeholder, ...attrs }) => {
  const [start, end] = Array.isArray(placeholder) ? placeholder : [placeholder, placeholder]
  return {
    ...attrs,
    startPlaceholder: attrs.startPlaceholder === undefined ? start : attrs.startPlaceholder,
    endPlaceholder: attrs.endPlaceholder === undefined ? end : attrs.endPlaceholder,
  }
}

/** 原始组件仍动态提供；字段只声明额外的属性差异。 */
export const elementPlusFields: NonNullable<UIAdapter['fields']> = defineFieldAdapters(
  {
    Switch: {
      processors: ['switch'],
      adaptProps(attrs, { state }) {
        const config = state.switch
        return config
          ? {
              ...attrs,
              activeValue: config.checked.value,
              inactiveValue: config.unchecked.value,
              activeText: config.checked.label,
              inactiveText: config.unchecked.label,
            }
          : attrs
      },
    },
    Select: {
      processors: ['options'],
    },
    SelectV2: {
      processors: ['options'],
    },
    RadioGroup: { processors: ['options'] },
    CheckboxGroup: { processors: ['options'] },
    TreeSelect: {
      processors: ['tree'],
      component: TreeSelectField,
    },
    DatePicker: {
      processors: ['picker'],
      // 原始组件允许用户选择模式；固定别名不经过这个分支。
      adaptProps: (attrs, context) => typeof attrs.type === 'string' && attrs.type.endsWith('range')
        ? adaptRangePlaceholder(attrs, context) : attrs,
    },
    DateRangePicker: {
      component: elementPlusFieldAliases.DateRangePicker,
      fixedProps: { type: 'daterange' },
      processors: ['range'],
      adaptProps: adaptRangePlaceholder,
    },
    TimePicker: {
      processors: ['picker'],
      adaptProps: (attrs, context) => attrs.isRange ? adaptRangePlaceholder(attrs, context) : attrs,
    },
    TimeRangePicker: {
      component: elementPlusFieldAliases.TimeRangePicker,
      fixedProps: { isRange: true },
      processors: ['range'],
      adaptProps: adaptRangePlaceholder,
    },
  },
  model
)

export const elementPlusDefaults: NonNullable<UIAdapter['defaults']> = {
  FormItem: { validateEvent: true },
}
