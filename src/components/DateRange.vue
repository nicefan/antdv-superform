<script lang="ts">
import { defineComponent, h } from 'vue'
import base from './base'

export default defineComponent({
  props: {
    option: Object,
    model: Object,
    effectData: Object,
    disabledDate: Function,
  },
  setup(props, ctx) {
    const disabledDate = (currentDate) => {
      return props.disabledDate?.(currentDate, props.effectData)
    }

    return () => h(base.RangePicker, { valueFormat: 'YYYY-MM-DD', disabledDate }, ctx.slots)
  },
})
</script>
