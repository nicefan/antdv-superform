<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRef, watch, toRaw } from 'vue'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import { useRowKey } from '../utils'
import Controls from '.'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { globalProps } from '../plugin'

export default defineComponent({
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'ListGroup'>>,
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
    rowKey: [String, Function] as PropType<any>,
    labelIndex: Boolean,
  },
  setup(props, ctx) {
    const { model, isView, effectData, labelIndex, rowKey } = props
    const { columns, rowButtons, slots: optionSlots, ...option } = props.option
    const { modelsMap: childrenMap, rules } = model.listData

    const { propChain } = model
    const orgList = toRef(model, 'refData')

    const methods = {
      add: {
        icon: () => h(PlusOutlined),
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, {})
        },
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
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
        labelMode: 'icon',
        ...globalProps.rowButtons,
        methods,
        actions: ['add', 'delete'],
        ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
      }

    const itemMap = new WeakMap()
    const { getKey } = useRowKey(rowKey)
    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      [() => [...orgList.value], () => [...model.propChain]],
      ([list]) => {
        if (list.length === 0) {
          return orgList.value.push({})
        }

        listItems.value = orgList.value.map((record, idx) => {
          const raw = toRaw(record)
          const newPropChain = [...propChain, idx]
          // let item = listItems.value.find(({model}) => model.refData.value === record)
          let item = itemMap.get(raw)
          if (item) {
            item.refData.value = record
            if (item.model.index !== idx) {
              updateModelIndex(item.model, newPropChain, idx)
              item.effectData.index = idx
            }
          } else {
            const refData = ref(record)
            const { modelsMap } = cloneModels(childrenMap, refData, propChain, idx)
            item = {
              key: getKey(record),
              refData,
              model: reactive({ children: modelsMap, index: idx, propChain: newPropChain }),
              effectData: reactive({ parent: effectData, current: orgList, index: idx, record }),
            }
            itemMap.set(raw, item)
          }
          return item
        })
      },
      {
        immediate: true,
      }
    )
    const groupOption = {
      ...option,
      type: 'Group',
      buttons: rowButtonsConfig,
      subItems: columns,
    }
    const title = option.title || option.label
    if (typeof title === 'string' && labelIndex) {
      groupOption.title = ({ index }) => title + String(index + 1)
    }

    return () =>
      listItems.value.map(({ model, effectData, key }) => {
        return h(Controls.Group, { model, option: groupOption, effectData, key, isView }, ctx.slots)
      })
  },
})
</script>
