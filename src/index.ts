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
export { defineUIAdapter } from './adapter'
export type {
  ActionAdapter,
  ActionRenderType,
  AdapterComponent,
  ContainerAdapter,
  FieldAdapter,
  FieldAdapterContext,
  FormAdapter,
  IconAdapter,
  IconAdapterContext,
  LayoutAdapter,
  LayoutComponentName,
  PresentationAdapter,
  PresentationRenderType,
  UIAdapter,
} from './adapter'
export { registerAutoImportedComponents } from './components'
export type { ComponentModelConfig, FormComponent, FormComponentConfig, FormComponentProps } from './components'
export type { AdapterDefaultProps, InstallConfig } from './plugin'

export default plugin

export type * from './exaTypes'
