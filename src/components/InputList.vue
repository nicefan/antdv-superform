<script lang="ts">
import { type PropType, defineComponent, h, reactive, shallowRef, toRef, watch, toRaw, computed, ref } from 'vue'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import Collections from './Collections'
import { containers } from '.'
import { DetailLayout } from './Detail'
import { getSemanticIconNode, toNode } from '../utils'
import { getUIRender } from '../adapter'
import { globalProps } from '../plugin'
import { mergeButtonConfig } from './buttons/mergeButtonConfig'
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

    const firstItem = columns[0]
    const orgModel = childrenMap.get(firstItem)!
    // 普通数组，值对应下标
    const isSingle = columns.length === 1 && firstItem.field === '$index'
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

    const rowButtonsConfig =
      !isView &&
      rowButtons !== false &&
      mergeButtonConfig(
        {
          type: 'Buttons',
          colProps: { flex: '0' },
          labelMode: 'icon',
          ...globalProps.rowButtons,
          methods,
          actions: ['add', 'delete'],
        },
        rowButtons
      )

    const listItems = shallowRef<any[]>([])
    const createRow = (record: any, idx: number) => {
      const propChain = [...model.propChain, idx]
      // 普通值行通过当前槽位读写，对象行通过独立 Ref 保持字段绑定。
      const rowModel: Obj = reactive({ ...(isSingle ? orgModel : {}), index: idx, parent: orgList, propChain })
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
        [...containers, 'InputGroup', 'InputList'].includes(firstItem.type)
      ) {
        // 维一子项且为容器类
        itemOption = { ...firstItem }
        Object.assign(rowModel, {
          initialValue: orgModel.initialValue,
          rules: orgModel.rules,
          listData: orgModel.listData,
          children: cloneModels(orgModel.children || new Map(), refData, propChain).modelsMap,
        })
      } else {
        // 列表外层的宽度、换行和表单项配置不应再次作用于每个自动生成的行容器。
        itemOption = { type: compact ? 'InputGroup' : 'Group', initialValue: undefined, span: 'auto' }
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
      return {
        children: itemModel.children,
        model: itemModel,
        refData,
        key: nanoid(12),
        effectData: reactive({ parent: effectData, current: orgList, index: idx }),
      }
    }
    if (isSingle) {
      // 普通值没有稳定对象身份；沿用 main 的槽位复用，内部增删先同步缓存位置。
      watch(
        [() => orgList.value, () => orgList.value.length, () => [...model.propChain]],
        () => {
          if (orgList.value.length === 0) orgList.value.push(undefined)
          listItems.value = orgList.value.map((record, idx) => {
            const oldItem = backList[idx]
            if (!oldItem) return createRow(record, idx)
            updateModelIndex(oldItem.model, [...model.propChain, idx], idx)
            oldItem.effectData.index = idx
            return oldItem
          })
          backList = [...listItems.value]
        },
        { immediate: true }
      )
    } else {
      // 对象行按原始对象身份复用，移动后只更新模型路径和行号。
      const rowCache = new WeakMap<object, any>()
      watch(
        [() => [...orgList.value], () => orgList.value.length, () => [...model.propChain]],
        () => {
          if (orgList.value.length === 0) orgList.value.push({})
          listItems.value = orgList.value.map((record, idx) => {
            let rowItem = rowCache.get(toRaw(record))
            if (rowItem) {
              rowItem.refData.value = record
              updateModelIndex(rowItem.model, [...model.propChain, idx], idx)
              rowItem.effectData.index = idx
            } else {
              rowItem = createRow(record, idx)
              rowCache.set(toRaw(record), rowItem)
            }
            return rowItem
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
            formItemProps: { ..._option.formItemProps, style: 'margin: 0' },
            label,
            labelSlot,
            type: 'InfoSlot',
            block: false,
            span: 24,
            // FormItem 对单个与多个子节点采用不同包装；固定根节点，避免 1/2 行切换时重挂首行并清除校验状态。
            render: () => h('div', render()),
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
