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
export { globalConfig } from './config'
export { toNode } from './utils/toNode'

export { builtInIcons } from './icons'

export {
  fieldComponentProps,
  createFieldPropsAdapter,
  defineFieldAdapters,
  combineFieldHandlers,
} from './adapter/fieldProtocol'
