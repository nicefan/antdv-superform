<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRef, watch, toRaw, computed, unref, toRefs } from 'vue'
import { cloneDeep } from 'lodash-es'
import { cloneModels } from '../utils/buildModel'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { containers } from '.'
import base from './base'
import { getViewNode, toNode } from '../utils'
import { Space } from 'ant-design-vue'
import { MinusOutlined, PlusOutlined} from '@ant-design/icons-vue'

export default defineComponent({
  inheritAttrs: false,
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
    labelIndex: Boolean,
  },
  setup(props, ctx) {
    const { model, option, isView, effectData, labelIndex } = props
    const { columns, rowButtons, label, labelSlot, slots: optionSlots, ..._option } = option
    const { modelsMap: childrenMap, initialData } = model.listData

    const isSingle = columns.length === 1 && columns[0].field === '$index'
    const __initialData = isSingle ? initialData.$index : toRaw(initialData)

    const isFormItem = !labelIndex && (label || labelSlot)

    const { propChain, rules } = model
    const orgList = toRef(model, 'refData')

    const methods = {
      add:{
        onClick({ index }) {
          orgList.value.splice(index, 0, cloneDeep(__initialData))
          orgList.value = [...toRaw(orgList.value)]
        },
        label: () => h(PlusOutlined),
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: '',
        label: () => h(MinusOutlined),
        onClick({ index }) {
          orgList.value = toRaw(orgList.value).filter((_, idx) => idx !== index)
        },
      },
    }

    const rowButtonsConfig: any = rowButtons &&
      !isView && {
        type: 'Buttons',
        buttonType: 'link',
        size: 'small',
        methods,
        ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
      }

    const groupOption = {
      ..._option,
      type: 'InputGroup',
      label,
      labelSlot,
      subSpan: option.subSpan ?? 'auto',
      attrs: {
        compact: false,
      },
    }
    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      orgList,
      (list) => {
        if (list.length === 0) {
          list.push(cloneDeep(__initialData))
        }
        listItems.value = list.map((record, idx) => {
          const refData = toRef(orgList.value, idx)

          let itemOption: Obj = { ...columns[0] }
          let itemModel
          if (isSingle) {
            itemModel = {
              ...childrenMap.get(columns[0]),
              refName: String(idx),
              parent: orgList,
              refData,
              propChain: [...propChain, idx],
            }
          } else {
            const cloneChild = cloneModels(childrenMap, record, [...propChain, idx]).modelsMap
            if (cloneChild.size === 1) {
              itemModel = cloneChild.get(columns[0])
            } else {
              itemOption = { ...groupOption }
              itemModel = { parent: orgList, refData, children: cloneChild }
              if (!labelIndex) {
                itemOption = { type: 'Group', isBlock: false, span: 'auto' }
              }
            }
          }
          if (labelIndex) {
            itemOption.label ??= label
            itemOption.labelSlot ??= (label || itemOption.label) + String(idx + 1)
          }
          const children = new Map([[itemOption, reactive(itemModel)]])
          rowButtonsConfig && children.set(rowButtonsConfig, { parent: orgList })
          return {
            children,
            effectData: reactive({ ...effectData, current: orgList, field: idx, index: idx, record: refData }),
          }
        })
      },
      {
        immediate: true,
      }
    )

    const render = () => {
      return listItems.value.map(({ children, effectData }, idx) => {
        return h(Collections, { model: { parent: orgList, children }, option, effectData, key: effectData })
      })
    }

    const slots: Obj = { ...ctx.slots }

    if (isView) {
      if (isFormItem) {
        if (isSingle) {
          const { isBreak, label, labelSlot = label } = columns[0]
          return () =>
            h(Space, { direction: isBreak ? 'vertical' : 'horizontal' }, () =>
              listItems.value.map(({ children, effectData }) => {
                return h('span', [toNode(labelSlot, effectData), labelSlot ? ': ' : '', effectData.record])
              })
            )
        } else {
          return () =>
            listItems.value.map(({ children, effectData }) => {
              const [_option, model] = [...children][0]
              const option = _option.descriptionsProps
                ? _option
                : { ..._option, descriptionsProps: { mode: 'default', labelCol: {} } }
              return h(DetailLayout, { modelsMap: model.children, option, effectData })
            })
        }
      }
      const attrs: Obj = {}
      const children = computed(() => {
        return new Map(listItems.value.flatMap(({ children }) => [...children])) as ModelsMap
      })

      return () => h(DetailLayout, { option: groupOption, modelsMap: children.value, key: Date(), ...attrs })
    } else if (isFormItem) {
      const children = new Map([[{ ...groupOption, slots: { default: render } }, model]])
      return () => h(Collections, { model: { children }, option, effectData })
    } else {
      return render
    }
  },
})
</script>
