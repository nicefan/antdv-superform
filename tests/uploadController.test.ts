import { describe, expect, it, vi } from 'vitest'
import { createUploadController } from '../src/components/upload/controller'

describe('Upload Core Controller', () => {
  it('按字段映射转换文件信息和值', () => {
    const controller = createUploadController({
      mode: 'auto',
      valueKey: 'id',
      infoNames: { uid: 'fileId', name: 'fileName', url: 'fileUrl' },
      maxCount: 1,
    })
    const inner = controller.convertInfo({ fileId: '1', fileName: 'a.txt', fileUrl: '/a.txt' })

    expect(inner).toMatchObject({ uid: '1', name: 'a.txt', url: '/a.txt', status: 'done' })
    expect(controller.reconvert(inner)).toEqual({ fileId: '1', status: 'done', fileUrl: '/a.txt', fileName: 'a.txt' })
    expect(controller.getValue([{ id: '1' }], true)).toBe('1')
  })

  it('submit 模式延迟上传并在提交时等待删除任务', async () => {
    const controller = createUploadController({ mode: 'submit', maxCount: Infinity })
    const upload = vi.fn().mockResolvedValue('uploaded')
    const remove = vi.fn().mockResolvedValue('removed')
    const file = { uid: '1', name: 'a.txt', type: 'text/plain', url: '', status: 'waiting' as const }

    controller.registerRequest(file.uid, upload)
    controller.queueDelete({ uid: 'old' }, remove)

    await expect(controller.submit([file])).resolves.toEqual(['uploaded'])
    expect(file.status).toBe('uploading')
    expect(upload).toHaveBeenCalledOnce()
    expect(remove).toHaveBeenCalledOnce()
  })

  it('auto 立即启动任务，custom 不接管请求', () => {
    const auto = createUploadController({ mode: 'auto', maxCount: Infinity })
    const custom = createUploadController({ mode: 'custom', maxCount: Infinity })
    const request = vi.fn().mockResolvedValue('done')

    expect(auto.registerRequest('auto', request)).toBeInstanceOf(Promise)
    expect(request).toHaveBeenCalledOnce()
    expect(custom.registerRequest('custom', request)).toBeUndefined()
    expect(request).toHaveBeenCalledOnce()
  })
})
