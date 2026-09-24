import type { ButtonItem } from '../../exaTypes'
import { globalProps, globalConfig } from '../../plugin'
import { defaults, merge } from 'lodash-es'
import { isRef, ref, type Ref } from 'vue'
import { toNode } from '../../utils'
import { getUIService } from '../../adapter'
import { builtInButtons, buttonText } from './defaults'

const getDefault = () => {
  const actions: Obj<ButtonItem> = merge(
    {},
    builtInButtons,
    globalProps.ButtonActions,
    globalConfig.defaultButtons
  )
  // merge 会忽略 undefined，这里允许显式清空全局默认图标。
  Object.entries(globalConfig.defaultButtons || {}).forEach(([name, config]) => {
    if (Object.prototype.hasOwnProperty.call(config, 'icon')) actions[name].icon = config.icon
  })
  return actions
}

function buildDefaultActions(methods) {
  const actions: Obj = getDefault()
  Object.keys(methods).forEach((key) => {
    if (actions[key]) {
      if (typeof methods[key] === 'function') {
        actions[key].onClick = methods[key]
      } else {
        const { icon, ...config } = methods[key]
        merge(actions[key], config)
        if (Object.prototype.hasOwnProperty.call(methods[key], 'icon')) actions[key].icon = icon
      }
    } else {
      actions[key] = typeof methods[key] === 'function' ? { onClick: methods[key] } : methods[key]
    }
  })
  return actions
}

export function mergeActions(actions, methods = {}, commonAttrs = {}) {
  const defaultActions = buildDefaultActions(methods)

  const actionBtns: (ButtonItem & { pending: Ref<boolean> })[] = []

  if (Array.isArray(actions)) {
    actions.forEach((item) => {
      const name = typeof item === 'string' ? item : item.name
      const { onClick: innerMethod, ...config } = defaultActions[name] || {}
      config.attrs = defaults({ ...commonAttrs }, config.attrs)
      if (typeof item === 'object') {
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } })
      }
      config.name = name
      const pending = ref(false)
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
      const meta = { label: config.label, ...(typeof item === 'object' ? item.meta : {}) }
      const _onClick = typeof item === 'object' ? item.onClick : undefined

      const _action = (text, method, param) => {
        if (pending.value) return Promise.resolve()
        pending.value = true
        const run = async () => {
          setLoading(true)
          try {
            return await method()
          } finally {
            setLoading(false)
          }
        }
        if (!text)
          return run().finally(() => {
            pending.value = false
          })
        // 原生容器操作与按钮共用确认流程；只有业务执行成功才提交数组变更。
        return new Promise((resolve, reject) => {
          let finished = false
          const finish = (result) => {
            // 关闭动画结束可能晚于下一次点击，旧弹窗不能清掉新动作的 pending。
            if (finished) return
            finished = true
            pending.value = false
            resolve(result)
          }
          try {
            getUIService('services').confirm({
              title: () => toNode(text, param),
              okText: buttonText.confirm,
              cancelText: buttonText.cancel,
              ...globalProps.Modal,
              onCancel: async (...args) => {
                const result = await globalProps.Modal?.onCancel?.(...args)
                finish(false)
                return result
              },
              afterClose: (...args) => {
                finish(false)
                return globalProps.Modal?.afterClose?.(...args)
              },
              onOk: async () => {
                try {
                  const result = await run()
                  finish(result)
                  return result
                } catch (error) {
                  // 原生确认框可保留以重试；关闭前阻止从列表重复打开确认框。
                  reject(error)
                  throw error
                }
              },
            })
          } catch (error) {
            pending.value = false
            reject(error)
          }
        })
      }
      config.onClick = (param) => {
        const metaParam = { ...param, meta }
        if (_onClick && innerMethod) {
          // 内置操作动作，自定义按钮时，需要在onClick中手动执行。
          return _action(
            config.confirmText,
            () => _onClick(metaParam, async (__param) => innerMethod({ ...metaParam, ...__param })),
            param
          )
        } else {
          return _action(config.confirmText, () => (innerMethod || _onClick)?.(metaParam), param)
        }
      }

      actionBtns.push({ ...config, pending })
    })
  }
  return actionBtns
}
