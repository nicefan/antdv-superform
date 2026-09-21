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
  ElRow,
  ElSpace,
  ElTag,
  ElTooltip,
  ElButton,
} from 'element-plus'
import { FormValidationError, type UIComponentDefinitions } from 'superform/sdk'
import Descriptions from './components/Descriptions'
import renderTabs from './components/Tabs'
import renderCollapse from './components/Collapse'
import { renderTable, renderTableFilter, tableSelectors } from './components/Table'
import { renderActionGroup } from './components/ActionGroup'
import { renderUpload } from './components/Upload'

async function validateForm(instance: any, path?: (string | number)[]) {
  try {
    if (path) await instance.validateField([path.join('.')])
    else await instance.validate()
  } catch (error: any) {
    // 原生校验失败返回字段字典；运行异常不能伪装成字段校验失败。
    if (!error || typeof error !== 'object' || error instanceof Error) throw error
    const fields = Object.entries(error)
    if (!fields.length || !fields.every(([, errors]) => Array.isArray(errors))) throw error
    throw new FormValidationError(
      fields.map(([name, errors]) => ({
        path: path || name.split('.'),
        messages: (errors as { message?: string }[]).flatMap((item) => (item.message ? [item.message] : [])),
      })),
      error
    )
  }
}

export const uiComponents = {
  form: {
    service: {
      validate: (instance) => validateForm(instance),
      validateField: validateForm,
      clearValidate: (instance) => instance.clearValidate(),
    },
    component: ElForm,
  },
  formItem: {
    defaults: { validateEvent: true },
    component: ElFormItem,
    adaptProps: ({ name, ...props }) => ({ ...props, prop: name?.map(String) }),
  },
  row: { component: ElRow },
  col: { component: ElCol },
  space: { component: ElSpace },
  card: {
    render: ({ state }) => {
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
                  [state.title && h('div', { class: 'sup-title' }, [state.title()]), state.extra?.()]
                )
            : state.slots?.header,
        default: state.content,
      })
    },
  },
  tabs: { render: ({ state }) => renderTabs(state) },
  collapse: { render: ({ state }) => renderCollapse(state) },
  descriptions: { render: ({ state }) => h(Descriptions, { state }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { link: true, size: 'small' } },
      ButtonActions: {
        expand: { attrs: { link: true } },
        add: { attrs: { type: 'primary' } },
        delete: { attrs: { type: 'danger' } },
        submit: { attrs: { type: 'primary' } },
        search: { attrs: { type: 'primary' } },
      },
    },
    render: ({ attrs }) => renderActionGroup(attrs),
  },
  tooltip: { component: ElTooltip, adaptProps: ({ title, ...props }) => ({ ...props, content: title }) },
  tag: {
    adaptProps: ({ removable, onRemove, ...attrs }) => ({ ...attrs, closable: removable, onClose: onRemove }),
    render: ({ attrs: props, slots }) => {
      return h(ElTag, props, { ...slots, default: () => [slots.icon?.(), slots.default?.()] })
    },
  },
  checkableTag: {
    component: ElCheckTag,
    adaptProps: ({ selected, onSelectedChange, ...attrs }) => ({
      ...attrs,
      checked: selected,
      onChange: onSelectedChange,
    }),
  },
  empty: { component: ElEmpty },
  modal: {
    render: ({ attrs: props, slots }) => {
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
  },
  upload: { service: { listIgnore: false }, render: ({ attrs, slots }) => renderUpload(attrs, slots) },
  uploadTrigger: { component: ElButton },
  preview: {
    render: ({ attrs: props }) => {
      if (!props.visible) return null
      return h(ElImageViewer, {
        urlList: props.images ?? [],
        initialIndex: props.current ?? 0,
        onClose: () => props['onUpdate:visible']?.(false),
      })
    },
  },
  table: { service: { selectors: tableSelectors }, render: ({ attrs, slots }) => renderTable(attrs, slots) },
  tableFilter: { render: ({ attrs, slots }) => renderTableFilter(attrs, slots) },
} satisfies UIComponentDefinitions
