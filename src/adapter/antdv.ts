import { h, toRaw, unref } from 'vue'
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
import AntdvDescriptions from './antdv/Descriptions'

function renderAntdvIcon(icon: unknown, { customIcon }: IconAdapterContext = {}) {
  if (typeof icon === 'string') return customIcon?.(icon) || h('span', { class: `anticon ${icon}` })
  return icon ? h(toRaw(icon) as any) : undefined
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

function stopActionEvent(event: any) {
  const target = event?.domEvent || event
  target?.stopPropagation?.()
}

function renderActionContent(button: Obj, effectData: Obj, labelOnly: boolean, iconOnly: boolean) {
  return [
    button.icon && !labelOnly ? renderAntdvIcon(button.icon, { customIcon: globalConfig.customIcon }) : undefined,
    !button.icon || !iconOnly ? toNode(button.label, effectData) : undefined,
  ]
}

function renderActionButton(button: Obj, effectData: Obj, labelOnly: boolean, iconOnly: boolean) {
  const attrs = { ...button.attrs, disabled: unref(button.attrs?.disabled) }
  const callAction = (event: any) => {
    stopActionEvent(event)
    button.onClick?.(event)
  }
  let content
  const menu = unref(button.menu)
  if (menu) {
    content = h(
      base.Dropdown,
      { disabled: attrs.disabled, ...button.dropdownProps },
      {
        popupRender: () =>
          h(base.Menu, { onClick: callAction }, () =>
            menu.map((item) =>
              h(
                base.MenuItem,
                { key: item.value, disabled: item.disabled },
                {
                  icon: item.icon
                    ? () =>
                        renderAntdvIcon(item.icon, {
                          customIcon: globalConfig.customIcon,
                        })
                    : undefined,
                  default: () => toNode(item.label, effectData),
                }
              )
            )
          ),
        default: () =>
          h(base.Button, attrs, () => [
            ...renderActionContent(button, effectData, labelOnly, iconOnly),
            h(DownOutlined),
          ]),
      }
    )
  } else if (button.render) {
    content = button.render({ props: attrs, ...effectData })
  } else {
    content = h(base.Button, { ...attrs, onClick: callAction }, () =>
      renderActionContent(button, effectData, labelOnly, iconOnly)
    )
  }
  return h(base.Tooltip, { title: unref(button.tooltipTitle) }, { default: () => content })
}

function renderAntdvActionGroup(props: Obj) {
  const { groupProps, buttons, moreButtons, defaultButtonProps, divider, labelOnly, iconOnly, moreLabel, effectData } =
    props
  const content = buttons.flatMap((button, index) => [
    renderActionButton(button, effectData, labelOnly, iconOnly),
    divider && index < buttons.length - 1 ? h(base.Divider, { type: 'vertical', class: 'buttons-divider' }) : undefined,
  ])
  if (moreButtons.length) {
    content.push(
      h(
        base.Dropdown,
        {},
        {
          default: () =>
            h(base.Button, defaultButtonProps, () => (moreLabel ? toNode(moreLabel, effectData) : h(EllipsisOutlined))),
          popupRender: () =>
            h(base.Menu, {}, () =>
              moreButtons.map((button) =>
                h(
                  base.MenuItem,
                  {
                    key: button.label,
                    disabled: unref(button.attrs?.disabled),
                    onClick: (event) => {
                      stopActionEvent(event)
                      button.onClick?.(event)
                    },
                  },
                  {
                    icon: button.icon
                      ? () =>
                          renderAntdvIcon(button.icon, {
                            customIcon: globalConfig.customIcon,
                          })
                      : undefined,
                    default: () => toNode(button.label, effectData),
                  }
                )
              )
            ),
        }
      )
    )
  }
  return h(
    base.Space,
    {
      size: divider ? 0 : 'small',
      ...groupProps,
      class: ['sup-buttons', groupProps?.class],
    },
    () => content
  )
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
    render(type, props, slots) {
      return type === 'group' ? renderAntdvActionGroup(props) : h(base.Tooltip, props, slots)
    },
  },
  presentation: {
    render(type, props, slots) {
      if (type === 'checkableTag') {
        const { selected, onSelectedChange, ...rest } = props
        return h(base.CheckableTag, { ...rest, checked: selected, onChange: onSelectedChange }, slots)
      }
      const { removable, onRemove, ...rest } = props
      return h(base.Tag, { ...rest, closable: removable, onClose: onRemove }, slots)
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
        return mapChangeEvent({
          optionFilterProp: 'label',
          placeholder: `请选择${option.label ?? ''}`,
          ...props,
        })
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
      transformProps: (props) => mapChangeEvent(props, (event) => [event?.target?.value]),
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
      transformProps: (props) => mapChangeEvent(props),
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
        return mapChangeEvent(
          {
            allowClear: true,
            placeholder: `请选择${option.label ?? ''}`,
            ...props,
          },
          (value, labels) => [value, Array.isArray(value) ? labels : Array.isArray(labels) ? labels[0] : labels]
        )
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
