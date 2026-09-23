import { useConfig as useAntdvConfig } from 'antdv-next/config-provider/context'
import { h } from 'vue'
import {
  ConfigProvider,
  Upload,
  Card,
  CheckableTag,
  Col,
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
} from 'antdv-next'
import { FormValidationError, type UIComponentDefinitions } from 'superform/sdk'
import Descriptions from './components/Descriptions'
import renderTabs from './components/Tabs'
import renderCollapse from './components/Collapse'
import { renderTable, renderTableFilter, tableSelectors } from './components/Table'
import { renderActionGroup } from './components/ActionGroup'
import { renderUpload } from './components/Upload'

async function validateForm(instance: any, path?: (string | number)[]) {
  try {
    if (path) await instance.validateFields([path])
    else await instance.validate()
  } catch (error: any) {
    if (!Array.isArray(error?.errorFields)) throw error
    throw new FormValidationError(
      error.errorFields.map((field) => ({ path: field.name, messages: field.errors })),
      error
    )
  }
}

export const uiComponents: UIComponentDefinitions = {
  form: {
    service: {
      validate: (instance) => validateForm(instance),
      validateField: validateForm,
      clearValidate: (instance) => instance.clearValidate(),
    },
    component: Form,
  },
  formItem: { defaults: { validateFirst: true }, component: FormItem },
  row: { component: Row },
  col: { component: Col },
  space: { component: Space },
  compactSpace: { component: SpaceCompact },
  card: {
    render: ({ state }) => {
      return h(Card, state.attrs, {
        ...state.slots,
        title: state.title && (() => h('div', { class: 'sup-title' }, [state.title!()])),
        extra: state.extra,
        default: state.content,
      })
    },
  },
  tabs: { render: ({ state }) => renderTabs(state) },
  collapse: { render: ({ state }) => renderCollapse(state) },
  descriptions: { render: ({ state }) => h(Descriptions, { state }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { type: 'link', size: 'small' } },
      ButtonActions: {
        expand: { attrs: { type: 'link' } },
        add: { attrs: { type: 'primary' } },
        delete: { attrs: { danger: true } },
        submit: { attrs: { type: 'primary' } },
        search: { attrs: { type: 'primary' } },
      },
    },
    render: ({ attrs }) => renderActionGroup(attrs),
  },
  tooltip: { component: Tooltip },
  tag: {
    component: Tag,
    adaptProps: ({ removable, onRemove, ...attrs }) => ({ ...attrs, closable: removable, onClose: onRemove }),
  },
  checkableTag: {
    component: CheckableTag,
    adaptProps: ({ selected, onSelectedChange, ...attrs }) => ({
      ...attrs,
      checked: selected,
      onChange: onSelectedChange,
    }),
  },
  empty: { component: Empty },
  modal: {
    service: {
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
    component: Modal,
    adaptProps: ({ visible, 'onUpdate:visible': onVisibleChange, ...attrs }) => ({
      ...attrs,
      open: visible,
      'onUpdate:open': onVisibleChange,
    }),
  },
  upload: { service: { listIgnore: Upload.LIST_IGNORE }, render: ({ attrs, slots }) => renderUpload(attrs, slots) },
  uploadTrigger: { component: Button },
  preview: {
    render: ({ attrs: props }) => {
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
  },
  table: {
    service: { selectors: tableSelectors },
    defaults: { size: 'small' },
    render: ({ attrs, slots }) => renderTable(attrs, slots),
  },
  tableFilter: { render: ({ attrs, slots }) => renderTableFilter(attrs, slots) },
}
