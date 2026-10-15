import { shallowRef } from 'vue'

export const zhCN = {
  name: 'zh-CN',
  messages: {
    yes: '是', no: '否',
    confirm: '确定', cancel: '取消', add: '新增', delete: '删除', edit: '修改', detail: '查看',
    submit: '提交', search: '查询', reset: '重置', save: '保存', expand: '展开', collapse: '收起',
    refresh: '刷新', density: '密度', columnSetting: '列设置', checkAll: '全部勾选', dragColumn: '拖动调整列顺序',
    densityLarge: '宽松', densityMiddle: '默认', densitySmall: '紧凑', fixLeft: '固定到左侧', fixRight: '固定到右侧',
    deleteConfirm: '确定要删除吗？', editTitle: '编辑', detailTitle: '详情', actionColumn: '操作', indexColumn: '序号',
    input: '请输入{label}', select: '请选择{label}', selectStart: '请选择开始{label}', selectEnd: '请选择结束{label}',
    validationFailed: '表单校验失败',
    required: '{label}不能为空！', email: '请输入正确的邮箱地址', integer: '{label}必须为整数',
    number: '{label}必须为数字', idcard: '请输入正确的身份证号', phone: '请输入正确的电话号码',
    mobile: '请输入正确的手机号', twoDecimal: '最多支持2位小数',
    word: '{label}只能为字母数字及下划线，且首字符不能为_',
    stringLen: '{label}长度必须等于{len}', stringMax: '{label}长度不能超过{max}',
    stringMin: '{label}长度至少为{min}', stringRange: '{label}长度必须{min}至{max}之间',
    numberLen: '{label}需等于{len}', numberMax: '{label}需小于{max}',
    numberMin: '{label}需大于{min}', numberRange: '{label}需在{min}至{max}之间',
    addTag: '添加标签', upload: '上传文件', download: '下载', preview: '预览',
    uploadWaiting: '待处理', uploadError: '处理失败', uploadEmpty: '暂无附件',
    uploadSync: '文件同步中，请稍候...', uploadFailed: '文件上传失败', selectFailed: '文件选择失败',
    deleteFileConfirm: '确定删除吗？', deletingFile: '文件删除中……', deleteFileFailed: '文件删除失败',
    downloadingFile: '文件下载中，请稍候...', downloadFileFailed: '文件下载失败',
    fileFormats: '支持文件格式：{accept}', fileSizeTip: '单个文件不超过{maxSize}MB',
    fileCount: '文件数量最多{maxCount}', fileType: '请选择正确的文件类型！',
    fileMinSize: '文件最小需要{minSize}M', fileMaxSize: '文件最大不超过{maxSize}M',
    fileDuplicate: '文件重复: {name}', fileProcessFailed: '文件处理失败，请删除后重新选择！',
    recordDeleted: '当前记录已删除', insertRecordDeleted: '新增位置对应的记录已删除',
    insertPositionInvalid: '新增位置已失效，请重新选择插入位置',
    insertAnchorDeleted: '新增锚点已不存在，请取消后重新选择插入位置',
    recordNotSelected: '未选择记录',
  },
}

export interface SuperFormLocale {
  name: string
  messages: Record<keyof typeof zhCN.messages, string>
}

/** 可基于内置语言包覆盖部分文案；缺省键回退到简体中文。 */
export interface SuperFormLocaleConfig {
  name?: string
  messages?: Partial<SuperFormLocale['messages']>
}

export const enUS: SuperFormLocale = {
  name: 'en-US',
  messages: {
    yes: 'Yes', no: 'No',
    confirm: 'OK', cancel: 'Cancel', add: 'Add', delete: 'Delete', edit: 'Edit', detail: 'View',
    submit: 'Submit', search: 'Search', reset: 'Reset', save: 'Save', expand: 'Expand', collapse: 'Collapse',
    refresh: 'Refresh', density: 'Density', columnSetting: 'Column settings', checkAll: 'Select all', dragColumn: 'Drag to reorder columns',
    densityLarge: 'Large', densityMiddle: 'Default', densitySmall: 'Compact', fixLeft: 'Fix to left', fixRight: 'Fix to right',
    deleteConfirm: 'Are you sure you want to delete?', editTitle: 'Edit', detailTitle: 'Details', actionColumn: 'Actions', indexColumn: 'No.',
    input: 'Please enter {label}', select: 'Please select {label}', selectStart: 'Please select start {label}', selectEnd: 'Please select end {label}',
    validationFailed: 'Form validation failed',
    required: '{label} is required!', email: 'Please enter a valid email address', integer: '{label} must be an integer',
    number: '{label} must be a number', idcard: 'Please enter a valid ID card number', phone: 'Please enter a valid telephone number',
    mobile: 'Please enter a valid mobile number', twoDecimal: 'Use at most 2 decimal places',
    word: '{label} may contain only letters, numbers and underscores, and cannot start with an underscore',
    stringLen: '{label} must be {len} characters long', stringMax: '{label} cannot exceed {max} characters',
    stringMin: '{label} must be at least {min} characters long', stringRange: '{label} must be between {min} and {max} characters long',
    numberLen: '{label} must equal {len}', numberMax: '{label} must be less than {max}',
    numberMin: '{label} must be greater than {min}', numberRange: '{label} must be between {min} and {max}',
    addTag: 'Add tag', upload: 'Upload file', download: 'Download', preview: 'Preview',
    uploadWaiting: 'Waiting', uploadError: 'Processing failed', uploadEmpty: 'No attachments',
    uploadSync: 'Synchronizing files, please wait...', uploadFailed: 'File upload failed', selectFailed: 'File selection failed',
    deleteFileConfirm: 'Are you sure you want to delete this file?', deletingFile: 'Deleting file...', deleteFileFailed: 'File deletion failed',
    downloadingFile: 'Downloading file, please wait...', downloadFileFailed: 'File download failed',
    fileFormats: 'Supported file formats: {accept}', fileSizeTip: 'Each file must not exceed {maxSize} MB',
    fileCount: 'A maximum of {maxCount} files is allowed', fileType: 'Please select a supported file type!',
    fileMinSize: 'File size must be at least {minSize} MB', fileMaxSize: 'File size must not exceed {maxSize} MB',
    fileDuplicate: 'Duplicate file: {name}', fileProcessFailed: 'File processing failed. Please remove the file and select it again!',
    recordDeleted: 'The record has been deleted', insertRecordDeleted: 'The record at the insertion position has been deleted',
    insertPositionInvalid: 'The insertion position is no longer valid. Please select it again',
    insertAnchorDeleted: 'The insertion anchor no longer exists. Please cancel and select the position again',
    recordNotSelected: 'No record selected',
  },
}

const currentLocale = shallowRef<SuperFormLocale>(zhCN)

/** 只替换语言状态，不重新建立模型、动作或正在执行的任务。 */
export function setLocale(locale: SuperFormLocaleConfig = zhCN) {
  const messages = { ...zhCN.messages }
  for (const key of Object.keys(messages) as (keyof typeof messages)[]) {
    messages[key] = locale.messages?.[key] ?? messages[key]
  }
  currentLocale.value = { name: locale.name ?? zhCN.name, messages }
}

/** 模板使用完整句子，参数保留 0 等有效值；业务文案不经过此入口。 */
export function translate(key: keyof SuperFormLocale['messages'], params: Record<string, unknown> = {}) {
  return currentLocale.value.messages[key].replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? ''))
}
