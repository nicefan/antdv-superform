import { computed, defineComponent, effect, h, inject, reactive, toRaw, toRef } from 'vue'
import type { TableColumnProps } from 'ant-design-vue'
import { createButtons } from '../buttons'
import { getViewNode, useControl, getEffectData } from '../../utils'
import Controls from '../index'
import { buildInnerNode } from '../Collections'
import { get as objGet, set as objSet } from 'lodash-es'
import { globalConfig } from '../../plugin'

export function createProducer(effectData) {
  const renderMap = new WeakMap<Obj, Map<Obj, Obj>>()
  // const keyMap = new WeakMap()
  /** 阻止表格customRender无效的渲染 */
  const renderProduce = (param, render) => {
    const record = toRaw(param.record)
    const row = renderMap.get(record) || new Map()
    renderMap.set(record, row)
    // const key = keyMap.get(record) || Symbol()
    // keyMap.set(record, key)
    if (!row.has(param.column)) {
      const activeParam = reactive({ ...effectData, ...param, current: param.record })
      const node = computed(() => render(activeParam))
      row.set(param.column, { activeParam, node })
      return node.value
    } else {
      const { activeParam, node } = row.get(param.column)
      Object.assign(activeParam, param)
      return node.value
    }
  }
  return renderProduce
}
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
    const { attrs, hidden } = useControl({ option, effectData })
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
  childrenMap: ModelsMap
  methods?: Obj // 按钮组件绑定方法
  effectData?: Obj // 按钮组件绑定传参
  actionColumn?: Obj // 行操作按钮
  getEditRender?: Fn // 行内编辑render方法
}

export function useColumns({ childrenMap, effectData, getEditRender, actionColumn }: BuildColumnsParam) {
  const rootSlots = { ...inject('rootSlots', {}) }
  const { columns, colsMap } = buildColumns(childrenMap)
  if (actionColumn) {
    const { forSlot, render, column } = actionColumn
    if (forSlot) {
      rootSlots[forSlot] = render
    } else {
      columns.push(column)
      colsMap.set('action', column)
    }
  }
  // const renderProduce = createProducer(effectData)
  ;[...colsMap].forEach(([col, column]) => {
    const viewRender = column.customRender || getViewNode(col) || undefined
    const colEditRender = getEditRender ? getEditRender(col) : getEditNode(col)

    if (colEditRender || viewRender) {
      const __render = (param) => {
        const result = colEditRender?.(param) ?? viewRender?.(param) ?? String(param.text ?? '')
        if (result && typeof result === 'string' && column.ellipsis) {
          return h('span', { title: result }, result)
        }
        return result
      }
      // column.customRender = (param) => renderProduce(param, __render)
      column.customRender = (param) => h(__render, { ...effectData, ...param, current: param.record })
    } else {
      column.customRender = ({ text }) => String(text ?? '')
    }
  })

  return columns as TableColumnProps[]
}

function buildColumns(_models: ModelsMap<MixOption>, colsMap = new Map()) {
  const columns: any[] = []
  ;[..._models].forEach(([col, model]) => {
    if (col.type === 'Hidden' || col.hideInTable || col.hidden === true) return
    const title = col.labelSlot || col.label
    if (model.children) {
      const sub = buildColumns(model.children, colsMap)
      columns.push({
        title,
        children: sub.columns,
      })
    } else {
      const column = {
        title,
        dataIndex: model.propChain.join('.') || title,
        // ...globalProps.Column,
        ...(col.columnProps as Obj),
      }
      columns.push(column)
      colsMap.set(col, column)
    }
  })
  return { columns, colsMap }
}

type BuildActionSlotParams = { buttons; methods; editSlot?: Fn; isView?: boolean; defAttrs?: Obj }
export function buildActionSlot({ buttons, methods, editSlot, isView, defAttrs }: BuildActionSlotParams) {
  const buttonsConfig: Obj = {
    buttonType: 'link',
    size: 'small',
    ...defAttrs,
    ...(Array.isArray(buttons) ? { actions: buttons } : buttons),
  }
  const { columnProps, forSlot, ...config } = buttonsConfig
  const buttonsSlot = createButtons({ config, methods, isView })
  if (!buttonsSlot) return
  const render = (param) => {
    return editSlot?.(param, config) || buttonsSlot({ key: param.record, effectData: param })
  }
  return {
    forSlot,
    render,
    column: {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      minWidth: 100,
      align: 'center',
      resizable: false,
      ...columnProps,
      customRender: render,
    },
  }
}
