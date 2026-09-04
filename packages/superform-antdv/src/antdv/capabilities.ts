import { h, toRaw, unref, type Component, type VNodeChild } from 'vue'
import {
  Button,
  Card,
  CheckableTag,
  Col,
  Collapse,
  CollapsePanel,
  Divider,
  Dropdown,
  Form,
  FormItem,
  Menu,
  MenuItem,
  Row,
  Space,
  SpaceCompact,
  TabPane,
  Tabs,
  Tag,
  Tooltip,
} from 'antdv-next'
import { DownOutlined, EllipsisOutlined, InfoCircleOutlined, MinusOutlined, PlusOutlined, UpOutlined } from '@antdv-next/icons'
import { globalConfig, type UIAdapter } from 'superform/sdk'
import AntdvDescriptions from './Descriptions'
import { SuperList, SuperListItem } from './List'

function toNode(node: any, param: any = {}) {
  if (!node) return null
  if (typeof node === 'function') return node(param || {}, {})
  return typeof node !== 'object' ? h('span', node) : h(node, { effectData: param })
}

export function renderAntdvIcon(icon: unknown, { customIcon }: { customIcon?: (name: string) => any } = {}) {
  if (typeof icon === 'string') return customIcon?.(icon) || h('span', { class: `anticon ${icon}` })
  return icon ? h(toRaw(icon) as any) : undefined
}

function stopActionEvent(event: any) {
  ;(event?.domEvent || event)?.stopPropagation?.()
}

function renderActionContent(button: Obj, effectData: Obj, labelOnly: boolean, iconOnly: boolean, customIcon?: (name: string) => any) {
  return [
    button.icon && !labelOnly ? renderAntdvIcon(button.icon, { customIcon }) : undefined,
    !button.icon || !iconOnly ? toNode(button.label, effectData) : undefined,
  ]
}

function renderActionButton(button: Obj, effectData: Obj, labelOnly: boolean, iconOnly: boolean, customIcon?: (name: string) => any) {
  const attrs = { ...button.attrs, disabled: unref(button.attrs?.disabled) }
  const callAction = (event: any) => {
    stopActionEvent(event)
    button.onClick?.(event)
  }
  const menu = unref(button.menu)
  let content: VNodeChild
  if (menu) {
    content = h(
      Dropdown,
      { disabled: attrs.disabled, ...button.dropdownProps },
      {
        popupRender: () => h(Menu, { onClick: callAction }, () => menu.map((item: Obj) => h(MenuItem, { key: item.value, disabled: item.disabled }, {
          icon: item.icon ? () => renderAntdvIcon(item.icon, { customIcon }) : undefined,
          default: () => toNode(item.label, effectData),
        }))),
        default: () => h(Button, attrs, () => [...renderActionContent(button, effectData, labelOnly, iconOnly, customIcon), h(DownOutlined)]),
      }
    )
  } else if (button.render) {
    content = button.render({ props: attrs, ...effectData })
  } else {
    content = h(Button, { ...attrs, onClick: callAction }, () => renderActionContent(button, effectData, labelOnly, iconOnly, customIcon))
  }
  return h(Tooltip, { title: unref(button.tooltipTitle) }, { default: () => content })
}

function renderActionGroup(props: Obj, customIcon?: (name: string) => any) {
  const { groupProps, buttons, moreButtons, defaultButtonProps, divider, labelOnly, iconOnly, moreLabel, effectData } = props
  const content = buttons.flatMap((button: Obj, index: number) => [
    renderActionButton(button, effectData, labelOnly, iconOnly, customIcon),
    divider && index < buttons.length - 1 ? h(Divider, { type: 'vertical', class: 'sup-buttons-divider' }) : undefined,
  ])
  if (moreButtons.length) {
    content.push(h(Dropdown, {}, {
      default: () => h(Button, defaultButtonProps, () => moreLabel ? toNode(moreLabel, effectData) : h(EllipsisOutlined)),
      popupRender: () => h(Menu, {}, () => moreButtons.map((button: Obj) => h(MenuItem, {
        key: button.label,
        disabled: unref(button.attrs?.disabled),
        onClick: (event) => { stopActionEvent(event); button.onClick?.(event) },
      }, {
        icon: button.icon ? () => renderAntdvIcon(button.icon, { customIcon }) : undefined,
        default: () => toNode(button.label, effectData),
      }))),
    }))
  }
  return h(Space, { size: divider ? 0 : 'small', ...groupProps, class: ['sup-buttons', groupProps?.class] }, () => content)
}

const fixedComponents: Record<string, Component> = {
  Form, FormItem, Row, Col, Space, SpaceCompact, Card, Tabs, TabPane, Collapse, CollapsePanel,
  Button, Divider, Dropdown, Menu, MenuItem, Tooltip, Tag, CheckableTag,
}

export function createAntdvCapabilities(): Pick<UIAdapter, 'components' | 'form' | 'layout' | 'containers' | 'icons' | 'actions' | 'presentation'> {
  const components = fixedComponents
  return {
    components,
    form: {
      component: 'Form',
      item: 'FormItem',
      validate: (instance) => instance.validate(),
      clearValidate: (instance) => instance.clearValidate(),
    },
    layout: { row: 'Row', col: 'Col', space: 'Space', compactSpace: 'SpaceCompact' },
    containers: {
      card: { component: 'Card' },
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
      collapse: { component: 'Collapse', model: { prop: 'activeKey', event: 'update:activeKey' } },
      collapsePanel: {
        component: 'CollapsePanel',
        transformProps(props) {
          const { disabled, ...rest } = props
          return { ...rest, collapsible: disabled ? 'disabled' : undefined }
        },
      },
      list: { component: SuperList },
      listItem: { component: SuperListItem },
      descriptions: { component: AntdvDescriptions },
    },
    icons: {
      semantic: { add: PlusOutlined, remove: MinusOutlined, more: EllipsisOutlined, expand: DownOutlined, collapse: UpOutlined, info: InfoCircleOutlined },
      render: renderAntdvIcon,
    },
    actions: {
      render: (type, props, slots) =>
        type === 'group' ? renderActionGroup(props, globalConfig.customIcon) : h(Tooltip, props, slots),
    },
    presentation: {
      render(type, props, slots) {
        if (type === 'checkableTag') {
          const { selected, onSelectedChange, ...rest } = props
          return h(CheckableTag, { ...rest, checked: selected, onChange: onSelectedChange }, slots)
        }
        const { removable, onRemove, ...rest } = props
        return h(Tag, { ...rest, closable: removable, onClose: onRemove }, slots)
      },
    },
  }
}

export const antdvCapabilities = createAntdvCapabilities()
