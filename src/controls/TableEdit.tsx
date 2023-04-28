/**
 * @deprecated: 行内编辑表格
 */

import { ref, shallowReactive, toRaw, watch, reactive, h } from 'vue'
import { nanoid } from 'nanoid'
import cloneDeep from 'lodash/cloneDeep'
import { useForm } from 'ant-design-vue/es/form'
import * as Controls from '../controls'
import message from 'ant-design-vue/es/message'
import style from './style.module.scss'
import { flatModels } from '../utils/util'
import { innerComps } from '../components'

const { Space, Button } = innerComps

/** 生成编辑表单 */
function buildInlineForm(modelsMap: ModelsMap, data) {
  const editData = reactive(cloneDeep(data))
  const rules: Obj = {}
  const nodes = new Map()
  const models = flatModels(modelsMap, editData)

  for (const [option, model] of models) {
    const ruleName = model.propChain.join('.')
    model.currentRules && (rules[ruleName] = model.currentRules)
    const node = () =>
      h(Controls[option.type], { option, model, ...form.validateInfos[ruleName], class: style['table-form-item'] })
    nodes.set(option, node)
  }
  const form = useForm(editData, ref(rules))

  return {
    nodes,
    form,
  }
}

export default function ({ parentModel, modelsMap, orgList, rowKey }) {
  // 数据监听
  const newItems = ref<Obj[]>([])
  const list = ref<Obj[]>([])
  const editMap: Obj = shallowReactive({})
  watch(shallowReactive(orgList), () => {
    list.value = orgList.concat(newItems.value)
  })

  watch(
    () => newItems.value,
    (items) => {
      list.value = orgList.concat(items)
    }
  )

  const methods = {
    add() {
      const hash = nanoid(12)
      editMap[hash] = shallowReactive<Obj>({
        isEdit: true,
        isNew: true,
        ...buildInlineForm(modelsMap, parentModel.parent),
      })
      newItems.value = newItems.value.concat({ [rowKey]: hash })
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      const editInfo = editMap[data[rowKey]]
      if (editInfo) {
        editInfo.isEdit = true
      } else {
        editMap[data[rowKey]] = shallowReactive<Obj>({ isEdit: true, ...buildInlineForm(modelsMap, data) })
      }
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      items.forEach((item) => {
        orgList.splice(orgList.indexOf(item), 1)
        delete editMap[item[rowKey]]
      })
    },
  }
  const save = ({ record }) => {
    const editInfo = editMap[record[rowKey]]
    editInfo.form
      .validate()
      .then(() => {
        const raw = toRaw(editInfo.form.modelRef)
        if (editInfo.isNew) {
          newItems.value.splice(newItems.value.indexOf(record), 1)
          editInfo.isNew = false
          orgList.push({ ...record, ...raw })
        } else {
          Object.assign(toRaw(record), raw)
        }
        editInfo.isEdit = false
      })
      .catch((err) => {
        console.log('error', err)
        message.error(err.errorFields[0].errors[0])
      })
  }
  const cancel = ({ record }) => {
    const key = record[rowKey]
    const editInfo = editMap[key]
    if (editInfo.isNew) {
      newItems.value = newItems.value.filter((item) => item[rowKey] !== key)
      delete editMap[key]
    } else {
      editInfo.isEdit = false
      editInfo.form.resetFields(record)
    }
  }
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
    const editInfo = editMap[param.record[rowKey]]
    if (editInfo?.isEdit) {
      return editButtons(param)
    }
  }
  const colRenderMap = new Map()
  const models = flatModels(modelsMap)
  for (const col of models.keys()) {
    const customRender = ({ record, text }) => {
      const editInfo = editMap[record[rowKey]]
      return (editInfo?.isEdit && editInfo.nodes.get(col)?.()) || text
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
