// import { watchDebounced } from '@vueuse/core'
import { ButtonGroup } from '../components/buttons'
import { ref, reactive, h, toRaw, watch, nextTick } from 'vue'
import Controls from '../components'
import { getEffectData } from '../utils'
import type { RootTableOption } from 'src/exaTypes'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'

export function useSearchForm(tableOption: RootTableOption, tableRef, onChange) {
  const { columns, searchForm } = tableOption
  const schema = (searchForm || tableOption.searchSchema || {}) as NonNullable<RootTableOption['searchForm']>
  const formRef = ref()
  const dataSource: Obj = schema.dataSource || reactive({})

  const { buttons = {}, searchOnChange, limit, ...formOption } = schema
  const expanded = ref(false)

  const subItems: any[] = []
  schema.subItems.forEach((item: any) => {
    if (typeof item === 'string') {
      const col = columns.find((col) => col.field === item)
      col && subItems.push({ type: 'Input', ...col })
    } else {
      return subItems.push({ ...item })
    }
  })
  if (limit && subItems.length > limit) {
    subItems.forEach((item, index) => {
      if (index >= limit) {
        const hidden = item.hidden
        item.hidden = (...args) => !expanded.value || hidden?.(...args)
      }
    })
  }
  const defaultAction = {
    search() {
      onChange(dataSource)
      schema.onSubmit?.(toRaw(dataSource))
    },
    reset(data?: Obj) {
      formRef.value.resetFields(data)
      // 表单重置后会调用提交
    },
  }

  /** 手动设置查询条件 */
  const setParams = (params?: Obj) => {
    Object.assign(dataSource, params)
    // params &&
    //   Object.keys(params).forEach((key) => {
    //     if (key in dataSource) dataSource[key] = params[key]
    //   })
  }

  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons }
  buttonsConfig.actions ??= !searchOnChange ? ['search', 'reset'] : undefined

  if (buttonsConfig.actions?.length) {
    buttonsConfig.actions.push({
      label: () => (expanded.value ? ['收起 ', h(UpOutlined)] : ['展开 ', h(DownOutlined)]),
      attrs: { type: 'link' },
      onClick: () => (expanded.value = !expanded.value),
      hidden: !limit || subItems.length <= limit,
    } as any)
    subItems.push({
      type: 'InfoSlot',
      align: 'right',
      span: 'auto',
      render: () =>
        h(ButtonGroup, {
          option: buttonsConfig,
          methods: defaultAction,
          effectData: getEffectData({ table: tableRef, form: formRef }),
        }),
    })
  }
  // 更新初始化数据
  const unWatch = watch(formRef, () => {
    onChange(dataSource)
    // 立即查询监听
    if (searchOnChange) {
      watch(dataSource, onChange)
    }
    unWatch()
  })

  const formNode = () =>
    h(Controls.Form, {
      option: {
        ...formOption,
        ignoreRules: true,
        dataSource,
        subItems,
      },
      ref: formRef,
      onSubmit: defaultAction.search,
      onReset: defaultAction.search,
    })
  return { formNode, formRef, ...defaultAction, dataSource }
}
