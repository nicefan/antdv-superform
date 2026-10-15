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
  onBeforeUnmount,
  toRefs,
  shallowReactive,
  computed,
  watchEffect,
  isRef,
  unref,
  Teleport,
  nextTick,
  shallowRef,
  toRaw,
} from 'vue'
import { useControl, useInnerSlots } from '../utils'
import { reportSchemaDiagnostics } from '../utils/diagnoseSchema'
import { buildModelsMap } from '../utils/buildModel'
import { useQuery } from './useQuery'
import { useSearchForm } from './useSearchForm'
import { DataProvider } from '../dataProvider'
import Controls from '../components'
import { globalConfig, globalProps } from '../plugin'
import { useTableScroll } from './useTableScroll'
import { getUIRender, getUIService } from '../adapter'
import { set as setObject } from 'lodash-es'
import { merge } from '../utils/merge'

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
    // 注册 schema 前只保留根节点透传属性，完整配置会在 setOption 时合入。
    const option = shallowReactive({ attrs: ctxAttrs }) as unknown as RootTableOption & { attrs: Obj }
    const dataRef = ref([])
    const wrapRef = ref()
    // 列模型重建不改变表格身份；UI 根据此标识管理自己的实例状态。
    const tableInstance = {}
    const tableState = shallowRef<{ model: Obj; key: symbol; editable: boolean }>()
    const updateColumns = (columns) => {
      // 只重建列模型与共享 Table，查询仍属于外层实例。
      tableState.value = {
        model: reactive({ refData: dataRef, listData: buildModelsMap(columns) }),
        key: Symbol(),
        editable: !!option.editable,
      }
    }

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
      if (globalConfig.schemaDiagnostics) reportSchemaDiagnostics(_option, 'table', 'SuperTable')
      const { attrs: _attrs, ...superTableAttrs } = globalProps.SuperTable || {}
      // 高度策略由 SuperTable 消费，表格增强属性交给共享 Table。
      const { maxHeight, fixedHeight, heightOffset, useSectionStyle, ...attrs } = mergeProps(
        superTableAttrs,
        { ..._option.attrs },
        ctxAttrs
      )
      // 分页按来源逐层合并；高优先级的 false 关闭分页，后续显式对象可重新开启。
      let pagination = superTableAttrs.pagination
      for (const value of [_option.attrs?.pagination, ctxAttrs.pagination]) {
        if (value !== undefined) pagination = value === false ? false : merge({}, pagination || {}, value)
      }
      Object.assign(option, { maxHeight, fixedHeight, heightOffset, useSectionStyle }, _option, {
        attrs: {
          ...attrs,
          pagination,
          filterSortTransform: ctxAttrs.filterSortTransform ?? _option.attrs?.filterSortTransform ?? superTableAttrs.filterSortTransform,
        },
      })
    }

    watchEffect(() => props.schema && setOption(toRaw(props.schema)))

    const {
      loading,
      pagination,
      dataPagination,
      setPageData,
      onLoaded,
      goPage,
      reload,
      resetRefresh,
      query,
      throttleRequest,
      cancelQuery,
      setQueryParams,
      getQueryParams,
      handleTableChange,
    } = useQuery(option, updateSource, dataRef)
    const { getScrollRef, debounceRedoHeight, listenResize, stopResize } = useTableScroll(option, dataRef, wrapRef)

    // editable模式下，表格表单校验
    const tableFormRef = shallowRef()
    const exposed = {
      setOption,
      setData: (data) => {
        data && updateSource(data)
      },
      redoHeight: debounceRedoHeight,
      goPage,
      reload,
      query,
      onLoaded,
      resetSearchForm(data) {
        return searchForm.value?.formRef?.resetFields(data)
      },
      setPageData,
      getQueryParams,
      getData: () => dataRef.value,
      dataRef,
      searchForm: computed(() => searchForm.value?.formRef),
      validate: async () => {
        if (tableFormRef.value) await getUIService('form').validate(tableFormRef.value)
      },
      setColumns: (cols) => {
        option.columns = cols
        if (tableState.value) updateColumns(cols)
      },
    }

    const tableRef = ref({ ...exposed })
    const register = (comp) => {
      // 组件公开实例不是 reactive 对象，先包装后再保留其属性响应性。
      Object.assign(tableRef.value, toRefs(reactive(comp)), exposed)
      ctx.emit('register', tableRef.value)
    }

    ctx.emit('register', tableRef.value)
    ctx.expose(tableRef.value)

    // useControl 合并一次静态 attrs，保留 dynamicAttrs 的 Ref；这里只叠加运行状态。
    const tableAttrs: Obj = reactive({
      reload,
      refresh: resetRefresh,
      onRegister: register,
      loading,
    })

    // key 切换时先释放旧实例，避免旧 onUnmounted 在新 register 之后把引用清空。
    onBeforeUnmount(() => {
      cancelQuery()
      ctx.emit('register', null)
    })
    provide('rootSlots', ctx.slots)

    const slots = ref({})
    const effectData = reactive({
      formData: dataRef,
      current: dataRef,
      queryParams: computed(getQueryParams),
    })
    const renderTable = () => {
      const { model, key } = tableState.value!
      return h(Controls.Table, { option, effectData, model, key, ...tableAttrs, tableInstance } as any, slots.value)
    }
    const renderTableContent = () => tableState.value!.editable
      ? getUIRender('form')({ model: dataRef.value, ref: tableFormRef }, { default: renderTable })
      : renderTable()

    let initQuery = false
    watch(
      () => option.columns,
      (columns) => {
        if (tableState.value || !columns?.length) return
        const opt = option

        slots.value = useInnerSlots(option.slots, effectData, ctx.slots)

        const {
          // 查询转换器由 Core 消费，不传给原生 Table。
          attrs: {
            onLoad,
            onTableChange,
            filterSortTransform: _filterSortTransform,
            pageTransform: _pageTransform,
            resultTransform: _resultTransform,
            ...attrs
          },
        } = useControl({ option: opt, effectData })
        Object.assign(tableAttrs, attrs, {
          pagination,
          onTableChange: (change) => {
            handleTableChange(change)
            // attrs 与 Schema 同名事件可能被 mergeProps 合为数组，状态先同步再通知业务。
            const handlers = Array.isArray(onTableChange) ? onTableChange : [onTableChange]
            const tableChange = {
              ...change,
              pagination: pagination.value ? {
                current: pagination.value.current,
                pageSize: pagination.value.pageSize,
                total: pagination.value.total,
              } : undefined,
            }
            handlers.forEach((handler) => handler?.(tableChange))
          },
        })

        onLoaded((data) => {
          ctx.emit('load', data)
          onLoad?.(data)
        })

        if (opt.searchForm) {
          searchForm.value = useSearchForm(opt, tableRef, (data) => {
            // 初始化时同步表单数据
            setQueryParams(data, 'form')
            initQuery && throttleRequest()
          })
        }
        const tabsField = opt.tabs && opt.tabs.field
        if (opt.tabs && tabsField) {
          const tabsKey = (opt.tabs.activeKey ??= ref(opt.tabs.defaultActiveKey))
          const tabParam = {}
          watch(
            tabsKey,
            (key) => {
              if (key === undefined) {
                setQueryParams(undefined, 'tabs')
              } else {
                setObject(tabParam, tabsField, key)
                setQueryParams(tabParam, 'tabs')
              }
              initQuery && throttleRequest()
            },
            { immediate: true }
          )
        }
        watch(
          () => opt.params && reactive(opt.params),
          (p) => {
            setQueryParams(p, 'dynamic')
            initQuery && throttleRequest()
          },
          { deep: true, immediate: true }
        )
        nextTick(() => {
          initQuery = true
          if (option.immediate !== false) {
            throttleRequest()
          }
        })
        // 未配置高度时保留原生 scroll；允许运行时启用或清除高度约束。
        watch(
          () => [option.maxHeight, option.attrs?.scroll],
          () => {
            if (option.maxHeight == null) {
              stopResize()
              // 没有局部 scroll 时交给 Table 默认属性，避免 undefined 覆盖下层默认值。
              if (attrs.scroll === undefined) delete tableAttrs.scroll
              else tableAttrs.scroll = attrs.scroll
            } else {
              tableAttrs.scroll = getScrollRef
              listenResize()
            }
          },
          { immediate: true }
        )
        const { onExpandedRowsChange } = tableAttrs
        tableAttrs.onExpandedRowsChange = (param) => {
          onExpandedRowsChange?.(param)
          debounceRedoHeight()
        }
        updateColumns(columns)
      },
      {
        immediate: true,
      }
    )

    return () =>
      tableState.value &&
      h(DataProvider, { name: 'exaProvider', data: { data: dataRef, dataPagination, onLoaded } }, () =>
        !searchForm.value || option.searchForm?.teleport
          ? h(
              'div',
              mergeProps(
                {
                  ref: wrapRef,
                  class: [option.useSectionStyle && 'sup-container', 'sup-table', 'sup-form-section'],
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
                renderTableContent(),
              ]
            )
          : h(
              'div',
              mergeProps(
                { ref: wrapRef, class: [option.useSectionStyle && 'sup-container', 'sup-table'] },
                { class: ctxClass, style }
              ),
              [
                h('div', { class: 'sup-form-section sup-table-search' }, h(searchForm.value.formNode)),
                h('div', { class: 'sup-form-section section-last' }, [renderTableContent()]),
              ]
            )
      )
  },
})
</script>
