import {
  computed,
  defineComponent,
  h,
  mergeProps,
  provide,
  reactive,
  readonly,
  ref,
  toRefs,
  unref,
  watch,
  watchSyncEffect,
} from 'vue'
import { watchDebounced } from '@vueuse/core'
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

    const { dataSource, pagination, apis, goPage, request, onSearch } = useQuery(option)

    const actions = {
      setOption: (_option: ExTableOption) => {
        Object.assign(option, _option)
      },
      setData: (data) => {
        formData.records = data
      },
      goPage,
      request,
      onSearch,
    }
    watch(() => dataSource || props.dataSource, actions.setData)

    expose(actions)

    const register = (compRef) => {
      tableRef.value = compRef
      emit('register', actions, reactive({ ...toRefs(compRef), ...actions }))
    }
    emit('register', actions)

    const currentModel = computed(() => {
      return buildModel({ ...option, field: 'records' }, modelData)
    })

    const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
      console.log(pag)
    }

    const searchForm =
      option.searchSechma &&
      buildSearchForm(option as any, (data) => {
        onSearch(data)
      })

    return () =>
      option.columns &&
      h(
        DataProvider,
        { data: formData },
        h('div', { class: option.isContainer && 'exa-container' }, [
          h('div', { class: 'exa-form-section exa-table-search' }, searchForm()),
          h(
            'div',
            { class: 'exa-form-section section-last' },
            h(Controls.Table, {
              option: { ...option, pagination, apis: apis.value },
              ...currentModel.value,
              onRegister: register,
              onChange: handleTableChange,
            } as any)
          ),
        ])
      )
  },
})

function useQuery(option) {
  const queryApi = computed(() => {
    return option.apis?.query ? option.apis.query : option.apis
  })
  const pageParam = reactive<Obj>({})
  const searchParam = ref()
  const requestParams = computed(() => ({
    ...unref(option.params),
    ...searchParam.value,
    ...pageParam.value,
  }))
  const loading = ref(false)
  const dataSource = ref()

  const request = (params = {}) => {
    const _params = {
      ...requestParams.value,
      ...params,
    }
    loading.value = true
    return Promise.resolve(
      queryApi.value?.(_params).then((res) => {
        if (Array.isArray(res)) {
          dataSource.value = res
          pagination.value = false
        } else if (res?.records) {
          dataSource.value = res.records
          pagination.value &&= { ...pagination.value, total: res.total, pageSize: res.size, current: res.current }
        }
      })
    ).finally(() => {
      loading.value = false
    })
  }
  watch([queryApi, requestParams], () => queryApi.value && request(), { immediate: true })

  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current
    pageParam.size = size
  }
  const onSearch = (param) => {
    searchParam.value = param
  }

  const pagination = ref<false | Obj>(false)
  watch(
    () => option.pagination,
    (def) => {
      pagination.value =
        def !== false &&
        mergeProps(
          {
            // TODO 默认分页参数
            onChange: goPage,
            onShowSizeChange: goPage,
          },
          option.attrs?.pagination
        )
      if (def?.pageSize) pageParam.size = def.pageSize
    },
    {
      immediate: true,
    }
  )
  const apis = computed(() => {
    return queryApi.value && { ...option.apis, query: queryApi.value }
  })
  return {
    apis,
    goPage,
    request,
    onSearch,
    pagination,
    dataSource,
  }
}

function buildSearchForm({ searchSechma, columns }, onChange) {
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
