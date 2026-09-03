import { h, toRaw } from 'vue'
import base from '../compat/antdv'
import {
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  UpOutlined,
} from '../compat/icons'
import { toNode } from '../utils/toNode'
import { globalConfig } from '../config'
import type { IconAdapterContext, UIAdapter } from './types'
import AntdvDescriptions from '../components/Detail/Descriptions'

function renderAntdvIcon(icon: unknown, { customIcon }: IconAdapterContext = {}) {
  if (typeof icon === 'string') return customIcon?.(icon) || h('span', { class: `anticon ${icon}` })
  return icon ? h(toRaw(icon) as any) : undefined
}

/** 内置 AntDV Adapter 实现；调用方仍需在安装时显式传入。 */
export const antdvAdapter: UIAdapter = {
  name: 'antdv-next',
  components: base,
  form: {
    component: 'Form',
    item: 'FormItem',
    validate: (instance) => instance.validate(),
    clearValidate: (instance) => instance.clearValidate(),
  },
  layout: {
    row: 'Row',
    col: 'Col',
    space: 'Space',
    compactSpace: 'SpaceCompact',
  },
  containers: {
    card: {
      component: 'Card',
    },
    tabs: {
      component: 'Tabs',
      model: { prop: 'activeKey', event: 'update:activeKey' },
      render(component, props, slots) {
        const { extra, ...restSlots } = slots
        return h(component, props, extra ? { ...restSlots, rightExtra: extra } : restSlots)
      },
    },
    tab: {
      component: 'TabPane',
      transformProps(props) {
        const { label, ...rest } = props
        return { ...rest, tab: label }
      },
    },
    collapse: {
      component: 'Collapse',
      model: { prop: 'activeKey', event: 'update:activeKey' },
    },
    collapsePanel: {
      component: 'CollapsePanel',
      transformProps(props) {
        const { disabled, ...rest } = props
        return { ...rest, collapsible: disabled ? 'disabled' : undefined }
      },
    },
    // antdv-next 已移除旧 List，由 AntDV Adapter 保留当前兼容实现。
    list: {
      component: 'SuperList',
    },
    listItem: {
      component: 'SuperListItem',
    },
    descriptions: {
      // 保留现有表格/表单模式和 AntDV 样式协议，但由 Adapter 显式选择实现。
      component: AntdvDescriptions,
    },
  },
  icons: {
    semantic: {
      add: PlusOutlined,
      remove: MinusOutlined,
      more: EllipsisOutlined,
      expand: DownOutlined,
      collapse: UpOutlined,
      info: InfoCircleOutlined,
    },
    render: renderAntdvIcon,
  },
  actions: {
    components: {
      button: 'Button',
      tooltip: 'Tooltip',
      dropdown: 'Dropdown',
      menu: 'Menu',
      menuItem: 'MenuItem',
      divider: 'Divider',
    },
    slots: {
      popup: 'popupRender',
    },
  },
  presentation: {
    components: {
      tag: 'Tag',
      checkableTag: 'CheckableTag',
    },
  },
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
              {
                icon: () =>
                  renderAntdvIcon(icon, {
                    customIcon: globalConfig.customIcon,
                  }),
                default: () => toNode(label),
              }
            ),
          ]
        } else if (!enterButtonSlot && typeof enterButtonProp === 'function') {
          enterButtonSlot = () => [h(base.Button, { type: 'primary', loading: searchLoading }, enterButtonProp)]
        }
        return h(
          base.InputSearch,
          {
            ...rest,
            enterButton: enterButtonSlot ? undefined : enterButtonProp,
          },
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
        return {
          filterOption: true,
          placeholder: `请输入${option.label ?? ''}`,
          ...props,
        }
      },
    },
    Select: {
      component: 'Select',
      processors: ['select'],
      transformProps(props, { option }) {
        return {
          optionFilterProp: 'label',
          placeholder: `请选择${option.label ?? ''}`,
          ...props,
        }
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
        return {
          allowClear: true,
          placeholder: `请选择${option.label ?? ''}`,
          ...props,
        }
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
