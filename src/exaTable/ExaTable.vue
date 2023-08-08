<script lang="ts">
import { defineComponent, PropType, ref, reactive, mergeProps, watch, toRefs, h, provide } from 'vue'
import { merge } from 'lodash-es'
import { useControl } from '../controls'
import { buildModelMaps } from '../utils/util'
import { useQuery } from './useQuery'
import { useSearchForm } from './useSearchForm'
import { DataProvider } from '../dataProvider'
import Controls from '../controls/components'

export default defineComponent({
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
          searchForm.value = useSearchForm(columns, searchSechma, (data) => {
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
    provide('rootSlots', ctx.slots)

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
</script>
