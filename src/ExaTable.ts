import { computed, defineComponent, h, provide, reactive, readonly, ref, toRefs, watch } from 'vue'
import { buildModel } from './utils/util'
import Controls from './controls/components'
import { mergeActions } from './controls/buttons'

const DataProvider = defineComponent({
  props: {
    data: Object,
  },
  setup(props, ctx) {
    provide('formData', readonly(props.data || {}))
    return ctx.slots.default
  },
})

export const ExaTable = defineComponent({
  name: 'ExaTable',
  inheritAttrs: false,
  props: {
    dataSource: Object,
  },
  emits: ['register'],
  setup(props, { expose, emit, attrs }) {
    const option: Obj = reactive({ ...attrs })

    const formData: Obj = reactive({ records: props.dataSource || [] })
    const tableRef = ref()
    const modelData = reactive({
      parent: formData,
    })
    const actions = {
      setOption: (_option: ExTableOption) => {
        Object.assign(option, _option)
      },
      setData: (data) => {
        formData.records = data
      },
    }
    watch(() => props.dataSource, actions.setData)

    expose(actions)

    const register = (compRef) => {
      tableRef.value = compRef
      emit('register', actions, reactive({ ...toRefs(compRef), ...actions }))
    }
    emit('register', actions)

    const model = computed(() => {
      return buildModel({ ...option, field: 'records' }, modelData)
    })

    const searchForm = option.searchSechma && buildSearchForm(option as any, tableRef)

    return () =>
      option.columns &&
      h(DataProvider, { data: formData }, [
        h('div', { class: 'exa-form-section exa-table-search' }, searchForm()),
        h(
          'div',
          { class: 'exa-form-section' },
          h(Controls.Table, { option: option, ...model.value, onRegister: register } as any)
        ),
      ])
  },
})

function buildSearchForm({ searchSechma, columns }, tableRef) {
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

  const defaultAction = {
    submit() {
      console.log(formData)
    },
    reset() {},
  }
  const actions = mergeActions(buttons.actions || ['submit', 'reset'], defaultAction)

  formOption.subItems.push({
    type: 'Buttons',
    align: 'right',
    colProps: { flex: 1 },
    ...buttons,
    actions,
  })
  const searchForm = () => h(Controls.Form, { option: formOption, model: formData, ref: formRef })
  return searchForm
}

type RegisterMethod = {
  (): () => VNode
  (actions?: Obj, _tableRef?: Obj): void
}

export const useTable = (option: Omit<ExTableOption, 'field'>, data?: any[]) => {
  const tableRef = ref()
  const dataSource = ref(data || [])
  const actionsRef = ref<Obj>()

  const register: RegisterMethod = (actions?: Obj, _tableRef?: Obj): any => {
    if (actions) {
      if (!actionsRef.value) {
        actions.setOption(option)
        actions.setData(dataSource.value)
      }
      tableRef.value = _tableRef
      actionsRef.value = actions
    } else {
      return () => h(ExaTable, { dataSource: dataSource.value, onRegister: register })
    }
  }
  const _promise = new Promise((resolve) => watch(tableRef, resolve))

  const getTable = async (key?: string, param?: any) => {
    const form = (await _promise) as Obj
    if (key && key in form) {
      if (typeof form[key] === 'function') {
        return form[key](param)
      } else {
        return form[key]
      }
    } else if (!key) {
      return form
    }
  }
  return [
    register,
    {
      setData(data) {
        if (actionsRef.value) {
          actionsRef.value.setData(data)
        } else {
          dataSource.value = data
        }
      },
      tableRef,
      getTable,
    },
  ] as const
}
