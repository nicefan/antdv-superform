import { ref, toRaw, watch, reactive, h, toRef, defineComponent, computed, unref } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash-es'
import style from '../style.module.scss'
import Controls from '../index'
import { useControl, cloneModelsFlat, getEffectData } from '../../utils'
import base from '../base'
import { buildInnerNode } from '../Collections'

export default function ({ model, orgList, rowKey }) {
  const { modelsMap: childrenMap, initialData } = model.listData

  const listItems = ref<any[]>([])
  // 监听数据变化
  watch(
    () => [...orgList.value],
    (org) => {
      listItems.value = org.map((record, idx) => {
        const hash = record[rowKey] || nanoid(12)
        record[rowKey] = hash
        // 原数据已经存在, 此处建立表单绑定
        const { modelsMap } = cloneModelsFlat(toRaw(childrenMap), record, [...model.propChain, idx])

        return modelsMap
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
    props: {
      option: { type: Object, required: true },
      index: { type: Number, required: true },
    },
    setup({ option, index }) {
      const modelsMap = listItems.value[index]
      const model = modelsMap.get(option)
      const effectData = getEffectData({ current: model.parent, value: toRef(model, 'refData'), list: orgList, index })
      const { attrs } = useControl({ option, effectData })
      const inputSlot = buildInnerNode(option, model, effectData, attrs)
      const rules = computed(() => (unref(attrs.disabled) ? undefined : model.rules))
      return () =>
        h(
          base.FormItem,
          reactive({
            name: model.propChain,
            rules,
            class: style['table-form-item'],
          }),
          inputSlot
        )
    },
  })

  const getEditRender = (option) => {
    const component = Controls[option.type]
    if (component || option.type === 'InputSlot') {
      return ({ record, index }) => h(InputNode, { option, index })
    }
  }

  return {
    methods,
    getEditRender,
  }
}
