import { h } from 'vue'
import base from '../compat/antdv'
import { getIconNode } from '../utils/useIcon'
import { toNode } from '../utils/toNode'
import type { UIAdapter } from './types'

/** 内置 AntDV Adapter 实现；调用方仍需在安装时显式传入。 */
export const antdvAdapter: UIAdapter = {
  name: 'antdv-next',
  components: base,
  fields: {
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
          enterButtonSlot = () => [
            h(
              base.Button,
              { loading: searchLoading, ...buttonProps },
              { icon: () => getIconNode(icon), default: () => toNode(label) }
            ),
          ]
        } else if (!enterButtonSlot && typeof enterButtonProp === 'function') {
          enterButtonSlot = () => [h(base.Button, { type: 'primary', loading: searchLoading }, enterButtonProp)]
        }
        return h(
          base.InputSearch,
          { ...rest, enterButton: enterButtonSlot ? undefined : enterButtonProp },
          enterButtonSlot ? { ...restSlots, enterButton: enterButtonSlot } : restSlots
        )
      },
    },
    TextArea: {
      component: 'TextArea',
      transformProps(props, { option }) {
        return {
          allowClear: true,
          placeholder: `请输入${option.label ?? ''}`,
          ...props,
          style: [{ width: '100%' }, props.style],
        }
      },
    },
    InputNumber: {
      component: 'InputNumber',
      transformProps(props, { option }) {
        return {
          type: 'number',
          placeholder: `请输入${option.label ?? ''}`,
          ...props,
          style: [{ width: '100%' }, props.style],
        }
      },
    },
    AutoComplete: {
      component: 'AutoComplete',
      processors: ['autoComplete'],
      transformProps(props, { option }) {
        return { filterOption: true, placeholder: `请输入${option.label ?? ''}`, ...props }
      },
    },
    Select: {
      component: 'Select',
      processors: ['select'],
      transformProps(props, { option }) {
        return { optionFilterProp: 'label', placeholder: `请选择${option.label ?? ''}`, ...props }
      },
    },
    Radio: {
      component: 'Radio',
      model: {
        prop: 'checked',
        event: 'update:checked',
      },
    },
    RadioGroup: {
      component: 'RadioGroup',
      processors: ['radioGroup'],
    },
    Checkbox: {
      component: 'Checkbox',
      model: {
        prop: 'checked',
        event: 'update:checked',
      },
    },
    CheckboxGroup: {
      component: 'CheckboxGroup',
      processors: ['checkboxGroup'],
    },
    DatePicker: {
      component: 'DatePicker',
      processors: ['picker'],
    },
    DateRangePicker: {
      component: 'DateRangePicker',
      processors: ['picker'],
    },
    TimePicker: {
      component: 'TimePicker',
      processors: ['picker'],
    },
    TimeRangePicker: {
      component: 'TimeRangePicker',
      processors: ['picker'],
    },
    TreeSelect: {
      component: 'TreeSelect',
      processors: ['treeSelect'],
      transformProps(props, { option }) {
        return { allowClear: true, placeholder: `请选择${option.label ?? ''}`, ...props }
      },
    },
    Switch: {
      component: 'Switch',
      processors: ['switch'],
      model: {
        prop: 'checked',
        event: 'update:checked',
      },
      transformProps(props) {
        const { trueValue, falseValue, trueLabel, falseLabel, ...rest } = props
        return {
          ...rest,
          checkedValue: trueValue,
          unCheckedValue: falseValue,
          checkedChildren: trueLabel,
          unCheckedChildren: falseLabel,
        }
      },
    },
  },
  defaults: {
    FormItem: {
      validateFirst: true,
    },
    Table: {
      size: 'small',
    },
    TimePicker: {
      valueFormat: 'HH:mm:ss',
    },
    TimeRangePicker: {
      valueFormat: 'HH:mm:ss',
    },
    DatePicker: {
      valueFormat: 'YYYY-MM-DD',
    },
    DateRangePicker: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
}

export default antdvAdapter
