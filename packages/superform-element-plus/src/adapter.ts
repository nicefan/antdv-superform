import { h } from 'vue'
import {
  ElCard,
  ElCheckTag,
  ElCol,
  ElDialog,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElImageViewer,
  ElMessage,
  ElMessageBox,
  ElRow,
  ElSpace,
  ElTag,
  ElTooltip,
  ElButton,
} from 'element-plus'
import type { Component } from 'vue'
import {
  builtInIcons,
  defineUIAdapter,
  extendUIAdapter,
  type UIAdapter,
  type UIAdapterOverrides,
  type UIRenderers,
} from 'superform/sdk'
import { elementPlusFieldNames, type ElementPlusFieldName } from './fieldNames'
import { elementPlusFields, elementPlusDefaults, adaptElementPlusFieldProps } from './fields'
import './schemaTypes'
import Descriptions from './components/Descriptions'
import renderTabs from './components/Tabs'
import renderCollapse from './components/Collapse'
import { renderTable, renderTableFilter, tableSelectors } from './components/Table'
import { renderActionGroup } from './components/ActionGroup'
import { renderUpload } from './components/Upload'
export type { ElementPlusFieldName } from './fieldNames'
function resolveServiceContent(content: unknown) {
  return typeof content === 'function' ? content() : content
}

const render: Partial<UIRenderers> = {
  form: (props, slots) => h(ElForm, props, slots),
  formItem: (props, slots) => {
    const { name, ...attrs } = props
    return h(ElFormItem, { ...attrs, prop: name }, slots)
  },
  row: (props, slots) => h(ElRow, props, slots),
  col: (props, slots) => h(ElCol, props, slots),
  space: (props, slots) => h(ElSpace, props, slots),

  card: (state) => {
    return h(ElCard, state.attrs, {
      ...state.slots,
      header:
        state.title || state.extra
          ? () =>
              h(
                'div',
                {
                  class: 'sup-titlebar',
                  style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
                },
                [state.title && h('div', { class: 'sup-title' }, state.title()), state.extra?.()]
              )
          : state.slots?.header,
      default: state.content,
    })
  },
  tabs: renderTabs,
  collapse: renderCollapse,
  descriptions: (state) => h(Descriptions, { state }),
  actionGroup: renderActionGroup,
  tooltip: (props, slots) => {
    const { title, ...rest } = props
    return h(ElTooltip, { ...rest, content: title }, slots)
  },
  tag: (props, slots = {}) => {
    const { removable, onRemove, ...rest } = props
    return h(
      ElTag,
      { ...rest, closable: removable, onClose: onRemove },
      { ...slots, default: () => [slots.icon?.(), slots.default?.()] }
    )
  },
  checkableTag: (props, slots) => {
    const { selected, onSelectedChange, ...rest } = props
    return h(ElCheckTag, { ...rest, checked: selected, onChange: onSelectedChange }, slots)
  },
  empty: () => h(ElEmpty),
  modal: (props, slots = {}) => {
    const { visible, 'onUpdate:visible': onVisibleChange, afterClose, ...rest } = props
    const { title, ...restSlots } = slots
    return h(
      ElDialog,
      {
        ...rest,
        modelValue: visible,
        'onUpdate:modelValue': onVisibleChange,
        onClosed: afterClose,
      },
      title ? { ...restSlots, header: title } : restSlots
    )
  },
  upload: renderUpload,
  uploadTrigger: (props, slots) => h(ElButton, props, slots),
  preview: (props) => {
    if (!props.visible) return null
    return h(ElImageViewer, {
      urlList: props.images ?? [],
      initialIndex: props.current ?? 0,
      onClose: () => props['onUpdate:visible']?.(false),
    })
  },
  table: renderTable,
  tableFilter: renderTableFilter,
}

export interface ElementPlusAdapterOptions {
  components?: Partial<Record<ElementPlusFieldName, Component>>
  overrides?: UIAdapterOverrides
}

export function createElementPlusAdapter(options: ElementPlusAdapterOptions = {}): UIAdapter {
  return extendUIAdapter(
    defineUIAdapter({
      name: 'element-plus',
      render,
      supportedFields: elementPlusFieldNames,
      adaptFieldProps: adaptElementPlusFieldProps,
      fields: elementPlusFields,
      fieldComponents: options.components,
      form: {
        validate: (instance) => instance.validate(),
        validateField: (instance, path) => instance.validateField(path.join('.')),
        clearValidate: (instance) => instance.clearValidate(),
      },
      icons: { semantic: builtInIcons },
      services: {
        message(type, content) {
          ElMessage({ type, message: resolveServiceContent(content) as any })
        },
        confirm(props) {
          ElMessageBox.confirm(resolveServiceContent(props.content) ?? '', resolveServiceContent(props.title) as any, {
            ...props,
            confirmButtonText: props.okText,
            cancelButtonText: props.cancelText,
          })
            .then(props.onOk)
            .catch(props.onCancel)
          return { update: () => undefined, destroy: () => ElMessageBox.close() }
        },
        info(props) {
          let current = { ...props }
          const open = () => {
            ElMessageBox.alert(
              resolveServiceContent(current.content) ?? '',
              resolveServiceContent(current.title) as any,
              {
                ...current,
                confirmButtonText: current.okText,
              }
            )
              .then(current.onOk)
              .catch(() => undefined)
          }
          open()
          return {
            update(next) {
              current = { ...current, ...next }
              ElMessageBox.close()
              open()
            },
            destroy: () => ElMessageBox.close(),
          }
        },
      },

      upload: { listIgnore: false },
      table: { selectors: tableSelectors },
      defaults: {
        ...elementPlusDefaults,
        rowButtons: { buttonProps: { link: true, size: 'small' } },
        ButtonActions: {
          add: { attrs: { type: 'primary' } },
          delete: { attrs: { type: 'danger' } },
          submit: { attrs: { type: 'primary' } },
          search: { attrs: { type: 'primary' } },
        },
      },
    }),
    options.overrides
  )
}
export const elementPlusAdapter = createElementPlusAdapter()
export { elementPlusDefaults, elementPlusFields } from './fields'
