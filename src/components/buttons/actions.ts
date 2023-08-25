import { Modal } from 'ant-design-vue'

const getDefault = () => {
  return {
    add: {
      label: '新增',
      attrs: {
        type: 'primary',
      },
    },
    del: {
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
    view: {
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
      const config = { ...defaultActions[name] }
      const innerMethod = config.onClick
      const meta = { label: config.label }
      if (typeof item === 'object') {
        const innerMethod = config.onClick
        const _onClick = item.onClick
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } })
        Object.assign(meta, item.meta)
        config.onClick = (param) => {
          if (_onClick) {
            // 内置操作动作，自定义按钮时，需要在onClick中手动执行。
            const action = async (text = config.confirmText) => {
              if (text) {
                return new Promise((resolve) =>
                  Modal.confirm({
                    title: text,
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                      innerMethod?.({ ...param, meta })
                      resolve(undefined)
                    },
                  })
                )
              } else {
                return innerMethod?.({ ...param, meta })
              }
            }
            _onClick(param, action)
          } else {
            innerMethod?.({ ...param, meta })
          }
        }
      } else {
        config.onClick = (param) => innerMethod({ ...param, meta })
      }
      actionBtns.push(config)
    })
  }
  return actionBtns
}
