import { toRaw, watch, reactive, h, defineComponent, computed, unref, toRefs, shallowReactive, toRef, ref } from 'vue'
import { nanoid } from 'nanoid'
import { isFunction } from 'lodash-es'
import Controls from '../index'
import { useControl, cloneModelsFlat, getEffectData, getViewNode } from '../../utils'
import base from '../base'
import { buildInnerNode } from '../Collections'
import type { ExtColumnsItem } from 'src/exaTypes'
import { formatRule } from '../../utils/buildModel'

export default function ({ model, orgList, rowKey, editableRef }) {
  const { modelsMap: childrenMap } = model.listData
  const editList = ref<any[]>([])
  const listMap = new WeakMap()
  const keyMap = new Map()
  // 监听数据变化
  watch(
    () => [...orgList.value],
    (org) => {
      keyMap.clear()
      // 使用原响应列表拿到的子集才是同一引用
      editList.value = org.map((record, idx) => {
        const listItem = listMap.get(toRaw(record)) || shallowReactive({})

        if (listItem.index !== idx) {
          listItem.index = idx
          const { modelsMap } = cloneModelsFlat<ExtColumnsItem>(toRaw(childrenMap), record, model.propChain, idx)
          listItem.modelsMap = modelsMap
        }
        listItem.record ??= reactive({ ...toRefs(record) })
        const hash = (listItem.record._ID_ ??= rowKey(record) || nanoid(12))
        listMap.set(toRaw(record), listItem)
        keyMap.set(hash, listItem)
        return listItem.record
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
        const row = keyMap.get(record._ID_)
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
    list: editList,
    methods,
    getEditRender,
  }
}
