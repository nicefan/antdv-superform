import { defineComponent, h, reactive } from 'vue'
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
import useVModel from '../useVModel'
import base from '../override'

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
  components[name] = defineComponent({
    name,
    props: ['option', 'model', 'effectData', 'attrs'],

    setup({ option, model, effectData, attrs }) {
      const valueProps = useVModel({ option, model })
      const allAttrs = reactive({ valueProps, ...attrs })

      return () =>
        h(base.FormItem, {}, () =>
          typeof component === 'function' ? component({ option, effectData, attrs: allAttrs }) : h(component, attrs)
        )
    },
  })
}

export default components
