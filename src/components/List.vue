<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRaw, toRef, useAttrs, watch } from 'vue'
import { nanoid } from 'nanoid'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import { createButtons } from './buttons'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { toNode } from '../utils'
import { globalProps } from '../plugin'
import { renderUIContainer, renderUILayout } from '../adapter'

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
    const { modelsMap: childrenMap } = model.listData

    const orgList = toRef(model, 'refData')

    const attrs: Obj = useAttrs()
    const rowKey = attrs.rowKey || 'id'
    const getListAttrs = () => {
      const listAttrs = { ...attrs }
      delete listAttrs.rowKey
      delete listAttrs.itemClass
      delete listAttrs.itemStyle
      return listAttrs
    }

    const methods = {
      add() {
        orgList.value.push({})
      },
      delete({ record }) {
        const orgIdx = orgList.value.indexOf(record)
        orgList.value.splice(orgIdx, 1)
      },
    }

    const keyMap = new WeakMap<object, any>()
    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      [() => [...orgList.value], () => [...model.propChain]],
      ([org]) => {
        listItems.value = org.map((record, idx) => {
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
            hash: record[rowKey] || nanoid(12),
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
        // Object.keys(currentRules).forEach((key, idx) => idx > org.length - 1 && delete currentRules[key])
      },
      {
        immediate: true,
      }
    )

    const slots: Obj = { ...ctx.slots }

    slots.title ||= title && (() => toNode(title, effectData))
    if (buttonsConfig) {
      const slotName = buttonsConfig['targetSlot'] ?? buttonsConfig['forSlot'] ?? 'extra'
      const orgSlot = slots[slotName]
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        effectData,
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
        renderUILayout(
          'row',
          { align: 'middle' },
          {
            default: () => [
              titleSlot && renderUILayout('col', { class: 'sup-title', flex: 1 }, { default: titleSlot }),
              extraSlot &&
                renderUILayout(
                  'col',
                  {
                    class: 'sup-title-buttons',
                    style: { textAlign: buttonsConfig?.['align'] },
                  },
                  { default: extraSlot }
                ),
            ],
          }
        )
    }
    const rowButtonsConfig: any = rowButtons && {
      buttonType: 'link',
      size: 'small',
      ...globalProps.rowButtons,
      ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
    }

    __slots.renderItem = ({ item }) =>
      renderUIContainer(
        'listItem',
        { key: item.hash, class: attrs.itemClass, style: attrs.itemStyle },
        {
          default: () => [
            isView
              ? h(DetailLayout, {
                  option,
                  modelsMap: item.model.children,
                  effectData: item.effectData,
                })
              : h(Collections, {
                  model: item.model,
                  option,
                  class: 'sup-list-item-content',
                  effectData: item.effectData,
                }),
            rowButtonsConfig &&
              createButtons({
                config: rowButtonsConfig,
                methods,
                effectData: item.effectData,
                isView,
              })?.({ class: 'sup-list-item-actions' }),
          ],
        }
      )
    return () => renderUIContainer('list', { ...getListAttrs(), dataSource: listItems.value }, __slots)
  },
})
</script>
