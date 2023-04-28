import Group from './Group.vue'
import InputGroup from './InputGroup.vue'
import Card from './Card.vue'
import List from './List.vue'
import Tabs from './Tabs.vue'
import Table from './Table'
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

const components = {
  Group,
  InputGroup,
  Card,
  List,
  Tabs,
  Table,
  Collapse,
  Input,
  InputNumber,
  Select,
  Switch,
  DateRange,
  DatePicker,
  TimePicker,
  Radio,
  Checkbox,
  TreeSelect,
}

export function addComponent(name, component) {
  components[name] = component
}

export default components
