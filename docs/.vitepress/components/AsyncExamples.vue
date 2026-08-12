<script lang="ts">
import { defineAsyncComponent, defineComponent, h, Suspense } from 'vue'

const Examples = defineAsyncComponent(() => import('./ExamplesWorkspace.vue'))

export default defineComponent({
  setup() {
    return () => (typeof window === 'undefined' ? null : h(Suspense, () => h(Examples)))
  },
})
</script>
