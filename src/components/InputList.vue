<script lang="ts">
import {
  type PropType,
  defineComponent,
  h,
  shallowRef,
  toRef,
  watch,
  computed,
  ref,
  toRaw,
  reactive,
  inject,
} from 'vue'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
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
    const orgModel = childrenMap.get(fristItem) as any

    // 普通数组，值对应下标
    const isSingle = columns.length === 1 && fristItem.field === '$index'

    const isFormItem = !labelIndex && (label || labelSlot)

    const orgList = toRef(model, 'refData') as Ref<any[]>
    const methods = {
      add: {
        onClick({ index, ...rest }) {
          orgList.value.splice(index + 1, 0, isSingle ? undefined : {})
          backList.splice(index + 1, 0, undefined)
        },
        icon: () => h(PlusOutlined),
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: '',
        icon: () => h(MinusOutlined),
        onClick({ index }) {
          orgList.value.splice(index, 1)
          backList.splice(index, 1)
        },
      },
    }

    let rowButtonsConfig: any = !isView &&
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

    const genData = ({ itemOption, model, idx, refData, propChain }) => {
      const ghostModel = new Map([[itemOption, model]])
      if (labelIndex) {
        itemOption.label ??= label
        itemOption.labelSlot ??= labelSlot || (({ index }) => itemOption.label + String(index + 1))
      }
      //将按钮加入排板
      if (itemOption.type === 'Group' && labelIndex) {
        itemOption.buttons = rowButtonsConfig
      } else if (rowButtonsConfig) {
        ghostModel.set(rowButtonsConfig, reactive({ parent: orgList, index: idx, propChain, refData }))
      }
      return {
        model: reactive({ parent: orgList, children: ghostModel, index: idx, propChain }),
        refData,
        key: nanoid(),
        effectData: reactive({ parent: effectData, current: orgList, index: idx }),
      }
    }

    let backList: any[] = []
    const listItems = shallowRef<any[]>([])
    if (isSingle) {
      const extProvider = inject<Obj>('exaProvider') || {}
      // 监听数据变化,普通数组只监听整体变化和长度变化
      watch(
        [() => orgList.value, () => orgList.value.length, () => [...model.propChain]],
        ([list, length], [oldList = []]) => {
          if (length === 0) {
            orgList.value.push(undefined)
          }
          let isSync = list.length === backList.length && list === oldList
          listItems.value = orgList.value.map((record, idx) => {
            const propChain = [...model.propChain, idx]
            const oldItem = backList[idx]
            if (oldItem) {
              updateModelIndex(oldItem.model, propChain, idx)
              oldItem.effectData.index = idx
              if (!isSync) {
                extProvider.formRef?.value?.validate([propChain])
              }
              return oldItem
            }
            const newModel: Obj = reactive({
              ...orgModel,
              index: idx,
              parent: orgList,
              propChain,
            })
            const refData = computed({
              get: () => orgList.value[newModel.index],
              set: (val) => (orgList.value[newModel.index] = val),
            })
            newModel.refData = refData
            const itemOption = { ...fristItem }
            return genData({ itemOption, model: newModel, idx, refData, propChain })
          })
          backList = [...listItems.value]
        },
        { immediate: true }
      )
    } else {
      const rowCache = new WeakMap()
      watch(
        [() => [...orgList.value], () => orgList.value.length, () => [...model.propChain]],
        ([list]) => {
          if (list.length === 0) {
            orgList.value.push({})
          }
          listItems.value = orgList.value.map((record, idx) => {
            const propChain = [...model.propChain, idx]
            const oldItem = rowCache.get(toRaw(record))
            if (oldItem) {
              oldItem.refData.value = record
              updateModelIndex(oldItem.model, propChain, idx)
              oldItem.effectData.index = idx
              return oldItem
            }

            const refData = ref(record)
            const newModel: Obj = reactive({
              index: idx,
              parent: orgList,
              propChain,
              refData,
            })
            let itemOption: Obj
            if (childrenMap.size === 1 && !fristItem.field && independentTypes.includes(fristItem.type)) {
              itemOption = { ...fristItem }
              Object.assign(newModel, {
                initialValue: orgModel.initialValue,
                rules: orgModel.rules,
                children: cloneModels(orgModel.children || new Map(), refData, propChain).modelsMap,
              })
            } else {
              // 自动补充容器，根选项的动态选项配置不能带进来
              itemOption = {
                // ..._option,
                type: compact ? 'InputGroup' : 'Group',
                initialValue: undefined,
                span: 'auto',
              }
              newModel.children = cloneModels(childrenMap, refData, propChain).modelsMap
            }
            const rowData = genData({ itemOption, model: newModel, idx, refData, propChain })
            rowCache.set(toRaw(record), rowData)
            return rowData
          })
        },
        { immediate: true }
      )
    }

    const render = () => {
      return listItems.value.map(({ model, effectData, key }) => {
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
            listItems.value.map(({ model, key }) => {
              // const [_option, model] = [...children][0]
              // const option = _option.descriptionsProps
              //   ? _option
              //   : { ..._option, descriptionsProps: { mode: 'default', labelCol: {} } }
              return h(DetailLayout, {
                key,
                modelsMap: model.children,
                option,
                effectData,
              })
            })
        }
      }
      const attrs: Obj = {}
      const children = computed(() => {
        return new Map(listItems.value.flatMap(({ model }) => [...model.children])) as ModelsMap
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
            // block: false,
            span: 24,
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
