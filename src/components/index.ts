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
import InputSlot from './InputSlot.vue'
import base, { override } from './base'
import { useVModel } from '../utils'

export { ButtonGroup } from './buttons'
export { default as Collections } from './Collections'
export { override }

const components = {
  Form,
  Group,
  InputGroup,
  Card,
  List,
  Tabs,
  Table,
  Textarea,
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
  InputSlot,
}

export function addComponent(name, component) {
  components[name] = defineComponent({
    name,
    props: ['option', 'model', 'effectData', 'attrs'],

    setup({ option, model, effectData, attrs }) {
      const valueProps = useVModel({ option, model, effectData })
      const allAttrs = reactive({ ...toRefs(valueProps), ...toRefs(attrs) })

      return () =>
        h(base.FormItem, {}, () =>
          typeof component === 'function' ? component({ option, effectData, attrs: allAttrs }) : h(component, allAttrs)
        )
    },
  })
}

export default components
