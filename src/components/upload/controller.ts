export interface UploadFileInfo {
  uid: string
  file?: File
  name: string
  type: string
  url: string
  size?: number
  percent?: number
  status?: 'waiting' | 'error' | 'success' | 'done' | 'uploading' | 'removed'
  [key: string]: any
}

export type UploadMode = 'auto' | 'submit' | 'custom' | 'base64' | 'text'

interface UploadControllerOptions {
  mode: UploadMode
  valueKey?: string
  infoNames?: Partial<Pick<UploadFileInfo, 'uid' | 'name' | 'url'>>
  maxCount: number
  accept?: string
  minSize?: number
  maxSize?: number
  repeatable?: boolean
}

function accepts(file: UploadFileInfo, accept: string) {
  return accept.split(',').some((rule) => {
    return file.name?.endsWith(rule) || (file.type && new RegExp(`^${rule.replace('*', '\\S*')}$`).test(file.type))
  })
}

/**
 * 管理上传领域状态，不感知具体 UI Upload、Modal 或消息协议。
 * 组件只负责把 UI 事件转成这里的文件与任务操作。
 */
export function createUploadController(options: UploadControllerOptions) {
  const { mode, valueKey, infoNames, maxCount, accept, minSize, maxSize, repeatable } = options
  const names: Obj = {
    ...(valueKey && { [valueKey]: valueKey }),
    uid: 'uid',
    status: 'status',
    url: 'url',
    name: 'name',
    ...infoNames,
  }
  if (mode === 'custom') names.originFileObj = 'originFileObj'

  const uploadTasks = new Map<string, Promise<any>>()
  const waitingTasks = new Map<string, () => Promise<any>>()
  const removeTasks = new Map<Obj, () => Promise<any>>()

  const convertInfo = (info: Obj) => {
    const result: Obj = { status: 'done', ...info }
    Object.entries(names).forEach(([key, name]) => {
      if (name && name !== key && name in result) {
        result[key] = result[name as string]
        delete result[name as string]
      }
    })
    return result as UploadFileInfo
  }

  const reconvert = (info: Obj) => {
    const result: Obj = {}
    Object.entries(names).forEach(([key, name]) => {
      const value = info[key]
      if (name && value !== undefined) result[name as string] = value
    })
    return result
  }

  const getValue = (list: Obj[], isSingle: boolean) => {
    if (isSingle) {
      const first = list[0]
      return !valueKey ? first : first?.[valueKey] ?? first?.[names.uid]
    }
    return valueKey ? list.map((item) => item[valueKey] ?? item[names.uid]) : list
  }

  const validate = (file: UploadFileInfo, selectedFiles: UploadFileInfo[], currentFiles: UploadFileInfo[]) => {
    if (maxCount > 1 && currentFiles.length + selectedFiles.indexOf(file) >= maxCount) {
      return `文件数量最多${maxCount}`
    }
    if (accept && !accepts(file, accept)) return '请选择正确的文件类型！'
    if (minSize || maxSize) {
      const size = (file.size || 0) / 1024 / 1024
      if (minSize && minSize > size) return `文件最小需要${minSize}M`
      if (maxSize && maxSize < size) return `文件最大不超过${maxSize}M`
    }
    if (!repeatable) {
      const repeated = currentFiles.find((item) => item.name === file.name)
      if (repeated) return `文件重复: ${repeated.name}`
    }
  }

  const clearTask = (uid: string) => {
    uploadTasks.delete(uid)
    waitingTasks.delete(uid)
  }

  const registerRequest = (uid: string, request: () => Promise<any>) => {
    if (mode === 'auto') {
      const task = request()
      uploadTasks.set(uid, task)
      return task
    }
    if (mode === 'submit') waitingTasks.set(uid, request)
  }

  const queueDelete = (file: Obj, handler: () => Promise<any>) => removeTasks.set(file, handler)

  const submit = async (files: UploadFileInfo[]) => {
    let uploads: Promise<any> = Promise.resolve()
    if (mode === 'auto') {
      const failed = files.find((file) => file.status === 'error')
      if (failed) throw failed.response || { message: '文件上传错误，请删除后重新上传！' }
      uploads = Promise.all(uploadTasks.values())
    } else if (mode === 'submit') {
      const tasks = files
        .filter((file) => file.status !== 'done')
        .map((file) => {
          file.status = 'uploading'
          return waitingTasks.get(file.uid)?.()
        })
        .filter(Boolean)
      uploads = Promise.all(tasks)
    }

    const data = await uploads
    // 删除失败不能中断表单提交，保持历史提交语义。
    await Promise.all([...removeTasks.values()].map((handler) => handler())).catch((error) => console.error(error))
    return data
  }

  const hasPendingWork = (files: UploadFileInfo[]) => {
    return (
      removeTasks.size > 0 ||
      (mode === 'auto' && files.some((file) => file.status === 'uploading')) ||
      (mode === 'submit' && files.some((file) => file.status !== 'done'))
    )
  }

  return {
    clearTask,
    convertInfo,
    getValue,
    hasPendingWork,
    queueDelete,
    reconvert,
    registerRequest,
    submit,
    validate,
  }
}
