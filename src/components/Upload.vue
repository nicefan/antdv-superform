<script lang="ts">
import { getSemanticIconNode } from '../utils/useIcon'
import {
  defineComponent,
  type PropType,
  computed,
  ref,
  reactive,
  inject,
  shallowRef,
  watch,
  toRaw,
  onScopeDispose,
} from 'vue'
import { getUIRender, getUIService } from '../adapter'
import { globalProps } from '../plugin'
import usePreview from './usePreview'
import { isArray, isFunction } from 'lodash-es'
import { downloadByData, getBase64WithFile } from '../utils/file'
import type { UIUploadFile, UIUploadState } from '../adapter/types'
import { createUploadController } from './upload/controller'

const imgs = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'tif', 'tiff'])
function fileIsImage(file) {
  if (file.thumbUrl) return true
  if (file.url || file.file) {
    const exName = (file.name || file.url)?.split(/[?#]/)[0].match(/\.([^.\/\\]+)$/)?.[1].toLowerCase()
    if (exName && imgs.has(exName)) {
      return true
    } else {
      const type = file.type || file.file?.type || file.url?.match(/^data:(\S*?);/)?.[1]
      return type?.startsWith('image')
    }
  }
}

function createLoadModal(title, onOk?: Fn) {
  const modal = getUIService('services').info({
    title: () => title,
    okButtonProps: {
      loading: true,
    },
    closable: false,
    centered: true,
    maskClosable: false,
    keyboard: false,
    onOk,
  })

  const setError = (title, err) => {
    modal.update({
      icon: () => getSemanticIconNode('error'),
      okButtonProps: {
        loading: false,
      },
      type: 'error',
      title,
      content: err?.message,
    })
  }
  return { setError, ...modal }
}

let nextFileId = 0

export default defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: { type: Object, required: true },
    value: null as unknown as PropType<any>,
    fileList: Array as PropType<any[]>,
    /** 指定文件信息字段 */
    infoNames: Object as PropType<Partial<Pick<UIUploadFile, 'uid' | 'name' | 'url'>>>,
    /** 指定文件信息中一个属性存为绑定值 */
    valueKey: String,
    //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法
    minSize: Number,
    maxSize: Number,
    isSingle: Boolean,
    maxCount: Number,
    uploadMode: String as PropType<'auto' | 'submit' | 'custom' | 'base64' | 'text'>,
    tip: String,
    title: [String, Function],
    /** 超出最大数量隐藏上传 */
    hideOnMax: Boolean,
    repeatable: Boolean,
    isView: Boolean,
    disabled: Boolean,
    isImage: Function,
    beforeSelect: Function,
    beforeRemove: Function,
    showList: { type: Boolean, default: true },
    removable: { type: Boolean, default: true },
    downloadable: { type: Boolean, default: undefined },
    previewable: { type: Boolean, default: true },
    onPreview: Function,
    onDownload: Function,
    onChange: Function,
    apis: Object,
  },
  emits: ['update:value', 'update:fileList'],
  setup(props, ctx) {
    const {
      uploadMode: mode = 'auto',
      apis = {},
      isSingle,
      minSize,
      maxSize,
      infoNames,
      repeatable,
      onPreview,
      onDownload,
      isImage = fileIsImage,
      hideOnMax,
      valueKey,
    } = props
    const maxCount = (isSingle ? 1 : props.maxCount) || Infinity
    const { accept } = ctx.attrs as Obj
    const controller = createUploadController({
      mode,
      valueKey,
      infoNames,
      maxCount,
      accept,
      minSize,
      maxSize,
      repeatable,
    })

    const preview = usePreview()
    const { convertInfo, reconvert } = controller

    const { onSubmit } = inject<any>('exaProvider', {})

    const innerFileList = ref<any[]>([])
    const objectUrls = new Set<string>()
    let disposed = false
    onScopeDispose(() => {
      disposed = true
      objectUrls.forEach((url) => URL.revokeObjectURL(url))
    })
    watch(innerFileList, (files, previous) => {
      const retainedIds = new Set(files.map((file) => file.uid))
      previous.forEach((file) => {
        if (!retainedIds.has(file.uid)) controller.clearTask(file.uid)
      })
      const retained = new Set(files.map((file) => file.objectUrl))
      objectUrls.forEach((url) => {
        if (!retained.has(url)) {
          URL.revokeObjectURL(url)
          objectUrls.delete(url)
        }
      })
    })

    const outFileList = shallowRef<any[]>([])
    const outValues = shallowRef<any>()

    const updateFileList = (list) => {
      outFileList.value = list.map(reconvert)
      if (!props.isView) {
        ctx.emit('update:fileList', outFileList.value)
        updateValue()
      }
      innerFileList.value = list
    }

    const updateValue = () => {
      outValues.value = controller.getValue(toRaw(outFileList.value), Boolean(props.isSingle))
      ctx.emit('update:value', outValues.value)
    }

    watch(
      () => toRaw(props.value),
      (value) => {
        if (value !== outValues.value) {
          outValues.value = value
          if (!value) {
            innerFileList.value = []
          } else {
            const values = isArray(value) ? value : [value]
            outFileList.value = valueKey ? values.map((val) => ({ [valueKey]: val })) : values
            innerFileList.value = outFileList.value.map(convertInfo)
          }
        }
      },
      { immediate: true, flush: 'sync' }
    )
    watch(
      () => toRaw(props.fileList),
      (list) => {
        if (list && list !== outFileList.value) {
          const fileList = list.map(convertInfo)
          updateFileList(fileList)
        }
      },
      { immediate: true }
    )

    const isLoading = ref(false)
    const unregisterSubmit = onSubmit?.(async () => {
      await selecting
      isLoading.value = controller.hasPendingWork(innerFileList.value)
      if (isLoading.value) {
        const modal = createLoadModal(' 文件同步中，请稍候...')
        return controller
          .submit(innerFileList.value)
          .then((data) => {
            modal.destroy()
            return data
          })
          .catch((err) => {
            isLoading.value = false
            modal.setError('文件上传失败', err)
            throw err
          })
          .finally(() => (isLoading.value = false))
      }
      return controller.submit(innerFileList.value)
    })
    // 动态字段移除后，不再让已卸载的上传组件阻塞表单提交。
    if (unregisterSubmit) onScopeDispose(unregisterSubmit)

    // 串行接受选择，异步校验期间也不能绕过数量及重名限制。
    let selecting = Promise.resolve()
    const select = (rawFile: File) => {
      const task = selecting.then(async () => {
        if (disposed || props.isView || props.disabled) return
        if (await props.beforeSelect?.(rawFile) === false) return
        if (disposed || props.isView || props.disabled) return
        const file: UIUploadFile = {
          uid: `upload-${Date.now()}-${++nextFileId}`,
          file: rawFile, name: rawFile.name, type: rawFile.type, size: rawFile.size,
          status: mode === 'auto' || mode === 'base64' || mode === 'text' ? 'uploading' : 'waiting',
        }
        const error = controller.validate(file, [file], innerFileList.value)
        if (error) {
          getUIService('services').message('error', error)
          return
        }
        if (isImage(file)) {
          file.objectUrl = URL.createObjectURL(rawFile)
          objectUrls.add(file.objectUrl)
        }
        const previous = maxCount === 1 ? innerFileList.value : []
        previous.forEach((item) => {
          controller.clearTask(item.uid)
          if (item.status === 'done' && apis.delete) {
            const info = reconvert(item)
            controller.queueDelete(info, () => apis.delete(info))
          }
        })
        updateFileList(maxCount === 1 ? [file] : [...innerFileList.value, file])
        if (mode === 'base64' || mode === 'text') {
          controller.registerRequest(file.uid, () => getBase64WithFile(rawFile, mode).then(
            ({ result }) => successHandler({ url: result }, file),
            (error) => errorHandler(error, file)
          ))
        } else if (mode !== 'custom') {
          controller.registerRequest(file.uid, () => upload(file))
        }
        props.onChange?.({ file, fileList: [...innerFileList.value] })
      }).catch((error) => {
        getUIService('services').message('error', error?.message || '文件选择失败')
      })
      selecting = task
      return task
    }

    const errorHandler = (error, file) => {
      const changeItem = innerFileList.value.find((item) => item.uid === file.uid)
      // 删除、替换或卸载后不再应用迟到结果，也不让已移除文件阻塞提交。
      if (disposed || !changeItem) return
      Object.assign(changeItem, { error, status: 'error' })
      updateFileList([...innerFileList.value])
      props.onChange?.({ file: changeItem, fileList: [...innerFileList.value] })
      return Promise.reject(error)
    }
    const successHandler = (data, file) => {
      const changeItem = innerFileList.value.find((item) => item.uid === file.uid)
      if (disposed || !changeItem) return
      Object.assign(changeItem, convertInfo(data), { status: 'done' })
      updateFileList([...innerFileList.value])
      props.onChange?.({ file: changeItem, fileList: [...innerFileList.value] })
      return data
    }

    const upload = (file: UIUploadFile) => {
      if (!apis.upload) {
        return Promise.resolve().then(() => errorHandler(Error('Api config error'), file))
      }
      const formData: any = new FormData()
      formData.append((ctx.attrs.name as string) || 'file', file.file!)
      const onUploadProgress = (e) => {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100
        }
        const item = innerFileList.value.find((item) => item.uid === file.uid)
        if (!disposed && item) item.percent = e.percent
      }

      return Promise.resolve().then(() => apis.upload(formData, { onUploadProgress })).then(
        (res) => successHandler(res, file),
        (err) => errorHandler(err, file)
      )
    }

    const beforeRemove = async (file) => {
      if (props.isView || props.disabled) return false
      let result = await props.beforeRemove?.(file)
      if (result !== false && apis.delete && file.status === 'done') {
        return new Promise((resolve) => {
          const modal = getUIService('services').confirm({
            title: '确定删除吗？',
            okText: '确定',
            cancelText: '取消',
            closable: false,
            maskClosable: false,
            ...globalProps.Modal,
            onOk() {
              const __file = reconvert(file)
              const handler = () => apis.delete(__file)
              if (mode === 'submit') {
                controller.queueDelete(__file, handler)
                resolve(true)
              } else {
                modal.update({
                  okCancel: false,
                  title: '文件删除中……',
                })
                return handler().then(resolve, () => {
                  modal.update({
                    okCancel: false,
                    title: '文件删除失败',
                    type: 'error',
                    onOk: undefined,
                  })
                  resolve(false)
                  return Promise.reject()
                })
              }
            },
            onCancel() {
              resolve(false)
            },
          })
        })
      }
      return result
    }
    const removing = new Set<string>()
    const remove = async (file: UIUploadFile) => {
      if (props.isView || props.disabled || !props.removable || removing.has(file.uid)) return
      removing.add(file.uid)
      try {
        if (await beforeRemove(file) === false || disposed) return
        controller.clearTask(file.uid)
        updateFileList(innerFileList.value.filter((item) => item.uid !== file.uid))
        props.onChange?.({ file, fileList: [...innerFileList.value] })
      } catch (error: any) {
        getUIService('services').message('error', error?.message || '文件删除失败')
      } finally {
        removing.delete(file.uid)
      }
    }
    const downloading = ref(false)
    const canDownload = computed(() => props.downloadable ?? Boolean(onDownload || apis.download))
    const fileDownload = (file: UIUploadFile) => {
      if (!canDownload.value) return
      if (onDownload) return onDownload(file)
      if (apis.download && !downloading.value) {
        downloading.value = true
        const downModal = createLoadModal('文件下载中，请稍候...')
        return Promise.resolve()
          .then(() => apis.download(reconvert(file)))
          .then((result) => downloadByData(result, file.name))
          .then(() => downModal.destroy())
          .catch((err) => {
            downModal.setError('文件下载失败', err)
          })
          .finally(() => (downloading.value = false))
      }
    }

    const filePreview = async (file) => {
      if (!props.previewable) return
      if (onPreview) {
        const src = await onPreview(reconvert(file))
        src && preview.open(src)
      } else if (isImage(file)) {
        let current = -1
        const images = innerFileList.value
          .filter((item) => isImage(item))
          .map((item, idx) => {
            // Adapter 可能复制文件对象，使用稳定 uid 定位预览项。
            if (item.uid === file.uid) current = idx
            const url = item.url || item.thumbUrl
            if (!url && !item.objectUrl && item.file) {
              item.objectUrl = window.URL.createObjectURL(item.file)
              objectUrls.add(item.objectUrl)
            }
            return url || item.objectUrl
          })
        if (images[current]) preview.open({ images, current })
        else fileDownload(file)
      } else {
        fileDownload(file)
      }
    }

    const __title = props.title
    const title = typeof props.title === 'string' ? props.title : '上传文件'
    const effectData = reactive({ ...toRaw(props.effectData), fileList: innerFileList })
    const titleSlot = isFunction(__title) && (() => __title(effectData))
    const tips: string[] = []
    accept && tips.push('支持文件格式：' + accept)
    maxSize && tips.push('单个文件不超过' + maxSize + 'MB')
    const tip = props.tip ?? tips.join(', ')
    const isView = computed(() => props.disabled || props.isView)
    const hideBody = computed(() => hideOnMax && maxCount && innerFileList.value.length >= maxCount)
    return () => getUIRender('upload')({
      attrs: ctx.attrs,
      files: innerFileList.value,
      readonly: isView.value,
      showList: props.showList,
      removable: props.removable && !isView.value,
      downloadable: canDownload.value,
      previewable: props.previewable,
      hideTrigger: isView.value || Boolean(hideBody.value),
      title: () => titleSlot ? titleSlot() : title,
      tip,
      select,
      remove,
      preview: filePreview,
      download: fileDownload,
      isImage: (file) => Boolean(isImage(file)),
    } satisfies UIUploadState, {
      ...ctx.slots,
      ...(ctx.slots.default && { default: () => ctx.slots.default?.(effectData) }),
    })
  },
})
</script>
