<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRef, watch, toRaw } from 'vue'
import { cloneDeep } from 'lodash-es'
import { cloneModels } from '../utils/buildModel'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { containers } from '.'

export default defineComponent({
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
  },
  setup(props, ctx) {
    const { model, option, isView, effectData } = props
    const { columns, buttons: buttonsConfig, rowButtons, label, title = label, slots: optionSlots } = option
    const { modelsMap: childrenMap, initialData, rules } = model.listData

    const isSingle = columns.length === 1 && columns[0].field === '$index'
    const __initialData = isSingle ? initialData.$index : toRaw(initialData)

    const { propChain } = model
    const orgList = toRef(model, 'refData')

    const methods = {
      add() {
        orgList.value = orgList.value.concat(cloneDeep(__initialData))
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
        confirmText: undefined,
        onClick({index}) {
          // const orgIdx = orgList.value.indexOf(data.record)
          orgList.value = orgList.value.filter((_, idx) => idx === index)
        },
      },
    }

    let innerModels = childrenMap
    if (rowButtons) {
      const rowButtonsConfig: any = {
        type: 'Buttons',
        buttonType: 'link',
        size: 'small',
        span: 'auto',
        methods,
        ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
      }

      innerModels.set(rowButtonsConfig, {} as any)
    }

    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      orgList,
      (list) => {
        if (list.length === 0) {
          list.push(cloneDeep(__initialData))
          // methods.add()
        }
        listItems.value = list.map((record, idx) => {
          const refData = toRef(orgList.value, idx)
          let children = new Map()
          if (isSingle) {
            innerModels.forEach((model, opt) => {
              children.set(opt, { ...model, parent: orgList, refData, propChain: [...propChain, idx] })
            })
          } else {
            const __children = cloneModels(innerModels, record, [...propChain, idx]).modelsMap
            __children.forEach((model, opt) => {
              children.set({...opt, span: opt.span ?? 'auto'}, model)
            })
          }
          return {
            model: { parent: orgList, refData, children },
            effectData: reactive({ ...effectData, current: orgList, index: idx, record: refData }),
          }
        })
        // Object.keys(currentRules).forEach((key, idx) => idx > org.length - 1 && delete currentRules[key])
      },
      {
        immediate: true,
      }
    )

    const slots: Obj = { ...ctx.slots }

    const renderItem = () =>
      listItems.value.map(({ model, effectData }, idx) => {
        return isView
          ? h(DetailLayout, { option, modelsMap: model.children })
          : h(Collections, { model, option, effectData, key: model })
      })
    return () => h('div', renderItem())
  },
})
</script>
