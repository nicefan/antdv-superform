import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import {
  getFormComponent,
  getSchemaTypeSource,
  hasFormComponent,
  mapFormComponentModel,
  registerAutoImportedComponents,
  registerCustomComponents,
} from '../src/components'

describe('Schema 项目组件注册', () => {
  it('安装配置中的项目组件记录为 custom 来源', () => {
    const UserPicker = defineComponent(() => () => null)

    registerCustomComponents({ UserPicker })

    expect(hasFormComponent('UserPicker')).toBe(true)
    expect(getFormComponent('UserPicker')).toMatchObject({ component: UserPicker, source: 'custom' })
  })

  it('自动导入组件使用独立的 auto 来源', () => {
    const ProjectRate = defineComponent(() => () => null)

    registerAutoImportedComponents({ ProjectRate })

    expect(getFormComponent('ProjectRate')).toMatchObject({ component: ProjectRate, source: 'auto' })
  })

  it('项目组件优先于同名自动导入组件', () => {
    const AutoEditor = defineComponent(() => () => null)
    const CustomEditor = defineComponent(() => () => null)

    registerAutoImportedComponents({ ProjectEditor: AutoEditor })
    registerCustomComponents({ ProjectEditor: CustomEditor })

    expect(getFormComponent('ProjectEditor')).toMatchObject({ component: CustomEditor, source: 'custom' })
  })

  it('按 core、enhanced、custom、auto 顺序区分解析来源', () => {
    expect(getSchemaTypeSource('Form')).toBe('core')
    expect(getSchemaTypeSource('Select')).toBe('enhanced')
    expect(getSchemaTypeSource('ElInput', ['ElInput'])).toBe('enhanced')
    expect(getSchemaTypeSource('ProjectEditor')).toBe('custom')
    expect(getSchemaTypeSource('ProjectRate')).toBe('auto')
  })

  it('记录自定义组件的受控值协议', () => {
    const Editor = defineComponent(() => () => null)

    registerCustomComponents({
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

  it('Core 与内置增强类型不能被项目注册表覆盖', () => {
    const Component = defineComponent(() => () => null)

    expect(() => registerCustomComponents({ Form: Component })).toThrow("Schema 类型 'Form' 为 Core 保留类型")
    expect(() => registerAutoImportedComponents({ Select: Component })).toThrow("Schema 类型 'Select' 为 Core 保留类型")
  })
})
