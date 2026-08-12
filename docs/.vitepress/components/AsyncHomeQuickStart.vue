<script lang="ts">
import { defineAsyncComponent, defineComponent, h, Suspense } from 'vue'

const HomeQuickStart = defineAsyncComponent(() => import('./HomeQuickStart.vue'))

export default defineComponent({
  setup() {
    return () => (typeof window === 'undefined' ? null : h(Suspense, () => h(HomeQuickStart)))
  },
})
</script>
