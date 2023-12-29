<script lang="ts">
import { type PropType, defineComponent, h, inject, reactive, ref, toRef, useAttrs, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { cloneModels } from '../utils/buildModel'
import { ButtonGroup, createButtons } from './buttons'
import base from './base'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { Row, Col } from 'ant-design-vue'
import { toNode } from '../utils'
import { autoCompleteProps } from 'ant-design-vue/lib/auto-complete'
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
    const { buttons: buttonsConfig, rowButtons, label, title = label, slots: optionSlots } = option
    // 先构建一个数据结构
    const { modelsMap: childrenMap, initialData, rules } = model.listData
    const isSingle = Reflect.has(initialData, 'index')
    const __initialData = isSingle ? initialData.index : initialData
    const { propChain } = model
    const orgList = toRef(model, 'refData')

    const methods = {
      add() {
        orgList.value.push(cloneDeep(__initialData))
      },
      delete({ record }) {
        const orgIdx = orgList.value.indexOf(record)
        orgList.value.splice(orgIdx, 1)
      },
    }
    const isContainer = [...childrenMap.keys()].find((item) => ['InputGroup', ...containers].includes(item.type))
    let innerModels = childrenMap
    if (!isContainer) {
      const innerOption = { ...option, type: 'InputGroup', field: '', span: undefined }
      innerModels = new Map<any, any>([[innerOption, { rules: model.rules, children: childrenMap }]])
    }
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
      () => [...orgList.value],
      (org) => {
        if (org.length === 0) {
          org.push(cloneDeep(__initialData))
        }
        listItems.value = org.map((record, idx) => {
          const refData = toRef(orgList.value, idx)
          let children = new Map()
          if (isSingle) {
            // const __model = 
            ;(function getIndexOpt(models: any, copy: Map<any, any>) {
              models.forEach((model, opt) => {
                if (!opt.field) {
                  const __model = {...model, parent: orgList, refData: orgList}
                  copy.set(opt, __model)
                  if (model.children) {
                    __model.children = new Map()
                    getIndexOpt(model.children, __model.children)
                  }
                } else if (opt.field === 'index') {
                  copy.set(opt, { ...model, parent: orgList, refData, propChain: [...propChain, idx] })
                }
              })
            })(innerModels, children)
          } else {
            // 原数据已经存在, 此处建立表单绑定
            children = cloneModels(innerModels, record, [...propChain, idx]).modelsMap
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
      listItems.value.map(({ model, effectData }) => {
        return isView
          ? h(DetailLayout, { option, modelsMap: model.children })
          : h(Collections, { model, option, effectData })
      })
    return () => h('div', renderItem())
  },
})
</script>
