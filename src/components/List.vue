<script lang="ts">
import { PropType, defineComponent, h, inject, reactive, ref, toRef, toRefs, useAttrs, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { cloneModels } from '../utils/buildModel'
import { ButtonGroup } from './buttons'
import base from './base'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { Row } from 'ant-design-vue'

export default defineComponent({
  props: {
    option: {
      required: true,
      type: Object as PropType<ExListOption>,
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
  },
  setup(props) {
    const { buttons: buttonsConfig, rowButtons, label, slots: optionSlots } = props.option
    // 先构建一个数据结构
    const { modelsMap: childrenMap, initialData, rules } = props.model.listData

    const { propChain } = props.model
    const orgList = toRef(props.model, 'refData')

    const attrs: Obj = useAttrs()
    const rowKey = attrs.rowKey || 'id'

    const methods = {
      add() {
        orgList.value.push(cloneDeep(initialData))
      },
      del({ record }) {
        const orgIdx = orgList.value.indexOf(record)
        orgList.value.splice(orgIdx, 1)
      },
    }

    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      () => [...orgList.value],
      (org) => {
        listItems.value = org.map((record, idx) => {
          const hash = record[rowKey] || nanoid(12)
          record[rowKey] = hash
          // 原数据已经存在, 此处建立表单绑定
          const { modelsMap } = cloneModels(childrenMap, record, [...propChain, idx])
          // currentRules[idx] = listModel.rules
          return {
            hash,
            model: { refData: ref(record), children: modelsMap },
            effectData: reactive({ ...toRefs(props.effectData), index: idx, record }),
          }
        })
        // Object.keys(currentRules).forEach((key, idx) => idx > org.length - 1 && delete currentRules[key])
      },
      {
        immediate: true,
      }
    )
    const rootSlots = inject('rootSlot', {})
    const slots: Obj = {}
    if (optionSlots) {
      Object.entries(optionSlots).forEach(([key, value]) => {
        slots[key] = typeof value === 'string' ? rootSlots[value] : value
      })
    }
    slots.title ||= () => label
    if (!props.isView && buttonsConfig) {
      const slotName = buttonsConfig['forSlot'] || 'extra'
      const orgSlot = slots[slotName]
      slots[slotName] = () => [orgSlot?.(), h(ButtonGroup, { config: buttonsConfig, param: props.effectData, methods })]
    }
    const { title: titleSlot, extra: extraSlot, ...__slots } = slots
    if (titleSlot || extraSlot) {
      __slots.header = () =>
        h(Row, { justify: 'space-between', align: 'middle' }, () => [
          h('div', { class: 'exa-title' }, titleSlot?.()),
          extraSlot?.(),
        ])
    }
    const rowButtonsConfig: Obj | undefined = rowButtons && {
      buttonType: 'link',
      size: 'small',
      ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
    }

    __slots.renderItem = ({ item }) =>
      h(
        base.ListItem,
        { key: item.hash },
        {
          actions:
            !props.isView &&
            rowButtonsConfig &&
            (() => h(ButtonGroup, { config: rowButtonsConfig, methods, param: item.effectData })),
          default: () =>
            props.isView
              ? h(DetailLayout, { option: props.option, modelsMap: item.model.children })
              : h(Collections, { model: item.model, style: 'width:100%' }),
        }
      )
    return () => h(base.List, { dataSource: listItems.value }, __slots)
  },
})
</script>
