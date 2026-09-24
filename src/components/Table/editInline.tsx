import { shallowRef, shallowReactive, toRaw, reactive, h, toRefs, defineComponent, unref, computed } from 'vue'
import { cloneDeep, isFunction } from 'lodash-es'
import { ButtonGroup, getSchemaTypeSource, hasFormComponent } from '../index'
import { useControl, cloneModelsFlat, getEffectData } from '../../utils'
import { getUIRender, getUIService } from '../../adapter'
import { buildInnerNode } from '../Collections'
import { formatRule } from '../../utils/buildModel'
import { merge } from '../../utils/merge'

export default function ({ childrenMap, orgList, listener, rowEditor, rowKey }) {
  // 只允许一个活动草稿，以稳定行键关联外部对象；重排、刷新不再清除编辑锁。
  const active = shallowRef<Obj>()
  const hasEditor = computed(() => !!active.value?.isEdit)
  const getEditInfo = (record): Obj => {
    const session = active.value
    return session?.isEdit && rowKey(record) === session.key ? session : { isEdit: false }
  }
  const list = computed(() => {
    const records = [...orgList.value]
    const session = active.value
    if (!session?.isEdit) return records
    if (session.isNew) {
      const anchor = session.anchorKey === undefined ? records.length - 1 : records.findIndex(row => rowKey(row) === session.anchorKey)
      records.splice(anchor < 0 ? Math.min(session.index, records.length) : anchor + 1, 0, session.record)
    } else if (!records.some(row => rowKey(row) === session.key)) {
      // 目标被移除时保留可取消的草稿，不静默丢失输入，也不能保存回不存在的行。
      records.splice(Math.min(session.index, records.length), 0, session.record)
    }
    return records
  })
  const startEdit = (record, data, extra: Obj) => {
    const editData = reactive(cloneDeep(data))
    const { modelsMap } = cloneModelsFlat(toRaw(childrenMap), editData)
    active.value = shallowReactive({
      record, key: rowKey(record), editData, modelsMap, forms: shallowReactive({}),
      isEdit: true, saving: false, ...extra,
    })
  }
  const methods = {
    add({ index, record, resetData } = {} as Obj) {
      if (hasEditor.value) return
      const anchor = record ?? (index === undefined ? undefined : orgList.value[index])
      if (index !== undefined && !anchor) throw new Error('新增位置已失效，请重新选择插入位置')
      const item = { ...resetData }
      const anchorKey = anchor && rowKey(anchor)
      const position = anchor ? orgList.value.findIndex(row => rowKey(row) === anchorKey) + 1 : orgList.value.length
      startEdit(item, item, { isNew: true, index: position, anchorKey })
    },
    edit({ record, selectedRows, resetData }) {
      if (hasEditor.value) return
      const data = record || selectedRows?.[0]
      const index = data ? orgList.value.findIndex(row => rowKey(row) === rowKey(data)) : -1
      if (index < 0) throw new Error('编辑记录已不存在，请重新选择')
      startEdit(orgList.value[index], merge({}, orgList.value[index], resetData), { isNew: false, index })
    },
    delete({ record, selectedRows }) {
      if (hasEditor.value) return
      return listener.onDelete(record ? [record] : selectedRows)
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
      name: 'save',
      attrs: { loading: true },
      onClick: async (args) => {
        const { record } = args
        const editInfo = getEditInfo(record)
        if (!editInfo.isEdit || editInfo.saving) return
        editInfo.saving = true
        try {
          const formService = getUIService('form')
          await Promise.all(Object.values(editInfo.forms).map((form) => formService.validate(form)))
          const custom = await rowEditor?.onSave?.({ ...args, isNew: editInfo.isNew })
          if (custom === false) return false
          // 保存完成前保留编辑状态；请求失败时草稿仍可重试，不能提前解除编辑锁。
          const data = cloneDeep(toRaw(editInfo.editData))
          if (editInfo.isNew) {
            const index = editInfo.anchorKey === undefined ? undefined : orgList.value.findIndex(row => rowKey(row) === editInfo.anchorKey)
            if (index === -1) throw new Error('新增锚点已不存在，请取消后重新选择插入位置')
            await listener.onSave(data, index)
            editInfo.isNew = false
          } else {
            const target = orgList.value.find(row => rowKey(row) === editInfo.key)
            if (!target) throw new Error('编辑记录已被移除，请取消本次编辑')
            await listener.onUpdate(data, target)
          }
          editInfo.isEdit = false
          active.value = undefined
        } catch (error) {
          if (error instanceof Error) getUIService('services').message('error', error.message)
          throw error
        } finally {
          editInfo.saving = false
        }
      },
    },
    {
      name: 'cancel',
      disabled: ({ record }) => getEditInfo(record).saving,
      onClick: async (args) => {
        const editInfo = getEditInfo(args.record)
        if (!editInfo.isEdit || editInfo.saving) return
        editInfo.saving = true
        try {
          const custom = await rowEditor?.onCancel?.({ ...args, isNew: editInfo.isNew })
          if (custom === false) return
          editInfo.isEdit = false
          active.value = undefined
        } finally {
          editInfo.saving = false
        }
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
    // 依据字段声明识别 Adapter 输入，不能把项目组件注册表当作全部可编辑字段。
    if (getSchemaTypeSource(option.type) === 'enhanced' || hasFormComponent(option.type) || option.type === 'InputSlot') {
      return ({ record }) => {
        const editInfo = getEditInfo(record)
        if (editInfo.isEdit) {
          return h(InputNode, { key: editInfo.key, option, editInfo, viewRender })
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
