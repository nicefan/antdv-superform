import { describe, expect, it, vi } from 'vitest'
import { ElDropdownItem } from 'element-plus'
import { renderActionGroup } from '../packages/superform-element-plus/src/components/ActionGroup'
import type { UIActionItem } from '../src/adapter'

const action = (key: number, menu?: UIActionItem['menu']): UIActionItem => ({
  key,
  label: () => `动作${key}`,
  attrs: {},
  disabled: false,
  menu,
  onClick: vi.fn(),
  onSelect: vi.fn(),
})

describe('Element Plus ActionGroup', () => {
  it('onCommand 只消费选中值，点击条目负责阻止冒泡', () => {
    const button = action(1, [{ key: 0, value: 'enable', label: () => '启用', disabled: false }])
    const group = renderActionGroup({ buttons: [button], moreButtons: [], moreLabel: () => null }) as any
    const tooltip = group.children.default()[0].children[0]
    const dropdown = tooltip.children.default().children[0]
    const item = dropdown.children.dropdown().children.default()[0]
    const stop = vi.fn()

    expect(item.type).toBe(ElDropdownItem)
    item.props.onClick({ stopPropagation: stop })
    dropdown.props.onCommand(item.props.command)
    expect(stop).toHaveBeenCalledOnce()
    expect(button.onSelect).toHaveBeenCalledWith('enable')
  })

  it('更多菜单使用扁平 DropdownItem，并路由原动作及菜单值', () => {
    const nested = action(1, [{ key: 0, value: 'enable', label: () => '启用', disabled: false }])
    const plain = action(2)
    const group = renderActionGroup({ buttons: [], moreButtons: [nested, plain], moreLabel: () => null }) as any
    const overflow = group.children.default()[0]
    const menu = overflow.children.dropdown()
    const items = menu.children.default()

    expect(items).toHaveLength(2)
    expect(items.every((item: any) => item.type === ElDropdownItem)).toBe(true)
    overflow.props.onCommand(items[0].props.command)
    overflow.props.onCommand(items[1].props.command)
    expect(nested.onSelect).toHaveBeenCalledWith('enable')
    expect(plain.onClick).toHaveBeenCalledWith()
  })
})
