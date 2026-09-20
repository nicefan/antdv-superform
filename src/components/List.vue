<script lang="ts">
import {
  defineComponent,
  h,
  inject,
  nextTick,
  reactive,
  ref,
  shallowRef,
  toRaw,
  toRef,
  watch,
  type PropType,
} from 'vue'
import { cloneDeep, get } from 'lodash-es'
import { nanoid } from 'nanoid'
import { cloneModels, updateModelIndex } from '../utils/buildModel'
import { toNode } from '../utils'
import { globalProps } from '../plugin'
import { createModal } from '../superModal'
import { useButtonState } from './buttons/useButtonState'
import Form from './Form.vue'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { type UIContainerItem, getUIRender } from '../adapter'
import type { ExtListOption } from '../exaTypes'

/** 三种列表共用行管理；Schema 入口只选择容器，不复制数组与编辑流程。 */
export default defineComponent({
  name: 'CollectionList',
  inheritAttrs: false,
  props: {
    option: { type: Object as PropType<ExtListOption>, required: true },
    model: { type: Object as PropType<ModelDataGroup>, required: true },
    effectData: { type: Object as PropType<Obj>, required: true },
    isView: Boolean,
  },
  setup(props, { attrs, slots }) {
    const source = toRef(props.model, 'refData')
    const rows = shallowRef<any[]>([])
    const cache = new WeakMap<object, any>()
    const activeKey = ref<string | number>()
    const expandedKeys = ref<(string | number)[]>([])
    const formRef = ref<any>()
    const draft = ref<Obj>({})
    const editorKey = ref(0)
    // 每次打开重建表单，隔离初始值和校验；草稿深拷贝避免取消时污染原数组。
    const editor =
      props.option.editModal &&
      createModal(
        () =>
          h(Form, {
            key: editorKey.value,
            option: {
              ...props.option.editModal?.form,
              subItems: props.option.editModal?.form?.subItems || props.option.columns,
            },
            dataSource: draft.value,
            onRegister: (form) => {
              formRef.value = form
            },
          }),
        { maskClosable: false, ...props.option.editModal.modalProps }
      )

    const activateAddedRow = (record: Obj) => {
      void nextTick(() => {
        const added = rows.value.find((row) => toRaw(row.model.refData) === toRaw(record))
        if (!added) return
        if (props.option.type === 'TabList') activeKey.value = added.key
        if (props.option.type === 'CollapseList' && !expandedKeys.value.includes(added.key)) {
          expandedKeys.value = [...expandedKeys.value, added.key]
        }
      })
    }
    const openEditor = (row?: any, anchor?: any | null) => {
      if (props.isView || !editor) return
      draft.value = cloneDeep(row?.model.refData || {})
      editorKey.value++
      return editor.openModal({
        title: props.option.editModal?.modalProps?.title || (row ? '编辑' : '新增'),
        onOk: async () => {
          if (props.isView) return
          const data = await formRef.value.submit()
          if (row) {
            // 以稳定行模型定位，弹窗期间重排不能把数据写回另一行。
            const index = rows.value.indexOf(row)
            if (index < 0) throw new Error('当前记录已删除')
            Object.assign(source.value[index], data)
          } else {
            const record = data
            if (anchor === null) source.value.unshift(record)
            else {
              // 保存时重新定位稳定行身份，避免弹窗期间重排后插错位置。
              const index = rows.value.indexOf(anchor)
              if (index < 0) throw new Error('新增位置对应的记录已删除')
              source.value.splice(index + 1, 0, record)
            }
            activateAddedRow(record)
          }
        },
      })
    }
    const methods = {
      add: ({ listItemKey }: Obj = {}) => {
        if (props.isView) return
        const anchor = rows.value.find((item) => item.key === listItemKey)
        if (listItemKey !== undefined && !anchor) throw new Error('新增位置对应的记录已删除')
        if (editor) return openEditor(undefined, anchor || null)
        const record = {}
        if (anchor) source.value.splice(rows.value.indexOf(anchor) + 1, 0, record)
        else source.value.unshift(record)
        activateAddedRow(record)
      },
      edit: ({ listItemKey }: Obj) => {
        const row = rows.value.find((item) => item.key === listItemKey)
        if (row) return openEditor(row)
      },
      delete: ({ listItemKey }: Obj) => {
        // 确认框打开后数组可能重排，不能使用点击时捕获的 index。
        const index = rows.value.findIndex((item) => item.key === listItemKey)
        if (!props.isView && index >= 0) source.value.splice(index, 1)
      },
    }
    const rootSlots = inject<Obj>('rootSlots', {})
    const buttons = (config: any, effectData: Obj, actions: string[]) => {
      if (config === false) return undefined
      return useButtonState(
        {
          ...globalProps.rowButtons,
          actions,
          ...(Array.isArray(config) ? { actions: config } : config),
          buttonProps: {
            ...globalProps.rowButtons?.buttonProps,
            ...(!Array.isArray(config) && config?.buttonProps),
          },
        },
        effectData,
        methods,
        rootSlots,
        () => !props.isView
      )
    }
    const headerButtons = buttons(props.option.buttons, props.effectData, ['add'])
    watch(
      [() => [...source.value], () => [...props.model.propChain]],
      () => {
        const previous = rows.value
        const activeIndex = previous.findIndex((row) => row.key === activeKey.value)
        // 同一对象允许多次出现，每个出现位置仍需独立模型与校验路径。
        const used = new Map<object, number>()
        const keys = new Set<string | number>()
        rows.value = source.value.map((record, index) => {
          const raw = toRaw(record)
          const occurrence = used.get(raw) || 0
          used.set(raw, occurrence + 1)
          const cached = cache.get(raw) || []
          let row = cached[occurrence]
          if (!row) {
            const refData = ref(record)
            const { modelsMap } = cloneModels(props.model.listData.modelsMap, refData, props.model.propChain, index)
            row = {
              key: occurrence ? nanoid(12) : get(record, String(attrs.rowKey || 'id')) ?? nanoid(12),
              model: reactive({ refData, children: modelsMap, index, propChain: [...props.model.propChain, index] }),
              effectData: reactive({ parent: props.effectData, current: source, index, record }),
            }
            row.buttons = buttons(
              props.option.rowButtons,
              row.effectData,
              editor ? ['add', 'edit', 'delete'] : ['add', 'delete']
            )
            cached[occurrence] = row
            cache.set(raw, cached)
          }
          if (keys.has(row.key)) row.key = nanoid(12)
          keys.add(row.key)
          row.effectData.listItemKey = row.key
          row.model.refData = record
          row.effectData.record = record
          updateModelIndex(row.model, [...props.model.propChain, index], index)
          row.effectData.index = index
          return row
        })
        if (!rows.value.some((row) => row.key === activeKey.value)) {
          activeKey.value = rows.value[Math.min(Math.max(activeIndex, 0), rows.value.length - 1)]?.key
        }
        const removedExpandedIndex = previous.findIndex(
          (row) => expandedKeys.value.includes(row.key) && !rows.value.some((next) => next.key === row.key)
        )
        expandedKeys.value = expandedKeys.value.filter((key) => rows.value.some((row) => row.key === key))
        if (removedExpandedIndex >= 0 && rows.value.length) {
          const fallback = rows.value[Math.min(removedExpandedIndex, rows.value.length - 1)].key
          if (!expandedKeys.value.includes(fallback)) expandedKeys.value.push(fallback)
        }
      },
      { immediate: true }
    )

    return () => {
      const { option, isView } = props
      const { span = 24 } = attrs
      const containerAttrs = { ...attrs }
      delete containerAttrs.rowKey
      delete containerAttrs.span
      const title = option.title ?? option.label
      const add = !isView && headerButtons ? () => headerButtons.render() : undefined
      const header =
        slots.title || title || add
          ? () =>
              getUIRender('space')(
                {},
                {
                  default: () => [slots.title ? slots.title() : toNode(title, props.effectData), add?.()],
                }
              )
          : undefined
      const items: UIContainerItem[] = rows.value.map((row, index) => ({
        key: row.key,
        title: () =>
          toNode(option.titleField ? get(row.model.refData, option.titleField) : String(index + 1), row.effectData),
        extra: !isView && option.type !== 'TabList' && row.buttons ? () => row.buttons.render() : undefined,
        content: () =>
          isView || editor
            ? h(DetailLayout, { option, modelsMap: row.model.children, effectData: row.effectData })
            : h(Collections, { option, model: row.model, effectData: row.effectData }),
      }))
      const content = () => {
        if (!items.length) return getUIRender('empty')()
        if (option.type === 'TabList')
          return getUIRender('tabs')({
            attrs: containerAttrs,
            items,
            activeKeys: activeKey.value,
            onActiveChange: (key) => {
              activeKey.value = key
            },
            extra: !isView ? () => rows.value.find((row) => row.key === activeKey.value)?.buttons?.render() : undefined,
          })
        if (option.type === 'CollapseList')
          return getUIRender('collapse')({
            attrs: containerAttrs,
            items,
            activeKeys: expandedKeys.value,
            onActiveChange: (keys) => {
              expandedKeys.value = Array.isArray(keys) ? keys : [keys]
            },
          })
        return getUIRender('row')(
          { gutter: option.gutter ?? [16, 16], ...option.rowProps },
          {
            default: () =>
              items.map((item) =>
                getUIRender('col')(
                  { key: item.key, span },
                  {
                    default: () =>
                      getUIRender('card')({
                        attrs: containerAttrs,
                        title: item.title,
                        extra: item.extra,
                        content: item.content,
                      }),
                  }
                )
              ),
          }
        )
      }
      return [getUIRender('group')({ title: header, content }), editor && h(editor.modalSlot)]
    }
  },
})
</script>
