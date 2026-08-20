<script lang="ts">
import { type PropType, defineComponent, h, shallowRef, toRef, watch, computed, ref, inject, nextTick } from 'vue'
import { cloneModels } from '../utils/buildModel'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { toNode } from '../utils'
import { Space } from 'ant-design-vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { globalProps } from '../plugin'
import { nanoid } from 'nanoid'
import { independentTypes } from './componentTypes'

export default defineComponent({
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'InputList'>>,
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
  setup(props) {
    const { model, option, isView, effectData, labelIndex } = props
    const { columns, rowButtons, label, labelSlot, compact, slots: _optionSlots, ..._option } = option
    const { modelsMap: childrenMap } = model.listData

    const fristItem = columns[0] as MixOption & { type: string }

    // 普通数组，值对应下标
    const isSingle = columns.length === 1 && fristItem.field === '$index'

    const isFormItem = !labelIndex && (label || labelSlot)

    // const { propChain } = model
    const orgList = toRef(model, 'refData')
    const extProvider = inject<Obj>('exaProvider') || {}
    const methods = {
      add: {
        onClick({ index }) {
          // const list = [...orgList.value]
          orgList.value.splice(index + 1, 0, isSingle ? undefined : {})
          // orgList.value = list
        },
        icon: () => h(PlusOutlined),
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: '',
        icon: () => h(MinusOutlined),
        onClick({ index }) {
          orgList.value.splice(index, 1)
        },
      },
    }

    const rowButtonsConfig: any = !isView &&
      rowButtons !== false && {
        type: 'Buttons',
        buttonType: 'link',
        size: 'small',
        colProps: { flex: '0' },
        labelMode: 'icon',
        ...globalProps.rowButtons,
        methods,
        actions: ['add', 'delete'],
        ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
      }

    const listItems = shallowRef<any[]>([])
    // 监听数据变化
    watch(
      [orgList, () => orgList.value.length],
      ([list]) => {
        if (list.length === 0) {
          list.push(isSingle ? undefined : {})
          return
        }
        listItems.value = list.map((record, idx) => {
          const propChain = [...model.propChain, idx]

          if (listItems.value.length && extProvider.formRef) {
            nextTick(() => {
              extProvider.formRef.value?.validate([propChain])
            })
          }

          const oldItem = listItems.value[idx]
          if (oldItem) {
            oldItem.refData.value = record
            return oldItem
          }

          const refData = computed({
            get: () => orgList.value[idx],
            set: (val) => (orgList.value[idx] = val),
          })
          const newModel: Obj = {
            index: idx,
            parent: orgList,
            refData,
            propChain,
          }
          const ghostModel = new Map()
          let itemOption: Obj
          if (isSingle) {
            itemOption = { ...fristItem }
            ghostModel.set(itemOption, {
              ...childrenMap.get(fristItem),
              ...newModel,
            })
          } else {
            if (childrenMap.size === 1 && !fristItem.field && independentTypes.includes(fristItem.type)) {
              itemOption = { ...fristItem, field: String(idx) }
              const oldModel = [...childrenMap.values()][0]
              ghostModel.set(itemOption, {
                ...oldModel,
                ...newModel,
                refName: String(idx),
                children: cloneModels(oldModel.children || new Map(), refData, propChain).modelsMap,
              })
            } else {
              itemOption = compact
                ? {
                    ..._option,
                    type: 'InputGroup',
                    initialValue: undefined,
                    field: String(idx),
                  }
                : { type: 'Group', span: 'auto' }

              ghostModel.set(itemOption, {
                ...newModel,
                refName: String(idx),
                children: cloneModels(childrenMap, refData, propChain).modelsMap,
              })
            }
          }
          if (labelIndex) {
            itemOption.label ??= label
            itemOption.labelSlot ??= labelSlot || itemOption.label + String(idx + 1)
          }
          //将按钮加入排板
          rowButtonsConfig && ghostModel.set(rowButtonsConfig, { parent: orgList, index: idx })
          return {
            children: ghostModel,
            model: { parent: orgList, children: ghostModel, index: idx },
            refData,
            key: nanoid(),
            // effectData: reactive({ parent: effectData, current: orgList, index: idx, record: refData }),
          }
        })
      },
      {
        immediate: true,
      }
    )

    const render = () => {
      return listItems.value.map(({ model, key }) => {
        return h(Collections, { model, option: { subSpan: 'auto', ...option }, effectData, key })
      })
    }

    if (isView) {
      if (isFormItem) {
        if (isSingle) {
          const { label, labelSlot = label } = fristItem
          const breakAfter = fristItem.breakAfter ?? fristItem.wrapping
          return () =>
            h(Space, { direction: breakAfter ? 'vertical' : 'horizontal' }, () =>
              listItems.value.map(({ refData, key }, index) => {
                const itemEffectData = {
                  ...effectData,
                  parent: effectData,
                  current: orgList.value,
                  field: fristItem.field,
                  value: refData.value,
                  index,
                  record: refData.value,
                }
                return h('span', { key }, [toNode(labelSlot, itemEffectData), labelSlot ? ': ' : '', refData.value])
              })
            )
        } else {
          return () =>
            listItems.value.map(({ children, key }) => {
              // const [_option, model] = [...children][0]
              // const option = _option.descriptionsProps
              //   ? _option
              //   : { ..._option, descriptionsProps: { mode: 'default', labelCol: {} } }
              return h(DetailLayout, {
                key,
                modelsMap: children,
                option,
                effectData,
              })
            })
        }
      }
      const attrs: Obj = {}
      const children = computed(() => {
        return new Map(listItems.value.flatMap(({ children }) => [...children])) as ModelsMap
      })

      return () =>
        h(DetailLayout, {
          option: { ..._option, label, labelSlot },
          modelsMap: children.value,
          effectData,
          ...attrs,
        })
    } else if (isFormItem) {
      const formItemContext = ref()
      if (option.rules) {
        watch(
          () => orgList.value.length,
          () => {
            formItemContext.value?.onFieldChange()
          }
        )
      }
      const children = new Map([
        [
          {
            ..._option,
            formItemProps: { ..._option.formItemProps, ref: formItemContext, style: 'margin: 0' },
            label,
            labelSlot,
            type: 'InfoSlot',
            block: false,
            render,
          },
          model,
        ],
      ])
      return () => h(Collections, { model: { children }, option, effectData })
    } else {
      return render
    }
  },
})
</script>
