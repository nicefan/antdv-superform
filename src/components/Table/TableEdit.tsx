import { toRaw, watch, reactive, h, toRef, defineComponent, computed, unref, markRaw, toRefs } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep, isFunction } from 'lodash-es'
import Controls from '../index'
import { useControl, cloneModelsFlat, getEffectData, getViewNode } from '../../utils'
import base from '../base'
import { buildInnerNode } from '../Collections'
import type { ExtColumnsItem } from 'src/exaTypes'

export default function ({ model, orgList, rowKey }) {
  const { modelsMap: childrenMap, initialData } = model.listData

  const listMap: Obj = reactive({})
  // 监听数据变化
  watch(
    () => [...orgList.value],
    (org) => {
      org.forEach((record, idx) => {
        const hash = rowKey(record) || nanoid(12)
        record['_ID_'] = hash
        const listItem = listMap[hash] || reactive({})
        listItem.record = record

        if (listItem.modelsMap) {
          if (listItem.index !== idx) {
            listItem.modelsMap.forEach((model) => {
              model.index = idx
            })
            listItem.index = idx
          }
        } else {
          listItem.index = idx
          listMap[hash] = listItem
          const { modelsMap } = cloneModelsFlat<ExtColumnsItem>(
            toRaw(childrenMap),
            toRef(listItem, 'record'),
            model.propChain,
            idx
          )
          listItem.modelsMap = markRaw(modelsMap)
        }
      })
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
      const row = listMap[rowKey(record)]
      const model = row.modelsMap.get(option)
      const { index, parent, refData } = toRefs(model)
      const effectData = getEffectData({
        current: parent,
        value: refData,
        list: orgList,
        record: toRef(row, 'record'),
        index,
      })
      const { editable = true } = option
      const editableRef = computed(() => (isFunction(editable) ? editable(effectData) : editable))
      const { attrs } = useControl({ option, effectData })
      const inputSlot = buildInnerNode(option, model, effectData, attrs)
      const viewNode = getViewNode(option, reactive({ ...toRefs(effectData), isView: true }))
      const rules = computed(() => (unref(attrs.disabled) ? undefined : model.rules))
      return () =>
        editableRef.value
          ? h(
              base.FormItem,
              reactive({
                wrapperCol: {},
                name: model.propChain,
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
