import { computed, defineComponent, h, reactive, unref, watch } from 'vue'
import { createButtons } from '../buttons'
import { mergeButtonConfig } from '../buttons/mergeButtonConfig'
import { getViewNode, useControl, getEffectData } from '../../utils'
import { getSchemaTypeSource, hasFormComponent } from '../index'
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
    const { attrs, hidden, nativeAttrs, disabled } = useControl({
      option,
      effectData: { ...effectData, inTable: true },
    })
    const inputSlot = buildInnerNode(option, model, effectData, attrs, { attrs: nativeAttrs, disabled })
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

  // 单列 editable 与整表、行内编辑使用相同的 Adapter 字段识别规则。
  if (
    isFree &&
    (getSchemaTypeSource(option.type) === 'enhanced' || hasFormComponent(option.type) || option.type === 'InputSlot')
  ) {
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
    buttonMethods?: Obj // 带禁用状态等配置的按钮方法
    getEditRender?: Fn // 行内编辑render方法
    editButtonsSlot?: Fn
  }
  effectData: Obj
  attrs: Obj
  option: Obj // 表格配置
  isView: boolean
}

export function buildColumns({
  childrenMap,
  context,
  option,
  attrs,
  isView,
  effectData: parentData,
}: BuildColumnsParam): Obj[] {
  const { methods, buttonMethods, getEditRender, editButtonsSlot } = context
  const effectData = getEffectData({ list: parentData.value, isView, parent: parentData })
  // 弹窗模式的 editable 用于编辑配置，不能再回退为直接修改源数据的单元格输入。
  const allowColumnEdit = (option.rowEditor || option).editMode !== 'modal'

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
        if (col.options || col.type === 'Switch' || col.type?.includes('Picker')) {
          column.align = 'center'
        } else if (col.type === 'InputNumber') {
          column.align = 'right'
        }
        Object.assign(column, col.columnProps)
        defaults(column, option.columnProps, globalProps.Column)

        const viewRender = column.customRender || getViewNode(col) || undefined
        const editRender = getEditRender ? getEditRender(col, viewRender) : allowColumnEdit ? getEditNode(col) : undefined
        column.customRender = parseRender(viewRender, editRender, effectData)
        _columns.push(column)
      }
    })
    return _columns
  })()
  const indexColumn = buildIndexColumn(option, attrs)
  if (indexColumn) columns.unshift(indexColumn)

  const actionColumn = buildActionSlot({
    buttons: option.rowButtons,
    // 行内编辑需要覆盖新增/编辑/删除的禁用状态，但不能丢失详情等通用动作。
    methods: { ...(methods || {}), ...(buttonMethods || {}) },
    editButtonsSlot,
    isView,
    effectData,
  })
  if (actionColumn) {
    defaults(actionColumn, option.columnProps, globalProps.Column)
    columns.push(actionColumn)
  }
  return columns
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
  const buttonsConfig = mergeButtonConfig(globalProps.rowButtons || {}, buttons)
  const { columnProps, ...config } = buttonsConfig as typeof buttonsConfig & { columnProps?: Obj }
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
