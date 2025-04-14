// import { watchDebounced } from '@vueuse/core'
import { ButtonGroup } from '../components/buttons'
import { ref, reactive, h, toRaw, watch, nextTick } from 'vue'
import Controls from '../components'
import { getEffectData } from '../utils'

export function useSearchForm(tableOption, tableRef, onChange) {
  const { columns, searchSchema = tableOption.searchForm } = tableOption
  const formRef = ref()
  const dataSource: Obj = searchSchema.dataSource || reactive({})

  const { buttons = {}, searchOnChange, ...formOption } = searchSchema
  Object.assign(formOption, {
    ignoreRules: true,
    dataSource,
    subItems: [],
  })

  searchSchema.subItems.forEach((item) => {
    if (typeof item === 'string') {
      const col = columns.find((col) => col.field === item)
      col && formOption.subItems.push({ type: 'Input', ...col })
    } else {
      return formOption.subItems.push(item)
    }
  })

  const defaultAction = {
    search() {
      onChange(dataSource)
    },
    reset(data?: Obj) {
      formRef.value.resetFields(data)
      // 表单重置后会调用提交
    },
  }

  /** 手动设置查询条件 */
  const setParams = (params?: Obj) => {
    Object.assign(dataSource, params)
    // params &&
    //   Object.keys(params).forEach((key) => {
    //     if (key in dataSource) dataSource[key] = params[key]
    //   })
  }

  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons }
  buttonsConfig.actions ??= !searchOnChange ? ['search', 'reset'] : undefined

  if (buttonsConfig !== false && buttonsConfig.actions?.length) {
    formOption.subItems.push({
      type: 'InfoSlot',
      align: 'right',
      span: 'auto',
      render: () =>
        h(ButtonGroup, {
          option: { ...buttonsConfig, methods: defaultAction },
          effectData: getEffectData({ table: tableRef, form: formRef }),
        }),
    })
  }
  // 更新初始化数据
  const unWatch = watch(formRef, () => {
    onChange(dataSource)
    // 立即查询监听
    if (searchOnChange) {
      watch(dataSource, onChange)
    }
    unWatch()
  })

  const formNode = () =>
    h(Controls.Form, {
      option: formOption,
      ref: formRef,
      onSubmit: defaultAction.search,
      onReset: defaultAction.search,
    })
  return { formNode, formRef, ...defaultAction, dataSource }
}
