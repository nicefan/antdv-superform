import type { TableToolbarProps } from '../../../shared/tableTools'
import { Button, Checkbox, Dropdown, Space } from 'antdv-next'
import { defineComponent, h, ref } from 'vue'
import { builtInIcons, translate, type UITableToolName } from 'superform/sdk'

const renderTitle = (title: unknown) => (typeof title === 'function' ? title() : title)

const TableToolbar = defineComponent({
  name: 'SuperTableToolbar',
  inheritAttrs: false,
  props: [
    'tools',
    'density',
    'columns',
    'visibleKeys',
    'onReload',
    'onDensityChange',
    'onVisibleKeysChange',
    'onColumnOrderChange',
    'onColumnFixedChange',
    'onResetColumns',
  ],
  setup(props) {
    const dragKey = ref('')
    const settingsOpen = ref(false)
    const enabled = (name: UITableToolName) => (props.tools as UITableToolName[]).includes(name)
    // Dropdown 使用直接按钮触发节点，避免包装组件截获菜单监听器。
    const toolButton = (label: string, icon: () => any, onClick?: () => unknown) =>
      h(Button, { type: 'text', size: 'small', icon, title: label, 'aria-label': label, onClick })

    const densityItems = [
      { label: translate('densityLarge'), key: 'large' },
      { label: translate('densityMiddle'), key: 'middle' },
      { label: translate('densitySmall'), key: 'small' },
    ]

    const renderColumnSettings = () => [
      {
        // 使用原生分组标题，避免头部操作区出现菜单行选中效果。
        type: 'group' as const,
        key: 'settings-header',
        label: h('div', { class: 'sup-column-setting-content' }, [
          h(
            Button,
            {
              type: 'link',
              onClick: () => props.onVisibleKeysChange((props.columns as Obj[]).map(({ key }) => key)),
            },
            () => translate('checkAll')
          ),
          h(
            Button,
            {
              type: 'link',
              autoInsertSpace: false,
              onClick: () => props.onResetColumns(),
            },
            () => translate('reset')
          ),
        ]),
        children: [
          { type: 'divider' as const },
          ...(props.columns as Obj[]).flatMap((column) => [
            {
              key: column.key,
              class: 'sup-column-setting-row',
              'data-column-key': column.key,
              draggable: column.sortable !== false,
              onDragstart: (event: DragEvent) => {
                if (column.sortable === false) return event.preventDefault()
                dragKey.value = column.key
                event.dataTransfer?.setData('text/plain', column.key)
                if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
              },
              onDragend: () => {
                dragKey.value = ''
              },
              onDragover: (event: DragEvent) => {
                if (column.sortable !== false && dragKey.value) event.preventDefault()
              },
              onDrop: (event: DragEvent) => {
                event.preventDefault()
                const source = dragKey.value
                dragKey.value = ''
                if (!source || source === column.key || column.sortable === false) return
                const next = (props.columns as Obj[]).map(({ key }) => key).filter((key) => key !== source)
                const targetIndex = next.indexOf(column.key)
                next.splice(targetIndex < 0 ? next.length : targetIndex, 0, source)
                props.onColumnOrderChange(next)
              },
              label: h('div', { class: 'sup-column-setting-content' }, [
                h('div', { class: 'sup-column-setting-label' }, [
                  h(
                    'span',
                    {
                      class: 'sup-column-drag-handle',
                      title: column.sortable === false ? undefined : translate('dragColumn'),
                    },
                    column.sortable === false ? undefined : [builtInIcons.dragHandle()]
                  ),
                  h(
                    Checkbox,
                    {
                      checked: (props.visibleKeys as string[]).includes(column.key),
                      onChange: () => {
                        const current = props.visibleKeys as string[]
                        props.onVisibleKeysChange(
                          current.includes(column.key)
                            ? current.filter((key) => key !== column.key)
                            : [...current, column.key]
                        )
                      },
                    },
                    { default: () => renderTitle(column.title) }
                  ),
                ]),
                column.sortable !== false &&
                  h(
                    Space,
                    { size: 4 },
                    {
                      default: () =>
                        (['left', 'right'] as const).map((side) =>
                          h(Button, {
                            size: 'small',
                            color: column.fixed === side ? 'primary' : 'default',
                            variant: column.fixed === side ? 'filled' : 'text',
                            icon: side === 'left' ? builtInIcons.fixLeft : builtInIcons.fixRight,
                            title: translate(side === 'left' ? 'fixLeft' : 'fixRight'),
                            'aria-label': translate(side === 'left' ? 'fixLeft' : 'fixRight'),
                            'aria-pressed': column.fixed === side,
                            onClick: () =>
                              props.onColumnFixedChange(column.key, column.fixed === side ? undefined : side),
                          })
                        ),
                    }
                  ),
              ]),
            },
            ...(column.sortable === false ? [{ type: 'divider' as const }] : []),
          ]),
        ],
      },
    ]

    return () =>
      h(
        Space,
        { size: 4 },
        {
          default: () => [
            enabled('refresh') && props.onReload
              ? toolButton(translate('refresh'), builtInIcons.refresh, () => props.onReload())
              : null,
            enabled('density')
              ? h(
                  Dropdown,
                  {
                    placement: 'bottomRight',
                    trigger: ['click'],
                    menu: {
                      items: densityItems,
                      selectedKeys: [props.density],
                      onClick: ({ key }: { key: string | number }) => {
                        if (key === 'small' || key === 'middle' || key === 'large') props.onDensityChange(key)
                      },
                    },
                  },
                  {
                    default: () => toolButton(translate('density'), builtInIcons.density),
                  }
                )
              : null,
            enabled('columnSetting')
              ? h(
                  Dropdown,
                  {
                    trigger: ['click'],
                    placement: 'bottomRight',
                    open: settingsOpen.value,
                    // 勾选、固定和重置需要连续操作，仅触发器或外部点击关闭菜单。
                    onOpenChange: (open: boolean, info: { source: string }) => {
                      if (info.source === 'trigger') settingsOpen.value = open
                    },
                    menu: {
                      classes: { root: 'sup-column-settings' },
                      selectable: false,
                      items: renderColumnSettings(),
                    },
                  },
                  { default: () => toolButton(translate('columnSetting'), builtInIcons.columnSetting) }
                )
              : null,
          ],
        }
      )
  },
})

export const renderTableToolbar = (props: TableToolbarProps) => h(TableToolbar, props as Obj)
