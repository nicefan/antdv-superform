/**
 * @deprecated: 行内编辑表格
 */

import { ref, shallowReactive, toRaw, watch, reactive, h, toRef, toRefs, defineComponent } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep, merge } from 'lodash-es'
import message from 'ant-design-vue/es/message'
import { useForm } from 'ant-design-vue/es/form'
import style from '../style.module.scss'
import Controls, { ButtonGroup } from '../index'
import { useControl, cloneModelsFlat, resetFields, getEffectData } from '../../utils'
import base from '../base'
import { buildInnerNode } from '../Collections'

function createEditCache(childrenMap) {
  const editMap = new WeakMap()

  const getEditInfo = (record) => {
    const raw = toRaw(record)
    let editInfo = editMap.get(raw)
    if (!editInfo) {
      editInfo = shallowReactive<Obj>({ isEdit: false })
      editMap.set(raw, editInfo)
    }
    return editInfo
  }

  const setEditInfo = (data, info) => {
    const editInfo = getEditInfo(data)
    if (!editInfo.editData) {
      const editData = reactive(cloneDeep(data))
      const { modelsMap, rules } = cloneModelsFlat(toRaw(childrenMap), editData)
      const form = useForm(editData, ref(rules))
      form.clearValidate()
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
      setEditInfo(toRaw(data), { isEdit: true })
    },
    delete({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      return listener.onDelete(items)
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
              listener.onSave(record).then(() => {
                newItems.value.splice(newItems.value.indexOf(record), 1)
                editInfo.isNew = false
                editInfo.isEdit = false
              })
            } else {
              listener.onUpdate(raw, record).then(() => {
                editInfo.isEdit = false
              })
            }
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

  const editButtonsSlot = (param, config) => {
    const editInfo = getEditInfo(param.record)
    return editInfo.isEdit ? h(ButtonGroup, { key: 'edit', config: { ...config, actions: editActions }, param }) : null
  }

  const InputNode = defineComponent({
    props: {
      option: { type: Object, required: true },
      record: { type: Object as any, required: true },
    },
    setup({ option, record }) {
      const { modelsMap, form } = getEditInfo(record)
      const model = modelsMap.get(toRaw(option))
      const ruleName = model.propChain.join('.')
      const effectData = getEffectData({ current: model.parent, value: toRef(model, 'refData') })
      const { attrs } = useControl({ option, effectData })
      const inputSlot = buildInnerNode(option, model, effectData, attrs)
      return () =>
        h(
          base.FormItem,
          {
            ...form.validateInfos[ruleName],
            class: style['table-form-item'],
          },
          inputSlot
        )
    },
  })

  const getEditRender = (option) => {
    const component = Controls[option.type]
    if (component || option.type === 'InputSlot') {
      return ({ record }) => {
        const { isEdit } = getEditInfo(record)
        if (isEdit) {
          return h(InputNode, { option, record })
        }
      }
    }
  }

  return {
    list,
    methods,
    getEditRender,
    editButtonsSlot,
  }
}
