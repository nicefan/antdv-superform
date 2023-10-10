<script lang="ts">
import { defineComponent, PropType, ref, reactive, mergeProps, watch, h, provide, nextTick, onUnmounted } from 'vue'
import { merge } from 'lodash-es'
import { useControl } from '../utils'
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
  emits: ['register', 'change'],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || [])

    const option: Obj = reactive(props.option || {})
    const { class: _class, ...attrs } = ctx.attrs
    merge(option, { attrs: mergeProps(option.attrs, attrs) })
    const searchForm = ref()

    const { dataSource, pagination, onLoaded, apis, goPage, reload, query } = useQuery(option)
    onLoaded((data) => {
      ctx.emit('change', data)
    })
    const exposed = {
      setOption: (_option: RootTableOption) => {
        const attrs = mergeProps(globalProps.Table, { ..._option.attrs }, option.attrs)
        merge(option, _option, { attrs })
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
      Object.assign(tableRef.value, comp, exposed)
      ctx.emit('register', tableRef.value)
    }
    ctx.emit('register', tableRef.value)
    onUnmounted(() => ctx.emit('register', null))
    ctx.expose(tableRef.value)
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

    const unWatch = watch(
      () => option as any,
      (opt) => {
        if (!opt?.columns) return
        const { columns, searchSechma, beforeSearch } = opt
        // 列表控件子表单模型
        const listData = buildModelsMap(columns)
        const effectData = reactive({ current: dataRef, table: tableRef })

        const { attrs } = useControl({ option: opt, effectData })

        searchForm.value =
          searchSechma &&
          useSearchForm(columns, searchSechma, effectData, (data) => {
            const _data = beforeSearch?.({ ...effectData, param: data }) || data
            query(_data)
          })
        Object.assign(tableAttrs, attrs, {
          model: {
            refData: dataRef,
            listData,
          },
          effectData,
        })
        nextTick(() => unWatch())
      },
      {
        immediate: true,
      }
    )

    provide('rootSlots', ctx.slots)

    return () =>
      option.columns &&
      h(DataProvider, { name: 'exaProvider', data: { data: dataRef, apis } }, () =>
        h('div', mergeProps({ class: option.isContainer && 'exa-container' }, { class: _class }), [
          searchForm.value && h('div', { class: 'exa-form-section exa-table-search' }, searchForm.value.formNode()),
          option.columns &&
            h('div', { class: 'exa-form-section section-last' }, h(Controls.Table, tableAttrs as any, ctx.slots)),
        ])
      )
  },
})
</script>
