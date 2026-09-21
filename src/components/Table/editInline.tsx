import { ref, shallowReactive, toRaw, watch, reactive, h, toRefs, defineComponent, unref, computed } from 'vue'
import { cloneDeep, isFunction } from 'lodash-es'
import { ButtonGroup, hasFormComponent } from '../index'
import { useControl, cloneModelsFlat, resetFields, getEffectData } from '../../utils'
import { getUIRender, getUIService } from '../../adapter'
import { buildInnerNode } from '../Collections'
import { formatRule } from '../../utils/buildModel'
import { merge } from '../../utils/merge'
import { FormValidationError } from '../../adapter/formValidation'

function createEditCache(childrenMap) {
  const editMap = new WeakMap()

  const getEditInfo = (record) => {
    const raw = toRaw(record)
    let editInfo = editMap.get(raw)
    if (!editInfo) {
      editInfo = shallowReactive<Obj>({ isEdit: false, saving: false })
      editMap.set(raw, editInfo)
    }
    return editInfo
  }

  const setEditInfo = (data, info) => {
    const editInfo = getEditInfo(data)
    if (!editInfo.editData) {
      const editData = reactive(cloneDeep(data))
      const { modelsMap } = cloneModelsFlat(toRaw(childrenMap), editData)
      Object.assign(editInfo, { ...info, forms: shallowReactive({}), modelsMap, editData })
    } else {
      resetFields(editInfo.editData, data)
      Object.assign(editInfo, info)
    }
  }
  return { getEditInfo, setEditInfo }
}

export default function ({ childrenMap, orgList, listener, rowEditor }) {
  // 数据监听
  const hasEditor = ref(false)
  const list = ref<Obj[]>([])
  watch(
    () => [...orgList.value],
    (org) => {
      list.value = org
      hasEditor.value = false
    },
    { immediate: true }
  )

  const { getEditInfo, setEditInfo } = createEditCache(childrenMap)

  const methods = {
    add({ index, resetData }) {
      const item = { ...resetData }
      if (index !== undefined) {
        list.value.splice(index + 1, 0, item)
      } else {
        list.value.push(item)
      }
      setEditInfo(item, {
        index,
        isEdit: true,
        isNew: true,
      })
      hasEditor.value = true
    },
    edit({ record, selectedRows, resetData }) {
      const data = record || selectedRows[0]
      setEditInfo(merge(data, resetData), { isEdit: true })
      hasEditor.value = true
    },
    delete({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      return listener.onDelete(items)
    },
  }

  const buttonMethods = {
    add: {
      disabled: () => hasEditor.value,
      onClick: methods.add,
    },
    edit: {
      disabled: (param) => hasEditor.value || !(param.record || param.selectedRows?.length === 1),
      onClick: methods.edit,
    },
    delete: {
      disabled: (param) => hasEditor.value || !(param.record || param.selectedRows?.length > 0),
      onClick: methods.delete,
    },
  }

  const editActions = [
    {
      label: '保存',
      loading: true,
      onClick: async (args) => {
        const { record } = args
        const editInfo = getEditInfo(record)
        if (editInfo.saving) return
        editInfo.saving = true
        try {
          const formService = getUIService('form')
          await Promise.all(Object.values(editInfo.forms).map((form) => formService.validate(form)))
          const custom = await rowEditor?.onSave?.({ ...args, isNew: editInfo.isNew })
          if (custom === false) return false
          // 保存完成前保留编辑状态；请求失败时草稿仍可重试，不能提前解除编辑锁。
          const data = cloneDeep(toRaw(editInfo.editData))
          if (editInfo.isNew) {
            await listener.onSave(data, editInfo.index)
            editInfo.isNew = false
          } else {
            await listener.onUpdate(data, record)
          }
          editInfo.isEdit = false
          hasEditor.value = false
        } catch (error) {
          if (error instanceof FormValidationError) getUIService('services').message('error', error.message)
          throw error
        } finally {
          editInfo.saving = false
        }
      },
    },
    {
      label: '取消',
      disabled: ({ record }) => getEditInfo(record).saving,
      onClick: async (args) => {
        const editInfo = getEditInfo(args.record)
        if (editInfo.saving) return
        const custom = await rowEditor?.onCancel?.({ ...args, isNew: editInfo.isNew })
        if (custom === false) return
        if (editInfo.isNew) {
          // 未指定插入位置时没有 index，且列表可能重排，必须按当前记录定位草稿。
          const index = list.value.findIndex((item) => toRaw(item) === toRaw(args.record))
          if (index >= 0) list.value.splice(index, 1)
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
      const { modelsMap, forms } = editInfo
      const model = modelsMap.get(toRaw(option))
      const { index, parent, refData } = toRefs(model)

      const ruleName = model.propChain.join('.')
      const effectData = getEffectData({ current: parent, value: refData, index })
      const { attrs, hidden, nativeAttrs, disabled } = useControl({ option, effectData })
      const editableRef = computed(() => !hidden.value && (isFunction(editable) ? editable(effectData) : editable))

      const inputSlot = buildInnerNode(option, model, effectData, attrs, { attrs: nativeAttrs, disabled })
      const rules = formatRule(model.rules, effectData)
      const activeRules = computed(() => (unref(attrs.disabled) || unref(hidden) ? [] : rules))
      return () =>
        editableRef.value
          ? getUIRender('form')(
              {
                ref: (instance) => {
                  if (instance) forms[ruleName] = instance
                  else delete forms[ruleName]
                },
                model: editInfo.editData,
              },
              {
                default: () =>
                  getUIRender('formItem')(
                    {
                      name: model.propChain,
                      rules: activeRules.value,
                      wrapperCol: {},
                    },
                    { default: inputSlot }
                  ),
              }
            )
          : viewRender
          ? viewRender({ ...effectData, isView: true })
          : refData.value
    },
  })

  const getEditRender = (option, viewRender) => {
    if (hasFormComponent(option.type) || option.type === 'InputSlot') {
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
    buttonMethods,
    getEditRender,
    editButtonsSlot,
  }
}
