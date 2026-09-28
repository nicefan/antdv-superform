import { Button, Upload, type UploadFile } from 'antdv-next'
import { h } from 'vue'
import { builtInIcons, type UIRenderers } from 'superform/sdk'

export const renderUpload: UIRenderers['upload'] = (state, slots = {}) => {
  const resolve = (file: UploadFile) => state.files.find((item) => item.uid === file.uid)
  return h('div', { class: 'sup-upload' }, [
    h(Upload, {
      ...state.attrs,
      disabled: state.readonly,
      fileList: state.files.map((file) => ({
        ...file,
        thumbUrl: file.thumbUrl || file.objectUrl,
        // 等待提交不属于上传中，避免原生列表一直显示进度。
        status: file.status === 'waiting' ? undefined : file.status,
      })),
      showUploadList: state.showList && {
        showRemoveIcon: state.removable && !state.readonly,
        showPreviewIcon: state.previewable,
        showDownloadIcon: state.downloadable,
        extra: (file: UploadFile) => resolve(file)?.status === 'waiting' ? ' 待处理' : null,
      },
      maxCount: undefined,
      customRequest: undefined,
      // 选入及请求仍由 Core 管理，原生列表只消费受控状态。
      beforeUpload: (file: File) => { void state.select(file); return Upload.LIST_IGNORE },
      onChange: undefined,
      onRemove: async (file: UploadFile) => {
        const item = resolve(file)
        if (item) await state.remove(item)
        return false
      },
      onPreview: (file: UploadFile) => {
        const item = resolve(file)
        if (item && state.previewable) state.preview(item)
      },
      onDownload: (file: UploadFile) => {
        const item = resolve(file)
        if (item && state.downloadable) state.download(item)
      },
      isImageUrl: (file: UploadFile) => {
        const item = resolve(file)
        return Boolean(item && state.isImage(item))
      },
      onSuccess: undefined,
      onError: undefined,
      'onUpdate:fileList': undefined,
    }, {
      ...slots,
      ...(slots.file && { itemRender: ({ file }: { file: UploadFile }) => slots.file!({ file: resolve(file) }) }),
      default: () => state.hideTrigger ? null : slots.default?.() ?? (state.attrs.listType === 'picture-card'
        ? h('div', [builtInIcons.add(), state.title()])
        : h(Button, {}, { default: () => [builtInIcons.upload(), state.title()] })),
    }),
    !state.hideTrigger && state.tip && h('div', { class: 'sup-upload-tip' }, state.tip),
    state.readonly && state.showList && !state.files.length && h('div', { class: 'sup-upload-tip' }, '暂无附件'),
  ])
}
