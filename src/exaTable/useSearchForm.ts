import { watchDebounced } from '@vueuse/core'
import { mergeActions } from '../controls/buttons'
import { ref, reactive, h } from 'vue'
import Controls from '../controls/components'

export function useSearchForm(columns, searchSechma, onChange) {
  const { buttons = {}, ...formOption }: FormOption = {
    compact: true,
    ignoreRules: true,
    ...searchSechma,
  }
  formOption.subItems = searchSechma.subItems.map((item) => {
    if (typeof item === 'string') {
      return columns.find((col) => col.field === item)
    } else {
      return item
    }
  })
  const formRef = ref()
  const formData: Obj = reactive({})

  const onRegister = (form) => {
    formRef.value = form
  }

  const defaultAction = {
    submit() {
      formRef.value.submit().then(onChange)
    },
    reset() {
      const data = formRef.value.resetFields()
      onChange(data)
    },
  }
  const actions = mergeActions(buttons.actions || ['submit', 'reset'], defaultAction)
  if (actions?.length) {
    formOption.subItems.push({
      type: 'Buttons',
      align: 'right',
      colProps: { flex: 1 },
      ...buttons,
      actions,
    })
  } else {
    //  不带按钮实时搜索
    watchDebounced(formData, (data) => onChange(data), { debounce: 500, maxWait: 1000 })
  }

  const searchForm = () => h(Controls.Form, { option: formOption, model: formData, onRegister })
  return searchForm
}
