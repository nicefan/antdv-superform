import { defineComponent, h, reactive, toRefs } from 'vue'
import Group from './Group.vue'
import Form from './Form.vue'
import InputGroup from './InputGroup.vue'
import InputList from './InputList.vue'
import Card from './Card.vue'
import List from './List.vue'
import Tabs from './Tabs.vue'
import Table from './Table'
import Textarea from './Textarea.vue'
import Collapse from './Collapse.vue'
import Input from './Input.vue'
import InputNumber from './InputNumber.vue'
import Select from './Select.vue'
import Switch from './Switch.vue'
import DateRange from './DateRange.vue'
import DatePicker from './DatePicker.vue'
import TimePicker from './TimePicker.vue'
import Radio from './Radio.vue'
import Checkbox from './Checkbox.vue'
import TreeSelect from './TreeSelect.vue'
import Upload from './Upload.vue'
import { override } from './base'

export { ButtonGroup } from './buttons'
export { default as Collections } from './Collections'
export { override }

const components = {
  Form,
  Group,
  Card,
  List,
  Tabs,
  Table,
  Collapse,
  Descriptions: Group,
}
const formItems = {
  Textarea,
  Input,
  InputNumber,
  InputGroup,
  InputList,
  Select,
  Switch,
  DateRange,
  DatePicker,
  TimePicker,
  Radio,
  Checkbox,
  TreeSelect,
  Upload,
}

export const containers = Object.keys(components)
export const formItemTypes = Object.keys(formItems)
const allItems: Obj = { ...formItems, ...components }

export function addComponent(name, component) {
  const customName = `Ext${name}`
  allItems[customName] = (props) => {
    return h(component, props)
  }
}

export default allItems
