import { h } from 'vue'
import { Button } from 'antdv-next'
import type { UIAdapter } from 'superform/sdk'
import { renderAntdvIcon } from './capabilities'
import { globalConfig } from 'superform/sdk'

function toNode(node: any, param: any = {}) {
  if (!node) return null
  if (typeof node === 'function') return node(param || {}, {})
  return typeof node !== 'object' ? h('span', node) : h(node, { effectData: param })
}

function mapChangeEvent(props: Obj, normalize: (...args: any[]) => any[] = (value) => [value]) {
  const { onValueChange, onChange, ...rest } = props
  if (!onValueChange) return props
  return {
    ...rest,
    onChange: (...args: any[]) => {
      onValueChange(...normalize(...args))
      return onChange?.(...args)
    },
  }
}

export function createAntdvFields(): NonNullable<UIAdapter['fields']> {
  return {
    Input: {
      component: 'Input',
      processors: ['input'],
      transformProps(props, { option }) {
        return { placeholder: `请输入${option.label ?? ''}`, ...props }
      },
      render(component, props, _context, slots) {
        const { search, searchLoading, addonAfter, enterButton, ...rest } = props
        if (!search) return h(component, { ...rest, addonAfter }, slots)
        const { addonAfter: addonAfterSlot, ...restSlots } = slots
        let enterButtonSlot = slots.enterButton || (enterButton ? undefined : addonAfterSlot)
        const enterButtonProp = enterButton || addonAfter
        if (!enterButtonSlot && enterButtonProp && typeof enterButtonProp === 'object') {
          const { label, icon, ...buttonProps } = enterButtonProp
          enterButtonSlot = () => [h(Button, { loading: searchLoading, ...buttonProps }, {
            icon: () => renderAntdvIcon(icon, { customIcon: globalConfig.customIcon }),
            default: () => toNode(label),
          })]
        } else if (!enterButtonSlot && typeof enterButtonProp === 'function') {
          enterButtonSlot = () => [h(Button, { type: 'primary', loading: searchLoading }, enterButtonProp)]
        }
        return h((component as any).Search || component, { ...rest, enterButton: enterButtonSlot ? undefined : enterButtonProp }, enterButtonSlot ? { ...restSlots, enterButton: enterButtonSlot } : restSlots)
      },
    },
    TextArea: {
      component: 'TextArea',
      transformProps(props, { option }) {
        return { allowClear: true, placeholder: `请输入${option.label ?? ''}`, ...props, style: [{ width: '100%' }, props.style] }
      },
    },
    InputNumber: {
      component: 'InputNumber',
      transformProps(props, { option }) {
        return { type: 'number', placeholder: `请输入${option.label ?? ''}`, ...props, style: [{ width: '100%' }, props.style] }
      },
    },
    AutoComplete: {
      component: 'AutoComplete', processors: ['autoComplete'],
      transformProps(props, { option }) { return { filterOption: true, placeholder: `请输入${option.label ?? ''}`, ...props } },
    },
    Select: {
      component: 'Select', processors: ['select'],
      transformProps(props, { option }) { return mapChangeEvent({ optionFilterProp: 'label', placeholder: `请选择${option.label ?? ''}`, ...props }) },
    },
    Radio: { component: 'Radio', model: { prop: 'checked', event: 'update:checked' } },
    RadioGroup: { component: 'RadioGroup', processors: ['radioGroup'], transformProps: (props) => mapChangeEvent(props, (event) => [event?.target?.value]) },
    Checkbox: { component: 'Checkbox', model: { prop: 'checked', event: 'update:checked' } },
    CheckboxGroup: { component: 'CheckboxGroup', processors: ['checkboxGroup'], transformProps: (props) => mapChangeEvent(props) },
    DatePicker: { component: 'DatePicker', processors: ['picker'] },
    DateRangePicker: { component: 'DateRangePicker', processors: ['picker'] },
    TimePicker: { component: 'TimePicker', processors: ['picker'] },
    TimeRangePicker: { component: 'TimeRangePicker', processors: ['picker'] },
    TreeSelect: {
      component: 'TreeSelect', processors: ['treeSelect'],
      transformProps(props, { option }) {
        return mapChangeEvent({ allowClear: true, placeholder: `请选择${option.label ?? ''}`, ...props }, (value, labels) => [value, Array.isArray(value) ? labels : Array.isArray(labels) ? labels[0] : labels])
      },
    },
    Switch: {
      component: 'Switch', processors: ['switch'], model: { prop: 'checked', event: 'update:checked' },
      transformProps(props) {
        const { trueValue, falseValue, trueLabel, falseLabel, ...rest } = props
        return { ...rest, checkedValue: trueValue, unCheckedValue: falseValue, checkedChildren: trueLabel, unCheckedChildren: falseLabel }
      },
    },
    Rate: { component: 'Rate' },
  }
}

export const antdvFields = createAntdvFields()

export const antdvDefaults: NonNullable<UIAdapter['defaults']> = {
  FormItem: { validateFirst: true },
  Table: { size: 'small' },
  TimePicker: { valueFormat: 'HH:mm:ss' },
  TimeRangePicker: { valueFormat: 'HH:mm:ss' },
  DatePicker: { valueFormat: 'YYYY-MM-DD' },
  DateRangePicker: { valueFormat: 'YYYY-MM-DD' },
}
