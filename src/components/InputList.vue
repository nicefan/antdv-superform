<script lang="ts">
import { type PropType, defineComponent, h, reactive, shallowRef, toRef, watch, toRaw, computed, ref } from 'vue'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import Collections from './Collections'
import { containers } from '.'
import { DetailLayout } from './Detail'
import { getSemanticIconNode, toNode } from '../utils'
import { renderUILayout } from '../adapter'
import { globalProps } from '../plugin'
import { nanoid } from 'nanoid'

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

    // 普通数组，值对应下标
    const isSingle = columns.length === 1 && columns[0].field === '$index'

    const isFormItem = !labelIndex && (label || labelSlot)

    const orgList = toRef(model, 'refData')
    let backList: any[] = []
    let pendingSplice = false

    const methods = {
      add: {
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, isSingle ? undefined : {})
          backList.splice(index + 1, 0, undefined)
          pendingSplice = true
        },
        icon: () => getSemanticIconNode('add'),
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: '',
        icon: () => getSemanticIconNode('remove'),
        onClick({ index }) {
          orgList.value.splice(index, 1)
          backList.splice(index, 1)
          pendingSplice = true
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

    const rowCache = new WeakMap<object, any>()
    const listItems = shallowRef<any[]>([])
    watch(
      [() => orgList.value.map((record) => toRaw(record)), () => [...model.propChain]],
      ([currentList]) => {
        if (currentList.length === 0) {
          orgList.value.push(isSingle ? undefined : {})
        }
        const list = currentList.length ? currentList : [...orgList.value]
        const previousItems = [...backList]
        // 内部按钮明确知道增删位置；外部普通数组没有行标识，长度变化时按旧值逐项匹配。
        const reuseSlots = pendingSplice || previousItems.length === list.length
        listItems.value = list.map((record, idx) => {
          const propChain = [...model.propChain, idx]
          const raw = toRaw(record)
          let oldItem
          if (isSingle) {
            if (reuseSlots) {
              oldItem = previousItems[idx]
            } else {
              const oldIndex = previousItems.findIndex((item) => item && Object.is(item.snapshot, raw))
              if (oldIndex !== -1) oldItem = previousItems.splice(oldIndex, 1)[0]
            }
          } else {
            // 对象始终按身份复用，不能因长度相同而把重排行绑定到原槽位。
            oldItem = rowCache.get(raw)
          }
          if (oldItem) {
            if (!isSingle) oldItem.refData.value = record
            updateModelIndex(oldItem.model, propChain, idx)
            oldItem.effectData.index = idx
            oldItem.snapshot = raw
            return oldItem
          }

          const firstItem = columns[0]
          const orgModel = childrenMap.get(firstItem)!
          const rowModel: Obj = reactive({ index: idx, parent: orgList, propChain })
          // 对象子字段绑定稳定 Ref；普通数组通过最新行号访问当前数组，避免捕获旧下标。
          const refData = isSingle
            ? computed({
                get: () => orgList.value[rowModel.index],
                set: (value) => {
                  orgList.value[rowModel.index] = value
                },
              })
            : ref(record)
          rowModel.refData = refData
          const ghostModel = new Map()
          let itemOption: Obj
          if (isSingle) {
            itemOption = { ...firstItem }
            Object.assign(rowModel, { initialValue: orgModel.initialValue, rules: orgModel.rules })
          } else if (childrenMap.size === 1 && !firstItem.field && [...containers, 'InputGroup'].includes(firstItem.type)) {
            itemOption = { subSpan: 'auto', ...firstItem }
            Object.assign(rowModel, {
              initialValue: orgModel.initialValue,
              rules: orgModel.rules,
              listData: orgModel.listData,
              children: cloneModels(orgModel.children || new Map(), refData, propChain).modelsMap,
            })
          } else {
            itemOption = compact
              ? { ..._option, type: 'InputGroup', initialValue: undefined, subSpan: option.subSpan ?? 'auto' }
              : { type: 'Group', span: 'auto' }
            rowModel.children = cloneModels(childrenMap, refData, propChain).modelsMap
          }
          ghostModel.set(itemOption, rowModel)
          if (labelIndex) {
            itemOption.label ??= label
            itemOption.labelSlot ??= labelSlot || (({ index }) => itemOption.label + String(index + 1))
          }
          rowButtonsConfig && ghostModel.set(rowButtonsConfig, reactive({ parent: orgList, index: idx, propChain }))
          // 布局模型与字段模型分开，避免 children 指回自身形成循环。
          const itemModel = reactive({ parent: orgList, children: ghostModel, index: idx, propChain })
          const item = {
            children: itemModel.children,
            model: itemModel,
            refData,
            snapshot: raw,
            key: nanoid(12),
            effectData: reactive({ parent: effectData, current: orgList, index: idx }),
          }
          if (!isSingle) rowCache.set(raw, item)
          return item
        })
        // 清除按钮增删留下的占位，使后续输入继续复用已建立的行模型。
        backList = [...listItems.value]
        pendingSplice = false
      },
      { immediate: true }
    )

    const render = () => {
      return listItems.value.map(({ model, effectData, key }) => {
        return h(Collections, { model, option: { subSpan: 'auto', ...option }, effectData, key })
      })
    }

    if (isView) {
      if (isFormItem) {
        if (isSingle) {
          const { label, labelSlot = label } = columns[0]
          const breakAfter = columns[0].breakAfter ?? columns[0].wrapping
          return () =>
            renderUILayout(
              'space',
              { direction: breakAfter ? 'vertical' : 'horizontal' },
              {
                default: () =>
                  listItems.value.map(({ refData, key }, index) => {
                    const itemEffectData = {
                      ...effectData,
                      parent: effectData,
                      current: orgList.value,
                      field: columns[0].field,
                      value: refData.value,
                      index,
                      record: refData.value,
                    }
                    return h('span', { key }, [toNode(labelSlot, itemEffectData), labelSlot ? ': ' : '', refData.value])
                  }),
              }
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
      const children = new Map([
        [
          {
            ..._option,
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
