import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import { builtInIcons } from '../src/icons'
import { mergeActions } from '../src/components/buttons/actions'
import { globalConfig } from '../src/config'

describe('动作图标配置', () => {
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
})
