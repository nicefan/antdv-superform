import type { UIUploadFile } from '../../adapter/types'

export type UploadFileInfo = UIUploadFile

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
  const name = file.name?.toLowerCase() || ''
  const type = file.type?.toLowerCase() || ''
  return accept.split(',').some((value) => {
    const rule = value.trim().toLowerCase()
    if (!rule) return false
    if (rule.startsWith('.')) return name.endsWith(rule)
    return rule.endsWith('/*') ? type.startsWith(rule.slice(0, -1)) : type === rule
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
  if (mode === 'custom') names.file = 'file'

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
    if (mode === 'auto' || mode === 'base64' || mode === 'text') {
      const task = request()
      uploadTasks.set(uid, task)
      // 即时任务可能先于表单提交失败；保留原 Promise 供提交读取错误。
      void task.catch(() => undefined)
      return task
    }
    if (mode === 'submit') waitingTasks.set(uid, request)
  }

  const queueDelete = (file: Obj, handler: () => Promise<any>) => removeTasks.set(file, handler)

  const submit = async (files: UploadFileInfo[]) => {
    let uploads: Promise<any> = Promise.resolve()
    if (mode === 'auto' || mode === 'base64' || mode === 'text') {
      const failed = files.find((file) => file.status === 'error')
      if (failed) throw failed.error || failed.response || { message: '文件处理失败，请删除后重新选择！' }
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
    // 取出本批任务后立即清空，避免后续提交重复删除；新加入的任务留给下次提交。
    const deletes = [...removeTasks.values()]
    removeTasks.clear()
    // 删除失败不阻断提交，但仍需等待本批所有删除完成，不隐式重试历史任务。
    await Promise.all(deletes.map(async (handler) => {
      try {
        await handler()
      } catch (error) {
        console.error(error)
      }
    }))
    return data
  }

  const hasPendingWork = (files: UploadFileInfo[]) => {
    return (
      removeTasks.size > 0 ||
      (mode === 'auto' && files.some((file) => file.status === 'uploading')) ||
      ((mode === 'base64' || mode === 'text') && files.some((file) => file.status !== 'done')) ||
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
