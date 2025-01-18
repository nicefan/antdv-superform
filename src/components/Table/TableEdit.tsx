import { toRaw, watch, reactive, h, toRef, defineComponent, computed, unref } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep, isFunction } from 'lodash-es'
import style from '../style.module.scss'
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
        const hash = record[rowKey] || nanoid(12)
        record[rowKey] = hash
        const listItem = listMap[hash] || reactive({})
        listItem.dataRef = record

        if (listItem.modelsMap) return

        listMap[hash] = listItem

        const { modelsMap } = cloneModelsFlat<ExtColumnsItem>(toRaw(childrenMap), toRef(listItem, 'dataRef'), [
          ...(model.propChain || []),
          idx,
        ])
        listItem.modelsMap = modelsMap
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
    delete({ record }) {
      const orgIdx = orgList.value.indexOf(record)
      orgList.value.splice(orgIdx, 1)
    },
  }

  const InputNode = defineComponent({
    inheritAttrs: false,
    props: {
      option: { type: Object, required: true },
    },
    setup({ option }, ctx) {
      const { record, index } = ctx.attrs as Obj
      const rowMap = listMap[record[rowKey]].modelsMap
      const model = rowMap.get(option)
      const effectData = getEffectData({
        current: toRef(model, 'parent'),
        value: toRef(model, 'refData'),
        list: orgList,
        index,
      })
      const { editable = true } = option
      const editableRef = computed(() => (isFunction(editable) ? editable(effectData) : editable))
      const { attrs } = useControl({ option, effectData })
      const inputSlot = buildInnerNode(option, model, effectData, attrs)
      const viewNode = getViewNode(option, effectData)
      const rules = computed(() => (unref(attrs.disabled) ? undefined : model.rules))
      return () =>
        editableRef.value
          ? h(
              base.FormItem,
              reactive({
                name: model.propChain,
                rules,
                class: style['table-form-item'],
              }),
              inputSlot
            )
          : viewNode
          ? viewNode(attrs)
          : attrs.text
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
