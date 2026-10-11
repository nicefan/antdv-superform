import { h } from 'vue'
import { translate } from 'superform/sdk'
import { Modal, message } from 'antdv-next'
import type { Component } from 'vue'
import {
  builtInIcons,
  defineUIAdapter,
  extendUIAdapter,
  type UIAdapter,
  type UIAdapterOverrides,
  type UIComponentDefinitions,
} from 'superform/sdk'
import { antdvFieldNames, type AntdvFieldName } from './fieldNames'
import { createAntdvFields, adaptAntdvFieldProps } from './fields'
import './schemaTypes'
import { uiComponents } from './uiComponents'
import { renderTableToolbar } from './components/TableToolbar'
export type { AntdvFieldName } from './fieldNames'

export interface AntdvAdapterOptions {
  components?: Partial<Record<AntdvFieldName, Component>>
  overrides?: UIAdapterOverrides
}

const antdvUIComponents = {
  ...uiComponents,
  table: {
    ...uiComponents.table,
    adaptProps: ({ density, ...attrs }) => (density ? { ...attrs, size: density } : attrs),
  },
  tableToolbar: {
    render: ({ attrs }) => renderTableToolbar(attrs),
  },
} as UIComponentDefinitions

export function createAntdvAdapter(options: AntdvAdapterOptions = {}): UIAdapter {
  return extendUIAdapter(
    defineUIAdapter({
      name: 'antdv-next',
      uiComponents: antdvUIComponents,
      supportedFields: antdvFieldNames,
      adaptFieldProps: adaptAntdvFieldProps,
      fields: createAntdvFields(),
      fieldComponents: options.components,
      icons: { semantic: builtInIcons },
      services: {
        message: (type, content) => message[type](content as any),
        confirm(props) {
          const modal = Modal.confirm({
            ...props,
            okText: props.okText ?? h(() => translate('confirm')),
            cancelText: props.cancelText ?? h(() => translate('cancel')),
          } as any)
          return {
            update: (next) => modal.update(next as any),
            destroy: () => modal.destroy(),
          }
        },
        info(props) {
          const modal = Modal.info({ ...props, okText: props.okText ?? h(() => translate('confirm')) } as any)
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
