<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRef, watch, toRaw } from 'vue'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import Controls from '.'
import { nanoid } from 'nanoid'
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
    rowKey: String,
    labelIndex: Boolean,
  },
  setup(props, ctx) {
    const { model, isView, effectData, labelIndex, rowKey = '' } = props
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

    const keyMap = new WeakMap()
    const keySet = new Set()
    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      [orgList, () => orgList.value.length],
      ([list]) => {
        if (list.length === 0) {
          return list.push({})
        }

        listItems.value = orgList.value.map((record, idx) => {
          const raw = toRaw(record)
          const newPropChain = [...propChain, idx]
          // let item = listItems.value.find(({model}) => model.refData.value === record)
          let item = keyMap.get(raw)
          if (item) {
            if (item.model.index !== idx) {
              updateModelIndex(item.model, newPropChain, idx)
              item.effectData.index = idx
            }
          } else {
            const { modelsMap } = cloneModels(childrenMap, record, propChain, idx)
            item = {
              key: record[rowKey] || nanoid(12),
              model: { refData: ref(record), children: modelsMap, index: idx, propChain: newPropChain },
              effectData: reactive({ parent: effectData, current: orgList, index: idx, record }),
            }
            keyMap.set(raw, item)
          }
          return item
        })
        // keySet.clear()
        // listItems.value.forEach((item) => keySet.add(item.key))
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
