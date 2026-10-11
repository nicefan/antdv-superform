import { Button, Checkbox, Dropdown, Popover, Space } from 'antdv-next'
import { defineComponent, h, ref } from 'vue'
import { builtInIcons, translate, type UIRenderers, type UITableToolName } from 'superform/sdk'

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
    // Dropdown/Popover 需要直接的按钮触发节点，避免 Tooltip 截获监听器或遮挡菜单。
    const toolButton = (label: string, content: () => any, onClick?: () => unknown) =>
      h(
        Button,
        {
          type: 'text',
          size: 'small',
          title: label,
          'aria-label': label,
          style: { width: '28px', height: '28px', padding: 0 },
          onClick,
        },
        content
      )

    const densityItems = [
      { label: translate('densityLarge'), key: 'large' },
      { label: translate('densityMiddle'), key: 'middle' },
      { label: translate('densitySmall'), key: 'small' },
    ]

    const renderColumnSettings = () =>
      h('div', { style: { minWidth: '240px' } }, [
        h(
          Space,
          { size: 'small', style: { marginBottom: '8px' } },
          {
            default: () => [
              h(
                Button,
                {
                  size: 'small',
                  onClick: () => props.onVisibleKeysChange((props.columns as Obj[]).map(({ key }) => key)),
                },
                () => translate('checkAll')
              ),
              h(Button, { size: 'small', onClick: () => props.onResetColumns() }, () => translate('reset')),
            ],
          }
        ),
        ...(props.columns as Obj[]).map((column) =>
          h(
            'div',
            {
              key: column.key,
              draggable: true,
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                padding: '4px 0',
              },
              onDragstart: () => {
                dragKey.value = column.key
              },
              onDragover: (event: DragEvent) => event.preventDefault(),
              onDrop: (event: DragEvent) => {
                event.preventDefault()
                const source = dragKey.value
                dragKey.value = ''
                if (!source || source === column.key) return
                const next = (props.columns as Obj[]).map(({ key }) => key).filter((key) => key !== source)
                const targetIndex = next.indexOf(column.key)
                next.splice(targetIndex < 0 ? next.length : targetIndex, 0, source)
                props.onColumnOrderChange(next)
              },
            },
            [
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
              h(
                Space,
                { size: 0 },
                {
                  default: () => [
                    h(
                      Button,
                      {
                        size: 'small',
                        type: 'text',
                        title: translate('fixLeft'),
                        style: column.fixed === 'left' ? { fontWeight: 700 } : undefined,
                        onClick: () =>
                          props.onColumnFixedChange(column.key, column.fixed === 'left' ? undefined : 'left'),
                      },
                      () => '←'
                    ),
                    h(
                      Button,
                      {
                        size: 'small',
                        type: 'text',
                        title: translate('fixRight'),
                        style: column.fixed === 'right' ? { fontWeight: 700 } : undefined,
                        onClick: () =>
                          props.onColumnFixedChange(column.key, column.fixed === 'right' ? undefined : 'right'),
                      },
                      () => '→'
                    ),
                  ],
                }
              ),
            ]
          )
        ),
      ])

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
                  { default: () => toolButton(translate('density'), builtInIcons.density) }
                )
              : null,
            enabled('columnSetting')
              ? h(
                  Popover,
                  { trigger: 'click', placement: 'bottomRight' },
                  {
                    default: () => toolButton(translate('columnSetting'), builtInIcons.columnSetting),
                    content: renderColumnSettings,
                  }
                )
              : null,
          ],
        }
      )
  },
})

export const renderTableToolbar: UIRenderers['tableToolbar'] = (props) => h(TableToolbar, props as Obj)
