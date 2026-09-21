export interface FormValidationField {
  path: (string | number)[]
  messages: string[]
}

/** Adapter 归一化字段错误，同时保留原始原因供业务诊断。 */
export class FormValidationError extends Error {
  constructor(public fields: FormValidationField[], public cause: unknown) {
    super(fields.flatMap((field) => field.messages)[0] || '表单校验失败')
    this.name = 'FormValidationError'
  }
}
