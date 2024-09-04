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
  nextTick,
  onUnmounted,
  toRefs,
  shallowReactive,
} from 'vue'
import { merge } from 'lodash-es'
import { useControl, useInnerSlots } from '../utils'
import { buildModelsMap } from '../utils/buildModel'
import { useQuery } from './useQuery'
import { useSearchForm } from './useSearchForm'
import { DataProvider } from '../dataProvider'
import Controls from '../components'
import { globalProps } from '../plugin'
import { useTableScroll } from './useTableScroll'

export default defineComponent({
  name: 'SuperTable',
  inheritAttrs: false,
  props: {
    dataSource: Array as PropType<Obj[]>,
    option: Object as PropType<RootTableOption>,
  },
  emits: ['register', 'load'],
  setup(props, ctx) {
    const dataRef = ref((props.dataSource || []) as Obj[])
    const wrapRef = ref()

    const option: Obj = shallowReactive(props.option || {})
    const { style, class: ctxClass, ...ctxAttrs } = ctx.attrs
    merge(option, { attrs: mergeProps(option.attrs, ctxAttrs) })
    const searchForm = ref()

    const { loading, pagination, setPageData, onLoaded, apis, goPage, reload, query, setSearchParam } = useQuery(
      option,
      dataRef
    )

    const exposed = {
      setOption: (_option: RootTableOption) => {
        const { isScanHeight, inheritHeight, isFixedHeight, isContainer, ...attrs } = mergeProps(
          globalProps.Table,
          { ..._option.attrs },
          option.attrs
        )
        Object.assign(option, { isScanHeight, inheritHeight, isFixedHeight, isContainer }, _option, { attrs })
      },
      setData: (data) => {
        data && (dataRef.value = data)
      },
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
      getData: () => dataRef.value,
      dataRef,
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
      pagination,
      onRegister: register,
      loading,
    })

    const tableSlot = ref()
    const windowResize = new AbortController()
    onUnmounted(() => {
      // 异步更新option,添加resize事件，需提前配置销毁
      windowResize.abort()
      ctx.emit('register', null)
    })
    provide('rootSlots', ctx.slots)
    const slots = ref({})
    const unWatch = watch(
      option,
      (opt) => {
        if (!opt?.columns) return
        if (tableSlot.value) {
          unWatch()
          return
        }
        slots.value = useInnerSlots(option.slots, ctx.slots)
        const { columns, searchSchema, beforeSearch, maxHeight, isScanHeight = true, inheritHeight } = opt

        // 列表控件子表单模型
        const listData = buildModelsMap(columns)
        const effectData = reactive({ formData: dataRef, current: dataRef })
        const model = reactive({
          refData: dataRef,
          listData,
        })

        const {
          attrs: { onLoad, ...attrs },
        } = useControl({ option: opt, effectData })
        Object.assign(tableAttrs, attrs)

        onLoaded((data) => {
          ctx.emit('load', data)
          onLoad?.(data)
        })

        if (searchSchema) {
          searchForm.value = useSearchForm(opt, tableRef, (data, isSearch) => {
            const _data = beforeSearch?.({ ...effectData, table: tableRef, param: data }) || data
            setSearchParam(_data)
            isSearch && query()
          })
        } else if (opt.params) {
          watch(
            () => opt.params,
            () => query(),
            { deep: true }
          )
        }

        if (option.immediate !== false) {
          nextTick(() => {
            query()
          })
        }

        if (isScanHeight || inheritHeight || maxHeight) {
          const { getScrollRef, redoHeight } = useTableScroll(option, dataRef, wrapRef, windowResize)
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
        tableSlot.value = () => h(Controls.Table, { option, effectData, model, ...tableAttrs } as any, slots.value)
      },
      {
        immediate: true,
      }
    )

    return () =>
      tableSlot.value &&
      h(DataProvider, { name: 'exaProvider', data: { data: dataRef, apis } }, () =>
        searchForm.value
          ? h(
              'div',
              mergeProps(
                { ref: wrapRef, class: [option.isContainer && 'sup-container', 'sup-table'] },
                { class: ctxClass, style }
              ),
              [
                h('div', { class: 'sup-form-section sup-table-search' }, searchForm.value.formNode()),
                h('div', { class: 'sup-form-section section-last' }, tableSlot.value()),
              ]
            )
          : h(
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
              tableSlot.value()
            )
      )
  },
})
</script>
