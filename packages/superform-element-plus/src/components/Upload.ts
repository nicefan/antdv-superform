import { ElButton, ElProgress, ElUpload, useNamespace, type UploadFile, type UploadUserFile } from 'element-plus'
import { defineComponent, h, ref, type PropType } from 'vue'
import { builtInIcons, type UIRenderers, type UIUploadState } from 'superform/sdk'

const NativeUpload = defineComponent({
  inheritAttrs: false,
  props: {
    state: { type: Object as PropType<UIUploadState>, required: true },
  },
  setup(props, { slots }) {
    const upload = useNamespace('upload')
    const revision = ref(0)
    const ids = new Map<string, number>()
    let nextId = 0
    return () => {
      const state = props.state
      // 被拒绝的选入也要刷新受控列表，清除 ElUpload 临时加入的文件。
      void revision.value
      const retainedIds = new Set(state.files.map((file) => file.uid))
      ids.forEach((_, uid) => { if (!retainedIds.has(uid)) ids.delete(uid) })
      const files: UploadUserFile[] = state.files.map((file) => {
        if (!ids.has(file.uid)) ids.set(file.uid, ++nextId)
        return {
          name: file.name,
          uid: ids.get(file.uid)!,
          url: file.url || file.thumbUrl || file.objectUrl,
          size: file.size,
          percentage: file.percent ?? 0,
          status: file.status === 'waiting' ? 'ready' : file.status === 'error' ? 'fail' : file.status === 'uploading' ? 'uploading' : 'success',
        }
      })
      const resolve = (file: UploadFile) => state.files.find((item) => ids.get(item.uid) === file.uid)
      const pictureCard = state.attrs.listType === 'picture-card'
      return h('div', { class: 'sup-upload' }, [
        h(ElUpload, {
          ...state.attrs,
          class: [state.attrs.class, {
            'sup-upload-hide-trigger': state.hideTrigger,
            'sup-upload-no-remove': !state.removable || state.readonly,
            'sup-upload-no-preview': !state.previewable,
          }],
          disabled: state.readonly,
          fileList: files,
          showFileList: state.showList,
          limit: undefined,
          autoUpload: false,
          beforeUpload: () => false,
          // 不接管原生请求生命周期，避免失败时原生组件移除 Core 文件。
          httpRequest: async () => undefined,
          onChange: async (file: UploadFile) => {
            if (!file.raw || resolve(file)) return
            try {
              await state.select(file.raw)
            } finally {
              if (file.url?.startsWith('blob:')) URL.revokeObjectURL(file.url)
              revision.value++
            }
          },
          beforeRemove: async (file: UploadFile) => {
            const item = resolve(file)
            if (item) await state.remove(item)
            return false
          },
          onPreview: (file: UploadFile) => {
            const item = resolve(file)
            if (item && state.previewable) state.preview(item)
          },
          onRemove: undefined,
          onSuccess: undefined,
          onError: undefined,
          onProgress: undefined,
          'onUpdate:fileList': undefined,
        }, {
          ...slots,
          default: () => state.hideTrigger ? null : slots.default?.() ?? (pictureCard
            ? h('div', [builtInIcons.add(), state.title()])
            : h(ElButton, {}, { default: () => [builtInIcons.upload(), state.title()] })),
          // ElUpload 没有下载配置；只在需要扩展操作时使用官方文件插槽。
          ...((slots.file || state.downloadable) && {
            file: ({ file }: { file: UploadFile }) => {
              const item = resolve(file)
              if (!item) return null
              if (slots.file) return slots.file({ file: item })
              return [
                state.attrs.listType !== 'text' && state.attrs.listType && state.isImage(item) && file.url
                  ? h('img', { class: upload.be('list', 'item-thumbnail'), src: file.url, alt: item.name }) : null,
                h('div', { class: upload.be('list', 'item-info') }, [
                  h(ElButton, { link: true, disabled: !state.previewable, onClick: () => state.preview(item) }, { default: () => item.name }),
                  item.status === 'waiting' && h('span', {}, ' 待处理'),
                  item.status === 'error' && h('span', { role: 'status' }, ' 处理失败'),
                  item.status === 'uploading' && h(ElProgress, { percentage: item.percent ?? 0, strokeWidth: 2 }),
                ]),
                h('span', { class: pictureCard ? upload.be('list', 'item-actions') : 'sup-upload-actions' }, [
                  pictureCard && state.previewable && h(ElButton, { link: true, onClick: () => state.preview(item) }, { default: () => '预览' }),
                  h(ElButton, { link: true, onClick: () => state.download(item) }, { default: () => '下载' }),
                  state.removable && !state.readonly && h(ElButton, { link: true, onClick: () => state.remove(item) }, { default: () => '删除' }),
                ]),
              ]
            },
          }),
          tip: () => slots.tip?.() ?? (!state.hideTrigger && state.tip && h('div', { class: 'sup-upload-tip' }, state.tip)),
        }),
        state.readonly && state.showList && !state.files.length && h('div', { class: 'sup-upload-tip' }, '暂无附件'),
      ])
    }
  },
})

export const renderUpload: UIRenderers['upload'] = (state, slots = {}) => h(NativeUpload, { state }, slots)
