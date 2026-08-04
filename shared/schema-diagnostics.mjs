const BUILTIN_TYPES = new Set([
  'Input',
  'Textarea',
  'InputNumber',
  'AutoComplete',
  'Select',
  'TreeSelect',
  'DatePicker',
  'DateRange',
  'TimePicker',
  'TimeRange',
  'Switch',
  'Radio',
  'Checkbox',
  'Upload',
  'TagInput',
  'TagSelect',
  'Text',
  'HTML',
  'Hidden',
  'InputSlot',
  'InfoSlot',
  'Form',
  'Group',
  'Fragment',
  'Card',
  'List',
  'ListGroup',
  'Tabs',
  'Collapse',
  'Descriptions',
  'Table',
  'InputGroup',
  'InputList',
])

const DEPRECATED_KEYS = {
  hideInTable: "使用 exclude: ['table']",
  hideInForm: "使用 exclude: ['form']",
  hideInDescription: "使用 exclude: ['description']",
  searchSchema: '使用 searchForm',
  editForm: '使用 rowEditor.form',
  validOn: '使用 visibleIn',
  invalidDisabled: "使用 unauthorized: 'disable'",
  roleMode: "使用 unauthorized: 'hide' | 'disable'",
  valueToLabel: '使用 labelAsValue',
  valueToString: '使用 stringifyValue',
  blocked: '使用 block',
  wrapping: '使用 breakAfter',
  forSlot: '使用 targetSlot',
  keepField: '使用 endField',
}

const INPUT_TYPES = new Set(['Input', 'InputNumber', 'Textarea', 'AutoComplete'])
const SELECT_TYPES = new Set(['Select', 'TreeSelect'])
const OPTION_TYPES = new Set(['Select', 'TreeSelect', 'Radio', 'Checkbox'])
const CONTAINER_TYPES = new Set([
  'Form',
  'Group',
  'Fragment',
  'Card',
  'List',
  'ListGroup',
  'Tabs',
  'Collapse',
  'Descriptions',
  'Table',
])
const EXCLUDE_VALUES = new Set(['table', 'form', 'description'])
const DATA_KEYS = new Set([
  'attrs',
  'dynamicAttrs',
  'dataSource',
  'initialValue',
  'options',
  'params',
  'rules',
  'treeData',
  'value',
])
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const issue = (level, code, path, message) => ({ level, code, path, message })

function scanDeprecated(value, path, diagnostics, seen) {
  if (!value || typeof value !== 'object' || seen.has(value)) return
  seen.add(value)

  if (isObject(value)) {
    for (const [key, replacement] of Object.entries(DEPRECATED_KEYS)) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        diagnostics.push(issue('warning', 'deprecated-api', `${path}.${key}`, `已废弃，${replacement}。`))
      }
    }
  }

  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'function' || DATA_KEYS.has(key)) continue
    if (Array.isArray(child)) {
      child.forEach((item, index) => scanDeprecated(item, `${path}.${key}[${index}]`, diagnostics, seen))
    } else if (isObject(child)) {
      scanDeprecated(child, `${path}.${key}`, diagnostics, seen)
    }
  }
}

function diagnoseItem(item, path, diagnostics, kind) {
  if (!isObject(item)) {
    if (typeof item !== 'string') diagnostics.push(issue('error', 'invalid-item', path, '字段配置必须是对象。'))
    return
  }

  const { type } = item
  if (type !== undefined && (typeof type !== 'string' || (!BUILTIN_TYPES.has(type) && !type.startsWith('Ext')))) {
    diagnostics.push(issue('error', 'unknown-type', `${path}.type`, `未知字段类型 ${JSON.stringify(type)}。`))
  }
  if (type === undefined && kind !== 'table') {
    diagnostics.push(issue('warning', 'missing-type', `${path}.type`, '表单或详情字段建议明确配置 type。'))
  }

  if (Array.isArray(item.exclude)) {
    const invalid = item.exclude.filter((value) => !EXCLUDE_VALUES.has(value))
    if (invalid.length) {
      diagnostics.push(
        issue(
          'error',
          'invalid-exclude',
          `${path}.exclude`,
          `只支持 table、form、description，当前包含：${invalid.join('、')}。`
        )
      )
    }
  } else if (item.exclude !== undefined) {
    diagnostics.push(issue('error', 'invalid-exclude', `${path}.exclude`, 'exclude 必须是字符串数组。'))
  }

  if (item.visibleIn !== undefined && !['form', 'detail', 'both'].includes(item.visibleIn)) {
    diagnostics.push(
      issue('error', 'invalid-visible-in', `${path}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
    )
  }
  if (item.unauthorized !== undefined && !['hide', 'disable'].includes(item.unauthorized)) {
    diagnostics.push(
      issue('error', 'invalid-unauthorized', `${path}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
    )
  }

  if (OPTION_TYPES.has(type) && !item.options && !item.dictName) {
    diagnostics.push(issue('warning', 'missing-options', path, `${type} 未配置 options 或 dictName。`))
  }

  const placeholder = item.attrs?.placeholder
  const defaultPlaceholder = INPUT_TYPES.has(type)
    ? `请输入${typeof item.label === 'string' ? item.label : ''}`
    : SELECT_TYPES.has(type)
    ? `请选择${typeof item.label === 'string' ? item.label : ''}`
    : undefined
  if (defaultPlaceholder !== undefined && placeholder === defaultPlaceholder) {
    diagnostics.push(
      issue('suggestion', 'redundant-default', `${path}.attrs.placeholder`, '与内置 placeholder 相同，可以省略。')
    )
  }

  const defaultValueFormat = ['DatePicker', 'DateRange'].includes(type)
    ? 'YYYY-MM-DD'
    : ['TimePicker', 'TimeRange'].includes(type)
    ? 'HH:mm:ss'
    : undefined
  if (defaultValueFormat && item.attrs?.valueFormat === defaultValueFormat) {
    diagnostics.push(
      issue('suggestion', 'redundant-default', `${path}.attrs.valueFormat`, '与内置 valueFormat 相同，可以省略。')
    )
  }
  if (type === 'InputGroup' && item.attrs?.compact === true) {
    diagnostics.push(
      issue('suggestion', 'redundant-default', `${path}.attrs.compact`, 'InputGroup 默认使用紧凑布局，可以省略。')
    )
  }

  if (item.block === false && !CONTAINER_TYPES.has(type)) {
    diagnostics.push(issue('suggestion', 'redundant-default', `${path}.block`, 'block: false 是默认行为，可以省略。'))
  }
  if (item.breakAfter === false) {
    diagnostics.push(
      issue('suggestion', 'redundant-default', `${path}.breakAfter`, 'breakAfter: false 是默认行为，可以省略。')
    )
  }
  if ((item.options || item.dictName) && item.tagViewer === true) {
    diagnostics.push(
      issue('suggestion', 'redundant-default', `${path}.tagViewer`, '选项字段默认使用 Tag 展示，可以省略。')
    )
  }

  for (const key of ['hidden', 'disabled']) {
    if (item[key] === false) {
      diagnostics.push(issue('suggestion', 'redundant-default', `${path}.${key}`, `${key}: false 可以省略。`))
    }
  }
  if (Object.prototype.hasOwnProperty.call(item, 'initialValue') && item.initialValue === undefined) {
    diagnostics.push(
      issue('suggestion', 'redundant-default', `${path}.initialValue`, 'initialValue: undefined 可以省略。')
    )
  }
  for (const key of ['attrs', 'rowProps']) {
    if (isObject(item[key]) && Object.keys(item[key]).length === 0) {
      diagnostics.push(issue('suggestion', 'empty-config', `${path}.${key}`, `空的 ${key} 配置可以省略。`))
    }
  }
  for (const key of ['rules', 'options']) {
    if (Array.isArray(item[key]) && item[key].length === 0) {
      diagnostics.push(issue('suggestion', 'empty-config', `${path}.${key}`, `空的 ${key} 配置可以省略。`))
    }
  }

  if (item.subItems) diagnoseItems(item.subItems, `${path}.subItems`, diagnostics, kind === 'table' ? 'form' : kind)
  if (item.columns) diagnoseItems(item.columns, `${path}.columns`, diagnostics, 'table')
}

function diagnoseItems(items, path, diagnostics, kind) {
  if (!Array.isArray(items)) {
    diagnostics.push(issue('error', 'invalid-items', path, '必须是数组。'))
    return
  }

  const fields = new Map()
  items.forEach((item, index) => {
    const itemPath = `${path}[${index}]`
    diagnoseItem(item, itemPath, diagnostics, kind)
    if (!isObject(item) || typeof item.field !== 'string' || !item.field) return
    if (fields.has(item.field)) {
      diagnostics.push(
        issue(
          'warning',
          'duplicate-field',
          `${itemPath}.field`,
          `字段 ${item.field} 与 ${fields.get(item.field)} 重复。`
        )
      )
    } else {
      fields.set(item.field, `${path}[${index}].field`)
    }
  })
}

export function diagnoseSchema(schema, kind = 'auto') {
  const diagnostics = []
  if (!isObject(schema)) return [issue('error', 'invalid-schema', 'schema', 'schema 必须是对象。')]

  scanDeprecated(schema, 'schema', diagnostics, new WeakSet())

  const resolvedKind = kind === 'auto' ? (Array.isArray(schema.columns) ? 'table' : 'form') : kind
  if (!['form', 'table', 'detail'].includes(resolvedKind)) {
    return [issue('error', 'invalid-schema-type', 'schema', `未知 schema 类型 ${JSON.stringify(kind)}。`)]
  }

  if (schema.subSpan === 8)
    diagnostics.push(issue('suggestion', 'redundant-default', 'schema.subSpan', 'subSpan: 8 是默认值，可以省略。'))
  if (schema.gutter === 16)
    diagnostics.push(issue('suggestion', 'redundant-default', 'schema.gutter', 'gutter: 16 是默认值，可以省略。'))

  if (isObject(schema.params) && Object.keys(schema.params).length === 0) {
    diagnostics.push(issue('suggestion', 'empty-config', 'schema.params', '空的 params 配置可以省略。'))
  }

  if (resolvedKind === 'table') {
    for (const key of ['editMode', 'addMode']) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        diagnostics.push(issue('warning', 'deprecated-api', `schema.${key}`, `已废弃，使用 rowEditor.${key}。`))
      }
    }
    if (!Array.isArray(schema.columns))
      diagnostics.push(issue('error', 'missing-columns', 'schema.columns', '表格必须配置 columns。'))
    else diagnoseItems(schema.columns, 'schema.columns', diagnostics, 'table')

    if (schema.immediate === true)
      diagnostics.push(
        issue('suggestion', 'redundant-default', 'schema.immediate', 'immediate: true 是默认值，可以省略。')
      )
    if (schema.pagination === false)
      diagnostics.push(
        issue('suggestion', 'redundant-default', 'schema.pagination', 'pagination: false 是默认值，可以省略。')
      )
    if (schema.attrs?.rowKey === 'id')
      diagnostics.push(
        issue('suggestion', 'redundant-default', 'schema.attrs.rowKey', "rowKey: 'id' 是默认值，可以省略。")
      )
    if (schema.attrs?.size === 'small')
      diagnostics.push(
        issue('suggestion', 'redundant-default', 'schema.attrs.size', "size: 'small' 是默认值，可以省略。")
      )
    if (schema.attrs?.tableLayout === 'fixed')
      diagnostics.push(
        issue(
          'suggestion',
          'redundant-default',
          'schema.attrs.tableLayout',
          "tableLayout: 'fixed' 是默认值，可以省略。"
        )
      )
    if (isObject(schema.pagination) && schema.pagination.current === 1)
      diagnostics.push(
        issue('suggestion', 'redundant-default', 'schema.pagination.current', '分页 current 默认是 1，可以省略。')
      )
    if (isObject(schema.pagination) && schema.pagination.pageSize === 10)
      diagnostics.push(
        issue('suggestion', 'redundant-default', 'schema.pagination.pageSize', '分页 pageSize 默认是 10，可以省略。')
      )
    if (schema.searchForm?.subItems)
      diagnoseItems(schema.searchForm.subItems, 'schema.searchForm.subItems', diagnostics, 'form')
    if (schema.rowEditor?.form?.subItems)
      diagnoseItems(schema.rowEditor.form.subItems, 'schema.rowEditor.form.subItems', diagnostics, 'form')
  } else if (!Array.isArray(schema.subItems)) {
    diagnostics.push(issue('error', 'missing-sub-items', 'schema.subItems', '表单或详情必须配置 subItems。'))
  } else {
    if (schema.attrs?.labelAlign === 'right')
      diagnostics.push(
        issue('suggestion', 'redundant-default', 'schema.attrs.labelAlign', "labelAlign: 'right' 是默认值，可以省略。")
      )
    diagnoseItems(schema.subItems, 'schema.subItems', diagnostics, resolvedKind)
  }

  return diagnostics
}
