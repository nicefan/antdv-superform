import { ElMessage, ElMessageBox } from 'element-plus'
import type { Component } from 'vue'
import { builtInIcons, defineUIAdapter, extendUIAdapter, type UIAdapter, type UIAdapterOverrides } from 'superform/sdk'
import { elementPlusFieldNames, elementPlusFieldSources, type ElementPlusFieldName } from './fieldNames'
import { elementPlusFields, adaptElementPlusFieldProps } from './fields'
import './schemaTypes'
import { uiComponents } from './uiComponents'
export type { ElementPlusFieldName } from './fieldNames'
function resolveServiceContent(content: unknown) {
  return typeof content === 'function' ? content() : content
}

export interface ElementPlusAdapterOptions {
  components?: Partial<Record<ElementPlusFieldName, Component>>
  overrides?: UIAdapterOverrides
}

export function createElementPlusAdapter(options: ElementPlusAdapterOptions = {}): UIAdapter {
  return extendUIAdapter(
    defineUIAdapter({
      name: 'element-plus',
      uiComponents,
      supportedFields: elementPlusFieldNames,
      fieldSources: elementPlusFieldSources,
      adaptFieldProps: adaptElementPlusFieldProps,
      fields: elementPlusFields,
      fieldComponents: options.components,
      icons: { semantic: builtInIcons },
      services: {
        message(type, content) {
          ElMessage({ type, message: resolveServiceContent(content) as any })
        },
        confirm(props) {
          let pending = false
          let closed = false
          const afterClose = () => {
            if (closed) return
            closed = true
            props.afterClose?.()
          }
          ElMessageBox.confirm(resolveServiceContent(props.content) ?? '', resolveServiceContent(props.title) as any, {
            ...props,
            confirmButtonText: props.okText,
            cancelButtonText: props.cancelText,
            // 等待业务成功后才关闭；业务失败不能进入取消分支。
            beforeClose: async (action, instance, done) => {
              if (pending) return
              pending = true
              instance.confirmButtonLoading = action === 'confirm'
              try {
                if (action === 'confirm') await props.onOk?.()
                else await props.onCancel?.(action)
                done()
              } catch {
                // 调用方接收业务错误，当前确认框保留以供重试。
              } finally {
                pending = false
                instance.confirmButtonLoading = false
              }
            },
          }).then(afterClose, afterClose)
          return {
            update: () => undefined,
            destroy: () => { ElMessageBox.close(); afterClose() },
          }
        },
        info(props) {
          let current = { ...props }
          const open = () => {
            ElMessageBox.alert(
              resolveServiceContent(current.content) ?? '',
              resolveServiceContent(current.title) as any,
              {
                ...current,
                confirmButtonText: current.okText,
              }
            )
              .then(current.onOk)
              .catch(() => undefined)
          }
          open()
          return {
            update(next) {
              current = { ...current, ...next }
              ElMessageBox.close()
              open()
            },
            destroy: () => ElMessageBox.close(),
          }
        },
      },
    }),
    options.overrides
  )
}
export const elementPlusAdapter = createElementPlusAdapter()
export { elementPlusFields } from './fields'
