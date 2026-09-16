import { toRaw, watch, reactive, h, defineComponent, computed, unref, toRefs, toRef } from 'vue'
import { isFunction } from 'lodash-es'
import { hasFormComponent } from '../index'
import { useControl, cloneModelsFlat, getEffectData, getViewNode } from '../../utils'
import { renderUIFormItem } from '../../adapter'
import { buildInnerNode } from '../Collections'
import type { ExtColumnsItem } from 'src/exaTypes'
import { formatRule, updateModelIndex } from '../../utils/buildModel'

export default function ({ model, orgList, editableRef }) {
  const { modelsMap: childrenMap } = model.listData
  const propChain = toRef(model, 'propChain', [])
  const listMap = new WeakMap()
  watch(
    [() => [...orgList.value], () => [...propChain.value]],
    ([records]) => {
      records.forEach((record, index) => {
        const raw = toRaw(record)
        const chain = [...propChain.value, index]
        const previous = listMap.get(raw)
        if (previous) {
          // 已挂载的字段持有模型引用，移动行时只更新路径，不重建字段模型。
          updateModelIndex(previous.model, chain, index)
        } else {
          const { modelsMap, rootModels } = cloneModelsFlat<ExtColumnsItem>(
            toRaw(childrenMap), record, propChain.value, index
          )
          listMap.set(raw, {
            modelsMap,
            model: reactive({ children: rootModels, index, propChain: chain }),
          })
        }
      })
    },
    { immediate: true }
  )

  const methods = {
    add({ index, resetData }) {
      const item = { ...resetData }
      if (index !== undefined) {
        orgList.value.splice(index + 1, 0, item)
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
      const { attrs, hidden } = useControl({ option, effectData })
      const selfEditableRef = computed(
        () => !hidden.value && editableRef.value && (isFunction(editable) ? editable(effectData) : editable)
      )
      const inputSlot = buildInnerNode(option, model.value, effectData, attrs)
      const viewNode = getViewNode(option, reactive({ ...toRefs(effectData), isView: true }))
      const __rules = formatRule(model.value.rules, effectData)
      const rules = __rules && computed(() => (unref(attrs.disabled) ? undefined : __rules))
      return () =>
        selfEditableRef.value
          ? renderUIFormItem(
              reactive({
                wrapperCol: {},
                name: model.value.propChain,
                rules,
              }),
              { default: inputSlot }
            )
          : viewNode
          ? viewNode()
          : refData.value
    },
  })

  const getEditRender = (option) => {
    if (hasFormComponent(option.type) || (option.type === 'InputSlot' && option.editable !== false)) {
      return (args) => h(InputNode, { option, ...args })
    }
  }

  return {
    list: orgList,
    methods,
    getEditRender,
  }
}
