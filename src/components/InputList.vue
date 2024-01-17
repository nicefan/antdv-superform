<script lang="ts">
import { type PropType, defineComponent, h, reactive, ref, toRef, watch, toRaw, computed } from 'vue'
import { cloneDeep } from 'lodash-es'
import { cloneModels } from '../utils/buildModel'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { containers } from '.'

export default defineComponent({
  inheritAttrs: false,
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
    labelIndex: Boolean,
  },
  setup(props, ctx) {
    const { model, option, isView, effectData, labelIndex } = props
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
        onClick({ index }) {
          // const orgIdx = orgList.value.indexOf(data.record)
          orgList.value = orgList.value.filter((_, idx) => idx === index)
        },
      },
    }

    let innerModels = childrenMap

    const rowButtonsConfig: any = rowButtons &&
      !isView && {
        type: 'Buttons',
        buttonType: 'link',
        size: 'small',
        span: 'auto',
        methods,
        ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
      }

    // innerModels.set(rowButtonsConfig, {} as any)

    const listItems = ref<any[]>([])
    // 监听数据变化
    watch(
      orgList,
      (list) => {
        if (list.length === 0) {
          list.push(cloneDeep(__initialData))
        }
        listItems.value = list.map((record, idx) => {
          const refData = toRef(orgList.value, idx)
          let children = new Map()
          if (isSingle) {
            const itemOption = { ...columns[0] }
            option.label && !option.subSpan && !itemOption.span && (itemOption.span = 'auto')
            if (typeof itemOption.label === 'string' && labelIndex) itemOption.label += String(idx + 1)
            children.set(itemOption, {
              ...childrenMap.get(columns[0] as any),
              parent: orgList,
              refData,
              propChain: [...propChain, idx],
            })
          } else {
            const __children = cloneModels(innerModels, record, [...propChain, idx]).modelsMap
            __children.forEach((model, opt) => {
              const itemOption = { ...opt }
              !option.subSpan && !opt.span && (itemOption.span = 'auto')
              if (typeof opt.label === 'string' && labelIndex) itemOption.label += String(idx + 1)
              children.set(itemOption, model)
            })
          }
          rowButtonsConfig && children.set(rowButtonsConfig, { parent: orgList, refData })
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
    if (isView) {
      const attrs: Obj = {}
      const children = computed(() => {
        const children = new Map()
        listItems.value.forEach(({ model }) => {
          if (isSingle) {
            model.children.forEach((_model, opt) => children.set(opt, _model))
          } else {
            let _option
            model.children.forEach((_model, opt) => {
              _option = opt
              children.set(opt, _model)
            })
            _option.isBreak = true
            attrs.column = columns.length
          }
        })
        return children
      })
      if (label) {
        attrs.mode = 'text'
        attrs.class = 'sup-descriptions-nest'
      }
      return () => h(DetailLayout, { option, modelsMap: children.value, key: Date(), ...attrs })
    } else {
      return () =>
        listItems.value.map(({ model, effectData }, idx) => {
          return h(Collections, { model, option, effectData, key: model })
        })
    }
  },
})
</script>
