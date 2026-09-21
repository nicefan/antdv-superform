import { Modal, message } from 'antdv-next'
import type { Component } from 'vue'
import { builtInIcons, defineUIAdapter, extendUIAdapter, type UIAdapter, type UIAdapterOverrides } from 'superform/sdk'
import { antdvFieldNames, type AntdvFieldName } from './fieldNames'
import { createAntdvFields, adaptAntdvFieldProps } from './fields'
import './schemaTypes'
import { uiComponents } from './uiComponents'
export type { AntdvFieldName } from './fieldNames'

export interface AntdvAdapterOptions {
  components?: Partial<Record<AntdvFieldName, Component>>
  overrides?: UIAdapterOverrides
}

export function createAntdvAdapter(options: AntdvAdapterOptions = {}): UIAdapter {
  return extendUIAdapter(
    defineUIAdapter({
      name: 'antdv-next',
      uiComponents,
      supportedFields: antdvFieldNames,
      adaptFieldProps: adaptAntdvFieldProps,
      fields: createAntdvFields(),
      fieldComponents: options.components,
      icons: { semantic: builtInIcons },
      services: {
        message: (type, content) => message[type](content as any),
        confirm(props) {
          const modal = Modal.confirm(props as any)
          return {
            update: (next) => modal.update(next as any),
            destroy: () => modal.destroy(),
          }
        },
        info(props) {
          const modal = Modal.info(props as any)
          return {
            update: (next) => modal.update(next as any),
            destroy: () => modal.destroy(),
          }
        },
      },
    }),
    options.overrides
  )
}
export const antdvAdapter = createAntdvAdapter()
export { antdvFields, createAntdvFields } from './fields'
