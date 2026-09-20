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
  UIGroupState,
  UICardState,
  UITabsState,
  UICollapseState,
  UIContainerItem,
  FieldAdapter,
  FieldAdapterContext,
  FieldPropsAdapter,
  FieldState,
  ResolvedField,
  FormAdapter,
  IconAdapter,
  LayoutComponentName,
  ModalAdapter,
  ServiceAdapter,
  TableAdapter,
  UIMessageType,
  UIServiceHandle,
  UploadAdapter,
  UITableColumn,
  UITableFilterProps,
  UITablePagination,
  UITableRenderProps,
  UITableSelection,
  UITableSelectors,
  UIAdapter,
  UIAdapterOverrides,
  UIRenderers,
  UIFormItemProps,
  UIDescriptionsProps,
  UIActionGroupProps,
} from './adapter'
export { registerAutoImportedComponents } from './components'
export { configure, registerComponent, registerComponents, useAdapter } from './plugin'
export type { ComponentModelConfig, FormComponent, FormComponentConfig, FormComponentProps } from './components'
export type { AdapterDefaultProps, SuperFormConfig } from './plugin'

export default plugin

export type * from './exaTypes'
