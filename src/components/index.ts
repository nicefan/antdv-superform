import type { Component } from 'vue'
import Group from './Group.vue'
import Form from './Form.vue'
import InputGroup from './InputGroup.vue'
import InputList from './InputList.vue'
import Card from './Card.vue'
import List from './List.vue'
import ListGroup from './ListGroup.vue'
import Tabs from './Tabs.vue'
import Table from './Table'
import Collapse from './Collapse.vue'
import Upload from './Upload.vue'
import TagInput from './TagInput.vue'
import TagSelect from './TagSelect.vue'
import { registerUIComponents, type ComponentModelConfig } from '../adapter'
import { coreTypes, reservedSchemaTypes } from './schemaTypes'

export { ButtonGroup } from './buttons'
export { default as Collections } from './Collections'
export { coreTypes, enhancedTypes, reservedSchemaTypes } from './schemaTypes'

const containerComponents = {
  Form,
  Group,
  Card,
  List,
  ListGroup,
  Tabs,
  Table,
  Collapse,
  Descriptions: Group,
  Fragment: Group,
}
const coreFields = {
  InputGroup,
  InputList,
  Upload,
  TagInput,
  TagSelect,
}
export const containers = Object.keys(containerComponents)
const controls: Record<string, Component> = { ...containerComponents, ...coreFields }

export type { ComponentModelConfig } from '../adapter'

export interface FormComponentConfig {
  component: Component
  /** 不同 UI 库的受控值协议 */
  model?: ComponentModelConfig
}

export type FormComponent = Component | FormComponentConfig
export type FormComponentProps<T> = T extends new (...args: any[]) => { $props: infer P }
  ? P
  : T extends (props: infer P, ...args: any[]) => any
  ? P
  : Obj

export type ComponentSource = 'core' | 'enhanced' | 'custom' | 'auto'
export interface FormComponentDefinition extends FormComponentConfig {
  source: ComponentSource
}

const customDefinitions: Record<string, FormComponentDefinition> = {}
const autoDefinitions: Record<string, FormComponentDefinition> = {}
const adapterFieldTypes = new Set<string>()

function normalizeComponent(component: FormComponent): FormComponentConfig {
  if (typeof component === 'object' && component && 'component' in component) return component as FormComponentConfig
  return { component: component as Component }
}

function registerComponents(
  definitions: Record<string, FormComponentDefinition>,
  components: Record<string, FormComponent | undefined>,
  source: 'custom' | 'auto',
  additionalReservedTypes: Iterable<string> = []
) {
  const reservedTypes = new Set([...reservedSchemaTypes, ...additionalReservedTypes])
  Object.entries(components).forEach(([name, config]) => {
    if (!config) return
    if (reservedTypes.has(name)) {
      throw new Error(`Schema 类型 '${name}' 为 Core 保留类型，不能注册为 ${source} 组件`)
    }
    definitions[name] = { ...normalizeComponent(config), source }
  })
}

/** 安装配置中的项目组件，只参与 custom 来源解析。 */
export function registerCustomComponents(
  components: Record<string, FormComponent | undefined>,
  adapterEnhancedTypes: Iterable<string> = []
) {
  registerComponents(customDefinitions, components, 'custom', [...adapterFieldTypes, ...adapterEnhancedTypes])
}

/** 锁定当前 Adapter 的字段名，并阻止项目组件覆盖 Adapter 协议。 */
export function registerAdapterFieldTypes(types: Iterable<string>) {
  const nextTypes = new Set(types)
  for (const name of Object.keys(customDefinitions)) {
    if (nextTypes.has(name)) throw new Error(`Schema 类型 '${name}' 已注册为项目组件，不能再由 UIAdapter 接管`)
  }
  adapterFieldTypes.clear()
  nextTypes.forEach((name) => adapterFieldTypes.add(name))
}

/** 仅供构建插件生成的虚拟模块登记按需导入组件。 */
export function registerAutoImportedComponents(
  components: Record<string, FormComponent | undefined>,
  adapterFields: Iterable<string> = []
) {
  const uiComponents = Object.fromEntries(
    Object.entries(components).map(([name, config]) => [name, config && normalizeComponent(config).component])
  )
  registerUIComponents(uiComponents)

  // Adapter 字段同样由插件导入，但其 Schema 来源和行为仍归 Adapter，不进入项目组件表。
  const adapterFieldNames = new Set(adapterFields)
  const projectComponents = Object.fromEntries(
    Object.entries(components).filter(([name]) => !reservedSchemaTypes.has(name) && !adapterFieldNames.has(name))
  )
  registerComponents(autoDefinitions, projectComponents, 'auto')
}

export function getFormComponent(type: string) {
  return customDefinitions[type] || autoDefinitions[type]
}

export function hasFormComponent(type: string) {
  return !!getFormComponent(type)
}

export function getRegisteredFormComponentTypes() {
  return [...new Set([...Object.keys(customDefinitions), ...Object.keys(autoDefinitions)])]
}

/** 返回 Schema 类型的解析来源，顺序与 ADR-0002 保持一致。 */
export function getSchemaTypeSource(
  type: string,
  adapterEnhancedTypes: Iterable<string> = []
): ComponentSource | undefined {
  if ((coreTypes as readonly string[]).includes(type)) return 'core'
  if (adapterFieldTypes.has(type) || new Set(adapterEnhancedTypes).has(type)) return 'enhanced'
  return customDefinitions[type]?.source || autoDefinitions[type]?.source
}

export function mapFormComponentModel(definition: FormComponentDefinition, props: Obj) {
  const { prop = 'value', event = 'update:value' } = definition.model || {}
  const mapped = { ...props }
  if (prop !== 'value') {
    mapped[prop] = mapped.value
    delete mapped.value
  }
  if (event !== 'update:value') {
    const listener = event.startsWith('on') ? event : `on${event[0].toUpperCase()}${event.slice(1)}`
    mapped[listener] = mapped['onUpdate:value']
    delete mapped['onUpdate:value']
  }
  return mapped
}

export default controls
