/**
 * @deprecated: 行内编辑表格
 */

import { ref, shallowReactive, toRaw, watch, reactive, h, Slots, Slot } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash-es'
import message from 'ant-design-vue/es/message'
import { useForm } from 'ant-design-vue/es/form'
import Controls from '../'
import style from '../style.module.scss'
import { cloneModelsFlat, resetFields, setFieldsValue } from '../../../utils/util'
import useControl from '../../useControl'
import base from '../../override'

function buildWidget(models) {
  const colSlots: Obj<(any) => VNode> = {}
  const rules: Obj = {}

  for (const [option, _model] of models) {
    const component = Controls[option.type]
    if (!component || option.applyTo === 'form') continue
    const ruleName = _model.propChain.join('.')
    _model.currentRules && (rules[ruleName] = _model.currentRules)

    const node = ({ model, validateInfos }) => {
      const { effectData, attrs } = useControl({ option, model })
      return h(Controls[option.type], {
        option,
        model,
        attrs: reactive(attrs),
        effectData,
        ...validateInfos[ruleName],
        class: style['table-form-item'],
      })
    }
    colSlots[option.field] = node
  }
  return { colSlots, rules }
}

export default function ({ modelsMap, orgList, rowKey }, listener) {
  // 数据监听
  const newItems = ref<Obj[]>([])
  const list = ref<Obj[]>([])
  const editMap = new WeakMap()
  watch(
    () => [...orgList.value],
    (org) => {
      list.value = org.concat(newItems.value)
    },
    { immediate: true }
  )

  watch(
    () => [...newItems.value],
    (items) => {
      list.value = orgList.value.concat(items)
    }
  )
  const fModels = cloneModelsFlat<ExFormItemOption>(modelsMap)
  const { colSlots, rules } = buildWidget(fModels)

  const setEditMap = (data, props) => {
    let editInfo = editMap.get(data) // TODO： 如果非同一个引用，需使用[rowKey]从list里面取
    if (!editInfo) {
      const editData = cloneDeep(data)
      const models = cloneModelsFlat(modelsMap, editData)
      const form = useForm(reactive(editData), ref(rules))
      editInfo = shallowReactive<Obj>({ ...props, form, models, editData })
      editMap.set(data, editInfo)
    } else {
      resetFields(editInfo.editData, data)
      Object.assign(editInfo, props)
    }
    return editInfo
  }
  const methods = {
    add() {
      const item = { [rowKey]: nanoid(12) }
      newItems.value.push(item)
      setEditMap(item, {
        isEdit: true,
        isNew: true,
      })
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      setEditMap(toRaw(data), { isEdit: true })
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      // 自动垃圾处理
      // items.forEach((item) => {
      //   delete editMap[item[rowKey]]
      // })
      listener.onDelete(items)
    },
  }
  const save = ({ record }) => {
    const editInfo = editMap.get(toRaw(record))
    editInfo.form
      .validate()
      .then(() => {
        const raw = toRaw(editInfo.form.modelRef)
        if (editInfo.isNew) {
          newItems.value.splice(newItems.value.indexOf(record), 1)
          Object.assign(record, raw)
          listener.onSave(record)
          editInfo.isNew = false
        } else {
          listener.onUpdate(raw, record)
        }
        editInfo.isEdit = false
      })
      .catch((err) => {
        console.log('error', err)
        message.error(err.errorFields[0].errors[0])
      })
  }
  const cancel = ({ record }) => {
    // const key = record[rowKey]
    const editInfo = editMap.get(toRaw(record))
    if (editInfo.isNew) {
      newItems.value.splice(newItems.value.indexOf(record), 1)
      // delete editMap[key]
    } else {
      // editInfo.isEdit = false
      // editInfo.form.resetFields(record)
    }
    editInfo.isEdit = false
  }
  const { Space, Button } = base
  const editButtons = (args) => (
    <Space>
      <Button type="link" onClick={() => save(args)}>
        保存
      </Button>
      <Button type="link" onClick={() => cancel(args)}>
        取消
      </Button>
    </Space>
  )

  const actionSlot = (param) => {
    const editInfo = editMap.get(toRaw(param.record))
    if (editInfo?.isEdit) {
      return editButtons(param)
    }
  }

  const colRenderMap = new Map()
  for (const col of fModels.keys()) {
    const comp = colSlots[col.field]
    if (!comp) continue
    const customRender = (props, textRender?: Fn) => {
      const editInfo = editMap.get(toRaw(props.record))
      if (editInfo?.isEdit) {
        const model = editInfo.models.get(col)
        const validateInfos = editInfo.form.validateInfos
        return comp({ model, validateInfos })
      } else if (textRender) {
        return textRender?.(props)
      } else {
        return props.text
      }
    }
    colRenderMap.set(col, customRender)
  }

  return {
    list,
    editMap,
    colRenderMap,
    methods,
    actionSlot,
  }
}
