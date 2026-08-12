<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { useData } from "vitepress";
import { Preview, ReplStore } from "@vue/repl";
import "@vue/repl/style.css";
import demoCode from "./HomeQuickStartDemo.vue?raw";
import mockCode from "./homeQuickStartMock.ts?raw";
import {
  exampleAppCode,
  exampleLocaleUrl,
  examplePreviewOptions,
} from "./exampleApp";

interface VersionEntry {
  version: string;
  path: string;
}

interface Manifest {
  latest: string;
  versions: VersionEntry[];
}

const base = import.meta.env.BASE_URL;
const manifest = await fetch(`${base}repl/versions.json`).then(
  async (response) => {
    if (!response.ok) throw new Error("入门示例运行环境加载失败");
    return response.json() as Promise<Manifest>;
  }
);
const version =
  manifest.versions.find(({ version }) => version === manifest.latest) ??
  manifest.versions[0];

if (!version) throw new Error("尚未生成可用的示例运行环境");

function asset(filename: string) {
  return `${base}${version.path}/${filename}`;
}

const store = new ReplStore({
  defaultVueRuntimeURL: asset("vue.runtime.esm-browser.js"),
  defaultVueRuntimeProdURL: asset("vue.runtime.esm-browser.prod.js"),
  showOutput: true,
  outputMode: "preview",
});

await store.setFiles(
  {
    "App.vue": exampleAppCode,
    "Example.vue": demoCode,
    "homeQuickStartMock.ts": mockCode,
    "main.css": `@import '${asset("antd.css")}';
@import '${asset("style.css")}';
body { margin: 0; padding: 20px; color: #1f2329; background: #fff; }`,
  },
  "App.vue"
);
store.setImportMap({
  imports: {
    vue: asset("vue.runtime.esm-browser.js"),
    "ant-design-vue": asset("antd.js"),
    "ant-design-vue/es/locale/zh_CN": exampleLocaleUrl,
    "antdv-superform": asset("antdv-superform.js"),
  },
});
store.init();

const { isDark } = useData();
provide("store", store);
provide("clear-console", ref(true));
provide(
  "theme",
  computed(() => (isDark.value ? "dark" : "light"))
);
provide("preview-options", examplePreviewOptions);
</script>

<template>
  <section class="home-quick-start">
    <header class="home-section-heading">
      <span>从这里开始</span>
      <h2>一个 SuperTable，就是一套完整的业务操作</h2>
      <p>先直接体验查询、选择、状态切换和完整 CRUD，再看实现它需要多少代码。</p>
    </header>

    <div class="home-demo-stage">
      <Preview :show="true" :ssr="false" />
    </div>
  </section>
</template>
