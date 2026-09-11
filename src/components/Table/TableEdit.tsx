import { toRaw, watch, reactive, h, defineComponent, computed, unref, toRefs, toRef } from 'vue'
import { isFunction } from 'lodash-es'
import Controls from '../index'
import { useControl, cloneModelsFlat, getEffectData, getViewNode } from '../../utils'
import base from '../base'
import { buildInnerNode } from '../Collections'
import type { ExtColumnsItem } from 'src/exaTypes'
import { formatRule, updateModelIndex } from '../../utils/buildModel'

export default function ({ model, orgList, editableRef }) {
  const { modelsMap: childrenMap } = model.listData
  const propChain = toRef(model, 'propChain', [])
  const listMap = new WeakMap()
  // 监听数据变化
  watch(
    [() => [...orgList.value], () => [...propChain.value]],
    ([org]) => {
      org.forEach((record, idx) => {
        const raw = toRaw(record)
        const newPropChain = [...propChain.value, idx]
        let listItem = listMap.get(raw)

        if (listItem) {
          const oldPropChain = listItem.model.propChain
          const pathChanged =
            oldPropChain.length !== newPropChain.length || oldPropChain.some((part, index) => part !== newPropChain[index])
          if (listItem.model.index !== idx || pathChanged) {
            updateModelIndex(listItem.model, newPropChain, idx)
          }
        } else {
          const { modelsMap, rootModels } = cloneModelsFlat<ExtColumnsItem>(
            toRaw(childrenMap),
            record,
            model.propChain,
            idx
          )
          listItem = {
            modelsMap,
            model: reactive({ children: rootModels, index: idx, propChain: newPropChain }),
          }
          listMap.set(raw, listItem)
        }
      })
    },
    {
      immediate: true,
    }
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
          ? h(
              base.FormItem,
              reactive({
                wrapperCol: {},
                name: model.value.propChain,
                rules,
              }),
              inputSlot
            )
          : viewNode
          ? viewNode()
          : refData.value
    },
  })

  const getEditRender = (option) => {
    const component = Controls[option.type]
    if (component || (option.type === 'InputSlot' && option.editable !== false)) {
      return (args) => h(InputNode, { option, ...args })
    }
  }

  return {
    list: orgList,
    methods,
    getEditRender,
  }
}
