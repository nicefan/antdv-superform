import { toRaw, watch, reactive, h, defineComponent, computed, unref, toRefs, shallowReactive, toRef, ref } from 'vue'
import { isFunction } from 'lodash-es'
import { hasFormComponent } from '../index'
import { useControl, cloneModelsFlat, getEffectData, getViewNode } from '../../utils'
import { renderUIFormItem } from '../../adapter'
import { buildInnerNode } from '../Collections'
import type { ExtColumnsItem } from 'src/exaTypes'
import { formatRule } from '../../utils/buildModel'

export default function ({ model, orgList, rowKey, setRowKey, editableRef }) {
  const { modelsMap: childrenMap } = model.listData
  const editList = ref<any[]>([])
  const listMap = new WeakMap()
  const keyMap = new WeakMap()
  // 监听数据变化
  watch(
    () => [...orgList.value],
    (org) => {
      // 使用原响应列表拿到的子集才是同一引用
      editList.value = org.map((record, idx) => {
        const listItem = listMap.get(toRaw(record)) || shallowReactive({})

        if (listItem.index !== idx) {
          listItem.index = idx
          const { modelsMap } = cloneModelsFlat<ExtColumnsItem>(toRaw(childrenMap), record, model.propChain, idx)
          listItem.modelsMap = modelsMap
        }
        listItem.record ??= reactive({ ...toRefs(record) })
        const hash = rowKey(record)
        setRowKey(listItem.record, hash)
        listMap.set(toRaw(record), listItem)
        keyMap.set(toRaw(listItem.record), listItem)
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
        const row = keyMap.get(toRaw(record))
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
    list: editList,
    methods,
    getEditRender,
  }
}
