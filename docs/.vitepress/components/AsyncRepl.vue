<script lang="ts">
import { defineAsyncComponent, defineComponent, h, Suspense } from 'vue'

const Repl = defineAsyncComponent(() => import('./DocsRepl.vue'))

export default defineComponent({
  setup() {
    return () => typeof window === 'undefined' ? null : h(Suspense, () => h(Repl))
  },
})
</script>
