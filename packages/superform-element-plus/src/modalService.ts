import { ElButton, ElDialog } from 'element-plus'
import { defineComponent, getCurrentInstance, h, nextTick, ref, render, shallowReactive, type VNodeChild } from 'vue'
import { builtInIcons, type UIConfirmOptions, type UIServiceHandle } from 'superform/sdk'

export function resolveServiceContent(content: unknown): any {
  return typeof content === 'function' ? content() : content
}

/** 静态 MessageBox 没有实例级更新与销毁，用受控 Dialog 承载现有服务契约。 */
export function openServiceModal(props: UIConfirmOptions, confirm: boolean): UIServiceHandle {
  const config = shallowReactive({ ...props })
  const visible = ref(false)
  const pending = ref(false)
  const wrap = document.createElement('div')
  const appContext = getCurrentInstance()?.appContext
  let disposed = false
  let closing = false
  let opened = false
  const cleanup = () => {
    if (disposed) return
    disposed = true
    render(null, wrap)
    wrap.remove()
    config.afterClose?.()
  }
  const close = () => {
    if (disposed || closing) return
    closing = true
    visible.value = false
    // 尚未显示时不会触发关闭动画，也必须完成清理和关闭通知。
    if (!opened) cleanup()
  }
  const act = async (ok: boolean, action = 'cancel') => {
    if (pending.value || closing || disposed) return
    pending.value = true
    try {
      if (ok) await config.onOk?.()
      else await config.onCancel?.(action)
      close()
    } catch {
      // 业务 Promise 由调用方处理；失败保留当前实例，允许更新反馈后重试。
    } finally {
      pending.value = false
    }
  }
  const Modal = defineComponent(() => () => {
    const {
      title, content, icon, type, onOk, onCancel, afterClose, okText, cancelText,
      okButtonProps, cancelButtonProps, okCancel, closable, maskClosable, keyboard, centered,
      ...attrs
    } = config
    const renderIcon = icon === undefined ? builtInIcons[type] || builtInIcons.info : icon
    return h(ElDialog, {
      width: 420,
      ...attrs,
      modelValue: visible.value,
      showClose: closable ?? attrs.showClose ?? false,
      closeOnClickModal: maskClosable ?? attrs.closeOnClickModal ?? false,
      closeOnPressEscape: keyboard ?? attrs.closeOnPressEscape ?? true,
      alignCenter: centered ?? attrs.alignCenter,
      beforeClose: () => act(false, 'close'),
      onOpen: () => { opened = true },
      onClosed: cleanup,
    }, {
      header: () => [resolveServiceContent(renderIcon), resolveServiceContent(title)] as VNodeChild[],
      default: () => resolveServiceContent(content),
      footer: () => [
        (okCancel ?? confirm) && h(ElButton, {
          ...cancelButtonProps,
          disabled: pending.value || cancelButtonProps?.disabled,
          onClick: () => act(false),
        }, () => cancelText || '取消'),
        h(ElButton, {
          type: 'primary',
          ...okButtonProps,
          loading: pending.value || okButtonProps?.loading,
          onClick: () => act(true),
        }, () => okText || '确定'),
      ],
    })
  })
  const vnode = h(Modal)
  vnode.appContext = appContext ?? null
  document.body.appendChild(wrap)
  render(vnode, wrap)
  void nextTick(() => { if (!disposed && !closing) visible.value = true })
  return {
    update(next) {
      if (!disposed && !closing) Object.assign(config, next)
    },
    destroy: close,
  }
}
