import type { TableToolbarProps } from '../../../shared/tableTools'
import { ElButton, ElCheckbox, ElDropdown, ElDropdownItem, ElDropdownMenu, ElSpace } from 'element-plus'
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
    const enabled = (name: UITableToolName) => (props.tools as UITableToolName[]).includes(name)
    // Dropdown 使用直接按钮触发节点，避免包装组件截获菜单监听器。
    const toolButton = (label: string, icon: () => any, onClick?: () => unknown) =>
      h(ElButton, { text: true, circle: true, icon, title: label, 'aria-label': label, onClick })

    const densityItems = [
      { label: translate('densityLarge'), key: 'large' },
      { label: translate('densityMiddle'), key: 'middle' },
      { label: translate('densitySmall'), key: 'small' },
    ] as const

    const renderColumnSettings = () =>
      h(ElDropdownMenu, { class: 'sup-column-settings' }, () => [
        // 头部只承载操作，不参与菜单项的悬停及键盘选中。
        h('li', { role: 'presentation', class: 'sup-column-setting-header' }, [
          h('div', { class: 'sup-column-setting-content' }, [
            h(
              ElButton,
              {
                link: true,
                type: 'primary',
                onClick: () => props.onVisibleKeysChange((props.columns as Obj[]).map(({ key }) => key)),
              },
              () => translate('checkAll')
            ),
            h(
              ElButton,
              {
                link: true,
                type: 'primary',
                onClick: () => props.onResetColumns(),
              },
              () => translate('reset')
            ),
          ])
        ]),
        ...(props.columns as Obj[]).map((column, index, columns) =>
          h(
            ElDropdownItem,
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
              divided: index === 0 || columns[index - 1].sortable === false,
            },
            () =>
              h('div', { class: 'sup-column-setting-content' }, [
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
                    ElCheckbox,
                    {
                      modelValue: (props.visibleKeys as string[]).includes(column.key),
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
                    ElSpace,
                    { size: 4 },
                    {
                      default: () =>
                        (['left', 'right'] as const).map((side) =>
                          h(ElButton, {
                            text: true,
                            circle: true,
                            type: column.fixed === side ? 'primary' : undefined,
                            bg: column.fixed === side,
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
              ])
          )
        ),
      ])

    return () =>
      h(
        ElSpace,
        { size: 4 },
        {
          default: () => [
            enabled('refresh') && props.onReload
              ? toolButton(translate('refresh'), builtInIcons.refresh, () => props.onReload())
              : null,
            enabled('density')
              ? h(
                  ElDropdown,
                  {
                    trigger: 'click',
                    onCommand: (command: unknown) => {
                      if (command === 'small' || command === 'middle' || command === 'large') {
                        props.onDensityChange(command)
                      }
                    },
                  },
                  {
                    default: () => toolButton(translate('density'), builtInIcons.density),
                    dropdown: () =>
                      h(ElDropdownMenu, {}, () =>
                        densityItems.map((item) =>
                          h(
                            ElDropdownItem,
                            {
                              command: item.key,
                              disabled: props.density === item.key,
                            },
                            () => item.label
                          )
                        )
                      ),
                  }
                )
              : null,
            enabled('columnSetting')
              ? h(
                  ElDropdown,
                  {
                    trigger: 'click',
                    placement: 'bottom-end',
                    hideOnClick: false,
                    popperClass: 'sup-column-settings-popup',
                  },
                  {
                    default: () => toolButton(translate('columnSetting'), builtInIcons.columnSetting),
                    dropdown: renderColumnSettings,
                  }
                )
              : null,
          ],
        }
      )
  },
})

export const renderTableToolbar = (props: TableToolbarProps) => h(TableToolbar, props as Obj)
