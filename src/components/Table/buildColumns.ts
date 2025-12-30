import { computed, defineComponent, h, mergeProps, reactive, unref, watch } from 'vue'
import type { TableColumnProps } from 'ant-design-vue'
import { createButtons } from '../buttons'
import { getViewNode, useControl, getEffectData } from '../../utils'
import Controls from '../index'
import { buildInnerNode } from '../Collections'
import { defaults, isFunction, isPlainObject, get as objGet, set as objSet } from 'lodash-es'
import { globalConfig, globalProps } from '../../plugin'
import { createLabelNode } from '../../utils/labelNode'

const InputNode = defineComponent({
  props: {
    option: { type: Object, required: true },
    effectData: { type: Object as any, required: true },
  },
  setup(props) {
    const option = props.option
    const { field, editable } = props.option
    const effectData: Obj = reactive({})
    watch(
      () => props.effectData,
      (data) => Object.assign(effectData, data),
      { immediate: true }
    )
    const path = field.split('.').slice(0, -1)
    const parent = computed(() => objGet(effectData.record, path))
    const refData = computed({
      get: () => objGet(effectData.record, field),
      set: (val) => objSet(effectData.record, field, val),
    })
    const model: any = { parent, refData }
    const { attrs, hidden } = useControl({ option, effectData: { ...effectData, inTable: true } })
    const inputSlot = buildInnerNode(option, model, effectData, attrs)
    const editableRef = computed(() => (isFunction(editable) ? editable(effectData) : unref(editable)))
    const viewNode = getViewNode(option, effectData)

    return () => {
      if (hidden.value) return ''
      if (editableRef.value) {
        return h('div', { class: 'editable-cell' }, inputSlot())
      }
      return viewNode ? viewNode() : refData.value
    }
  },
})

const getEditNode = (option) => {
  if (!option.editable) return
  const roles = (globalConfig.buttonRoles && globalConfig.buttonRoles()) || []
  const isFree = !option.roleName || roles.includes(option.roleName)

  const component = Controls[option.type]
  if (isFree && (component || option.type === 'InputSlot')) {
    return (param) => {
      // param为函数组件props对象，所以需要解构响应内部变化
      return h(InputNode, { option, effectData: { ...param } })
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
  effectData: Obj
  attrs: Obj
  option: Obj // 表格配置
  isView: boolean
}

export function buildColumns({ childrenMap, context, option, attrs, isView, effectData: parentData }: BuildColumnsParam) {
  const { list, methods, getEditRender, editButtonsSlot } = context
  const effectData = getEffectData({ list: parentData.value, isView, parent: parentData })

  const columns = (function getColumns(_models = childrenMap) {
    const _columns: any[] = []
    ;[..._models].forEach(([col, model]) => {
      if (col.type === 'Hidden' || col.hideInTable || col.hidden === true || col.exclude?.includes('table')) return
      const title = createLabelNode(col, effectData)
      if (model.children) {
        const subColumns = getColumns(model.children)
        if (col.ignoreTableTitle) {
          _columns.push(...subColumns)
        } else {
          _columns.push({
            title,
            children: subColumns,
          })
        }
      } else {
        const column: Obj = {
          title,
          key: col.field || col.label,
          dataIndex: model.propChain.length > 1 ? model.propChain : model.propChain[0],
        }
        if (col.options || col.dictName || col.type === 'Switch' || col.type?.includes('Picker')) {
          column.align = 'center'
        } else if (col.type === 'InputNumber') {
          column.align = 'right'
        }
        Object.assign(column, col.columnProps)
        defaults(column, option.columnProps, globalProps.Column)

        const viewRender = column.customRender || getViewNode(col) || undefined
        const editRender = getEditRender ? getEditRender(col, viewRender) : getEditNode(col)
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
    key: 'action',
    fixed: 'right',
    minWidth: 100,
    width: 100,
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
    key: 'INDEX',
    title: '序号',
    width: 60,
    align: 'center',
    customRender: ({ index }) => {
      return ((attrs.pagination?.current || 1) - 1) * (attrs.pagination?.pageSize || 10) + index + 1
    },
    ...(isPlainObject(indexColumn) && indexColumn),
  }
}
