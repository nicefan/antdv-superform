
<script lang="ts">
import { ref, watchPostEffect, watch, defineComponent, h, toRef } from 'vue'
import base from './base'
export default defineComponent({
  props: {
    option: { type: Object, required: true },
    effectData: { type: Object, required: true },
    model: Object,
    onChange: Function,
  },
  emits: ['update:labelField'],
  setup(props, ctx) {
    const dataRef = ref<any[]>([])
    const { data, treeData = data, labelField, label } = props.option
    if (typeof treeData === 'function') {
      watchPostEffect(() => {
        Promise.resolve(treeData(props.effectData)).then((res) => {
          dataRef.value = res || []
        })
      })
    } else if (data) {
      watch(
        () => treeData,
        (data) => (dataRef.value = data as any),
        { immediate: true }
      )
    }
    let onChange = props.onChange as any
    if (labelField) {
      onChange = (...args) => {
        const [val, labels] = args
        ctx.emit('update:labelField', Array.isArray(val) ? labels : labels[0])
        props.onChange?.(...args)
      }
    }
    return () =>
      h(
        base.TreeSelect,
        { allowClear: true, placeholder: `请选择${label}`, onChange, treeData: dataRef.value },
        ctx.slots
      )
  },
})
</script>
