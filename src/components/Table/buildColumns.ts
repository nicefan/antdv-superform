import { computed, h, inject, reactive, toRaw } from 'vue'
import type { TableColumnProps } from 'ant-design-vue'
import { globalProps } from '../../plugin'
import { createButtons } from '../buttons'
import { getViewNode } from '../../utils'

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
    const textRender = column.customRender
    const colEditRender = getEditRender?.(col)
    if (colEditRender || textRender) {
      const __render = (param) => colEditRender?.(param) || textRender?.(param) || param.text
      // column.customRender = (param) => renderProduce(param, __render)
      column.customRender = (param) => h(__render, { ...effectData, ...param, current: param.record })
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
      const render = getViewNode(col)
      const column = {
        title,
        dataIndex: model.propChain.join('.'),
        // ...globalProps.Column,
        ...(col.columnProps as Obj),
        customRender:
          render &&
          ((...args) => {
            const val = render(...args)
            if (typeof val === 'string') {
              return h('span', { title: val }, val)
            } else {
              return val
            }
          }),
      }
      columns.push(column)
      colsMap.set(col, column)
    }
  })
  return { columns, colsMap }
}

type BuildActionSlotParams = { buttons; methods; editSlot?: Fn; isView?: boolean }
export function buildActionSlot({ buttons, methods, editSlot, isView }: BuildActionSlotParams) {
  const buttonsConfig: Obj = {
    buttonType: 'link',
    size: 'small',
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
