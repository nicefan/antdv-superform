import { translate } from '../locale'

export interface FormValidationField {
  path: (string | number)[]
  messages: string[]
}

/** Adapter 归一化字段错误，同时保留原始原因供业务诊断。 */
export class FormValidationError extends Error {
  constructor(public fields: FormValidationField[], public cause: unknown) {
    super(fields.flatMap((field) => field.messages)[0] || translate('validationFailed'))
    this.name = 'FormValidationError'
  }
}
