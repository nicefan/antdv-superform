<script lang="ts">
import { type PropType, defineComponent, h, reactive, shallowRef, toRef, watch, toRaw, computed } from 'vue'
import { cloneModels } from '../utils/buildModel'
import Collections from './Collections'
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

    // const { propChain } = model
    const orgList = toRef(model, 'refData')
    let singleVersion = 0

    const methods = {
      add: {
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, isSingle ? undefined : {})
          orgList.value = [...toRaw(orgList.value)]
        },
        icon: () => getSemanticIconNode('add'),
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: '',
        icon: () => getSemanticIconNode('remove'),
        onClick({ index }) {
          orgList.value.splice(index, 1)
          orgList.value = [...toRaw(orgList.value)]
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

    //将配置选项下沉
    // const groupOption = {
    //   ..._option,
    //   type: 'InputGroup',
    //   label,
    //   labelSlot,
    //   subSpan: option.subSpan ?? 'auto',
    // }

    const keyMap = new WeakMap<object, PropertyKey>()
    const listItems = shallowRef<any[]>([])
    // 监听数据变化
    watch(
      () => orgList.value.map((record) => toRaw(record)),
      (currentList) => {
        if (currentList.length === 0) {
          orgList.value.push(isSingle ? undefined : {})
        }
        const list = currentList.length ? currentList : orgList.value.map((record) => toRaw(record))
        const previousItems = listItems.value
        if (isSingle && previousItems.length !== list.length) {
          singleVersion += 1
        }
        const keys = list.map((record, idx) => {
          const rawRecord = toRaw(record)
          if (rawRecord !== null && typeof rawRecord === 'object') {
            if (!keyMap.has(rawRecord)) {
              keyMap.set(rawRecord, nanoid(12))
            }
            return keyMap.get(rawRecord)
          }
          // $index 模式按索引槽位绑定普通数组，字段值变化不应改变行 key
          return previousItems[idx]?.baseKey ?? nanoid(12)
        })
        listItems.value = list.map((record, idx) => {
          const refData = toRef(orgList.value, idx)
          const propChain = [...model.propChain, idx]
          const newModel: Obj = {
            index: idx,
            parent: orgList,
            refData,
            propChain,
          }
          const ghostModel = new Map()
          let itemOption: Obj
          if (isSingle) {
            itemOption = { ...columns[0] }
            ghostModel.set(itemOption, {
              ...childrenMap.get(columns[0]),
              ...newModel,
            })
          } else {
            if (childrenMap.size === 1 || !columns[0].field) {
              itemOption = {
                subSpan: 'auto',
                ...columns[0],
                field: String(idx),
              }
              const oldModel = [...childrenMap.values()][0]
              ghostModel.set(itemOption, {
                ...oldModel,
                ...newModel,
                refName: String(idx),
                children: cloneModels(oldModel.children || new Map(), record, propChain).modelsMap,
              })
            } else {
              itemOption = compact
                ? {
                    ..._option,
                    type: 'InputGroup',
                    initialValue: undefined,
                    subSpan: option.subSpan ?? 'auto',
                    field: String(idx),
                  }
                : { type: 'Group', span: 'auto' }

              ghostModel.set(itemOption, {
                ...newModel,
                refName: String(idx),
                children: cloneModels(childrenMap, record, propChain).modelsMap,
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
            baseKey: keys[idx],
            key: isSingle ? `${String(keys[idx])}:${idx}:${singleVersion}` : keys[idx],
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
        return h(Collections, { model, option, effectData, key })
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
