import { ElUpload } from 'element-plus'
import { h } from 'vue'
import type { UIRenderers } from 'superform/sdk'
export const renderUpload: UIRenderers['upload'] = (props, slots = {}) => {
  const {
    maxCount,
    showUploadList,
    beforeUpload,
    customRequest,
    onChange,
    iconRender: _iconRender,
    isImageUrl: _isImageUrl,
    ...rest
  } = props
  const fromElementFile = (file: Obj) => ({
    ...file,
    status:
      file.status === 'ready'
        ? 'uploading'
        : file.status === 'success'
        ? 'done'
        : file.status === 'fail'
        ? 'error'
        : file.status,
  })
  const toElementFile = (file: Obj) => ({
    ...file,
    status: file.status === 'waiting' ? 'ready' : file.status === 'done' ? 'success' : file.status,
  })
  return h(
    ElUpload,
    {
      ...rest,
      limit: maxCount,
      fileList: (props.fileList || []).map(toElementFile),
      showFileList: showUploadList !== false,
      beforeUpload: (file) => beforeUpload?.(file, [file]),
      httpRequest: customRequest,
      onChange: (file, fileList) =>
        onChange?.({
          file: fromElementFile(file),
          fileList: fileList.map(fromElementFile),
        }),
    },
    slots
  )
}
