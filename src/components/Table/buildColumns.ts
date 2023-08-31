import { computed, h, inject, reactive, ref, toRaw, unref } from 'vue'
import { ButtonGroup } from '../buttons'
import { TableColumnProps } from 'ant-design-vue'

export function createProducer() {
  const renderMap = new WeakMap<Obj, Map<Obj, Obj>>()
  /** 阻止表格customRender无效的渲染 */
  const renderProduce = (param, render) => {
    const record = toRaw(param.record)
    const row = renderMap.get(record) || new Map()
    renderMap.set(record, row)
    if (!row.has(param.column)) {
      const activeParam = reactive(param)
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
  rowButtons?: Obj // 行操作按钮
}

export function useColumns({ childrenMap, methods, rowButtons, effectData }: BuildColumnsParam) {
  const actionColumn = buildActionSlot(rowButtons, effectData, methods)
  const columns = buildColumns(childrenMap, effectData)
  const rootSlots = { ...inject('rootSlots', {}) }
  if (actionColumn.forSlot) {
    rootSlots[actionColumn.forSlot] = actionColumn.render
  } else {
    columns.push(actionColumn.column)
  }
  columns.forEach((item) => {
    if (typeof item.customRender === 'string') {
      item.customRender = rootSlots[item.customRender]
    }
  })
  return columns as TableColumnProps[]
}

function buildColumns(_models: ModelsMap<MixOption>, effectData) {
  const _columns: any[] = []
  ;[..._models].forEach(([col, model]) => {
    if (col.type === 'Hidden' || col.hideInTable) return
    if (model.children) {
      _columns.push({
        title: col.label,
        children: buildColumns(model.children, effectData),
      })
    } else {
      const textRender: Fn | undefined = getColRender(col, effectData)
      _columns.push({
        title: col.label,
        dataIndex: model.propChain.join('.'),
        ...(col.columnProps as Obj),
        customRender: textRender,
      })
    }
  })
  return _columns
}

function getColRender(option, effectData) {
  const { type: colType, viewRender, render, options: colOptions, labelField, keepField } = option as any
  if (viewRender || colType === 'InfoSlot') {
    return viewRender || render // slotname字符串另行处理
  } else if (labelField) {
    return ({ record }) => record[labelField as string]
  } else if (keepField) {
    return ({ record, text }) => text + ' - ' + record[labelField as string]
  } else if (colOptions && typeof colOptions?.[0] !== 'string') {
    const options = ref<any[]>()
    if (typeof colOptions === 'function') {
      Promise.resolve(colOptions(effectData)).then((data) => (options.value = data))
    } else {
      options.value = unref(colOptions)
    }
    return ({ text }) => {
      return options.value?.find(({ value }) => value === text)?.label
    }
  } else if (colType === 'Switch') {
    return ({ text }) => (option.valueLabels || '否是')[text]
  } else if (colType === 'Buttons') {
    return (param) => h(ButtonGroup, { config: option, param: reactive({ ...effectData, ...param }) })
  } else {
    // textRender为undefined将直接返回绑定的值
  }
}

function buildActionSlot(rowButtons, effectData, methods) {
  const buttonsConfig: Obj = {
    buttonType: 'link',
    size: 'small',
    ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
  }
  const { columnProps, forSlot, ...config } = buttonsConfig
  const render = (param) =>
    h(ButtonGroup, {
      config,
      param: reactive({ ...effectData, ...param }),
      methods: methods,
    })

  return {
    forSlot,
    render,
    column: {
      title: '操作',
      key: 'action',
      fixed: 'right',
      minWidth: '100',
      align: 'center',
      ...columnProps,
      customRender: render,
    },
  }
}
