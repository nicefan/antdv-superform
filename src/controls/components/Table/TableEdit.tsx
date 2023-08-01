/**
 * @deprecated: 行内编辑表格
 */

import { ref, shallowReactive, toRaw, watch, reactive, h } from 'vue'
import { nanoid } from 'nanoid'
import cloneDeep from 'lodash/cloneDeep'
import message from 'ant-design-vue/es/message'
import { useForm } from 'ant-design-vue/es/form'
import Controls from '../'
import style from '../style.module.scss'
import { flatModels } from '../../../utils/util'
import useControl from '../../useControl'
import base from '../../override'

/** 生成编辑表单 */
function buildInlineForm(modelsMap: ModelsMap<ExFormItemOption>, data) {
  const editData = reactive(cloneDeep(data))
  const rules: Obj = {}
  const nodes = new Map()
  const models = flatModels(modelsMap, editData)

  for (const [option, model] of models) {
    const ruleName = model.propChain.join('.')
    model.currentRules && (rules[ruleName] = model.currentRules)

    const node = () => {
      const { effectData, attrs } = useControl({ option, model })
      return h(Controls[option.type], {
        option,
        model,
        attrs: reactive(attrs),
        effectData,
        ...form.validateInfos[ruleName],
        class: style['table-form-item'],
      })
    }
    nodes.set(option, node)
  }
  const form = useForm(editData, ref(rules))

  return {
    nodes,
    form,
  }
}

export default function ({ parentModel, modelsMap, orgList, rowKey }, listener) {
  // 数据监听
  const newItems = ref<Obj[]>([])
  const list = ref<Obj[]>([])
  const editMap = new WeakMap()
  watch(
    shallowReactive(orgList.value),
    (org) => {
      list.value = org.concat(newItems.value)
    },
    { immediate: true, deep: true }
  )

  watch(
    () => newItems.value,
    (items) => {
      list.value = orgList.concat(items)
    }
  )

  const methods = {
    add() {
      const item = { [rowKey]: nanoid(12) }
      newItems.value = newItems.value.concat()
      editMap.set(
        item,
        shallowReactive<Obj>({
          isEdit: true,
          isNew: true,
          ...buildInlineForm(modelsMap, parentModel.parent),
        })
      )
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      const editInfo = editMap.get(data) // TODO： 如果非同一个引用，需使用[rowKey]从list里面取
      if (editInfo) {
        editInfo.isEdit = true
      } else {
        editMap.set(data, shallowReactive<Obj>({ isEdit: true, ...buildInlineForm(modelsMap, data) }))
      }
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
    const editInfo = editMap.get(record)
    editInfo.form
      .validate()
      .then(() => {
        const raw = toRaw(editInfo.form.modelRef)
        if (editInfo.isNew) {
          newItems.value.splice(newItems.value.indexOf(record), 1)
          listener.onSave({ ...record, ...raw })
        } else {
          listener.onUpdate(record, raw)
          editInfo.isEdit = false
        }
      })
      .catch((err) => {
        console.log('error', err)
        message.error(err.errorFields[0].errors[0])
      })
  }
  const cancel = ({ record }) => {
    const key = record[rowKey]
    const editInfo = editMap.get(record)
    if (editInfo.isNew) {
      newItems.value = newItems.value.filter((item) => item[rowKey] !== key)
      // delete editMap[key]
    } else {
      editInfo.isEdit = false
      editInfo.form.resetFields(record)
    }
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
    const editInfo = editMap.get(param.record)
    if (editInfo?.isEdit) {
      return editButtons(param)
    }
  }
  const colRenderMap = new Map()
  const models = flatModels(modelsMap)
  for (const col of models.keys()) {
    const customRender = ({ record, text }) => {
      const editInfo = editMap.get(record)
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
