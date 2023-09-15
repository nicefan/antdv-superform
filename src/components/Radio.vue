<script lang="ts">
import { PropType, ref, watchPostEffect, unref, defineComponent, h, reactive, toRefs } from 'vue'
import { useVModel } from '../utils'
import baseComps from './base'

const { FormItem, RadioGroup } = baseComps

export default defineComponent({
  props: {
    option: {
      required: true,
      type: Object as PropType<ExSelectOption>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelData>,
    },
    effectData: {
      required: true,
      type: Object,
    },
    attrs: {
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const valueProps = useVModel(props)

    const options = ref<any[] | undefined>(props.attrs.options || [])
    const _options = props.option.options
    if (typeof _options === 'function') {
      watchPostEffect(() => {
        Promise.resolve(_options(props.effectData)).then((data) => {
          options.value = data
        })
      })
    } else if (_options) {
      options.value = unref(_options)
    }
    const allAttrs: Obj = reactive({ name: props.option.field, ...toRefs(valueProps), ...props.attrs, options })
    if (allAttrs.buttonStyle) {
      allAttrs.optionType = 'button'
    }
    return () => h(FormItem, {}, () => h(RadioGroup, allAttrs))
  },
})

// 异步获取
// 字典配置
/**
 *  动态切换
 *  依赖某值变化切换
 *
 */
</script>
