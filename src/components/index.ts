import { h, type Component } from 'vue'
import Group from './Group.vue'
import Form from './Form.vue'
import InputGroup from './InputGroup.vue'
import InputList from './InputList.vue'
import Card from './Card.vue'
import List from './List.vue'
import ListGroup from './ListGroup.vue'
import Tabs from './Tabs.vue'
import Table from './Table'
import Textarea from './Textarea.vue'
import Collapse from './Collapse.vue'
import Input from './Input.vue'
import InputNumber from './InputNumber.vue'
import Select from './Select.vue'
import Switch from './Switch.vue'
import DateRange from './DateRange.vue'
import DatePicker from './DatePicker.vue'
// import TimePicker from './TimePicker.vue'
import AutoComplete from './AutoComplete.vue'
import Radio from './Radio.vue'
import Checkbox from './Checkbox.vue'
import TreeSelect from './TreeSelect.vue'
import Upload from './Upload.vue'
import TagInput from './TagInput.vue'
import TagSelect from './TagSelect.vue'
import base, { isBaseComponentName, override } from '../compat/antdv'

export { ButtonGroup } from './buttons'
export { default as Collections } from './Collections'
export { override }

const components = {
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
const formItems = {
  Textarea,
  Input,
  InputNumber,
  InputGroup,
  InputList,
  AutoComplete,
  Select,
  Switch,
  DateRange,
  TimeRange: (props, { slots }) => h(base.TimeRangePicker, props, slots),
  DatePicker,
  TimePicker: (props, { slots }) => h(base.TimePicker, props, slots),
  Radio,
  Checkbox,
  TreeSelect,
  Upload,
  TagInput,
  TagSelect,
}

export const containers = Object.keys(components)
const reservedSchemaTypes = new Set([...Object.keys(formItems), ...containers])
const allItems: Record<string, Component> = { ...formItems, ...components }

export interface ComponentModelConfig {
  /** 组件接收主值的属性名，默认 value */
  prop?: string
  /** 组件更新主值时触发的事件名，默认 update:value */
  event?: string
}

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

type ComponentSource = 'enhanced' | 'custom' | 'legacy'
export interface FormComponentDefinition extends FormComponentConfig {
  source: ComponentSource
}

const definitions: Record<string, FormComponentDefinition> = Object.fromEntries(
  Object.entries(formItems).map(([name, component]) => [name, { component, source: 'enhanced' as const }])
)

function normalizeComponent(component: FormComponent): FormComponentConfig {
  if (typeof component === 'object' && component && 'component' in component) return component as FormComponentConfig
  return { component: component as Component }
}

/** 注册可直接由 schema type 使用的普通 UI 字段组件。 */
export function addFormComponent(name: string, config: FormComponent, source: ComponentSource = 'custom') {
  const definition = { ...normalizeComponent(config), source }
  definitions[name] = definition
  allItems[name] = definition.component
}

export function configureComponents(components: Record<string, FormComponent | undefined>) {
  const baseOverrides: Record<string, Component> = {}
  Object.entries(components).forEach(([name, config]) => {
    if (!config) return
    const { component } = normalizeComponent(config)
    if (isBaseComponentName(name)) baseOverrides[name] = component
    // 内置增强字段只替换其底层组件，其余名称直接成为 schema type。
    if (!isBaseComponentName(name) && !reservedSchemaTypes.has(name)) addFormComponent(name, config)
  })
  override(baseOverrides)
}

export const registerFormComponents = configureComponents

export function getFormComponent(type: string) {
  return definitions[type]
}

export function hasFormComponent(type: string) {
  return !!definitions[type]
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

export function addComponent(name, component) {
  const customName = `Ext${name}`
  const legacyComponent = (props) => {
    return h(component, props)
  }
  // 新写法直接使用注册名；Ext 前缀继续兼容已有 schema。
  addFormComponent(name, legacyComponent, 'legacy')
  addFormComponent(customName, legacyComponent, 'legacy')
}

export default allItems
