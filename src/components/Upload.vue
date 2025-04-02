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
  nextTick,
} from 'vue'
import {
  UploadOutlined,
  PaperClipOutlined,
  LoadingOutlined,
  SyncOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons-vue'
import base from './base'
import { message, Modal, Upload } from 'ant-design-vue'
import { globalProps } from '../plugin'
import usePreview from './usePreview'
import { isArray, isFunction } from 'lodash-es'
import { downloadByData, getBase64WithFile } from '../utils/file'

interface FileInfo {
  /** 文件id */
  uid: string
  /** 文件对象 */
  file?: File
  /** 文件名 */
  name: string
  /** 文件类型 */
  type: string
  /** 链接地址 */
  url: string
  /** 上传进度 */
  percent?: number
  /** 文件状态 */
  status?: 'waiting' | 'error' | 'success' | 'done' | 'uploading' | 'removed'
}

function acceptValidtor(file: FileInfo, accept: string) {
  return accept.split(',').some((str) => {
    return file.name?.endsWith(str) || (file.type && new RegExp(`^${str.replace('*', '\\S*')}$`).test(file.type))
  })
}

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
  const modal = Modal.info({
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
      icon: () => h(CloseCircleOutlined),
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
    infoNames: Object as PropType<Partial<Pick<FileInfo, 'uid' | 'name' | 'url'>>>,
    /** 指定文件信息中一个属性存为绑定值 */
    valueKey: String,
    //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法
    customRequest: Function,
    minSize: Number,
    maxSize: Number,
    isSingle: Boolean,
    maxCount: Number,
    uploadMode: String as PropType<'auto' | 'submit' | 'custom' | 'base64'>,
    tip: String,
    title: [String, Function],
    /** 超出最大数量隐藏上传 */
    outHide: Boolean,
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
      maxCount = isSingle ? 1 : 0,
      infoNames,
      repeatable,
      showUploadList,
      onPreview,
      onDownload,
      isImageUrl = fileIsImage,
      outHide,
      valueKey,
    } = props
    const { accept, listType } = ctx.attrs as Obj

    const preview = usePreview()

    const __names: Obj = {
      ...(valueKey && { [valueKey]: valueKey }),
      uid: 'uid',
      status: 'status',
      url: 'url',
      name: 'name',
      ...infoNames,
    }
    if (mode === 'custom') __names.originFileObj = ''

    const convertInfo = (info) => {
      const __info = { status: 'done', ...info }
      Object.entries(__names).forEach(([key, name]) => {
        if (name && name !== key && name in __info) {
          __info[key] = __info[name as string]
          delete __info[name as string]
        }
      })
      return __info
    }
    const reconvert = (info) => {
      const __info = {}
      Object.entries(__names).forEach(([key, name]) => {
        const value = info[key]
        if (name && value !== undefined) __info[name] = value
      })
      return __info
    }

    const { onSubmit } = inject<any>('exaProvider', {})

    const innerFileList = ref<any[]>([])

    const outFileList = shallowRef<any[]>([])
    const outValues = shallowRef<any>()

    const tasks = new Map<string, Awaited<any>>()
    const waitingTasks = new Map<string, Fn<Awaited<any>>>()

    const updateFileList = (list) => {
      outFileList.value = list.map(reconvert)
      if (!props.isView) {
        ctx.emit('update:fileList', outFileList.value)
        updateValue()
      }
      innerFileList.value = list
    }

    const updateValue = () => {
      if (props.isSingle) {
        const frist = toRaw(outFileList.value[0])
        outValues.value = !valueKey ? frist : frist?.[valueKey] ?? frist?.[__names.uid] // 指定key无值时用uid替代，满足表单校验
      } else if (valueKey) {
        outValues.value = outFileList.value.map((item) => item[valueKey] ?? item[__names.uid])
      } else {
        outValues.value = outFileList.value
      }
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
      let stack: Promise<any> = Promise.resolve()
      if (mode === 'auto') {
        for (const item of innerFileList.value) {
          if (item.status === 'error') {
            const error = item.response || { message: '文件上传错误，请删除后重新上传！' }
            return Promise.reject(error)
          } else if (item.status === 'uploading') {
            isLoading.value = true
          }
          stack = Promise.all(tasks.values())
        }
      } else if (mode === 'submit') {
        const __tasks: any = []
        for (const item of innerFileList.value) {
          if (item.status !== 'done') {
            isLoading.value = true
            item.status = 'uploading'
            const task = waitingTasks.get(item.uid) as Fn
            __tasks.push(task())
          }
          stack = Promise.all(__tasks)
        }
      }
      if (removeFileMap.size) isLoading.value = true

      if (isLoading.value) {
        const modal = createLoadModal(' 文件同步中，请稍候...')
        return stack
          .then((data) =>
            // 文件删除出错不中断提交
            Promise.all([...removeFileMap.values()].map((handler) => handler()))
              .then(() => data)
              .catch((err) => console.error(err))
              .finally(() => {
                modal?.destroy()
                isLoading.value = false
                return data
              })
          )
          .catch((err) => {
            isLoading.value = false
            modal.setError('文件上传失败', err)
            return false
          })
      }
      return stack
    })

    const beforeUpload = (file, resFileList) => {
      if (props.beforeUpload) {
        const res = props.beforeUpload(file, resFileList)
        if (res !== undefined) return res
      }
      const errMessage = (() => {
        if (maxCount > 1) {
          const count = outFileList.value.length + resFileList.indexOf(file)
          if (count >= maxCount) {
            return '文件数量最多' + maxCount
          }
        }
        if (accept && !acceptValidtor(file, accept )) {
          return '请选择正确的文件类型！'
        }
        if (minSize || maxSize) {
          const fileSize = file.size / 1024 / 1024
          if (minSize && minSize > fileSize) {
            return '文件最小需要' + minSize + 'M'
          }
          if (maxSize && maxSize < fileSize) {
            return '文件最大不超过' + maxSize + 'M'
          }
        }
        if (!repeatable) {
          const item = innerFileList.value.find((item) => item.name === file.name)
          if (item) {
            return `文件重复: ${item.name}`
          }
        }
      })()

      if (errMessage) {
        message.error(errMessage)
        return Upload.LIST_IGNORE
      }
      if (mode === 'custom') {
        // 显示上传列表时，返回false，禁用原上传！
        if (showUploadList !== false) {
          return false
        }
      } else if (maxCount === 1 && innerFileList.value.length) {
        const info = innerFileList.value[0]
        tasks.delete(info.uid)
        waitingTasks.delete(info.uid)
        if (info.status === 'done' && apis.delete) {
          // 提交时进行远程删除
          const __file = { ...outFileList.value[0] }
          removeFileMap.set(__file, () => apis.delete(__file))
        }
      }
    }

    function handleChange({ file, fileList, event }) {
      if (file.status === 'removed') {
        // 删除完成后清除上传任务
        tasks.delete(file.uid)
        waitingTasks.delete(file.uid)
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
        const promise = upload(args)
        tasks.set(file.uid, promise)
        return promise
      } else if (mode === 'submit') {
        waitingTasks.set(file.uid, () => upload(args))
      } else if (mode === 'base64') {
        return getBase64WithFile(file).then(({ result }) => successHandler({ url: result }, file))
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

    const removeFileMap = new Map()
    const remove = async (file) => {
      let result = await props.onRemove?.(file)
      if (result !== false && apis.delete && file.status === 'done') {
        return new Promise((resolve) => {
          const modal = Modal.confirm({
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
                removeFileMap.set(
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
        const src = await onPreview(file)
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
        return h(SyncOutlined)
      } else if (file.status === 'uploading') {
        return h(LoadingOutlined)
      } else {
        return h(PaperClipOutlined)
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
        h('div', [h(PlusOutlined), titleSlot ? titleSlot() : h('div', { style: 'margin-top:8px' }, title)])
    } else {
      slots.default = () => [
        ctx.slots.default?.(effectData) ||
          h(base.Button, {}, () => [h(UploadOutlined), titleSlot ? titleSlot() : title]),
        tip && h('div', { class: 'sup-upload-tip' }, tip),
      ]
    }
    const isView = computed(() => props.disabled || props.isView)
    const hideBody = computed(() => outHide && maxCount && innerFileList.value.length >= maxCount)
    return () =>
      isView.value && innerFileList.value.length === 0
        ? h('div', { class: 'sup-upload-tip' }, '暂无附件')
        : h(
            base.Upload,
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
            } as any,
            {
              ...slots,
              default: () => isView.value || (hideBody.value ? null : slots.default()),
            }
          )
  },
})
</script>
