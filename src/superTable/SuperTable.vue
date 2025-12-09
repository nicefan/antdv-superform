<script lang="ts">
import type { RootTableOption } from '../exaTypes'
import {
  defineComponent,
  type PropType,
  ref,
  reactive,
  mergeProps,
  watch,
  h,
  provide,
  onUnmounted,
  toRefs,
  shallowReactive,
  computed,
  watchEffect,
  isRef,
  unref,
  Teleport,
  nextTick,
  shallowRef,
} from 'vue'
import { useControl, useInnerSlots } from '../utils'
import { buildModelsMap } from '../utils/buildModel'
import { useQuery } from './useQuery'
import { useSearchForm } from './useSearchForm'
import { DataProvider } from '../dataProvider'
import Controls from '../components'
import { globalProps } from '../plugin'
import { useTableScroll } from './useTableScroll'
import base from '../components/base'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'SuperTable',
  inheritAttrs: false,
  props: {
    dataSource: Array as PropType<Obj[]>,
    schema: Object as PropType<RootTableOption>,
  },
  emits: ['register', 'load', 'update:dataSource'],
  setup(props, ctx) {
    const { style, class: ctxClass, ...ctxAttrs } = ctx.attrs
    const option = shallowReactive({ attrs: ctxAttrs }) as RootTableOption
    const dataRef = ref([])
    const wrapRef = ref()

    const updateSource = (data) => {
      dataRef.value = data
      ctx.emit('update:dataSource', data)
      if (isRef(option.dataSource)) {
        option.dataSource.value = data
      }
    }
    watchEffect(() => props.dataSource && updateSource(props.dataSource))
    watchEffect(() => option.dataSource && updateSource(unref(option.dataSource)))

    const searchForm = ref()
    const setOption = (_option: RootTableOption) => {
      const { isScanHeight, inheritHeight, isFixedHeight, isContainer, ...attrs } = mergeProps(
        globalProps.Table,
        { ..._option.attrs },
        { ...option.attrs }
      )
      Object.assign(option, { isScanHeight, inheritHeight, isFixedHeight, isContainer }, _option, { attrs })
    }

    watchEffect(() => props.schema && setOption(props.schema))

    const { loading, pagination, setPageData, onLoaded, apis, goPage, reload, query, setQueryParams, getQueryParams } =
      useQuery(option, updateSource)
    const { getScrollRef, redoHeight, listenResize } = useTableScroll(option, dataRef, wrapRef)

    // editable模式下，表格表单校验
    const tableFormRef = shallowRef()
    const exposed = {
      setOption,
      setData: (data) => {
        data && updateSource(data)
      },
      redoHeight,
      goPage,
      reload,
      query,
      onLoaded,
      resetSearchForm(data) {
        try {
          return searchForm.value.formRef.resetFields(data)
        } catch (e) {
          console.warn(e)
        }
      },
      setPageData,
      getQueryParams,
      getData: () => dataRef.value,
      dataRef,
      searchForm: computed(() => searchForm.value?.formRef),
      validate: async () => tableFormRef.value?.validate(),
      setColumns: (cols) => {
        if (!initQuery && !option.columns?.length) {
          Object.assign(option, { columns: cols })
        } else {
          Object.assign(option, { columns: cols })
          updateColumns(cols)
        }
      },
    }

    const tableRef = ref({ ...exposed })
    const register = (comp) => {
      Object.assign(tableRef.value, toRefs(comp), exposed)
      ctx.emit('register', tableRef.value)
    }

    ctx.emit('register', tableRef.value)
    ctx.expose(tableRef.value)

    const tableAttrs: Obj = reactive({
      apis,
      onRegister: register,
      loading,
    })

    // const windowResize = new AbortController()
    onUnmounted(() => {
      // 异步更新option,添加resize事件，需提前配置销毁
      // windowResize.abort()
      ctx.emit('register', null)
    })
    provide('rootSlots', ctx.slots)

    const slots = ref({})
    const tableSlot = ref()
    const effectData = reactive({ formData: dataRef, current: dataRef, queryParams: computed(getQueryParams) })

    let initQuery = false
    const unWatch = watch(
      option,
      (opt) => {
        if (!opt?.columns?.length) return
        if (tableSlot.value) {
          unWatch() // 由于立即监听，第一次执行后方法还没初始化，需下次执行解除监听
          return
        }
        const { columns, maxHeight, isScanHeight = true, inheritHeight } = opt
        // 列表控件子表单模型
        const model = reactive({
          refData: dataRef,
          listData: buildModelsMap(columns),
        })

        slots.value = useInnerSlots(option.slots, effectData, ctx.slots)

        const searchSchema = opt.searchForm || opt.searchSchema

        const {
          attrs: { onLoad, ...attrs },
        } = useControl({ option: opt, effectData })
        Object.assign(tableAttrs, attrs, { pagination })

        onLoaded((data) => {
          ctx.emit('load', data)
          onLoad?.(data)
        })

        if (searchSchema) {
          searchForm.value = useSearchForm(opt, tableRef, (data) => {
            // 初始化时同步表单数据
            setQueryParams(data, 'form')
            initQuery && query()
          })
        }
        const tabsField = opt.tabs && opt.tabs.field
        if (opt.tabs && tabsField) {
          const tabsKey = ref(opt.tabs.activeKey || opt.tabs.defaultActiveKey)
          watch(
            tabsKey,
            (key) => {
              setQueryParams({ [tabsField]: key })
              initQuery && query()
            },
            { immediate: true }
          )
        }
        watch(
          ref(opt.params),
          (p) => {
            setQueryParams(p, 'dynamic')
            initQuery && query()
          },
          { deep: true, immediate: true }
        )
        nextTick(() => {
          initQuery = true
          if (option.immediate !== false) {
            query()
          }
        })
        if (isScanHeight || inheritHeight || maxHeight) {
          listenResize()
          tableAttrs.scroll = getScrollRef
          const { onChange, onExpandedRowsChange } = tableAttrs
          tableAttrs.onChange = (...args) => {
            // !loading.value && redoHeight()
            onChange?.(...args)
          }
          tableAttrs.onExpandedRowsChange = (param) => {
            onExpandedRowsChange?.(param)
            redoHeight()
          }
          watch(dataRef, redoHeight)
        }
        const table = () => h(Controls.Table, { option, effectData, model, ...tableAttrs } as any, slots.value)
        if (option.editable) {
          tableSlot.value = () => h(base.Form, { model: dataRef.value, ref: tableFormRef }, table)
        } else {
          tableSlot.value = table
        }
      },
      {
        immediate: true,
      }
    )

    const updateColumns = (cols) => {
      const model = reactive({
        refData: dataRef,
        listData: buildModelsMap(cols),
      })
      const table = () => h(Controls.Table, { option, effectData, model, key: Symbol(), ...tableAttrs } as any, slots.value)
      if (option.editable) {
        tableSlot.value = () => h(base.Form, { model: dataRef.value, ref: tableFormRef }, table)
      } else {
        tableSlot.value = table
      }
    }

    return () =>
      tableSlot.value &&
      h(DataProvider, { name: 'exaProvider', data: { data: dataRef, apis } }, () =>
        !searchForm.value || option.searchForm?.teleport
          ? h(
              'div',
              mergeProps(
                {
                  ref: wrapRef,
                  class: [option.isContainer && 'sup-container', 'sup-table', 'sup-form-section'],
                },
                {
                  class: ctxClass,
                  style,
                }
              ),
              [
                option.searchForm?.teleport &&
                  h(
                    Teleport,
                    { to: option.searchForm.teleport },
                    h('div', { class: 'sup-form-section sup-table-search' }, h(searchForm.value.formNode))
                  ),
                tableSlot.value(),
              ]
            )
          : h(
              'div',
              mergeProps(
                { ref: wrapRef, class: [option.isContainer && 'sup-container', 'sup-table'] },
                { class: ctxClass, style }
              ),
              [
                h('div', { class: 'sup-form-section sup-table-search' }, h(searchForm.value.formNode)),
                h('div', { class: 'sup-form-section section-last' }, h(tableSlot.value)),
              ]
            )
      )
  },
})
</script>
