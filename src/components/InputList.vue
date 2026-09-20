<script lang="ts">
import { type PropType, defineComponent, h, reactive, shallowRef, toRef, watch, toRaw, computed, ref } from 'vue'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import Collections from './Collections'
import { containers } from '.'
import { DetailLayout } from './Detail'
import { getSemanticIconNode, toNode } from '../utils'
import { getUIRender } from '../adapter'
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

    const methods = {
      add: {
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, isSingle ? undefined : {})
          backList.splice(index + 1, 0, undefined)
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
        },
      },
    }

    const rowButtonsConfig: any = !isView &&
      rowButtons !== false && {
        type: 'Buttons',
        colProps: { flex: '0' },
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

    const rowCache = new WeakMap<object, any>()
    const listItems = shallowRef<any[]>([])
    watch(
      [() => (isSingle ? orgList.value : [...orgList.value]), () => orgList.value.length, () => [...model.propChain]],
      ([currentList, length]) => {
        if (length === 0) {
          orgList.value.push(isSingle ? undefined : {})
          return
        }
        // 对象可能重排，匹配后需要从临时池移除，避免重复对象错误复用同一个行模型。
        const isSync = backList.length === length
        listItems.value = orgList.value.map((record, idx) => {
          const propChain = [...model.propChain, idx]
          const raw = toRaw(record)
          let oldItem
          if (isSingle) {
            if (isSync) {
              // 普通数组没有稳定行身份，按槽位复用；内部增删已提前同步 backList 的对应位置。
              oldItem = backList[idx]
            } else {
              // 对象行按身份复用，使模型在插入、删除和重排后继续跟随原对象。
              const oldIndex = backList.findIndex((item) => item && Object.is(toRaw(item.refData.value), raw))
              if (oldIndex !== -1) oldItem = backList.splice(oldIndex, 1)[0]
            }
          } else {
            oldItem = rowCache.get(raw)
          }
          if (oldItem) {
            if (!isSingle) oldItem.refData.value = record
            updateModelIndex(oldItem.model, propChain, idx)
            oldItem.effectData.index = idx
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
          } else if (
            childrenMap.size === 1 &&
            !firstItem.field &&
            [...containers, 'InputGroup'].includes(firstItem.type)
          ) {
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
          // 行按钮只需要操作上下文，不绑定字段路径，避免与整行分组重复注册校验。
          rowButtonsConfig && ghostModel.set(rowButtonsConfig, reactive({ parent: orgList, index: idx }))
          // 布局模型与字段模型分开，避免 children 指回自身形成循环。
          const itemModel = reactive({ parent: orgList, children: ghostModel, index: idx, propChain })
          const item = {
            children: itemModel.children,
            model: itemModel,
            refData,
            key: nanoid(12),
            effectData: reactive({ parent: effectData, current: orgList, index: idx }),
          }
          !isSingle && rowCache.set(raw, item)
          return item
        })
        // 用本轮行模型替换增删操作的临时占位。
        backList = [...listItems.value]
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
            getUIRender('space')(
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
