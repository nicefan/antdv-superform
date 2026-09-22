import { toRaw, watch, reactive, h, defineComponent, computed, unref, toRefs, toRef } from 'vue'
import { isFunction } from 'lodash-es'
import { getSchemaTypeSource, hasFormComponent } from '../index'
import { useControl, cloneModelsFlat, getEffectData, getViewNode } from '../../utils'
import { getUIRender } from '../../adapter'
import { buildInnerNode } from '../Collections'
import type { ExtColumnsItem } from 'src/exaTypes'
import { formatRule, updateModelIndex } from '../../utils/buildModel'

export default function ({ model, orgList, editableRef, rowKey }) {
  const { modelsMap: childrenMap } = model.listData
  const propChain = toRef(model, 'propChain', [])
  const listMap = new WeakMap()
  const getRow = (record, index) => {
    const raw = toRaw(record)
    const chain = [...propChain.value, index]
    let row = listMap.get(raw)
    if (row) {
      updateModelIndex(row.model, chain, index)
    } else {
      const { modelsMap, rootModels } = cloneModelsFlat<ExtColumnsItem>(toRaw(childrenMap), record, propChain.value, index)
      row = { key: Symbol(), modelsMap, model: reactive({ children: rootModels, index, propChain: chain }) }
      listMap.set(raw, row)
    }
    return row
  }
  watch(
    [() => [...orgList.value], () => [...propChain.value]],
    ([records]) => {
      records.forEach(getRow)
    },
    { immediate: true, flush: 'sync' }
  )

  const methods = {
    add({ index, record, resetData } = {} as Obj) {
      const item = { ...resetData }
      // 原生分页行号只代表当前页，行按钮优先按稳定键定位源数组。
      const position = record ? orgList.value.findIndex(row => rowKey(row) === rowKey(record)) : index
      if (position !== undefined) {
        if (!orgList.value[position]) throw new Error('新增位置已失效，请重新选择插入位置')
        orgList.value.splice(position + 1, 0, item)
      } else {
        orgList.value.push(item)
      }
    },
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }

  const InputNode = defineComponent({
    inheritAttrs: false,
    props: {
      option: { type: Object, required: true },
    },
    setup({ option }, ctx) {
      const { record } = ctx.attrs as Obj
      const model = computed(() => {
        const row = listMap.get(toRaw(record))
        return row.modelsMap.get(option)
      })
      const { index, parent, refData } = toRefs(model.value)
      const effectData = getEffectData({
        current: parent,
        value: refData,
        list: orgList,
        record,
        index,
      })
      const { editable = true } = option
      const { attrs, hidden, nativeAttrs, disabled } = useControl({ option, effectData })
      const selfEditableRef = computed(
        () => !hidden.value && editableRef.value && (isFunction(editable) ? editable(effectData) : editable)
      )
      const inputSlot = buildInnerNode(option, model.value, effectData, attrs, { attrs: nativeAttrs, disabled })
      const viewNode = getViewNode(option, reactive({ ...toRefs(effectData), isView: true }))
      const __rules = formatRule(model.value.rules, effectData)
      const rules = __rules && computed(() => (unref(attrs.disabled) ? undefined : __rules))
      return () =>
        selfEditableRef.value
          ? getUIRender('formItem')(
              {
                wrapperCol: {},
                name: model.value.propChain,
                rules: rules?.value,
              },
              { default: inputSlot }
            )
          : viewNode
          ? viewNode()
          : refData.value
    },
  })

  const getEditRender = (option) => {
    // Adapter 字段不进入项目组件表，整表编辑仍需为这些字段创建输入节点。
    if (
      getSchemaTypeSource(option.type) === 'enhanced' ||
      hasFormComponent(option.type) ||
      (option.type === 'InputSlot' && option.editable !== false)
    ) {
      return (args) => {
        // 异步查询后的单元格可能先于父级 watcher 渲染；在入口确保模型存在。
        // 同 ID 对象替换时重挂字段，避免 setup 中的绑定继续写入旧对象；重排则保留模型。
        const index = orgList.value.findIndex((record) => toRaw(record) === toRaw(args.record))
        const row = getRow(args.record, index < 0 ? args.index : index)
        return h(InputNode, { key: row.key, option, ...args })
      }
    }
  }

  return {
    list: orgList,
    methods,
    getEditRender,
  }
}
