/**
 * @deprecated: 行内编辑表格
 */

import { ref, shallowReactive, toRaw, watch, reactive, h } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash-es'
import message from 'ant-design-vue/es/message'
import { useForm } from 'ant-design-vue/es/form'
import Controls from '../'
import style from '../style.module.scss'
import { cloneModelsFlat } from '../../../utils/buildModel'
import { getEffectData } from '../../hooks/reactivity'
import { resetFields } from '../../../utils/fields'
import useControl from '../../useControl'
import base from '../../override'

export default function ({ childrenMap, orgList, rowKey, listener }) {
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
  const effectData = getEffectData()
  /** 初始model */
  const { modelsMap: fModels } = cloneModelsFlat<ExBaseOption & ExColumnsItem>(childrenMap)

  const setEditMap = (data, info) => {
    let editInfo = editMap.get(data) // TODO： 如果非同一个引用，需使用[rowKey]从list里面取
    if (!editInfo) {
      const editData = cloneDeep(data)
      const { modelsMap, rules } = cloneModelsFlat(childrenMap, editData)
      const form = useForm(reactive(editData), ref(rules))

      editInfo = shallowReactive<Obj>({ ...info, form, modelsMap, editData })
      editMap.set(data, editInfo)
    } else {
      resetFields(editInfo.editData, data)
      Object.assign(editInfo, info)
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
  for (const [option, _model] of fModels) {
    const component = Controls[option.type]
    if (!component || !option.field || option.hideInTable) continue

    const node = ({ model, validateInfo, editData }) => {
      const { attrs } = useControl({ option, effectData: reactive({ ...effectData, current: editData }) })
      return h(component, {
        option,
        model,
        attrs: reactive(attrs),
        effectData,
        ...validateInfo,
        class: style['table-form-item'],
      })
    }

    const ruleName = _model.propChain.join('.')
    const customRender = (props) => {
      const { modelsMap, isEdit, form, editData } = editMap.get(toRaw(props.record)) || {}
      if (isEdit) {
        const model = modelsMap.get(option)
        const validateInfo = form.validateInfos[ruleName]
        return node({ model, validateInfo, editData })
      }
    }
    colRenderMap.set(option, customRender)
  }

  return {
    list,
    editMap,
    colRenderMap,
    methods,
    actionSlot,
  }
}
