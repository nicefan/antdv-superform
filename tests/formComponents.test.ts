import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import {
  addComponent,
  configureComponents,
  getFormComponent,
  hasFormComponent,
  mapFormComponentModel,
} from '../src/components'

describe('表单 UI 组件注册', () => {
  it('安装配置中的普通组件名可直接作为 schema type', () => {
    const Rate = defineComponent(() => () => null)

    configureComponents({ Rate })

    expect(hasFormComponent('Rate')).toBe(true)
    expect(getFormComponent('Rate')).toMatchObject({ component: Rate, source: 'custom' })
  })

  it('记录自定义组件的受控值协议', () => {
    const Editor = defineComponent(() => () => null)

    configureComponents({
      Editor: {
        component: Editor,
        model: { prop: 'modelValue', event: 'update:modelValue' },
      },
    })

    const definition = getFormComponent('Editor')
    expect(definition).toBeDefined()
    if (!definition) throw new Error('Editor 组件未注册')
    expect(definition.model).toEqual({
      prop: 'modelValue',
      event: 'update:modelValue',
    })
    const update = () => undefined
    expect(mapFormComponentModel(definition, { value: 1, 'onUpdate:value': update })).toEqual({
      modelValue: 1,
      'onUpdate:modelValue': update,
    })
  })

  it('registerComponent 同时支持直接名称和旧 Ext 名称', () => {
    const UserPicker = defineComponent(() => () => null)

    addComponent('UserPicker', UserPicker)

    expect(getFormComponent('UserPicker')?.source).toBe('legacy')
    expect(getFormComponent('ExtUserPicker')?.source).toBe('legacy')
  })
})
