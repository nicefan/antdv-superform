import { ref, shallowReactive, toRaw, watch, reactive, h, toRef, toRefs, defineComponent, unref, computed } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep, isFunction, merge } from 'lodash-es'
import { message, Form } from 'ant-design-vue'
import Controls, { ButtonGroup } from '../index'
import { useControl, cloneModelsFlat, resetFields, getEffectData } from '../../utils'
import base from '../base'
import { buildInnerNode } from '../Collections'
import { formatRule } from '../../utils/buildModel'

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
      const form = Form.useForm(editData, ref(rules))
      form.clearValidate()
      Object.assign(editInfo, { ...info, form, modelsMap, editData })
    } else {
      resetFields(editInfo.editData, data)
      Object.assign(editInfo, info)
    }
  }
  return { getEditInfo, setEditInfo }
}

export default function ({ childrenMap, orgList, listener, rowEditor }) {
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
  const hasEditor = ref(false)
  const banEdit = computed(() => rowEditor?.singleEdit && hasEditor.value)
  const checkEdit = () => {
    if (banEdit.value) {
      message.error('只能同时编辑一行！')
      return false
    } else {
      return (hasEditor.value = true)
    }
  }
  const methods = {
    add() {
      if (!checkEdit()) return
      const item = { '_ID_': nanoid(12) }
      newItems.value.push(item)
      setEditInfo(item, {
        isEdit: true,
        isNew: true,
      })
      hasEditor.value = true
    },
    edit({ record, selectedRows }) {
      if (!checkEdit()) return
      const data = record || selectedRows[0]
      setEditInfo(toRaw(data), { isEdit: true })
      hasEditor.value = true
    },
    delete({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      return listener.onDelete(items)
    },
  }

  const editActions = [
    {
      label: '保存',
      loading: true,
      onClick: async (args) => {
        const { record } = args
        const editInfo = getEditInfo(record)
        return editInfo.form
          .validate()
          .then(async () => {
            const raw = toRaw(editInfo.form.modelRef)
            const custom = await rowEditor?.onSave?.({ ...args, isNew: editInfo.isNew })
            if (custom === false) return false
            if (editInfo.isNew) {
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
            hasEditor.value = false
          })
          .catch((err) => {
            console.log('error', err)
            err?.errorFields && message.error(err.errorFields[0].errors[0])
          })
      },
    },
    {
      label: '取消',
      onClick: async (args) => {
        const editInfo = getEditInfo(args.record)
        const custom = await rowEditor?.onCancel?.({ ...args, isNew: editInfo.isNew })
        if (custom === false) return
        if (editInfo.isNew) {
          newItems.value.splice(newItems.value.indexOf(args.record), 1)
        } else {
          // editInfo.isEdit = false
          // editInfo.form.resetFields(record)
        }
        editInfo.isEdit = false
        hasEditor.value = false
      },
    },
  ]

  const editButtonsSlot = (param, config) => {
    const editInfo = getEditInfo(param.record)
    return editInfo.isEdit
      ? h(ButtonGroup, { key: 'edit', option: { ...config, actions: editActions }, effectData: param })
      : null
  }

  const InputNode = defineComponent({
    props: {
      option: { type: Object, required: true },
      editInfo: { type: Object as any, required: true },
      viewRender: { type: Function },
    },

    setup({ option, editInfo, viewRender }) {
      const { editable = true } = option
      const { modelsMap, form } = editInfo
      const model = modelsMap.get(toRaw(option))
      const { index, parent, refData } = toRefs(model)

      const ruleName = model.propChain.join('.')
      const effectData = getEffectData({ current: parent, value: refData, index })
      const { attrs, hidden } = useControl({ option, effectData })
      const editableRef = computed(() => !hidden.value && (isFunction(editable) ? editable(effectData) : editable))

      const inputSlot = buildInnerNode(option, model, effectData, attrs)
      const rules = formatRule(model.rules, effectData)
      if (rules) {
        form.rulesRef.value[ruleName] = computed(() => (unref(attrs.disabled) || unref(hidden) ? [] : rules))
      }
      return () =>
        editableRef.value
          ? h(
              base.FormItem,
              {
                ...form.validateInfos[ruleName],
              },
              inputSlot
            )
          : viewRender
          ? viewRender({ ...effectData, isView: true })
          : refData.value
    },
  })

  const getEditRender = (option, viewRender) => {
    const component = Controls[option.type]
    if (component || option.type === 'InputSlot') {
      return ({ record }) => {
        const editInfo = getEditInfo(record)
        if (editInfo.isEdit) {
          return h(InputNode, { option, editInfo, viewRender })
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
