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
} from 'vue'
import { merge } from 'lodash-es'
import { useControl } from '../utils'
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
    dataSource: Array,
    option: Object as PropType<RootTableOption>,
  },
  emits: ['register', 'change'],
  setup(props, ctx) {
    const dataRef = ref((props.dataSource || []) as Obj[])
    const wrapRef = ref()

    const option: Obj = reactive(props.option || {})
    const { style, class: ctxClass, ...ctxAttrs } = ctx.attrs
    merge(option, { attrs: mergeProps(option.attrs, ctxAttrs) })
    const searchForm = ref()

    const { dataSource, loading, pagination, onLoaded, apis, goPage, reload, query } = useQuery(option)
    onLoaded((data) => {
      ctx.emit('change', data)
    })
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
      getData: () => dataRef.value,
      dataRef,
    }
    watch(() => dataSource.value || props.dataSource, exposed.setData)

    const tableRef = ref({ ...exposed })
    const register = (comp) => {
      Object.assign(tableRef.value, toRefs(comp), exposed)
      ctx.emit('register', tableRef.value)
    }
    ctx.emit('register', tableRef.value)
    onUnmounted(() => ctx.emit('register', null))
    ctx.expose(tableRef.value)

    const tableAttrs: Obj = reactive({
      option,
      apis,
      pagination,
      onRegister: register,
      loading,
    })

    const windowResize = new AbortController()
    // 异步更新option,添加resize事件，需提前配置销毁
    onUnmounted(() => {
      windowResize.abort()
    })
    provide('rootSlots', ctx.slots)

    const unWatch = watch(
      option,
      (opt) => {
        if (!opt?.columns) return
        if (tableAttrs.model) {
          unWatch()
          return
        }
        const { columns, searchSechma, beforeSearch, maxHeight, isScanHeight = true, inheritHeight } = opt

        // 列表控件子表单模型
        const listData = buildModelsMap(columns)
        const effectData = reactive({ formData: dataRef, current: dataRef })
        const model = reactive({
          refData: dataRef,
          listData,
        })

        const { attrs } = useControl({ option: opt, effectData })

        if (searchSechma) {
          searchForm.value = useSearchForm(opt, tableRef, (data) => {
            const _data = beforeSearch?.({ ...effectData, table: tableRef, param: data }) || data
            query(_data)
          })
        }

        Object.assign(tableAttrs, attrs, {
          effectData,
          model,
        })

        if (isScanHeight || inheritHeight || maxHeight) {
          const { getScrollRef, redoHeight } = useTableScroll(option, dataRef, wrapRef, windowResize)
          tableAttrs.scroll = getScrollRef
          const handleTableChange = tableAttrs.onChange
          tableAttrs.onChange = (param) => {
            !loading.value && redoHeight()
            handleTableChange?.(param)
          }
        }
      },
      {
        immediate: true,
      }
    )

    return () =>
      option.columns &&
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
                h('div', { class: 'sup-form-section section-last' }, h(Controls.Table, tableAttrs as any, ctx.slots)),
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
              h(Controls.Table, tableAttrs as any, ctx.slots)
            )
      )
  },
})
</script>
