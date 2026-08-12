<script lang="ts">
import {
  defineAsyncComponent,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  Suspense,
} from "vue";

const HomeQuickStart = defineAsyncComponent(
  () => import("./HomeQuickStart.vue")
);

export default defineComponent({
  setup() {
    const shouldLoad = ref(false);
    let mediaQuery: MediaQueryList | undefined;

    const updateShouldLoad = () => {
      shouldLoad.value = mediaQuery?.matches ?? false;
    };

    onMounted(() => {
      mediaQuery = window.matchMedia("(min-width: 721px)");
      updateShouldLoad();
      mediaQuery.addEventListener("change", updateShouldLoad);
    });

    onBeforeUnmount(() => {
      mediaQuery?.removeEventListener("change", updateShouldLoad);
    });

    // 窄屏不渲染异步组件，因此不会加载 REPL 及其静态依赖。
    return () =>
      shouldLoad.value ? h(Suspense, () => h(HomeQuickStart)) : null;
  },
});
</script>
