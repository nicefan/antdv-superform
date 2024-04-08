<script lang="ts">
import { type PropType, defineComponent, h, inject, reactive, ref, toRef, useAttrs, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { cloneModels } from '../utils/buildModel'
import { ButtonGroup, createButtons } from './buttons'
import base from './base'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { Row, Col } from 'ant-design-vue'
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
  setup({ model, option, isView, effectData }, ctx) {
    const { buttons: buttonsConfig, rowButtons, label, title = label } = option
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

    const slots: Obj = { ...ctx.slots }

    slots.title ||= title && (() => toNode(title, effectData))
    if (buttonsConfig) {
      const slotName = buttonsConfig['forSlot'] || 'extra'
      const orgSlot = slots[slotName]
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        params: effectData,
        methods,
        isView,
      })
      if (orgSlot || buttonsSlot) {
        slots[slotName] = () => [orgSlot?.(), buttonsSlot?.()]
      }
    }

    const { title: titleSlot, extra: extraSlot, ...__slots } = slots
    if (titleSlot || extraSlot) {
      __slots.header = () =>
        h(Row, { align: 'middle' }, () => [
          titleSlot && h(Col, { class: 'sup-title', flex: 1 }, titleSlot),
          extraSlot && h(Col, { class: 'sup-title-buttons', style: { textAlign: buttonsConfig?.['align'] } }, extraSlot),
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
          default: () => [
            isView
              ? h(DetailLayout, { option, modelsMap: item.model.children, mode: 'default', labelAlign: 'right' })
              : h(Collections, { model: item.model, option, class: 'ant-list-item-meta' }),
            rowButtonsConfig &&
              createButtons({
                config: rowButtonsConfig,
                methods,
                params: item.effectData,
                isView,
              })?.({ class: 'ant-list-item-action' }),
          ],
        }
      )
    return () => h(base.List, { dataSource: listItems.value }, __slots)
  },
})
</script>
