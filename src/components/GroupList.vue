<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRef, watch, toRaw } from 'vue'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import Controls from '.'
import { nanoid } from 'nanoid'
import { globalProps } from '../plugin'
import { getSemanticIconNode } from '../utils'

export default defineComponent({
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'GroupList'>>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelDataGroup>,
    },
    effectData: {
      type: Object,
      required: true,
    },
    isView: Boolean,
    rowKey: String,
    labelIndex: Boolean,
  },
  setup(props, ctx) {
    const { model, isView, effectData, labelIndex, rowKey = '' } = props
    const { columns, rowButtons, slots: optionSlots, ...option } = props.option
    const { modelsMap: childrenMap, rules } = model.listData

    const orgList = toRef(model, 'refData')

    const methods = {
      add: {
        icon: () => getSemanticIconNode('add'),
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, {})
          orgList.value = [...toRaw(orgList.value)]
        },
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
        confirmText: '',
        icon: () => getSemanticIconNode('remove'),
        onClick({ index }) {
          orgList.value = orgList.value.filter((_, idx) => idx !== index)
        },
      },
    }

    const rowButtonsConfig: any = !isView &&
      rowButtons !== false && {
        type: 'Buttons',
        labelMode: 'icon',
        ...globalProps.rowButtons,
        methods,
        actions: ['add', 'delete'],
        ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
        buttonProps: {
          ...globalProps.rowButtons?.buttonProps,
          ...(!Array.isArray(rowButtons) && rowButtons?.buttonProps),
        },
      }

    const keyMap = new WeakMap()
    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      [() => [...orgList.value], () => [...model.propChain]],
      () => {
        const list = orgList.value
        if (list.length === 0) {
          list.push({})
        }

        listItems.value = list.map((record, idx) => {
          const raw = toRaw(record)
          const previousItem = keyMap.get(raw)
          if (previousItem) {
            previousItem.refData.value = record
            updateModelIndex(previousItem.model, [...model.propChain, idx], idx)
            previousItem.effectData.index = idx
            return previousItem
          }
          // 原数据已经存在, 此处建立表单绑定
          const refData = ref(record)
          const { modelsMap } = cloneModels(childrenMap, refData, model.propChain, idx)

          const item = {
            key: record[rowKey] || nanoid(12),
            refData,
            model: reactive({ refData, children: modelsMap, index: idx, propChain: [...model.propChain, idx] }),
            effectData: reactive({
              parent: effectData,
              current: orgList,
              index: idx,
              record,
            }),
          }
          keyMap.set(raw, item)
          return item
        })
      },
      {
        immediate: true,
      }
    )
    const groupOption = {
      ...option,
      type: 'Group',
      buttons: rowButtonsConfig,
      subItems: columns,
    }
    const title = option.title || option.label
    if (typeof title === 'string' && labelIndex) {
      groupOption.title = ({ index }) => title + String(index + 1)
    }

    return () =>
      listItems.value.map(({ model, effectData, key }) => {
        return h(Controls.Group, { model, option: groupOption, effectData, key, isView }, ctx.slots)
      })
  },
})
</script>
