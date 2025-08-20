import { toRaw, watch, reactive, h, toRef, defineComponent, computed, unref, toRefs, shallowReactive } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep, isFunction } from 'lodash-es'
import Controls from '../index'
import { useControl, cloneModelsFlat, getEffectData, getViewNode } from '../../utils'
import base from '../base'
import { buildInnerNode } from '../Collections'
import type { ExtColumnsItem } from 'src/exaTypes'

export default function ({ model, orgList, rowKey }) {
  const { modelsMap: childrenMap, initialData } = model.listData

  let listMap: Obj = {}
  // 监听数据变化
  watch(
    () => [...orgList.value],
    (org) => {
      const tempMap = {}
      // 避免外部非同一响应式引用
      orgList.value.forEach((record, idx) => {
        const hash = rowKey(record) || nanoid(12)
        record['_ID_'] = hash
        const listItem = listMap[hash] || shallowReactive({})
        listItem.record = record

        if (listItem.index !== idx) {
          listItem.index = idx
          const { modelsMap } = cloneModelsFlat<ExtColumnsItem>(toRaw(childrenMap), record, model.propChain, idx)
          listItem.modelsMap = modelsMap
        }
        tempMap[hash] = listItem
      })
      listMap = tempMap
    },
    {
      immediate: true,
    }
  )

  const methods = {
    add({ index }) {
      if (index !== undefined) {
        orgList.value.splice(index + 1, 0, cloneDeep(initialData))
      } else {
        orgList.value.push(cloneDeep(initialData))
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
        const row = listMap[rowKey(record)]
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
      const editableRef = computed(() => !hidden.value && (isFunction(editable) ? editable(effectData) : editable))
      const inputSlot = buildInnerNode(option, model.value, effectData, attrs)
      const viewNode = getViewNode(option, reactive({ ...toRefs(effectData), isView: true }))
      const rules = computed(() => (unref(attrs.disabled) ? undefined : model.value.rules))
      return () =>
        editableRef.value
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
    methods,
    getEditRender,
  }
}
