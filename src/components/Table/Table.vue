<script lang="ts">
import { ref, reactive, type PropType, defineComponent, toRef, unref, watch } from 'vue'
import { createButtons } from '../buttons'
import { buildData } from './buildData'
import { getUIRender } from '../../adapter'
import type { RootTableOption } from '../../exaTypes'
import { toNode, createLabelNode } from '../../utils'
import { globalProps } from '../../plugin'
import { useTableTabs } from './useTableTabs'
import { buildColumns } from './buildColumns'
import { useTableRows } from './useTableRows'

export default defineComponent({
  name: 'SuperTable',
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Table'> & Pick<RootTableOption, 'apis'>>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelDataGroup>,
    },
    effectData: {
      required: true,
      type: Object as PropType<Obj>,
    },
    tableInstance: {
      type: Object,
      default: () => ({}),
    },
    isView: Boolean,
    reload: Function as PropType<(param?: Obj) => Promise<any>>,
    refresh: Function as PropType<() => Promise<any>>,
    expandedRowKeys: Array,
    defaultExpandLevel: null as unknown as PropType<number | 'all'>,
  },
  emits: ['register', 'expandedRowsChange'],
  setup(componentProps, ctx) {
    const { option, model, reload, effectData, isView } = componentProps
    const attrs: Obj = ctx.attrs
    const tableDefaults = globalProps.Table || {}
    const orgList = toRef(model, 'refData')
    // 静态配置在初始化时合并；动态属性仍由 useControl 处理，不监听 option.attrs。
    const rows = useTableRows(
      orgList,
      {
        ...tableDefaults,
        ...attrs,
        // 保留静态配置中已有的 Ref，避免上层属性解包后丢失展开键的回写绑定。
        expandedRowKeys:
          option.attrs?.expandedRowKeys ?? componentProps.expandedRowKeys ?? tableDefaults.expandedRowKeys,
        defaultExpandLevel: componentProps.defaultExpandLevel,
      },
      option.rowEditor?.editMode === 'inline',
      (keys) => ctx.emit('expandedRowsChange', keys)
    )
    const { rowKey, rowSelection, selectedRowKeys, selectedRows, expandedRowKeys, setExpandedRowKeys } = rows
    const context = buildData({
      option: option as RootTableOption,
      model,
      orgList,
      rows,
      reload,
      isView,
      effectData,
    })
    const columns = reactive(
      buildColumns({
        childrenMap: model.listData.modelsMap,
        context,
        option,
        attrs,
        isView,
        effectData,
      })
    )
    const { list, methods, buttonMethods = methods, modalSlot } = context
    const actions = {
      selectedRowKeys,
      selectedRows,
      setSelectedRows: rows.setSelectedRows,
      expandedRowKeys,
      setExpandedRowKeys,
      expandAll: rows.expandAll,
      add: (param?: { resetData?: Obj } & ActionOuter) => methods.add?.(param),
      edit: (param?: ActionOuter) => methods.edit?.({ ...editParam, ...param }),
      delete: () => methods.delete?.(editParam),
      detail: (param?: ActionOuter) => methods.detail?.({ ...editParam, ...param }),
    }
    const exposed = reactive({ ...actions })

    const tableRef = ref()
    watch(
      tableRef,
      (table) => {
        Object.assign(exposed, table, actions)
        ctx.emit('register', exposed)
      },
      { flush: 'sync' }
    )

    const editParam = reactive({
      ...effectData,
      selectedRows,
      selectedRowKeys,
      tableRef: exposed,
    })

    const slots: Obj = { ...ctx.slots }

    const buttonsConfig = option.buttons as any
    const slotName = buttonsConfig?.targetSlot ?? 'extra'
    if (buttonsConfig) {
      const orgSlot = slots[slotName]
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        effectData: editParam,
        methods: buttonMethods,
        isView,
      })
      if (orgSlot || buttonsSlot) {
        slots[slotName] = () => [orgSlot?.(), buttonsSlot?.()]
      }
    }

    const { title: titleSlot = option.title || option.label, ...contentSlots } = slots
    const tabs = useTableTabs(option.tabs, effectData)
    const uiSlots = {
      ...contentSlots,
      ...(titleSlot && { title: createLabelNode({ labelSlot: titleSlot, tooltip: option.tooltip }, effectData) }),
      ...tabs.slots,
      headerCell: (column) => slots.headerCell?.(column) || toNode(column.title, effectData),
      // 行编辑校验宿主只包裹原生表格，UI 自行安排标题、Tabs 和工具栏。
      tableBody: ({ render }) => context.wrapTable ? context.wrapTable(render) : render(),
    }
    return () => {
      const { rowSelection: _rowSelection, expandedRowKeys: _expandedRowKeys, ...tableAttrs } = attrs
      return [
        ...modalSlot.map((slot) => slot()),
        getUIRender('table')({
          tableLayout: 'fixed',
          pagination: false,
          ...tableDefaults,
          ...tableAttrs,
          ref: tableRef,
          tableInstance: componentProps.tableInstance,
          data: list.value,
          columns,
          tabs: unref(tabs.state),
          extraAlign: buttonsConfig?.align || 'right',
          onRefresh: componentProps.refresh,
          selection: rowSelection && { ...rowSelection, selectedKeys: selectedRowKeys.value },
          rowKey,
          expandedKeys: expandedRowKeys.value,
          onExpandedChange: setExpandedRowKeys,
          class: ['sup-table-wrapper', option.editable && 'sup-table-editable'],
        }, uiSlots),
      ]
    }
    /** 内置操作附加参数 */
    interface ActionOuter {
      meta: {
        /** 弹窗标题 */
        title?: string
      }
    }
  },
})
</script>
