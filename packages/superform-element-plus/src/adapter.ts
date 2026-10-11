import { ElMessage } from 'element-plus'
import type { Component } from 'vue'
import {
  builtInIcons,
  defineUIAdapter,
  extendUIAdapter,
  type UIAdapter,
  type UIAdapterOverrides,
  type UIComponentDefinitions,
} from 'superform/sdk'
import { elementPlusFieldNames, elementPlusFieldSources, type ElementPlusFieldName } from './fieldNames'
import { elementPlusFields, adaptElementPlusFieldProps } from './fields'
import './schemaTypes'
import { uiComponents } from './uiComponents'
import { openServiceModal, resolveServiceContent } from './modalService'
import { renderTableToolbar } from './components/TableToolbar'
export type { ElementPlusFieldName } from './fieldNames'

export interface ElementPlusAdapterOptions {
  components?: Partial<Record<ElementPlusFieldName, Component>>
  overrides?: UIAdapterOverrides
}

const elementPlusUIComponents = {
  ...uiComponents,
  table: {
    ...uiComponents.table,
    adaptProps: ({ density, ...attrs }) =>
      density ? { ...attrs, size: density === 'middle' ? 'default' : density } : attrs,
  },
  tableToolbar: {
    render: ({ attrs }) => renderTableToolbar(attrs),
  },
} as UIComponentDefinitions

export function createElementPlusAdapter(options: ElementPlusAdapterOptions = {}): UIAdapter {
  return extendUIAdapter(
    defineUIAdapter({
      name: 'element-plus',
      uiComponents: elementPlusUIComponents,
      supportedFields: elementPlusFieldNames,
      fieldSources: elementPlusFieldSources,
      adaptFieldProps: adaptElementPlusFieldProps,
      fields: elementPlusFields,
      fieldComponents: options.components,
      icons: { semantic: builtInIcons },
      services: {
        message(type, content) {
          ElMessage({ type, message: resolveServiceContent(content) as any })
        },
        confirm: (props) => openServiceModal(props, true),
        info: (props) => openServiceModal(props, false),
      },
    }),
    options.overrides
  )
}
export const elementPlusAdapter = createElementPlusAdapter()
export { elementPlusFields } from './fields'
