<script lang="ts">
import { defineComponent, h } from 'vue'
import base from './base'

export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object,
  },

  setup(props) {
    return () => h(base.TimePicker)
  },
})
</script>
