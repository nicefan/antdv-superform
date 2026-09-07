import { defineComponent, h, nextTick, toRaw, unref } from 'vue'
import {
  ElButton,
  ElCard,
  ElCheckTag,
  ElCol,
  ElDialog,
  ElForm,
  ElFormItem,
  ElImageViewer,
  ElMessage,
  ElMessageBox,
  ElRow,
  ElSpace,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElTabs,
  ElTag,
  ElTooltip,
  ElUpload,
} from 'element-plus'
import { toNode, type UIAdapter } from 'superform/sdk'

const AddIcon = defineComponent({
  name: 'SuperFormElementPlusAddIcon',
  setup: () => () => h('span', { 'aria-hidden': 'true' }, '+'),
})

const semanticIcon = (name: string, text: string) =>
  defineComponent({
    name,
    setup: () => () => h('span', { 'aria-hidden': 'true' }, text),
  })

function renderButton(button: Obj, effectData: Obj) {
  const attrs = { ...button.attrs, disabled: unref(button.attrs?.disabled) }
  if (button.render) return button.render({ props: attrs, ...effectData })
  return h(
    ElTooltip,
    {
      content: unref(button.tooltipTitle),
      disabled: !unref(button.tooltipTitle),
    },
    {
      default: () =>
        h(
          ElButton,
          { ...attrs, onClick: (event) => button.onClick?.(event) },
          () => toNode(button.label, effectData)
        ),
    }
  )
}

function resolveServiceContent(content: unknown) {
  return typeof content === 'function' ? content() : content
}

export const elementPlusCapabilities: Pick<
  UIAdapter,
  | 'components'
  | 'form'
  | 'layout'
  | 'containers'
  | 'icons'
  | 'actions'
  | 'presentation'
  | 'services'
  | 'modal'
  | 'upload'
  | 'preview'
  | 'table'
> = {
  components: {
    Form: ElForm,
    FormItem: ElFormItem,
    Row: ElRow,
    Col: ElCol,
    Space: ElSpace,
    Card: ElCard,
    Tabs: ElTabs,
    TabPane: ElTabPane,
  },
  form: {
    component: 'Form',
    item: 'FormItem',
    validate: (instance) => instance.validate(),
    clearValidate: (instance) => instance.clearValidate(),
  },
  layout: {
    row: 'Row',
    col: 'Col',
    space: 'Space',
  },
  containers: {
    card: { component: 'Card' },
    tabs: {
      component: 'Tabs',
      model: { prop: 'modelValue', event: 'update:modelValue' },
    },
    tab: {
      component: 'TabPane',
      render(component, props, slots) {
        const { label, ...rest } = props
        return h(component, rest, { ...slots, label })
      },
    },
  },
  icons: {
    semantic: {
      add: AddIcon,
      upload: semanticIcon('SuperFormElementPlusUploadIcon', '↑'),
      attachment: semanticIcon('SuperFormElementPlusAttachmentIcon', '⌕'),
      loading: semanticIcon('SuperFormElementPlusLoadingIcon', '…'),
      sync: semanticIcon('SuperFormElementPlusSyncIcon', '↻'),
      error: semanticIcon('SuperFormElementPlusErrorIcon', '×'),
    },
    render(icon) {
      return typeof icon === 'string'
        ? h('span', icon)
        : icon
        ? h(toRaw(icon) as any)
        : undefined
    },
  },
  actions: {
    render(type, props, slots) {
      if (type === 'tooltip') {
        const { title, ...rest } = props
        return h(ElTooltip, { ...rest, content: title }, slots)
      }
      const { buttons, moreButtons, groupProps, effectData } = props
      return h(ElSpace, groupProps, () =>
        [...buttons, ...moreButtons].map((button) =>
          renderButton(button, effectData)
        )
      )
    },
  },
  presentation: {
    render(type, props, slots) {
      if (type === 'checkableTag') {
        const { selected, onSelectedChange, ...rest } = props
        return h(
          ElCheckTag,
          { ...rest, checked: selected, onChange: onSelectedChange },
          slots
        )
      }
      const { removable, onRemove, ...rest } = props
      return h(
        ElTag,
        { ...rest, closable: removable, onClose: onRemove },
        slots
      )
    },
  },
  services: {
    message(type, content) {
      ElMessage({ type, message: resolveServiceContent(content) as any })
    },
    confirm(props) {
      ElMessageBox.confirm(
        resolveServiceContent(props.content) ?? '',
        resolveServiceContent(props.title) as any,
        {
          ...props,
          confirmButtonText: props.okText,
          cancelButtonText: props.cancelText,
        }
      )
        .then(props.onOk)
        .catch(props.onCancel)
      return { update: () => undefined, destroy: () => ElMessageBox.close() }
    },
    info(props) {
      let current = { ...props }
      const open = () => {
        ElMessageBox.alert(
          resolveServiceContent(current.content) ?? '',
          resolveServiceContent(current.title) as any,
          {
            ...current,
            confirmButtonText: current.okText,
          }
        )
          .then(current.onOk)
          .catch(() => undefined)
      }
      open()
      return {
        update(next) {
          current = { ...current, ...next }
          ElMessageBox.close()
          open()
        },
        destroy: () => ElMessageBox.close(),
      }
    },
  },
  modal: {
    render(props, slots) {
      const {
        visible,
        'onUpdate:visible': onVisibleChange,
        afterClose,
        ...rest
      } = props
      const { title, ...restSlots } = slots
      return h(
        ElDialog,
        {
          ...rest,
          modelValue: visible,
          'onUpdate:modelValue': onVisibleChange,
          onClosed: afterClose,
        },
        title ? { ...restSlots, header: title } : restSlots
      )
    },
  },
  upload: {
    listIgnore: false,
    renderTrigger: (props, slots) => h(ElButton, props, slots),
    render(props, slots) {
      const {
        maxCount,
        showUploadList,
        beforeUpload,
        customRequest,
        onChange,
        iconRender: _iconRender,
        isImageUrl: _isImageUrl,
        ...rest
      } = props
      const fromElementFile = (file: Obj) => ({
        ...file,
        status:
          file.status === 'ready'
            ? 'uploading'
            : file.status === 'success'
            ? 'done'
            : file.status === 'fail'
            ? 'error'
            : file.status,
      })
      const toElementFile = (file: Obj) => ({
        ...file,
        status:
          file.status === 'waiting'
            ? 'ready'
            : file.status === 'done'
            ? 'success'
            : file.status,
      })
      return h(
        ElUpload,
        {
          ...rest,
          limit: maxCount,
          fileList: (props.fileList || []).map(toElementFile),
          showFileList: showUploadList !== false,
          beforeUpload: (file) => beforeUpload?.(file, [file]),
          httpRequest: customRequest,
          onChange: (file, fileList) =>
            onChange?.({
              file: fromElementFile(file),
              fileList: fileList.map(fromElementFile),
            }),
        },
        slots
      )
    },
  },
  preview: {
    render(props) {
      if (!props.visible) return null
      return h(ElImageViewer, {
        urlList: props.images ?? [],
        initialIndex: props.current ?? 0,
        onClose: () => props['onUpdate:visible']?.(false),
      })
    },
  },
  table: {
    render(props, slots) {
      const {
        data,
        columns = [],
        selection,
        expandedKeys,
        onExpandedChange,
        pagination,
        rowKey,
        scroll,
        ...rest
      } = props
      const getRowKey = (row: Obj) =>
        typeof rowKey === 'function' ? rowKey(row) : row[rowKey]
      const getCellValue = (record: Obj, path: string | string[]) =>
        (Array.isArray(path) ? path : String(path).split('.')).reduce(
          (value, key) => value?.[key],
          record
        )
      const renderColumns = (items: Obj[]) =>
        items.map((column) => {
          const {
            dataIndex,
            title,
            children,
            customRender,
            key,
            ...columnAttrs
          } = column
          return h(
            ElTableColumn,
            {
              ...columnAttrs,
              key:
                key ??
                (Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex),
              prop: Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex,
            },
            children?.length
              ? {
                  header: () => slots.headerCell?.({ ...column, title }),
                  default: () => renderColumns(children),
                }
              : {
                  header: () => slots.headerCell?.({ ...column, title }),
                  default: ({ row, $index }) =>
                    customRender?.({
                      text: getCellValue(row, dataIndex),
                      record: row,
                      index: $index,
                      column,
                    }) ?? getCellValue(row, dataIndex),
                }
          )
        })
      let syncingSelection = false
      const syncSelection = (instance: any) => {
        if (!instance || !selection) return
        nextTick(() => {
          syncingSelection = true
          instance.clearSelection?.()
          const keys = new Set(selection.selectedKeys)
          const visit = (rows: Obj[]) =>
            rows.forEach((row) => {
              if (keys.has(getRowKey(row)))
                instance.toggleRowSelection?.(row, true)
              if (Array.isArray(row.children)) visit(row.children)
            })
          visit(data)
          syncingSelection = false
        })
      }
      const table = h(
        ElTable as any,
        {
          ...rest,
          ref: syncSelection,
          data,
          rowKey: rowKey as any,
          maxHeight: unref(scroll)?.y ?? rest.maxHeight,
          expandRowKeys: expandedKeys as any,
          onExpandChange: (row, rowsOrExpanded) => {
            if (Array.isArray(rowsOrExpanded)) {
              onExpandedChange?.(rowsOrExpanded.map(getRowKey))
              return
            }
            const keys = new Set(expandedKeys || [])
            const key = getRowKey(row)
            rowsOrExpanded ? keys.add(key) : keys.delete(key)
            onExpandedChange?.([...keys])
          },
          onSelectionChange: (rows) =>
            !syncingSelection &&
            selection?.onChange?.(rows.map(getRowKey), rows, {}),
        },
        {
          ...slots,
          default: () => [
            selection &&
              h(ElTableColumn, {
                type: 'selection',
                fixed: selection.attrs?.fixed ?? true,
                selectable: selection.isRowSelectable,
                ...selection.attrs,
              }),
            ...renderColumns(columns),
          ],
        }
      )
      if (!pagination) return table
      return h('div', { class: 'sup-table-adapter' }, [
        table,
        h(ElPagination as any, {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          pageSizes: pagination.pageSizeOptions,
          layout: 'total, sizes, prev, pager, next, jumper',
          'onUpdate:currentPage': (page) =>
            pagination.onChange?.(page, pagination.pageSize),
          'onUpdate:pageSize': (size) =>
            (pagination.onShowSizeChange || pagination.onChange)?.(
              pagination.current ?? 1,
              size
            ),
          ...pagination.attrs,
        }),
      ])
    },
    renderFilter(props, slots) {
      const { bordered, items, value, onValueChange, attrs = {} } = props
      const { tabExtra, cardExtra, ...contentSlots } = slots
      const tabs = h(
        ElTabs as any,
        { ...attrs, modelValue: value, 'onUpdate:modelValue': onValueChange },
        {
          default: () =>
            items.map((item: Obj) =>
              h(ElTabPane, { ...item, label: item.tab, name: item.key })
            ),
        }
      )
      const tabsRow = h('div', { class: 'sup-table-tabs' }, [
        tabs,
        tabExtra?.(),
      ])
      const content = [tabsRow, contentSlots.default?.()]
      return bordered
        ? h(
            ElCard,
            {},
            {
              default: () => content,
              header:
                contentSlots.title || cardExtra
                  ? () => [contentSlots.title?.(), cardExtra?.()]
                  : undefined,
            }
          )
        : content
    },
    selectors: {
      table: '.el-table',
      header: '.el-table__header-wrapper',
      footer: '.el-table__footer-wrapper',
      pagination: '.el-pagination',
      empty: '.el-table__empty-block',
      emptyCell: '.el-table__empty-block',
      body: '.el-table__body-wrapper .el-scrollbar__wrap',
    },
  },
}
