<script lang="ts">
import {
  defineComponent,
  type PropType,
  computed,
  ref,
  h,
  reactive,
  inject,
  shallowRef,
  watch,
  toRaw,
} from 'vue'
import {
  getUIUploadListIgnore,
  openUIConfirm,
  openUIInfo,
  renderUISemanticIcon,
  renderUIUpload,
  renderUIUploadTrigger,
  showUIMessage,
} from '../adapter'
import { globalProps } from '../plugin'
import usePreview from './usePreview'
import { isArray, isFunction } from 'lodash-es'
import { downloadByData, getBase64WithFile } from '../utils/file'
import { createUploadController, type UploadFileInfo } from './upload/controller'

const imgs = '.png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff'
function fileIsImage(file) {
  if (file.thumbUrl) return true
  if (file.url || file.originFileObj) {
    const exName = (file.name || file.url)?.match(/[^\\.]*$/)?.[0]
    if (exName && imgs.includes(exName)) {
      return true
    } else {
      const type = file.type || file.url?.match(/^data:(\S*?);/)?.[1]
      return type?.startsWith('image')
    }
  }
}

function createLoadModal(title, onOk?: Fn) {
  const modal = openUIInfo({
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
      icon: () => renderUISemanticIcon('error'),
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

export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: { type: Object, required: true },
    value: null as unknown as PropType<any>,
    fileList: Array as PropType<any[]>,
    /** 指定文件信息字段 */
    infoNames: Object as PropType<Partial<Pick<UploadFileInfo, 'uid' | 'name' | 'url'>>>,
    /** 指定文件信息中一个属性存为绑定值 */
    valueKey: String,
    //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法
    customRequest: Function,
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
    isImageUrl: Function,
    beforeUpload: Function,
    showUploadList: { type: [Object, Boolean], default: undefined },
    onPreview: Function,
    onRemove: Function,
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
      showUploadList,
      onPreview,
      onDownload,
      isImageUrl = fileIsImage,
      hideOnMax,
      valueKey,
    } = props
    const maxCount = (isSingle ? 1 : props.maxCount) || Infinity
    const { accept, listType } = ctx.attrs as Obj
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
    onSubmit?.(() => {
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
            return false
          })
          .finally(() => (isLoading.value = false))
      }
      return controller.submit(innerFileList.value)
    })

    const beforeUpload = (file, resFileList) => {
      if (props.beforeUpload) {
        const res = props.beforeUpload(file, resFileList)
        if (res !== undefined) return res
      }
      const errMessage = controller.validate(file, resFileList, innerFileList.value)

      if (errMessage) {
        showUIMessage('error', errMessage)
        return getUIUploadListIgnore()
      }
      if (mode === 'custom') {
        // 显示上传列表时，返回false，禁用原上传！
        if (showUploadList !== false) {
          return false
        }
      } else if (maxCount === 1 && innerFileList.value.length) {
        const info = innerFileList.value[0]
        controller.clearTask(info.uid)
        if (info.status === 'done' && apis.delete) {
          // 提交时进行远程删除
          const __file = { ...outFileList.value[0] }
          controller.queueDelete(__file, () => apis.delete(__file))
        }
      }
    }

    function handleChange({ file, fileList, event }) {
      if (file.status === 'removed') {
        // 删除完成后清除上传任务
        controller.clearTask(file.uid)
      } else if (file.status === 'uploading') {
        if (!event && mode !== 'auto') {
          file.status = 'waiting'
        }
      }
      //beforeUpload返回false时，file为原始File对象，无status
      props.onChange?.({ file, fileList, event })
      updateFileList([...fileList])
    }

    const customRequest = (args) => {
      const { file } = args

      if (mode === 'auto') {
        return controller.registerRequest(file.uid, () => upload(args))
      } else if (mode === 'submit') {
        controller.registerRequest(file.uid, () => upload(args))
      } else if (mode === 'base64' || mode === 'text') {
        return getBase64WithFile(file, mode).then(({ result }) => successHandler({ url: result }, file))
      }
    }

    const errorHandler = (error, file) => {
      const changeItem = innerFileList.value.find((item) => item.uid === file.uid)
      Object.assign(changeItem, { error, status: 'error' })
      updateFileList([...innerFileList.value])
      // onError(error, undefined, file)
      return Promise.reject(error)
    }
    const successHandler = (data, file) => {
      const changeItem = innerFileList.value.find((item) => item.uid === file.uid)
      Object.assign(changeItem, convertInfo(data), { status: 'done' })
      updateFileList([...innerFileList.value])
      return data
    }

    const upload = (args) => {
      const { file, filename, onProgress, onError, onSuccess } = args

      if (!apis.upload) {
        return Promise.resolve().then(() => errorHandler(Error('Api config error'), file))
      }
      const formData: any = new FormData()
      formData.append(filename, file)
      const onUploadProgress = (e) => {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100
        }
        onProgress(e)
      }

      return apis.upload(formData, { onUploadProgress }).then(
        (res) => successHandler(res, file),
        (err) => errorHandler(err, file)
      )
    }

    const remove = async (file) => {
      let result = await props.onRemove?.(file)
      if (result !== false && apis.delete && file.status === 'done') {
        return new Promise((resolve) => {
          const modal = openUIConfirm({
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
                controller.queueDelete(
                  __file,
                  () => handler()
                  // .then(
                  //   () => removeFileMap.delete(__file)
                  //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                  // )
                )
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
    const downloading = ref(false)
    const fileDownload =
      onDownload ||
      ((file) => {
        if (apis.download && !downloading.value) {
          const downModal = createLoadModal('文件下载中，请稍候...')
          apis
            .download(reconvert(file))
            .then((result) => downloadByData(result, file.name))
            .then(() => downModal.destroy())
            .catch((err) => {
              downModal.setError('文件下载失败', err)
            })
            .finally(() => (isLoading.value = false))
        }
      })

    // 查看模式时，控制操作按钮
    const listConfig = computed(() =>
      typeof showUploadList === 'boolean'
        ? showUploadList
        : {
            showRemoveIcon: !props.isView && !props.disabled,
            showDownloadIcon: props.isView,
            ...showUploadList,
          }
    )

    const filePreview = async (file) => {
      if (onPreview) {
        const src = await onPreview(reconvert(file))
        src && preview.open(src)
      } else if (isImageUrl(file)) {
        let current
        const images = innerFileList.value
          .filter((item) => isImageUrl(item))
          .map((item, idx) => {
            if (item === file) current = idx
            const url = item.url || item.thumbUrl
            if (!url && item.originFileObj) {
              item.objectUrl = window.URL.createObjectURL(item.originFileObj)
            }
            return url || item.objectUrl
          })
        preview.open({ images, current })
      }
    }

    const iconRender = ({ file, listType }) => {
      if (file.status === 'waiting') {
        return renderUISemanticIcon('sync')
      } else if (file.status === 'uploading') {
        return renderUISemanticIcon('loading')
      } else {
        return renderUISemanticIcon('attachment')
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
    const slots: Obj = { ...ctx.slots }
    if (listType === 'picture-card') {
      slots.default = () =>
        ctx.slots.default?.(effectData) ||
        h('div', [
          renderUISemanticIcon('add'),
          titleSlot ? titleSlot() : h('div', { style: 'margin-top:8px' }, title),
        ])
    } else {
      slots.default = () => [
        ctx.slots.default?.(effectData) ||
          renderUIUploadTrigger(
            {},
            { default: () => [renderUISemanticIcon('upload'), titleSlot ? titleSlot() : title] }
          ),
        tip && h('div', { class: 'sup-upload-tip' }, tip),
      ]
    }
    const isView = computed(() => props.disabled || props.isView)
    const hideBody = computed(() => hideOnMax && maxCount && innerFileList.value.length >= maxCount)
    return () =>
      isView.value && innerFileList.value.length === 0
        ? h('div', { class: 'sup-upload-tip' }, '暂无附件')
        : renderUIUpload(
            {
              class: { 'upload-disabled': isView.value },
              customRequest,
              beforeUpload,
              fileList: innerFileList.value,
              onChange: handleChange,
              onPreview: filePreview,
              onRemove: remove,
              showUploadList: listConfig.value,
              maxCount,
              isImageUrl,
              iconRender,
              onDownload: fileDownload,
            },
            {
              ...slots,
              default: () => isView.value || (hideBody.value ? null : slots.default()),
            }
          )
  },
})
</script>
