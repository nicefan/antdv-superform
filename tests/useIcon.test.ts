import { defineComponent, h, reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { antdvAdapter } from '../packages/superform-antdv/src/adapter'
import { elementPlusAdapter } from '../packages/superform-element-plus/src/adapter'
import { builtInIcons } from '../src/icons'
import { mergeActions } from '../src/components/buttons/actions'
import { globalConfig } from '../src/config'
import type { ButtonItem } from '../src/exaTypes'

describe('图标渲染函数', () => {
  it('组件通过渲染函数包装后不会被 Schema 转成组件代理', () => {
    const UserIcon = defineComponent({ render: () => h('span') })
    const item = reactive<ButtonItem>({ icon: () => h(UserIcon) })
    expect((item.icon!() as any).type).toBe(UserIcon)
  })

  it('七个内置动作默认带图标，全局和单项配置可覆盖或移除', () => {
    const names = ['add', 'delete', 'edit', 'detail', 'submit', 'search', 'reset'] as const
    const previous = globalConfig.defaultButtons
    const icon = () => h('span', { class: 'i-icon-user' })
    try {
      globalConfig.defaultButtons = undefined
      expect(mergeActions([...names]).map((button) => button.icon)).toEqual(names.map((name) => builtInIcons[name]))
      globalConfig.defaultButtons = { add: { icon } }
      expect(mergeActions(['add'])[0].icon).toBe(icon)
      expect(mergeActions(['add'], { add: { icon: builtInIcons.edit } })[0].icon).toBe(builtInIcons.edit)
      expect(mergeActions([{ name: 'add', icon: builtInIcons.search }])[0].icon).toBe(builtInIcons.search)
      expect(mergeActions([{ name: 'add', icon: undefined }])[0].icon).toBeUndefined()
      globalConfig.defaultButtons = { add: { icon: undefined } }
      expect(mergeActions(['add'])[0].icon).toBeUndefined()
    } finally {
      globalConfig.defaultButtons = previous
    }
  })

  describe.each([antdvAdapter, elementPlusAdapter])('$name', (adapter) => {
    it.each([
      [false, false, true, true],
      [true, false, true, false],
      [false, true, false, true],
    ])('图标模式 %s / 文字模式 %s', (iconOnly, labelOnly, hasIcon, hasLabel) => {
      const icon = vi.fn(() => h('span', { class: 'i-icon-user' }))
      const group: any = adapter.actions!.render('group', {
        groupProps: {}, buttons: [reactive({ label: '新增', icon, attrs: {} })],
        moreButtons: [], defaultButtonProps: {}, effectData: {}, iconOnly, labelOnly,
      }, {})
      const button = group.children.default()[0].children.default()
      const [node, label] = button.children.default()
      expect(!!node).toBe(hasIcon)
      expect(label !== undefined).toBe(hasLabel)
      expect(icon).toHaveBeenCalledTimes(hasIcon ? 1 : 0)
      if (hasIcon) expect(node.props.class).toBe('i-icon-user')
    })
  })

  it('AntDV Input 搜索按钮直接传递图标 slot，不提前执行', () => {
    const icon = vi.fn(() => h('span', { class: 'i-icon-user' }))
    const input: any = antdvAdapter.fields!.Input!.render!(
      defineComponent({ render: () => null }),
      { search: true, enterButton: { label: '查找', icon } },
      {} as any,
      {}
    )
    const button = input.children.enterButton()[0]
    expect(button.children.icon).toBe(icon)
    expect(icon).not.toHaveBeenCalled()
    expect(button.children.icon().props.class).toBe('i-icon-user')
  })
})
