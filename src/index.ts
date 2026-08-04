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

export default plugin

export type * from './exaTypes'
