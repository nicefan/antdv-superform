import { Modal } from 'ant-design-vue'

const _defaultActions = {
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

function buildDefaultActions(methods) {
  const actions: Obj = { ..._defaultActions }
  Object.keys(methods).forEach((key) => {
    if (typeof methods[key] === 'function') {
      actions[key] && (actions[key].onClick = methods[key])
    } else {
      actions[key] = { ..._defaultActions[key], ...methods[key] }
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
      if (typeof item === 'object') {
        const innerMethod = config.onClick
        const _onClick = item.onClick
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } })
        if (_onClick) {
          config.onClick = (param) => {
            const action = async (text = config.confirmText) => {
              if (text) {
                return new Promise((resolve) =>
                  Modal.confirm({
                    title: text,
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                      innerMethod?.(param)
                      resolve(undefined)
                    },
                  })
                )
              } else {
                item.method?.(param)
              }
            }
            _onClick(param, action)
          }
        }
      }
      actionBtns.push(config)
    })
  }
  return actionBtns
}
