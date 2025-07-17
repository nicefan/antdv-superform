import { computed, defineComponent, h } from 'vue'
import type { TableColumnProps } from 'ant-design-vue'
import { createButtons } from '../buttons'
import { getViewNode, useControl, getEffectData } from '../../utils'
import Controls from '../index'
import { buildInnerNode } from '../Collections'
import { defaults, isPlainObject, get as objGet, set as objSet } from 'lodash-es'
import { globalConfig, globalProps } from '../../plugin'

const InputNode = defineComponent({
  props: {
    option: { type: Object, required: true },
    effectData: { type: Object as any, required: true },
  },
  setup({ option, effectData }) {
    const path = option.field.split('.').slice(0, -1)
    const parent = computed(() => objGet(effectData.record, path))
    const refData = computed({
      get: () => objGet(effectData.record, option.field),
      set: (val) => objSet(effectData.record, option.field, val),
    })
    const model: any = { parent, refData }
    const { attrs, hidden } = useControl({ option, effectData: { ...effectData, inTable: true } })
    const inputSlot = buildInnerNode(option, model, effectData, attrs)
    return () => !hidden.value && inputSlot()
  },
})

const getEditNode = (option) => {
  if (!option.editable) return
  const roles = (globalConfig.buttonRoles && globalConfig.buttonRoles()) || []
  const isFree = !option.roleName || roles.includes(option.roleName)

  const component = Controls[option.type]
  if (isFree && (component || option.type === 'InputSlot')) {
    return (param) => {
      return h(InputNode, { option, effectData: param })
    }
  }
}

interface BuildColumnsParam {
  childrenMap: ModelsMap<MixOption>
  context: {
    list: Ref
    methods?: Obj // 按钮组件绑定方法
    getEditRender?: Fn // 行内编辑render方法
    editButtonsSlot?: Fn
  }
  attrs: Obj
  option: Obj // 表格配置
  isView: boolean
}

export function buildColumns({ childrenMap, context, option, attrs, isView }: BuildColumnsParam) {
  const { list, methods, getEditRender, editButtonsSlot } = context
  const effectData = getEffectData({ list, isView })

  const columns = (function getColumns(_models = childrenMap) {
    const _columns: any[] = []
    ;[..._models].forEach(([col, model]) => {
      if (col.type === 'Hidden' || col.hideInTable || col.hidden === true || col.exclude?.includes('table')) return
      const title = col.labelSlot || col.label
      if (model.children) {
        const subColumns = getColumns(model.children)
        _columns.push({
          title,
          children: subColumns,
        })
      } else {
        const column: Obj = {
          title,
          dataIndex: model.propChain.join('.') || title,
        }
        if (col.options || col.dictName || col.type === 'Switch' || col.type?.includes('Picker')) {
          column.align = 'center'
        } else if (col.type === 'InputNumber') {
          column.align = 'right'
        }
        Object.assign(column, col.columnProps)
        defaults(column, option.columnProps, globalProps.Column)

        const viewRender = column.customRender || getViewNode(col) || undefined
        const editRender = getEditRender ? getEditRender(col) : getEditNode(col)
        column.customRender = parseRender(viewRender, editRender, effectData)
        _columns.push(column)
      }
    })
    return _columns
  })()
  const indexColumn = buildIndexColumn(option, attrs)
  if (indexColumn) columns.unshift(indexColumn)

  const actionColumn = buildActionSlot({ buttons: option.rowButtons, methods, editButtonsSlot, isView, effectData })
  if (actionColumn) columns.push(actionColumn)

  return columns as TableColumnProps[]
}

function parseRender(viewRender, editRender, effectData) {
  if (editRender || viewRender) {
    const __render = (param) => {
      const result = editRender?.(param) ?? viewRender?.({ ...param, isView: true }) ?? String(param.text ?? '')
      if (result && typeof result === 'string' && param.column.ellipsis) {
        return h('span', { title: result }, result)
      }
      return result
    }
    return (param) => h(__render, { ...effectData, ...param, current: param.record })
  } else {
    return ({ text }) => String(text ?? '')
  }
}

export function buildActionSlot({ buttons, methods, editButtonsSlot, isView, effectData }) {
  const buttonsConfig: Obj = {
    buttonType: 'link',
    size: 'small',
    ...globalProps.rowButtons,
    ...(Array.isArray(buttons) ? { actions: buttons } : buttons),
  }
  const { columnProps, ...config } = buttonsConfig
  const buttonsSlot = createButtons({ config, methods, isView })
  if (!buttonsSlot) return
  const render = (param) => {
    return editButtonsSlot?.(param, config) || buttonsSlot({ key: param.record, effectData: param })
  }
  return {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    minWidth: 100,
    align: 'center',
    resizable: false,
    ...columnProps,
    customRender: (param) => h(render, { ...effectData, ...param, current: param.record }),
  }
}

export const buildIndexColumn = (option, attrs) => {
  const indexColumn = option.indexColumn ?? globalProps.Table?.indexColumn
  if (!indexColumn) return
  return {
    dataIndex: 'INDEX',
    title: '序号',
    width: 60,
    align: 'center',
    customRender: ({ index }) => {
      return ((attrs.pagination?.current || 1) - 1) * (attrs.pagination?.pageSize || 10) + index + 1
    },
    ...(isPlainObject(indexColumn) && indexColumn),
  }
}
