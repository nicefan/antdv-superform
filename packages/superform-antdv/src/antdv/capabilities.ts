import { h, unref, type Component, type VNodeChild } from 'vue'
import {
  Button,
  Card,
  CheckableTag,
  Col,
  Collapse,
  CollapsePanel,
  ConfigProvider,
  Divider,
  Dropdown,
  Form,
  FormItem,
  Image,
  Menu,
  MenuItem,
  Modal,
  Row,
  Space,
  SpaceCompact,
  TabPane,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Upload,
  message,
} from 'antdv-next'
import { builtInIcons } from 'superform/sdk'
import { useConfig as useAntdvConfig } from 'antdv-next/config-provider/context'
import type { UIAdapter } from 'superform/sdk'
import AntdvDescriptions from './Descriptions'
import { SuperList, SuperListItem } from './List'

function toNode(node: any, param: any = {}) {
  if (!node) return null
  if (typeof node === 'function') return node(param || {}, {})
  return typeof node !== 'object'
    ? h('span', node)
    : h(node, { effectData: param })
}

function stopActionEvent(event: any) {
  ;(event?.domEvent || event)?.stopPropagation?.()
}

function renderActionContent(
  button: Obj,
  effectData: Obj,
  labelOnly: boolean,
  iconOnly: boolean
) {
  return [
    button.icon && !labelOnly
      ? button.icon()
      : undefined,
    !button.icon || !iconOnly ? toNode(button.label, effectData) : undefined,
  ]
}

function renderActionButton(
  button: Obj,
  effectData: Obj,
  labelOnly: boolean,
  iconOnly: boolean
) {
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
        popupRender: () =>
          h(Menu, { onClick: callAction }, () =>
            menu.map((item: Obj) =>
              h(
                MenuItem,
                { key: item.value, disabled: item.disabled },
                {
                  icon: item.icon,
                  default: () => toNode(item.label, effectData),
                }
              )
            )
          ),
        default: () =>
          h(Button, attrs, () => [
            ...renderActionContent(
              button,
              effectData,
              labelOnly,
              iconOnly
            ),
            builtInIcons.expand(),
          ]),
      }
    )
  } else if (button.render) {
    content = button.render({ props: attrs, ...effectData })
  } else {
    content = h(Button, { ...attrs, onClick: callAction }, () =>
      renderActionContent(button, effectData, labelOnly, iconOnly)
    )
  }
  return h(
    Tooltip,
    { title: unref(button.tooltipTitle) },
    { default: () => content }
  )
}

function renderActionGroup(props: Obj) {
  const {
    groupProps,
    buttons,
    moreButtons,
    defaultButtonProps,
    divider,
    labelOnly,
    iconOnly,
    moreLabel,
    effectData,
  } = props
  const content = buttons.flatMap((button: Obj, index: number) => [
    renderActionButton(button, effectData, labelOnly, iconOnly),
    divider && index < buttons.length - 1
      ? h(Divider, { type: 'vertical', class: 'sup-buttons-divider' })
      : undefined,
  ])
  if (moreButtons.length) {
    content.push(
      h(
        Dropdown,
        {},
        {
          default: () =>
            h(Button, defaultButtonProps, () =>
              moreLabel ? toNode(moreLabel, effectData) : builtInIcons.more()
            ),
          popupRender: () =>
            h(Menu, {}, () =>
              moreButtons.map((button: Obj) =>
                h(
                  MenuItem,
                  {
                    key: button.label,
                    disabled: unref(button.attrs?.disabled),
                    onClick: (event) => {
                      stopActionEvent(event)
                      button.onClick?.(event)
                    },
                  },
                  {
                    icon: button.icon,
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
    Space,
    {
      size: divider ? 0 : 'small',
      ...groupProps,
      class: ['sup-buttons', groupProps?.class],
    },
    () => content
  )
}

const fixedComponents: Record<string, Component> = {
  Form,
  FormItem,
  Row,
  Col,
  Space,
  SpaceCompact,
  Card,
  Tabs,
  TabPane,
  Collapse,
  CollapsePanel,
  Button,
  Divider,
  Dropdown,
  Menu,
  MenuItem,
  Tooltip,
  Tag,
  CheckableTag,
}

export function createAntdvCapabilities(): Pick<
  UIAdapter,
  | 'components'
  | 'form'
  | 'layout'
  | 'containers'
  | 'icons'
  | 'actions'
  | 'presentation'
  | 'services'
  | 'modal'
  | 'upload'
  | 'preview'
  | 'table'
> {
  const components = fixedComponents
  return {
    components,
    form: {
      component: 'Form',
      item: 'FormItem',
      validateField: (instance, path) => instance.validateFields([path]),
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
      card: { component: 'Card' },
      tabs: {
        component: 'Tabs',
        model: { prop: 'activeKey', event: 'update:activeKey' },
        render(component, props, slots) {
          const { extra, ...restSlots } = slots
          return h(
            component,
            props,
            extra ? { ...restSlots, rightExtra: extra } : restSlots
          )
        },
      },
      tab: {
        component: 'TabPane',
        transformProps(props) {
          const { label, closeIcon, ...rest } = props
          return { ...rest, tab: label, closeIcon: closeIcon?.() }
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
      list: { component: SuperList },
      listItem: { component: SuperListItem },
      descriptions: { component: AntdvDescriptions },
    },
    icons: {
      semantic: builtInIcons,
    },
    actions: {
      render: (type, props, slots) =>
        type === 'group'
          ? renderActionGroup(props)
          : h(Tooltip, props, slots),
    },
    presentation: {
      render(type, props, slots) {
        if (type === 'checkableTag') {
          const { selected, onSelectedChange, ...rest } = props
          return h(
            CheckableTag,
            { ...rest, checked: selected, onChange: onSelectedChange },
            slots
          )
        }
        const { removable, onRemove, ...rest } = props
        return h(
          Tag,
          { ...rest, closable: removable, onClose: onRemove },
          slots
        )
      },
    },
    services: {
      message: (type, content) => message[type](content as any),
      confirm(props) {
        const modal = Modal.confirm(props as any)
        return {
          update: (next) => modal.update(next as any),
          destroy: () => modal.destroy(),
        }
      },
      info(props) {
        const modal = Modal.info(props as any)
        return {
          update: (next) => modal.update(next as any),
          destroy: () => modal.destroy(),
        }
      },
    },
    modal: {
      render(props, slots) {
        const { visible, 'onUpdate:visible': onVisibleChange, ...rest } = props
        return h(
          Modal,
          { ...rest, open: visible, 'onUpdate:open': onVisibleChange },
          slots
        )
      },
      useContext: useAntdvConfig,
      wrapContext(content, context: any, props) {
        const global = context?.value
        const rootPrefixCls = global?.getPrefixCls?.()
        const prefixCls = props.prefixCls || `${rootPrefixCls}-modal`
        return h(ConfigProvider, { ...global, prefixCls: rootPrefixCls }, () =>
          content({ ...props, rootPrefixCls, prefixCls } as any)
        )
      },
    },
    upload: {
      listIgnore: Upload.LIST_IGNORE,
      render: (props, slots) => h(Upload, props, slots),
      renderTrigger: (props, slots) => h(Button, props, slots),
    },
    preview: {
      render(props) {
        const {
          visible,
          'onUpdate:visible': onVisibleChange,
          images = [],
          current,
          width,
          height,
        } = props
        return h(
          Image.PreviewGroup,
          {
            style: { display: 'none' },
            preview: { visible, current, onVisibleChange },
          },
          () =>
            images.map((src: string, index: number) =>
              h(Image, { key: index, src, width, height })
            )
        )
      },
    },
    table: {
      render(props, slots) {
        const {
          data,
          selection,
          expandedKeys,
          onExpandedChange,
          pagination,
          ...rest
        } = props
        return h(
          Table as any,
          {
            ...rest,
            dataSource: data,
            rowSelection: selection && {
              ...selection.attrs,
              selectedRowKeys: selection.selectedKeys,
              onChange: selection.onChange,
              getCheckboxProps: selection.isRowSelectable
                ? (row: Obj) => ({
                    disabled: !selection.isRowSelectable?.(row),
                  })
                : undefined,
            },
            pagination: pagination && {
              ...pagination.attrs,
              ...pagination,
              attrs: undefined,
            },
            expandedRowKeys: expandedKeys,
            'onUpdate:expandedRowKeys': onExpandedChange,
          },
          slots
        )
      },
      renderFilter(props, slots) {
        const { bordered, items, value, onValueChange, attrs = {} } = props
        const { tabExtra, cardExtra, ...contentSlots } = slots
        if (bordered) {
          return h(
            Card as any,
            {
              tabList: items as any,
              activeTabKey: value,
              onTabChange: onValueChange,
            },
            {
              ...contentSlots,
              customTab: ({ tab }) => tab,
              tabBarExtraContent: tabExtra,
              extra: cardExtra,
            }
          )
        }
        const tabs = h(
          Tabs as any,
          { ...attrs, activeKey: value, 'onUpdate:activeKey': onValueChange },
          {
            ...contentSlots,
            default: () =>
              items.map((item: Obj) =>
                h(TabPane, { ...item, tab: () => item.tab })
              ),
            rightExtra: tabExtra,
          }
        )
        return [tabs, slots.default?.()]
      },
      selectors: {
        table: '.ant-table',
        title: '.ant-table-title',
        header: '.ant-table-thead',
        footer: '.ant-table-footer',
        pagination: '.ant-pagination',
        wrapper: '.ant-table-wrapper',
        empty: '.ant-empty',
        emptyCell: '.ant-table-tbody .ant-table-cell',
        body: '.ant-table-body',
      },
    },
  }
}

export const antdvCapabilities = createAntdvCapabilities()
