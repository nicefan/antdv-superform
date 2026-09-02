/// <reference types="../types" />

import plugin from './plugin'
import './style.less'
export * from './superForm'
export * from './superTable'
export * from './superButtons'
export * from './superDetail'
export * from './superModal'
export { diagnoseSchema } from './utils/diagnoseSchema'
export type { SchemaDiagnostic, SchemaDiagnosticLevel, SchemaKind } from './utils/diagnoseSchema'
export {
  antdvAdapter,
  defineUIAdapter,
  getUIAdapter,
  getUIFieldAdapter,
  mapUIFieldProps,
  renderUIField,
  resolveUIComponent,
} from './adapter'
export type { FieldAdapter, FieldAdapterContext, UIAdapter } from './adapter'
export { registerFormComponents } from './components'
export type { ComponentModelConfig, FormComponent, FormComponentConfig, FormComponentProps } from './components'
export type { InstallConfig } from './plugin'

export default plugin

export type * from './exaTypes'
