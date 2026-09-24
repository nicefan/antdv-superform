/**
 * Adapter 开发 SDK。独立 Adapter 包只能依赖这里的稳定契约，不能引用 Core 源码路径。
 */
export { defineUIAdapter, extendUIAdapter, registerUIComponents, requireUIComponent, useUIComponent } from './adapter'
export { createOfficialProduct } from './officialProduct'
export type { OfficialProductInitializeOptions, OfficialSuperFormProduct } from './officialProduct'
export type {
  ComponentModelConfig,
  UIGroupState,
  UICardState,
  UITabsState,
  UICollapseState,
  UIContainerItem,
  FieldAdapter,
  RenderContext,
  FieldRenderContext,
  UIRenderContext,
  UIComponentRender,
  UIComponentRenders,
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
  UIConfirmOptions,
  UploadAdapter,
  UITableColumn,
  UITableFilterProps,
  UITablePagination,
  UITableRenderProps,
  UITableSelection,
  UITableSelectors,
  UIAdapter,
  UIAdapterDefinition,
  UIComponentDefinition,
  UIComponentDefinitions,
  UIAdapterOverrides,
  UIRenderers,
  UIFormItemProps,
  UIDescriptionsProps,
  UIDescriptionItem,
  UIActionGroupProps,
  UIActionItem,
  UIActionMenuItem,
} from './adapter'
export { globalConfig } from './config'
export { toNode } from './utils/toNode'

export { builtInIcons } from './icons'
export { FormValidationError } from './adapter/formValidation'
export type { FormValidationField } from './adapter/formValidation'

export {
  fieldComponentProps,
  createFieldPropsAdapter,
  defineFieldAdapters,
  combineFieldHandlers,
} from './adapter/fieldProtocol'

export type { BuiltInButtonName } from './components/buttons/defaults'
