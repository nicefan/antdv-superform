import { Modal } from 'ant-design-vue'
import type { ButtonItem } from '../../exaTypes'
import { globalProps } from '../../plugin'

const getDefault = () => {
  return {
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
      // onClick(param) {
      //   console.log(param)
      // },
    },
    reset: {
      label: '重置',
    },
  }
}

function buildDefaultActions(methods) {
  const actions: Obj = getDefault()
  Object.keys(methods).forEach((key) => {
    if (typeof methods[key] === 'function') {
      actions[key] && (actions[key].onClick = methods[key])
    } else {
      Object.assign(actions[key], methods[key])
    }
  })
  return actions
}

export function mergeActions(actions, methods = {}) {
  const defaultActions = buildDefaultActions(methods)

  const actionBtns: ButtonItem[] = []

  if (Array.isArray(actions)) {
    actions.forEach((item) => {
      const name = typeof item === 'string' ? item : item.name
      const { onClick: innerMethod, ...config } = defaultActions[name] || {}
      if (typeof item === 'object') {
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } })
      }
      const meta = { label: config.label, ...item.meta }
      const _onClick = item.onClick

      const _action = async (text, method) => {
        if (text) {
          return new Promise((resolve) =>
            Modal.confirm({
              title: text,
              okText: '确定',
              cancelText: '取消',
              ...globalProps.Modal,
              onOk() {
                method()
                resolve(undefined)
              },
            })
          )
        } else {
          return method()
        }
      }
      config.onClick = (param) => {
        if (_onClick && innerMethod) {
          // 内置操作动作，自定义按钮时，需要在onClick中手动执行。
          _onClick(param, (exParam: Obj = {}) => {
            const { confirmText = config.confirmText, __param } = exParam
            return _action(confirmText, () => innerMethod?.({ ...param, meta, ...__param }))
          })
        } else {
          _action(config.confirmText, () => (innerMethod || _onClick)?.({ ...param, meta }))
        }
      }

      actionBtns.push(config)
    })
  }
  return actionBtns
}
