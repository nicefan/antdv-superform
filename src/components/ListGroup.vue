<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRef, watch, toRaw, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import { cloneModels } from '../utils/buildModel'
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
    const { modelsMap: childrenMap, initialData, rules } = model.listData

    const { propChain } = model
    const orgList = toRef(model, 'refData')

    const methods = {
      add: {
        icon: () => h(PlusOutlined),
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, cloneDeep(initialData))
          orgList.value = [...toRaw(orgList.value)]
        },
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
        confirmText: '',
        icon: () => h(MinusOutlined),
        onClick({ index }) {
          orgList.value = orgList.value.filter((_, idx) => idx !== index)
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
    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      orgList,
      (list) => {
        if (list.length === 0) {
          list.push(cloneDeep(initialData))
        }

        listItems.value = list.map((record, idx) => {
          const raw = toRaw(record)
          if (!keyMap.has(raw)) {
            keyMap.set(raw, record[rowKey] || nanoid(12))
          }
          // 原数据已经存在, 此处建立表单绑定
          const { modelsMap } = cloneModels(childrenMap, record, propChain, idx)

          return {
            key: keyMap.get(raw),
            model: { refData: ref(record), children: modelsMap, index: idx },
            effectData: reactive({ parent: effectData, current: orgList, index: idx, record }),
          }
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
      listItems.value.map(({ model, effectData, key }, idx) => {
        return h(Controls.Group, { model, option: groupOption, effectData, key: key + idx, isView }, ctx.slots)
      })
  },
})
</script>
