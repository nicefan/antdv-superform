/**
 * @deprecated: 行内编辑表格
 */

import { ref, shallowReactive, toRaw, watch, reactive, h, computed } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash-es'
import message from 'ant-design-vue/es/message'
import { useForm } from 'ant-design-vue/es/form'
import Controls, { ButtonGroup } from '../'
import style from '../style.module.scss'
import { useControl, cloneModelsFlat, resetFields, getEffectData } from '../../utils'
import base from '../base'

function createEditCache(childrenMap) {
  const editMap = new WeakMap()
  const getEditInfo = (data) => {
    let editInfo = editMap.get(toRaw(data))
    if (!editInfo) {
      editInfo = shallowReactive<Obj>({ isEdit: false })
      editMap.set(toRaw(data), editInfo)
    }
    return editInfo
  }
  const setEditInfo = (data, info) => {
    const editInfo = getEditInfo(data)
    if (!editInfo.editData) {
      const editData = cloneDeep(data)
      const { modelsMap, rules } = cloneModelsFlat(childrenMap, editData)
      const form = useForm(reactive(editData), ref(rules))
      Object.assign(editInfo, { ...info, form, modelsMap, editData })
    } else {
      resetFields(editInfo.editData, data)
      Object.assign(editInfo, info)
    }
  }
  return { getEditInfo, setEditInfo }
}

export default function ({ childrenMap, orgList, rowKey, listener }) {
  // 数据监听
  const newItems = ref<Obj[]>([])
  const list = ref<Obj[]>([])
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
  const effectData = getEffectData({ current: list })
  /** 初始model */
  const { modelsMap: fModels } = cloneModelsFlat<ExBaseOption & ExColumnsItem>(childrenMap)

  const { getEditInfo, setEditInfo } = createEditCache(childrenMap)

  const methods = {
    add() {
      const item = { [rowKey]: nanoid(12) }
      newItems.value.push(item)
      setEditInfo(item, {
        isEdit: true,
        isNew: true,
      })
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      setEditInfo(data, { isEdit: true })
    },
    delete({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      listener.onDelete(items)
    },
  }

  const editActions = [
    {
      label: '保存',
      onClick: ({ record }) => {
        const editInfo = getEditInfo(record)
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
      },
    },
    {
      label: '取消',
      onClick: ({ record }) => {
        const editInfo = getEditInfo(record)
        if (editInfo.isNew) {
          newItems.value.splice(newItems.value.indexOf(record), 1)
        } else {
          // editInfo.isEdit = false
          // editInfo.form.resetFields(record)
        }
        editInfo.isEdit = false
      },
    },
  ]

  const getEditActions = (param) => {
    const editInfo = getEditInfo(param.record)
    return editInfo.isEdit ? editActions : null
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
      const { modelsMap, isEdit, form, editData } = getEditInfo(props.record)
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
    colRenderMap,
    methods,
    getEditActions,
  }
}
