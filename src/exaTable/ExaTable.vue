<script lang="ts">
import { defineComponent, PropType, ref, reactive, mergeProps, watch, h, provide, nextTick } from 'vue';
import { merge } from 'lodash-es'
import { useControl, getEffectData } from '../utils'
import { buildModelsMap } from '../utils/buildModel'
import { useQuery } from './useQuery'
import { useSearchForm } from './useSearchForm'
import { DataProvider } from '../dataProvider'
import Controls from '../components'
import { globalProps } from '../plugin'

export default defineComponent({
  name: 'ExaTable',
  inheritAttrs: false,
  props: {
    dataSource: Object,
    option: Object as PropType<RootTableOption>,
  },
  emits: ['register'],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || [])

    const option: Obj = reactive(props.option || {})
    merge(option, { attrs: mergeProps(option.attrs, ctx.attrs) })

    const { dataSource, pagination, onLoaded, apis, goPage, request, onSearch } = useQuery(option)

    const exposed = {
      setOption: (_option: RootTableOption) => {
        const attrs = mergeProps(globalProps.Table, { ..._option.attrs }, option.attrs)
        merge(option, _option, { attrs })
      },
      setData: (data) => {
        dataRef.value = data
      },
      goPage,
      request,
      onSearch,
      onLoaded,
      dataRef,
    }
    watch(() => dataSource.value || props.dataSource, exposed.setData)

    ctx.expose(exposed)

    const table = {}
    const register = (comp) => {
      Object.assign(table, comp, exposed)
      ctx.emit('register', exposed, reactive(table))
    }
    ctx.emit('register', exposed)

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
      (opt) => {
        if (!opt?.columns) return
        const { columns, searchSechma } = opt
        // 列表控件子表单模型
        const listData = buildModelsMap(columns)
        const effectData = getEffectData({ current: dataRef })

        const { attrs } = useControl({ option: opt, effectData })

        searchForm.value = useSearchForm(columns, searchSechma, { ...effectData, table }, (data) => {
          onSearch(data)
        })
        Object.assign(tableAttrs, {
          model: {
            refData: dataRef,
            listData,
          },
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
      h(DataProvider, { name: 'exaProvider', data: { data: dataRef, apis } }, () =>
        h('div', { class: option.isContainer && 'exa-container' }, [
          searchForm.value && h('div', { class: 'exa-form-section exa-table-search' }, searchForm.value()),
          option.columns && h('div', { class: 'exa-form-section section-last' }, h(Controls.Table, tableAttrs as any, ctx.slots)),
        ])
      )
  },
})
</script>
