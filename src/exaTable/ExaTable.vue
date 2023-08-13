<script lang="ts">
import { defineComponent, PropType, ref, reactive, mergeProps, watch, toRefs, h, provide, nextTick } from 'vue';
import { merge } from 'lodash-es'
import { useControl } from '../controls'
import { buildModelsMap } from '../utils/buildModel'
import { useQuery } from './useQuery'
import { useSearchForm } from './useSearchForm'
import { DataProvider } from '../dataProvider'
import Controls from '../controls/components'

export default defineComponent({
  name: 'ExaTable',
  inheritAttrs: false,
  props: {
    dataSource: Object,
    option: Object as PropType<RootTableOption>,
  },
  emits: ['register'],
  setup(props, ctx) {
    const tableRef = ref()
    const refData = ref(props.dataSource || [])

    const option: Obj = reactive(props.option || {})
    merge(option, { attrs: mergeProps(option.attrs, ctx.attrs) })

    const { dataSource, pagination, onLoaded, apis, goPage, request, onSearch } = useQuery(option)

    const actions = {
      setOption: (_option: RootTableOption) => {
        const attrs = mergeProps({ ..._option.attrs }, option.attrs)
        merge(option, _option, { attrs })
      },
      setData: (data) => {
        refData.value = data
      },
      goPage,
      request,
      onSearch,
      onLoaded,
      refData,
    }
    watch(() => dataSource || props.dataSource, actions.setData)

    ctx.expose(actions)

    const register = (compRef) => {
      tableRef.value = compRef
      ctx.emit('register', actions, reactive({ ...compRef, ...actions }))
    }
    ctx.emit('register', actions)

    // const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    //   console.log(pag)
    // }

    const tableAttrs: Obj = reactive({
      option,
      apis,
      pagination,
      onRegister: register,
      // onChange: handleTableChange,
    })

    const searchForm = ref()
    const unWatch = watch(
      () => option as any,
      (data) => {
        if (!data?.columns) return
        const { columns, searchSechma } = data
        // 列表控件子表单模型
        const listData = buildModelsMap(columns)

        const { effectData, attrs } = useControl({ option: data, model: { parent: refData } })

        searchForm.value = useSearchForm(columns, searchSechma, (data) => {
          onSearch(data)
        })
        Object.assign(tableAttrs, {
          model: {
            refData,
            listData,
          },
          searchForm,
          effectData,
          ...attrs,
        })
        nextTick(() => {
          unWatch()
        })
      },
      {
        immediate: true,
      }
    )

    provide('rootSlots', ctx.slots)

    return () =>
      option.columns &&
      h(DataProvider, { data: refData, apis }, () =>
        h('div', { class: option.isContainer && 'exa-container' }, [
          searchForm.value && h('div', { class: 'exa-form-section exa-table-search' }, searchForm.value()),
          option.columns && h('div', { class: 'exa-form-section section-last' }, h(Controls.Table, tableAttrs as any)),
        ])
      )
  },
})
</script>
