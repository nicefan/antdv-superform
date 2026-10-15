import { defineComponent, h, mergeProps, type PropType } from 'vue'
import { ElCol, ElDescriptions, ElDescriptionsItem, ElRow } from 'element-plus'
import type { UIDescriptionsProps } from 'superform/sdk'

/** 将 Core 已整理的详情状态转换为 Element Plus 原生属性与节点。 */
export default defineComponent({
  props: { state: { type: Object as PropType<UIDescriptionsProps>, required: true } },
  setup(props) {
    return () => {
      const state = props.state
      if (state.mode === 'form') {
        // 表单式详情使用栅格及只读外观，不创建输入组件或额外的数据绑定。
        const renderCol = (attrs: Obj, content: () => any, fallbackFlex = '1 1 0') => {
          const { flex, span, ...rest } = attrs
          const columnFlex = flex ?? (span === 'auto' || span == null ? fallbackFlex : undefined)
          return h(ElCol, mergeProps(rest, {
            span: columnFlex !== undefined ? null : span,
            style: { flex: columnFlex },
          }), { default: content })
        }
        return h('div', mergeProps(state.attrs, {
          class: ['sup-descriptions-mode-form', 'sup-el-descriptions-form', {
            'is-vertical': state.layout === 'vertical',
            'has-colon': state.colon !== false,
          }],
        }), state.rows.map((row) => h(ElRow, state.rowProps, {
          default: () => row.map((item) => renderCol({ ...item.colProps, key: item.key }, () =>
            h(ElRow, { class: 'sup-descriptions-form-item' }, {
              default: () => [
                item.label && renderCol(mergeProps({ class: 'sup-descriptions-form-label' }, item.labelCol),
                  () => h('label', {}, [item.label?.()]), '0 0 auto'),
                renderCol(mergeProps({ class: 'sup-descriptions-form-content' }, item.wrapperCol),
                  () => !item.attrs.noInput && item.label
                    ? h('div', { class: 'sup-descriptions-item-input' }, [item.content()])
                    : item.content()),
              ],
            })
          )),
        })))
      }
      return h(
        ElDescriptions,
        {
          ...state.attrs,
          column: state.column,
          border: state.mode === 'table' ? true : state.attrs.border,
          direction: state.layout || state.attrs.direction,
          size: state.size === 'small' || state.size === 'large' || state.size === 'default' ? state.size : undefined,
        },
        {
          default: () =>
            state.rows.flatMap((row) =>
              row.map((item) =>
                h(
                  ElDescriptionsItem,
                  {
                    ...item.attrs,
                    key: item.key,
                    span: item.colspan,
                  },
                  { label: item.label, default: item.content }
                )
              )
            ),
        }
      )
    }
  },
})
