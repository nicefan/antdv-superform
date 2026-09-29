import { shallowRef, shallowReactive, toRaw, reactive, h, toRefs, defineComponent, unref, computed, nextTick, onBeforeUnmount, inject } from 'vue'
import { cloneDeep, isFunction } from 'lodash-es'
import { ButtonGroup, getSchemaTypeSource, hasFormComponent } from '../index'
import { useControl, cloneModelsFlat, getEffectData } from '../../utils'
import { getUIRender, getUIService } from '../../adapter'
import { buildInnerNode } from '../Collections'
import { formatRule } from '../../utils/buildModel'
import { merge } from '../../utils/merge'

export default function ({ childrenMap, orgList, listener, rowEditor, rowKey }) {
  // 草稿按稳定行键独立保存，表单路径使用独立编号，避免不同记录的同名字段串联。
  const sessions = shallowReactive(new Map<PropertyKey, Obj>())
  // 补充校验项共享草稿值，但使用独立路径，避免与可见单元格互相注销原生字段登记。
  const formModel = computed(() => Object.fromEntries([...sessions.values()].flatMap(session => [
    [session.id, session.editData],
    [session.validationId, session.editData],
  ])))
  const formRef = shallowRef()
  let validation: Promise<unknown> = Promise.resolve()
  let sequence = 0
  const locked = computed(() => !!rowEditor?.singleEdit && sessions.size > 0)
  const getEditInfo = (record): Obj => sessions.get(rowKey(record)) || { isEdit: false }
  const finishEdit = (session) => {
    session.isEdit = false
    if (sessions.get(session.key) === session) sessions.delete(session.key)
  }
  const { onLoaded } = inject<{ onLoaded?: (callback: Fn) => () => void }>('exaProvider', {})
  // 加载成功后再清理单行草稿；重建列或卸载表格时释放订阅。
  const stopLoaded = onLoaded?.(() => {
    if (rowEditor?.singleEdit) {
      sessions.forEach((session) => { session.isEdit = false })
      sessions.clear()
    }
  })
  onBeforeUnmount(() => stopLoaded?.())
  const list = computed(() => {
    const records = [...orgList.value]
    for (const session of sessions.values()) {
      if (session.isNew) {
        const anchor = session.anchorKey === undefined ? records.length - 1 : records.findIndex(row => rowKey(row) === session.anchorKey)
        records.splice(anchor < 0 ? Math.min(session.index, records.length) : anchor + 1, 0, session.record)
      }
    }
    return records
  })
  const startEdit = (record, data, extra: Obj) => {
    const editData = reactive(cloneDeep(data))
    const id = `row_${++sequence}`
    const { modelsMap, rules } = cloneModelsFlat(toRaw(childrenMap), editData, [id])
    const session = shallowReactive({
      id,
      validationId: `${id}_validation`,
      record, key: rowKey(record), editData, modelsMap, rules: shallowReactive(rules), fields: shallowReactive({}),
      isEdit: true, saving: false, ...extra,
    })
    sessions.set(session.key, session)
  }
  const methods = {
    add({ index, record, resetData } = {} as Obj) {
      if (locked.value) return
      const anchor = record ?? (index === undefined ? undefined : orgList.value[index])
      if (index !== undefined && !anchor) throw new Error('新增位置已失效，请重新选择插入位置')
      const item = { ...resetData }
      const anchorKey = anchor && rowKey(anchor)
      const position = anchor ? orgList.value.findIndex(row => rowKey(row) === anchorKey) + 1 : orgList.value.length
      startEdit(item, item, { isNew: true, index: position, anchorKey })
    },
    edit({ record, selectedRows, resetData }) {
      if (locked.value) return
      const data = record || selectedRows?.[0]
      if (!data || getEditInfo(data).isEdit) return
      startEdit(data, merge({}, data, resetData), { isNew: false })
    },
    delete({ record, selectedRows }) {
      const items = record ? [record] : selectedRows || []
      if (locked.value || items.some(item => getEditInfo(item).isEdit)) return
      return listener.onDelete(items)
    },
  }
  const buttonMethods = {
    add: {
      disabled: () => locked.value,
      onClick: methods.add,
    },
    edit: {
      disabled: (param) => locked.value || !(param.record || param.selectedRows?.length === 1) ||
        !!getEditInfo(param.record || param.selectedRows?.[0] || {}).isEdit,
      onClick: methods.edit,
    },
    delete: {
      disabled: (param) => locked.value || !(param.record || param.selectedRows?.length > 0) ||
        (param.record ? [param.record] : param.selectedRows || []).some(item => getEditInfo(item).isEdit),
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
          // 等待显隐切换完成，让只读字段的补充校验项先注册到整行 Form。
          await nextTick()
          if (!editInfo.isEdit) return
          if (!formRef.value) throw new Error('行编辑表单尚未就绪')
          // 共用 Form 的显式校验串行执行，避免原生 Form 将另一行的校验判为过期；接口请求仍可并行。
          const pending = validation.then(() => {
            if (!editInfo.isEdit) return
            const paths = [...editInfo.modelsMap.values()].filter((model: any) =>
              editInfo.rules[model.propChain.join('.')]
            ).map((model: any) => editInfo.fields[model.propChain.join('.')]?.editable.value
              ? model.propChain
              : [editInfo.validationId, ...model.propChain.slice(1)])
            // 原生表单的空路径数组表示全量校验，无规则行应直接放行。
            if (paths.length) return formService.validate(formRef.value, paths)
          })
          validation = pending.catch(() => {})
          await pending
          if (!editInfo.isEdit) return
          const custom = await rowEditor?.onSave?.({ ...args, isNew: editInfo.isNew })
          if (custom === false || !editInfo.isEdit) return false
          // 保存完成前保留编辑状态；请求失败时草稿仍可重试，不能提前解除编辑锁。
          const data = cloneDeep(toRaw(editInfo.editData))
          if (editInfo.isNew) {
            const index = editInfo.anchorKey === undefined ? undefined : orgList.value.findIndex(row => rowKey(row) === editInfo.anchorKey)
            if (index === -1) throw new Error('新增锚点已不存在，请取消后重新选择插入位置')
            await listener.onSave(data, index)
            editInfo.isNew = false
          } else {
            await listener.onUpdate(data, record)
          }
          finishEdit(editInfo)
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
          finishEdit(editInfo)
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
      const { modelsMap } = editInfo
      const model = modelsMap.get(toRaw(option))
      const { index, parent, refData } = toRefs(model)

      const ruleName = model.propChain.join('.')
      const effectData = getEffectData({ current: parent, value: refData, index })
      const { attrs, hidden, nativeAttrs, disabled } = useControl({ option, effectData })
      const editableRef = computed(() => !hidden.value && (isFunction(editable) ? editable(effectData) : editable))

      const inputSlot = buildInnerNode(option, model, effectData, attrs, { attrs: nativeAttrs, disabled })
      const rules = formatRule(model.rules, effectData)
      const activeRules = computed(() => (unref(attrs.disabled) || unref(hidden) ? [] : rules))
      const field = { editable: editableRef }
      editInfo.fields[ruleName] = field
      if (rules) editInfo.rules[ruleName] = activeRules
      onBeforeUnmount(() => {
        if (editInfo.fields[ruleName] === field) delete editInfo.fields[ruleName]
      })
      return () =>
        editableRef.value
          ? getUIRender('formItem')(
              {
                name: model.propChain,
                rules: activeRules.value,
                wrapperCol: {},
                class: 'sup-table-edit-item',
              },
              { default: inputSlot }
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
          return h(InputNode, { key: editInfo.id, option, editInfo, viewRender })
        }
      }
    }
  }

  const RowForm = defineComponent({
    setup(_, { slots }) {
      return () => {
        return getUIRender('form')(
          {
            ref: formRef,
            model: formModel.value,
            class: 'sup-table-inline-form',
          },
          {
            default: () => [
              slots.default?.(),
              // 未展示或只读列仍须注册整行规则，不能依赖输入框是否挂载。
              ...[...sessions.values()].map(session => h(
                'div',
                { key: session.id, style: { display: 'none' } },
                [...session.modelsMap.values()].flatMap((model: any) => {
                  const name = model.propChain.join('.')
                  if (!session.rules[name] || session.fields[name]?.editable.value) return []
                  return [getUIRender('formItem')({
                    key: name,
                    name: [session.validationId, ...model.propChain.slice(1)],
                    rules: unref(session.rules[name]),
                  })]
                })
              )),
            ],
          }
        )
      }
    },
  })

  return {
    list,
    methods,
    buttonMethods,
    getEditRender,
    editButtonsSlot,
    wrapTable: (render) => h(RowForm, null, { default: render }),
  }
}
