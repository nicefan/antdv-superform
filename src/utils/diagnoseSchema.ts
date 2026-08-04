import { diagnoseSchema as diagnose } from '../../shared/schema-diagnostics.mjs'

export type SchemaKind = 'auto' | 'form' | 'table' | 'detail'
export type SchemaDiagnosticLevel = 'error' | 'warning' | 'suggestion'
export type SchemaDiagnostic = {
  level: SchemaDiagnosticLevel
  code: string
  path: string
  message: string
}

export function diagnoseSchema(schema: Obj, kind: SchemaKind = 'auto'): SchemaDiagnostic[] {
  return diagnose(schema, kind)
}

export function reportSchemaDiagnostics(schema: Obj, kind: SchemaKind, name: string) {
  const diagnostics = diagnoseSchema(schema, kind)
  if (!diagnostics.length) return diagnostics

  console.groupCollapsed?.(`[antdv-superform] ${name} schema 诊断：${diagnostics.length} 项`)
  diagnostics.forEach(({ level, path, message }) => {
    const output = `[antdv-superform] ${path}: ${message}`
    if (level === 'error') console.error(output)
    else if (level === 'warning') console.warn(output)
    else console.info(output)
  })
  console.groupEnd?.()
  return diagnostics
}
