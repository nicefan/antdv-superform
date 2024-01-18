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
  toRef,
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
import { toNode } from '../utils'
import usePreview from './usePreview'

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

function acceptValidtor(accept: string, file: FileInfo) {
  return accept.split(',').some((str) => {
    return file.name.endsWith(str) || (file.type && new RegExp(`^${str.replace('*', '\\S*')}$`).test(file.type))
  })
}

function fileIsImage(file) {
  return (file.url || file.thumbUrl) && acceptValidtor('.png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff', file)
}

export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object,
    value: [String, Array] as PropType<string | string[]>,
    fileList: Array as PropType<any[]>,
    /** 指定文件信息字段 */
    infoNames: Object as PropType<Partial<Pick<FileInfo, 'uid' | 'name' | 'url'>>>,
    //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法
    customRequest: Function,
    minSize: Number,
    maxSize: Number,
    isSingle: Boolean,
    maxCount: Number,
    uploadMode: String as PropType<'auto' | 'submit' | 'custom'>,
    tip: String,
    title: String,
    repeatable: Boolean,
    isView: Boolean,
    disabled: Boolean,
    isImageUrl: Function,
    beforeUpload: Function,
    onPreview: Function,
    onRemove: Function,
    apis: Object,
  },
  emits: ['update:value', 'update:fileList'],
  setup(props, ctx) {
    const {
      uploadMode: mode = 'auto',
      apis = {},
      minSize,
      maxSize,
      maxCount,
      infoNames,
      repeatable,
      onPreview,
      isImageUrl = fileIsImage,
    } = { ...(globalProps.Upload as Obj), ...props }
    const { accept, listType } = ctx.attrs as Obj<string>
    const { label, vModelFields = {} } = props.option

    const preview = usePreview()

    let valueField = 'uid'
    let nameMap: [string, string][] = []
    const __names: Obj = { uid: 'uid', status: 'status', url: 'url', name: 'name', ...infoNames }
    if (mode === 'custom') __names.originFileObj = ''

    Object.entries(__names as Obj<string | Obj>).map(([key, value]) => {
      const { name = key, isValue } = typeof value === 'object' ? value : ({ name: value } as Obj)
      if (isValue) {
        valueField = key
      }
      nameMap.push([key, name])
    })

    const convertInfo = (info) => {
      const __info = { status: 'done', ...info }
      nameMap.forEach(([key, name]) => {
        if (name && name !== key) {
          __info[key] = __info[name as string]
          delete __info[name as string]
        }
      })
      return __info
    }
    const reconvert = (info) => {
      const __info = {}
      nameMap.forEach(([key, name]) => {
        const value = info[key]
        if (name && value !== undefined) __info[name] = value
      })
      return __info
    }

    // 绑定值为fileList时不再提交value变化
    const valueIsFileList = props.option.field === vModelFields.fileList

    const { onSubmit } = inject<any>('exaProvider', {})

    const innerFileList = ref<any[]>([])

    const outFileList = shallowRef<any[]>([])

    const tasks = new Map<string, Awaited<any>>()
    const waitingTasks = new Map<string, Fn<Awaited<any>>>()

    const updateFileList = (list) => {
      innerFileList.value = list
      outFileList.value = list.map(reconvert)
      if (props.isView) return
      ctx.emit('update:fileList', outFileList.value)
      updateValue()
    }

    const updateValue = () => {
      if (valueIsFileList) {
        ctx.emit('update:value', outFileList.value)
      } else {
        ctx.emit(
          'update:value',
          innerFileList.value.map((item) => item[valueField])
        )
      }
    }

    watch(
      () => toRaw(props.fileList),
      (list) => {
        if (!list) {
          updateFileList([])
        } else if (list !== outFileList.value) {
          const fileList = list.map(convertInfo)
          updateFileList(fileList)
        }
      },
      { immediate: true }
    )

    const isLoading = ref(true)
    const openModal = (onOk?: Fn) => {
      return Modal.info({
        title: () => ' 文件同步中，请稍候...',
        okButtonProps: reactive({
          loading: isLoading,
        }),
        closable: false,
        centered: true,
        maskClosable: false,
        keyboard: false,
        onOk,
      })
    }
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
        if (removeFileMap.size) isLoading.value = true
      }

      if (isLoading.value) {
        const modal = openModal()
        stack = stack
          .then((data) =>
            // 文件删除出错不中断提交
            Promise.all([...removeFileMap.values()].map((handler) => handler())).finally(() => {
              modal?.destroy()
              return data
            })
          )
          .catch((err) => {
            isLoading.value = false
            modal.update({
              icon: () => h(CloseCircleOutlined),
              type: 'error',
              title: '文件上传失败',
              content: err?.message,
            })
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
        if (maxCount) {
          const count = outFileList.value.length + resFileList.indexOf(file)
          if (count >= maxCount) {
            return '文件数量最多' + maxCount
          }
        }
        if (accept && !acceptValidtor(accept, file)) {
          return '请选择正确的文件类型！'
        }
        if (minSize || maxSize) {
          const fileSize = file.size / 1024 / 1024
          if (minSize && minSize > fileSize) {
            return '文件最小需要' + minSize + 'M'
          }
          if (maxSize && maxSize < fileSize) {
            return '文件最大不超过' + minSize + 'M'
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
        return false
      }
    }

    function handleChange({ file, fileList, event }) {
      if (file.status === 'removed') {
        tasks.delete(file.uid)
        waitingTasks.delete(file.uid)
      } else if (mode !== 'auto' && !event && file.status === 'uploading') {
        file.status = 'waiting'
        // } else if (file.status === 'done' && file.response) {
        //   Object.assign(file, convertInfo(file.response))
      }
      updateFileList([...fileList])
    }

    const customRequest = (args) => {
      const { file } = args

      if (mode === 'auto') {
        tasks.set(file.uid, upload(args))
      } else if (mode === 'submit') {
        waitingTasks.set(file.uid, () => upload(args))
      }
    }

    const upload = (args) => {
      const { file, filename, onProgress, onError, onSuccess } = args

      const errorHandler = (error) => {
        onError(error)
        return Promise.reject(error)
      }
      const successHandler = (data) => {
        const changeItem = innerFileList.value.find((item) => item.uid === file.uid)
        Object.assign(changeItem, convertInfo(data), { status: 'done' })
        updateFileList([...innerFileList.value])
        return data
      }
      if (!apis.upload) {
        return Promise.resolve().then(() => errorHandler(Error('Api config error')))
      }
      const formData: any = new FormData()
      formData.append(filename, file)
      const onUploadProgress = (e) => {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100
        }
        onProgress(e)
      }

      return apis
        .upload(formData, {
          onUploadProgress,
        })
        .then(successHandler, errorHandler)
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
              const handler = () => apis.delete(reconvert(file))
              if (mode === 'submit') {
                const __file = { ...file }
                removeFileMap.set(__file, () =>
                  handler().then(
                    () => removeFileMap.delete(__file),
                    // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                  )
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

    // 查看模式时，控制操作按钮
    const listConfig = computed(() => ({
      showRemoveIcon: !props.isView && !props.disabled,
      showDownloadIcon: props.isView,
    }))

    const filePreview = (file) => {
      if (onPreview) {
        const src = onPreview(file)
        src && preview.open(src)
      } else if (isImageUrl(file)) {
        let current
        const images = innerFileList.value
          .filter((item) => isImageUrl(item))
          .map((item, idx) => {
            if (item === file) current = idx
            return item.url || item.thumbUrl
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
    // const formItemContext = Form.useInjectFormItemContext();
    const title = '上传文件' // + (typeof label === 'string' ? label : '')
    const tips: string[] = []
    accept && tips.push('支持文件格式：' + accept)
    maxSize && tips.push('单个文件不超过' + maxSize + 'MB')
    const tip = props.tip || tips.join(', ')
    const slots: Obj = {}
    if (listType === 'picture-card') {
      slots.default = () =>
        props.title ? toNode(props.title) : h('div', [h(PlusOutlined), h('div', { style: 'margin-top:8px' }, title)])
    } else {
      slots.default = () => [
        h(base.Button, {}, () => (props.title ? toNode(props.title) : [h(UploadOutlined), title])),
        tip && h('div', { class: 'sup-upload-tip' }, tip),
      ]
    }
    const isView = computed(() => props.disabled || props.isView)
    return () =>
      isView.value && outFileList.value.length === 0
        ? h('div', { class: 'sup-upload-tip' }, '暂无附件')
        : h(
            base.Upload,
            {
              ...globalProps.Upload,
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
            },
            {
              default: isView.value ? null : slots.default,
            }
          )
  },
})
</script>
