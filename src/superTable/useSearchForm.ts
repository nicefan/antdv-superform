// import { watchDebounced } from '@vueuse/core'
import { ButtonGroup } from '../components/buttons'
import { ref, reactive, h, toRaw, watch, nextTick } from 'vue'
import Controls from '../components'
import { getEffectData } from '../utils'

export function useSearchForm(tableOption, tableRef, onChange) {
  const { columns, searchSechma } = tableOption
  const { buttons = {}, ...formOption } = searchSechma
  Object.assign(formOption, {
    ignoreRules: true,
  })

  formOption.subItems = searchSechma.subItems.map((item) => {
    if (typeof item === 'string') {
      return columns.find((col) => col.field === item)
    } else {
      return item
    }
  })
  const formRef = ref()
  const formData: Obj = reactive({})

  const defaultAction = {
    search() {
      onChange(toRaw(formData), true)
    },
    reset() {
      const data = formRef.value.resetFields()
      onChange(data, true)
    },
  }

  /** 手动设置查询条件 */
  const setParams = (params?: Obj) => {
    params &&
      Object.keys(params).forEach((key) => {
        if (key in formData) formData[key] = params[key]
      })
  }

  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons }
  const actions = buttonsConfig.actions || ['search', 'reset']
  const isDebounce = !actions?.length
  if (!isDebounce) {
    formOption.subItems.push({
      type: 'InfoSlot',
      align: 'right',
      span: 'auto',
      render: () =>
        h(ButtonGroup, {
          config: { ...buttonsConfig, actions, methods: defaultAction },
          param: getEffectData({ table: tableRef, form: formRef }),
        }),
    })
  }
  const paramsRef = ref(tableOption.params)
  nextTick(() => {
    if (tableOption.params) {
      watch(
        paramsRef,
        (params) => {
          setParams(params)
          onChange(toRaw(formData), !isDebounce)
        },
        { immediate: true, deep: true }
      )
    } else {
      /** 同步查询初始参数 */
      onChange(formData, false)
    }

    if (isDebounce) {
      //  不带按钮实时搜索
      // const debounceQuery = debounce(onChange, 500, { maxWait: 1000 })
      watch(
        [paramsRef, formData],
        () => {
          onChange(formData, true)
        },
        { deep: true }
      )
    }
  })

  const formNode = () => h(Controls.Form, { option: formOption, source: formData, ref: formRef })
  return { formNode, formRef, formData }
}
