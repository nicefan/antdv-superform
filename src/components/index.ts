import { defineComponent, h, reactive, toRefs } from 'vue'
import Group from './Group.vue'
import Form from './Form.vue'
import InputGroup from './InputGroup.vue'
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
  Select,
  Switch,
  DateRange,
  DatePicker,
  TimePicker,
  Radio,
  Checkbox,
  TreeSelect,
}

export const containers = Object.keys(components)
const allItems = { ...formItems, ...components }

export function addComponent(name, component) {
  const customName = `Ext${name}`
  allItems[customName] = (props) => {
    return typeof component === 'function' ? component(props) : h(component, props.attrs)
  }
}

export default allItems
