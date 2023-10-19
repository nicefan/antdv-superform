import { KeepAlive, computed, h, inject, reactive, ref, toRaw, unref } from 'vue'
import { ButtonGroup } from '../buttons'
import { TableColumnProps } from 'ant-design-vue'
import { globalConfig } from '../../plugin'

export function createProducer(effectData) {
  const renderMap = new WeakMap<Obj, Map<Obj, Obj>>()
  const keyMap = new WeakMap()
  /** 阻止表格customRender无效的渲染 */
  const renderProduce = (param, render) => {
    const record = toRaw(param.record)
    const row = renderMap.get(record) || new Map()
    renderMap.set(record, row)
    const key = keyMap.get(record) || Symbol()
    keyMap.set(record, key)
    if (!row.has(param.column)) {
      const activeParam = reactive({ ...effectData, ...param, key })
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
  colEditMap?: Map<Obj, Fn> // 行内编辑render方法
}

export function useColumns({ childrenMap, effectData, colEditMap, actionColumn }: BuildColumnsParam) {
  const { columns, colsMap } = buildColumns(childrenMap)
  const rootSlots = { ...inject('rootSlots', {}) }
  if (actionColumn) {
    const { forSlot, render, column } = actionColumn
    if (forSlot) {
      rootSlots[forSlot] = render
    } else {
      columns.push(column)
      colsMap.set('action', column)
    }
  }

  const renderProduce = createProducer(effectData)

  ;[...colsMap].forEach(([col, column]) => {
    let textRender = column.customRender
    if (typeof textRender === 'string') {
      textRender = rootSlots[textRender]
    }
    const colEditRender = colEditMap?.get(col)
    if (colEditRender || textRender) {
      const __render = (param) => colEditRender?.(param) || textRender?.(param) || param.text
      column.customRender = (param) => renderProduce(param, __render)
    }
  })

  return columns as TableColumnProps[]
}

function buildColumns(_models: ModelsMap<MixOption>, colsMap = new Map()) {
  const columns: any[] = []
  ;[..._models].forEach(([col, model]) => {
    if (col.type === 'Hidden' || col.hideInTable) return
    if (model.children) {
      const sub = buildColumns(model.children, colsMap)
      columns.push({
        title: col.label,
        children: sub.columns,
      })
    } else {
      const column = {
        title: col.label,
        dataIndex: model.propChain.join('.'),
        ...(col.columnProps as Obj),
        customRender: getColRender(col),
      }
      columns.push(column)
      colsMap.set(col, column)
    }
  })
  return { columns, colsMap }
}

function getColRender(option) {
  const {
    type: colType,
    viewRender,
    render,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToNumber,
    valueToLabel,
  } = option as any
  if (viewRender) {
    return viewRender // slotname字符串另行处理
  } else if (colType === 'InfoSlot') {
    return typeof render === 'string' ? render : (param) => render?.(param)
  } else if (labelField) {
    return ({ record }) => record[labelField as string]
  } else if (keepField) {
    return ({ record, text }) => text + ' - ' + record[labelField as string]
  } else if (dictName || (colOptions && typeof colOptions[0] !== 'string')) {
    if (valueToLabel) return // 绑定值为Label时直接返回原值
    const options = ref<any[]>()
    if (dictName && globalConfig.dictApi) {
      globalConfig.dictApi(dictName).then((data) => (options.value = data))
    } else if (typeof colOptions === 'function') {
      Promise.resolve(colOptions()).then((data) => (options.value = data))
    } else {
      options.value = unref(colOptions)
    }
    return ({ text }) => {
      return options.value?.find(({ value }) => (valueToNumber ? Number(value) : value) === text)?.label
    }
  } else if (colType === 'Switch') {
    return ({ text }) => (option.valueLabels || '否是')[text]
  } else if (colType === 'Buttons') {
    return (param) => h(ButtonGroup, { config: option, param })
  } else {
    // textRender为undefined将直接返回绑定的值
  }
}

export function buildActionSlot(rowButtons, methods, getEditActions) {
  const buttonsConfig: Obj = {
    buttonType: 'link',
    size: 'small',
    ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
  }
  const { columnProps, forSlot, ...config } = buttonsConfig
  const render = (param) => {
    const actions = getEditActions?.(param)
    return h(KeepAlive, () =>
      actions
        ? h(ButtonGroup, { config: { ...config, actions }, param })
        : h(ButtonGroup, { key: param.key, config, param, methods })
    )
  }
  return {
    forSlot,
    render,
    column: {
      title: '操作',
      key: 'action',
      fixed: 'right',
      minWidth: 100,
      align: 'center',
      ...columnProps,
      customRender: render,
    },
  }
}
