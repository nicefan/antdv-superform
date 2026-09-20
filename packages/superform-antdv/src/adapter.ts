import { h } from 'vue'
import {
  Card,
  CheckableTag,
  Col,
  ConfigProvider,
  Empty,
  Form,
  FormItem,
  Image,
  Modal,
  Row,
  Space,
  SpaceCompact,
  Tag,
  Tooltip,
  Button,
  Upload,
  message,
} from 'antdv-next'
import { useConfig as useAntdvConfig } from 'antdv-next/config-provider/context'
import type { Component } from 'vue'
import {
  builtInIcons,
  defineUIAdapter,
  extendUIAdapter,
  type UIAdapter,
  type UIAdapterOverrides,
  type UIRenderers,
} from 'superform/sdk'
import { antdvFieldNames, type AntdvFieldName } from './fieldNames'
import { createAntdvFields, adaptAntdvFieldProps } from './fields'
import './schemaTypes'
import Descriptions from './components/Descriptions'
import renderTabs from './components/Tabs'
import renderCollapse from './components/Collapse'
import { renderTable, renderTableFilter, tableSelectors } from './components/Table'
import { renderActionGroup } from './components/ActionGroup'
import { renderUpload } from './components/Upload'
export type { AntdvFieldName } from './fieldNames'

const render: Partial<UIRenderers> = {
  form: (props, slots) => h(Form, props, slots),
  formItem: (props, slots) => h(FormItem, props, slots),
  row: (props, slots) => h(Row, props, slots),
  col: (props, slots) => h(Col, props, slots),
  space: (props, slots) => h(Space, props, slots),
  compactSpace: (props, slots) => h(SpaceCompact, props, slots),
  card: (state) => {
    return h(Card, state.attrs, {
      ...state.slots,
      title: state.title && (() => h('div', { class: 'sup-title' }, state.title!())),
      extra: state.extra,
      default: state.content,
    })
  },
  tabs: renderTabs,
  collapse: renderCollapse,
  descriptions: (state) => h(Descriptions, { state }),
  actionGroup: renderActionGroup,
  tooltip: (props, slots) => h(Tooltip, props, slots),
  tag: (props, slots) => {
    const { removable, onRemove, ...rest } = props
    return h(Tag, { ...rest, closable: removable, onClose: onRemove }, slots)
  },
  checkableTag: (props, slots) => {
    const { selected, onSelectedChange, ...rest } = props
    return h(CheckableTag, { ...rest, checked: selected, onChange: onSelectedChange }, slots)
  },
  empty: () => h(Empty),
  modal: (props, slots = {}) => {
    const { visible, 'onUpdate:visible': onVisibleChange, ...rest } = props
    return h(Modal, { ...rest, open: visible, 'onUpdate:open': onVisibleChange }, slots)
  },
  upload: renderUpload,
  uploadTrigger: (props, slots) => h(Button, props, slots),
  preview: (props) => {
    const { visible, 'onUpdate:visible': onVisibleChange, images = [], current, width, height } = props
    return h(
      Image.PreviewGroup,
      {
        style: { display: 'none' },
        preview: { visible, current, onVisibleChange },
      },
      () => images.map((src: string, index: number) => h(Image, { key: index, src, width, height }))
    )
  },
  table: renderTable,
  tableFilter: renderTableFilter,
}

export interface AntdvAdapterOptions {
  components?: Partial<Record<AntdvFieldName, Component>>
  overrides?: UIAdapterOverrides
}

export function createAntdvAdapter(options: AntdvAdapterOptions = {}): UIAdapter {
  return extendUIAdapter(
    defineUIAdapter({
      name: 'antdv-next',
      render,
      supportedFields: antdvFieldNames,
      adaptFieldProps: adaptAntdvFieldProps,
      fields: createAntdvFields(),
      fieldComponents: options.components,
      form: {
        validate: (instance) => instance.validate(),
        validateField: (instance, path) => instance.validateFields([path]),
        clearValidate: (instance) => instance.clearValidate(),
      },
      icons: { semantic: builtInIcons },
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
        useContext: useAntdvConfig,
        wrapContext: (content, context: any, props) => {
          const global = context?.value
          const rootPrefixCls = global?.getPrefixCls?.()
          const prefixCls = props.prefixCls || `${rootPrefixCls}-modal`
          return h(ConfigProvider, { ...global, prefixCls: rootPrefixCls }, () =>
            content({ ...props, rootPrefixCls, prefixCls } as any)
          )
        },
      },
      upload: { listIgnore: Upload.LIST_IGNORE },
      table: { selectors: tableSelectors },
      defaults: {
        rowButtons: { buttonProps: { type: 'link', size: 'small' } },
        ButtonActions: {
          add: { attrs: { type: 'primary' } },
          delete: { attrs: { danger: true } },
          submit: { attrs: { type: 'primary' } },
          search: { attrs: { type: 'primary' } },
        },
        FormItem: { validateFirst: true },
        Table: { size: 'small' },
        TimePicker: { valueFormat: 'HH:mm:ss' },
        TimeRangePicker: { valueFormat: 'HH:mm:ss' },
        DatePicker: { valueFormat: 'YYYY-MM-DD' },
        DateRangePicker: { valueFormat: 'YYYY-MM-DD' },
      },
    }),
    options.overrides
  )
}
export const antdvAdapter = createAntdvAdapter()
export { antdvDefaults, antdvFields, createAntdvFields } from './fields'
