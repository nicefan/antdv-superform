<script lang="ts">
import { defineComponent, type PropType, computed, ref, h, reactive } from 'vue'
import { UploadOutlined, PaperClipOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons-vue'
import base from './base'
import { message, Upload } from 'ant-design-vue'

interface FileInfo {
  /** 文件id */
  uid: string
  /** 文件对象 */
  file?: File
  /** 文件名 */
  name: string
  /** 链接地址 */
  url: string
  /** 上传进度 */
  percent?: number
  /** 文件状态 */
  status?: 'waiting' | 'error' | 'success' | 'done' | 'uploading' | 'removed'
}

function acceptValidtor(accept:string, file: FileInfo) {
  return accept.split(',').some(str => {
    return (file.name.endsWith(str)) || new RegExp(`^${str.replace('*', '\\S*')}$`).test(file.type)
  })
}

export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object,
    value: [String, Array] as PropType<string | string[]>,
    fileList: Array as PropType<any[]>,
    /** 指定文件信息字段 */
    fieldNames: Object as PropType<Partial<Pick<FileInfo, 'uid' | 'name' | 'url'>>>,
    /** 是否立即上传 */
    immediate: { type: Boolean, default: () => true },
    customRequest: Function,
    minSize: Number,
    maxSize: Number,
    isSingle: Boolean,
    maxCount: Number,
  },
  emits: ['update:value', 'update:fileList'],
  setup(props, ctx) {
    const { minSize, maxSize, isSingle, maxCount } = props
    const { accept } = ctx.attrs as Obj<string>
    const { fileField, apis = {}, immediate = props.immediate } = props.option
    //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法

    const uploadList = ref<FileInfo[]>([])

    const fileList = ref<any[]>([
      {
        uid: 'abc',
        name: 'abc.ppt',
        url: './abc.ppt',
        status: 'done',
      },
    ])
    if (!props.fileList) {
      ctx.emit('update:fileList', [...fileList.value])
    }

    const beforeUpload = (file, resFileList) => {
      let errMessage
      if (maxCount && fileList.value.length > maxCount) {
        errMessage = '文件数量最多' + maxCount
      }
      if (accept && !acceptValidtor(accept, file)) {
        errMessage = '请选择正确的文件类型！'
      } else if (minSize || maxSize) {
        const fileSize = file.size / 1024 / 1024
        if (minSize && minSize > fileSize) {
          errMessage = '文件最小需要' + minSize + 'M'
        }
        if (maxSize && maxSize < fileSize) {
          errMessage = '文件最大不超过' + minSize + 'M'
        }
      }
      if (errMessage) {
        message.error(errMessage)
        return Upload.LIST_IGNORE
      }
      if (!immediate) {
        file.status = 'waiting'
      }
      return immediate
    }

    const customRequest =
      // apis.upload &&
      ((args) => {
        if (!apis.upload) return Promise.reject()
        const { file, onProgress, onError, onSuccess } = args
        const formData: any = new FormData()
        formData.append('file', file)

        apis.upload &&
          apis
            .upload(formData, {
              onUploadProgress: onProgress,
            })
            .then(onSuccess, onError)
      })

    function handleChange(info: Record<string, any>) {
      const file = info.file
      const status = file?.status
      const url = file?.response?.link
      const name = file?.name

        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        const resFileList = [...info.fileList]
      // const resFileList = info.fileList.map(file => {
      //   if (file.response) {
      //     // Component will show file.url as link
      //     file.url = file.response.url;
      //   }
      //   return file;
      // });
      ctx.emit(
        'update:value',
        resFileList.map((item) => item.uid)
      )
      ctx.emit('update:fileList', resFileList)
      fileList.value = resFileList
      // if (status === 'uploading') {
      //   if (!uploading) {
      //     emit('uploading', name)
      //     uploading = true
      //   }
      // } else if (status === 'done') {
      //   emit('done', name, url)
      //   uploading = false
      // } else if (status === 'error') {
      //   emit('error')
      //   uploading = false
      // }
    }

    // 查看模式时，控制操作按钮
    const listConfig = { showRemoveIcon: false }

    const iconRender = ({file, listType}) => {
      if (file.status === 'waiting') {
        return h(SyncOutlined)
      } else if (file.status === 'uploading'){
        return h(LoadingOutlined)
      } else {
        return h(PaperClipOutlined)
      }
    }
    // const formItemContext = Form.useInjectFormItemContext();

    return () =>
      h(
        base.Upload,
        {
          customRequest,
          beforeUpload,
          fileList: fileList.value,
          onChange: handleChange,
          maxCount: 3
        },
        {
        default:() => h(base.Button, {}, () => [h(UploadOutlined), '上传']),
        iconRender
        }
      )
  },
})
</script>
