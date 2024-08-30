import { Modal } from 'ant-design-vue'
import type { ButtonItem } from '../../exaTypes'
import { globalProps, globalConfig } from '../../plugin'
import { defaults, merge } from 'lodash-es'
import { isRef, ref } from 'vue'
import { toNode } from '../../utils'

const getDefault = () => {
  return merge(
    {
      add: {
        label: '新增',
        attrs: {
          type: 'primary',
        },
      },
      delete: {
        label: '删除',
        attrs: {
          danger: true,
        },
        confirmText: '确定要删除吗？',
        disabled: (param) => !param.record && !(param.selectedRowKeys?.length > 0),
      },
      edit: {
        label: '修改',
        disabled: (param) => !param.record && !(param.selectedRowKeys?.length === 1),
      },
      detail: {
        label: '查看',
        disabled: (param) => !param.record && !(param.selectedRowKeys?.length === 1),
      },
      submit: {
        label: '确定',
        attrs: {
          type: 'primary',
        },
      },
      search: {
        label: '查询',
        attrs: {
          type: 'primary',
        },
      },
      reset: {
        label: '重置',
      },
    },
    globalConfig.defaultButtons
  )
}

function buildDefaultActions(methods) {
  const actions: Obj = getDefault()
  Object.keys(methods).forEach((key) => {
    if (actions[key]) {
      if (typeof methods[key] === 'function') {
        actions[key].onClick = methods[key]
      } else {
        merge(actions[key], { attrs: { title: actions[key].label } }, methods[key])
      }
    } else {
      actions[key] = methods[key]
    }
  })
  return actions
}

export function mergeActions(actions, methods = {}, commonAttrs = {}) {
  const defaultActions = buildDefaultActions(methods)

  const actionBtns: ButtonItem[] = []

  if (Array.isArray(actions)) {
    actions.forEach((item) => {
      const name = typeof item === 'string' ? item : item.name
      const { onClick: innerMethod, ...config } = defaultActions[name] || {}
      config.attrs = defaults({ ...commonAttrs }, config.attrs)
      if (typeof item === 'object') {
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } })
      }
      const loading = ref<boolean | Obj>(false)
      const __loading = config.attrs.loading
      const isCustomLoading = isRef(__loading)
      if (!isCustomLoading && __loading) {
        config.attrs.loading = loading
      }
      const setLoading = (flag) => {
        if (!isCustomLoading) {
          loading.value = flag ? __loading : false
        }
      }
      const meta = { label: config.label, ...item.meta }
      const _onClick = item.onClick

      const _action = (text, method, param) => {
        if (text) {
          Modal.confirm({
            title: () => toNode(text, param),
            okText: '确定',
            cancelText: '取消',
            ...globalProps.Modal,
            onOk: method,
          })
        } else {
          setLoading(true)
          Promise.resolve(method()).finally(() => {
            setLoading(false)
          })
        }
      }
      config.onClick = (param) => {
        const metaParam = { ...param, meta }
        if (_onClick && innerMethod) {
          // 内置操作动作，自定义按钮时，需要在onClick中手动执行。
          _action(
            config.confirmText,
            () => _onClick(metaParam, async (__param = metaParam) => innerMethod(__param)),
            param
          )
        } else {
          _action(config.confirmText, () => (innerMethod || _onClick)?.(metaParam), param)
        }
      }

      actionBtns.push(config)
    })
  }
  return actionBtns
}
