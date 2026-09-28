import { useConfig as useAntdvConfig } from 'antdv-next/config-provider/context'
import { h } from 'vue'
import {
  ConfigProvider,
  Card,
  CheckableTag,
  CheckableTagGroup,
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

async function validateForm(instance: any, paths?: (string | number)[][]) {
  try {
    if (paths) await instance.validateFields(paths)
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
      validate: validateForm,
      validateField: (instance, path) => validateForm(instance, [path]),
      clearValidate: (instance) => instance.clearValidate(),
    },
    component: Form,
    adaptProps: ({ hideRequiredMark, ...attrs }) =>
      hideRequiredMark ? { ...attrs, requiredMark: false } : attrs,
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
        save: { attrs: { type: 'primary' } },
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
  button: { component: Button },
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
  checkableTagGroup: {
    render: ({ attrs: { options, selected, multiple, onSelectedChange } }) =>
      h(CheckableTagGroup, {
        options,
        classes: { item: 'tag-select' },
        multiple,
        value: multiple ? selected : selected[0] ?? null,
        onChange: (value: string | number | (string | number)[] | null) => {
          const nextSelected = Array.isArray(value) ? value : value === null ? [] : [value]
          const added = nextSelected.find((item) => !selected.includes(item))
          const removed = selected.find((item) => !nextSelected.includes(item))
          // 原生分组只提供最终值；还原点击项，由 Core 保留单选不可取消及 check/change 语义。
          if (added !== undefined) onSelectedChange(added, true)
          else if (removed !== undefined) onSelectedChange(removed, false)
        },
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
    adaptProps: ({ visible, 'onUpdate:visible': onVisibleChange, destroyOnClose, ...attrs }) => ({
      ...attrs,
      open: visible,
      destroyOnHidden: destroyOnClose,
      'onUpdate:open': onVisibleChange,
    }),
  },
  upload: { render: ({ state, slots }) => renderUpload(state, slots) },
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
