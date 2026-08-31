/**
 * antdv-superform 1.0 的 Ant Design 运行时边界。
 *
 * 业务组件只从此文件导入，避免上游导出调整继续扩散到整个项目。
 * 此边界只面向 antdv-next，不提供 ant-design-vue 3.x 回退。
 */
export {
  AutoComplete,
  Button,
  Card,
  CheckableTag,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapsePanel,
  ConfigProvider,
  DatePicker,
  DateRangePicker,
  Descriptions,
  DescriptionsItem,
  Divider,
  Dropdown,
  Form,
  FormItem,
  Image,
  Input,
  InputNumber,
  InputSearch,
  Menu,
  MenuItem,
  Modal,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Slider,
  Space,
  SpaceCompact,
  Spin,
  Switch,
  Table,
  TabPane,
  Tabs,
  Tag,
  TextArea,
  TimePicker,
  TimeRangePicker,
  Tooltip,
  Tree,
  TreeSelect,
  Upload,
  message,
}

export { SuperList, SuperListItem }

export type {
  AutoCompleteProps,
  ButtonProps,
  CheckboxGroupProps,
  ColProps,
  DatePickerProps,
  DescriptionsProps,
  DropdownProps,
  FormInstance,
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
  PaginationProps,
  RadioGroupProps,
  RangePickerProps,
  RowProps,
  SelectProps,
  SpaceProps,
  SwitchProps,
  TableColumnType,
  TableProps,
  TabsProps,
  TextAreaProps,
  TimePickerProps,
  TimeRangePickerProps,
  TooltipProps,
  TreeSelectProps,
  UploadProps,
} from 'antdv-next'

export type { Locale } from 'antdv-next/dist/locale/index'
export type { ModalFuncProps, ModalProps } from 'antdv-next/dist/modal/interface'
export { useConfig as useAntdvConfig } from 'antdv-next/config-provider/context'

/**
 * 可覆盖的底层组件注册表。字段组件统一读取此对象，安装配置中的 components
 * 也只修改此处，避免再维护独立的 components/base 层。
 */
const baseComponents = {
  SpaceCompact,
  Form,
  FormItem,
  Tooltip,
  Button,
  Space,
  Card,
  Descriptions,
  DescriptionsItem,
  SuperList,
  SuperListItem,
  Modal,
  Table,
  Tabs,
  TabPane,
  CollapsePanel,
  Collapse,
  Input,
  InputNumber,
  InputSearch,
  TextArea,
  Select,
  Switch,
  DateRangePicker,
  TimeRangePicker,
  DatePicker,
  TimePicker,
  RadioButton,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  TreeSelect,
  Row,
  Col,
  Upload,
  Tag,
  CheckableTag,
  AutoComplete,
}

export type BaseComponentName = keyof typeof baseComponents
export type BaseComponents = Record<BaseComponentName, any>

const base: BaseComponents = baseComponents

export function override(comps: Partial<BaseComponents>) {
  Object.keys(comps).forEach((key) => {
    const name = key as BaseComponentName
    if (comps[name]) base[name] = comps[name]
  })
}

export function getOverride<T extends { name?: string } | { name?: string }[]>(comp: T): T {
  if (Array.isArray(comp)) return comp.map(getOverride) as T
  return ((comp.name && base[comp.name as BaseComponentName]) || comp) as T
}

export default base
import {
  AutoComplete,
  Button,
  Card,
  CheckableTag,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapsePanel,
  ConfigProvider,
  DatePicker,
  DateRangePicker,
  Descriptions,
  DescriptionsItem,
  Divider,
  Dropdown,
  Form,
  FormItem,
  Image,
  Input,
  InputNumber,
  InputSearch,
  Menu,
  MenuItem,
  Modal,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Slider,
  Space,
  SpaceCompact,
  Spin,
  Switch,
  Table,
  TabPane,
  Tabs,
  Tag,
  TextArea,
  TimePicker,
  TimeRangePicker,
  Tooltip,
  Tree,
  TreeSelect,
  Upload,
  message,
} from 'antdv-next'
import { SuperList, SuperListItem } from './list'
