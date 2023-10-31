<script lang="ts">
import { type PropType, defineComponent, h, inject, reactive, ref, toRef, useAttrs, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { cloneModels } from '../utils/buildModel'
import { ButtonGroup } from './buttons'
import base from './base'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { Row } from 'ant-design-vue'
import { toNode } from '../utils'

export default defineComponent({
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'List'>>,
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
  setup({ model, option, isView, effectData }) {
    const { buttons: buttonsConfig, rowButtons,label, title = label, slots: optionSlots } = option
    // 先构建一个数据结构
    const { modelsMap: childrenMap, initialData, rules } = model.listData

    const { propChain } = model
    const orgList = toRef(model, 'refData')

    const attrs: Obj = useAttrs()
    const rowKey = attrs.rowKey || 'id'

    const methods = {
      add() {
        orgList.value.push(cloneDeep(initialData))
      },
      delete({ record }) {
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
            effectData: reactive({ ...effectData, current: toRef(model, 'refData'), index: idx, record }),
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

    slots.title ||= title && (() => toNode(title, effectData))
    if (!isView && buttonsConfig) {
      const slotName = buttonsConfig['forSlot'] || 'extra'
      const orgSlot = slots[slotName]
      slots[slotName] = () => [orgSlot?.(), h(ButtonGroup, { config: buttonsConfig, param: effectData, methods })]
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
          default: () =>
            isView
              ? h(DetailLayout, { option, modelsMap: item.model.children })
              : [
                  h(Collections, { model: item.model, option, class: 'ant-list-item-meta' }),
                  rowButtonsConfig &&
                    h(ButtonGroup, {
                      config: rowButtonsConfig,
                      methods,
                      param: item.effectData,
                      class: 'ant-list-item-action',
                    }),
                ],
        }
      )
    return () => h(base.List, { dataSource: listItems.value }, __slots)
  },
})
</script>
