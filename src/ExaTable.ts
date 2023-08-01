import {
  PropType,
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
} from 'vue'
import { watchDebounced } from '@vueuse/core'
import merge from 'lodash/merge'
import { buildModel, buildModelMaps, setFieldsValue } from './utils/util'
import Controls from './controls/components'
import { mergeActions } from './controls/buttons'
import { useControl } from './controls'

const DataProvider = defineComponent({
  props: {
    data: Object,
    apis: Object,
  },
  setup(props, ctx) {
    provide('exaProvider', readonly(props || {}))
    return ctx.slots.default
  },
})

export function defineTable(option: RootTableOption) {
  return option
}

export const ExaTable = defineComponent({
  name: 'ExaTable',
  inheritAttrs: false,
  props: {
    dataSource: Object,
    option: Object as PropType<FormOption>,
  },
  emits: ['register'],
  setup(props, ctx) {
    const tableRef = ref()
    const modelData = reactive({
      parent: props.dataSource || [],
    })
    const option: Obj = reactive(props.option || {})
    merge(option, { attrs: mergeProps(option.attrs, ctx.attrs) })

    const { dataSource, pagination, onLoaded, apis, goPage, request, onSearch } = useQuery(option)

    const actions = {
      setOption: (_option: RootTableOption) => {
        const attrs = mergeProps({ ..._option.attrs }, option.attrs)
        merge(option, _option, { attrs })
      },
      setData: (data) => {
        modelData.parent = data
      },
      goPage,
      request,
      onSearch,
      onLoaded,
    }
    watch(() => dataSource || props.dataSource, actions.setData)

    ctx.expose(actions)

    const register = (compRef) => {
      tableRef.value = compRef
      ctx.emit('register', actions, reactive({ ...toRefs(compRef), ...actions }))
    }
    ctx.emit('register', actions)

    const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
      console.log(pag)
    }

    const searchForm = ref()
    const tableAttrs = ref()
    watch(
      option,
      (data) => {
        if (!data?.columns) return
        const { columns, searchSechma } = data
        // 列表控件子表单模型
        const initModel = { parent: reactive({}), rules: {} }
        const listData = {
          model: initModel,
          children: buildModelMaps(columns, initModel),
        }

        // const currentModel = { model: modelData, listData }

        const { effectData, attrs } = useControl({ option: data, model: modelData })

        if (searchSechma) {
          searchForm.value = buildSearchForm(columns, searchSechma, (data) => {
            onSearch(data)
          })
        }
        tableAttrs.value = reactive({
          option,
          listData,
          model: modelData,
          effectData,
          apis,
          ...attrs,
          pagination,
          onRegister: register,
          onChange: handleTableChange,
        })
      },
      {
        immediate: true,
      }
    )

    return () =>
      option.columns &&
      h(DataProvider, { data: modelData.parent, apis }, () =>
        h('div', { class: option.isContainer && 'exa-container' }, [
          searchForm.value && h('div', { class: 'exa-form-section exa-table-search' }, searchForm.value()),
          option.columns && h('div', { class: 'exa-form-section section-last' }, h(Controls.Table, tableAttrs.value)),
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
  const callbacks: Fn[] = []
  const onLoaded = (cb: Fn) => callbacks.push(cb)

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
        callbacks.forEach((cb) => cb(res))
      })
    ).finally(() => {
      loading.value = false
    })
  }

  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current
    pageParam.size = size
  }
  const onSearch = (param) => {
    searchParam.value = param
  }

  const pagination = ref<false | Obj>(false)
  watch(
    () => option.pagination || option.attrs.pagination,
    (def) => {
      pagination.value =
        (def || def !== false) &&
        mergeProps(
          {
            // TODO 默认分页参数
            onChange: goPage,
            onShowSizeChange: goPage,
          },
          def
        )
      if (def?.pageSize) pageParam.size = def.pageSize
    },
    {
      immediate: true,
      flush: 'sync',
    }
  )
  const apis = computed(() => {
    return queryApi.value && { ...option.apis, query: queryApi.value }
  })

  watch([apis, requestParams], () => queryApi.value && request(), { immediate: true })

  return {
    apis,
    goPage,
    request,
    onSearch,
    requestParams,
    pagination,
    dataSource,
    onLoaded,
  }
}

function buildSearchForm(columns, searchSechma, onChange) {
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

export const useTable = (option: RootTableOption, data?: any[]) => {
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
