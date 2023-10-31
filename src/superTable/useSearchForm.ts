// import { watchDebounced } from '@vueuse/core'
import { ButtonGroup, mergeActions } from '../components/buttons'
import { ref, reactive, h, toRaw } from 'vue'
import Controls from '../components'
import { getEffectData } from '../utils'

export function useSearchForm(columns, searchSechma, tableRef, onChange) {
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
    submit() {
      onChange(toRaw(formData))
    },
    reset() {
      const data = formRef.value.resetFields()
      onChange(data)
    },
  }
  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons }
  const __actions = buttonsConfig.actions || ['submit', 'reset']
  if (__actions.includes('submit')) __actions[__actions.indexOf('submit')] = { name: 'submit', label: '查询' }
  const actions = mergeActions(__actions, defaultAction)
  if (actions?.length) {
    // Object.assign(formOption, {
    //   rowProps: { align: 'middle' },
    //   subItems: [
    //     {
    //       type: 'Group',
    //       isBlock: false,
    //       colProps: { flex: 'auto' },
    //       subItems: formOption.subItems,
    //     },
    //     {
    //       type: 'Buttons',
    //       align: 'right',
    //       colProps: { flex: 0, offset: 1 },
    //       ...buttons,
    //       actions,
    //     },
    //   ],
    // })

    formOption.subItems.push({
      type: 'InfoSlot',
      align: 'right',
      colProps: { flex: 'auto' },
      render: () =>
        h(ButtonGroup, {
          config: { ...buttonsConfig, actions },
          param: getEffectData({ table: tableRef, form: formRef }),
        }),
    })
  } else {
    //  不带按钮实时搜索
    // watchDebounced(formData, (data) => onChange(data), { debounce: 500, maxWait: 1000 })
  }

  const formNode = () => h(Controls.Form, { option: formOption, source: formData, ref: formRef })
  return { formNode, formRef }
}
