<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { Repl, ReplStore } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import { allExamples, exampleGroups } from './exampleCatalog'
import { exampleAppCode, exampleLocaleUrl, examplePreviewOptions } from './exampleApp'
import { sharedMockCode } from './exampleMocks'

interface VersionEntry {
  version: string
  vue: string
  path: string
  createdAt: string
}

interface Manifest {
  latest: string
  versions: VersionEntry[]
}

const base = import.meta.env.BASE_URL
const manifest = await fetch(`${base}repl/versions.json`).then(async (response) => {
  if (!response.ok) throw new Error('示例运行环境加载失败')
  return response.json() as Promise<Manifest>
})

if (!manifest.versions.length) throw new Error('尚未生成可用的示例运行环境')

const latestMajor = manifest.latest.split('.')[0]
const compatibleVersions = manifest.versions.filter(
  ({ version }) => version.split('.')[0] === latestMajor
)

const queryId = new URLSearchParams(location.search).get('example')
const activeId = shallowRef(allExamples.find(({ id }) => id === queryId)?.id ?? allExamples[0].id)
const selectedVersion = shallowRef(manifest.latest)
const replStore = shallowRef<ReplStore>()
const replRevision = shallowRef(0)
let loadId = 0

const activeExample = computed(
  () => allExamples.find(({ id }) => id === activeId.value) ?? allExamples[0]
)
const selectedEntry = computed(
  () =>
    compatibleVersions.find(({ version }) => version === selectedVersion.value) ??
    compatibleVersions[0]
)

function asset(filename: string) {
  return `${base}${selectedEntry.value.path}/${filename}`
}

async function loadExample() {
  const currentLoad = ++loadId
  const next = new ReplStore({
    defaultVueRuntimeURL: asset('vue.runtime.esm-browser.js'),
    defaultVueRuntimeProdURL: asset('vue.runtime.esm-browser.prod.js'),
    showOutput: true,
    outputMode: 'preview',
  })
  await next.setFiles(
    {
      'App.vue': exampleAppCode,
      'Example.vue': activeExample.value.code,
      'mock.ts': sharedMockCode,
      'main.css': `@import '${asset('antd.css')}';\n@import '${asset('style.css')}';
body { margin: 0; padding: 20px; color: #1f2329; background: #fff; }
.demo-note { margin-bottom: 16px; padding: 10px 12px; color: #0958d9; background: #e6f4ff; border: 1px solid #91caff; border-radius: 6px; }
.demo-model { max-height: 240px; margin: 16px 0 0; padding: 12px; overflow: auto; color: #d6e4ff; background: #141414; border-radius: 6px; font-size: 12px; line-height: 1.6; white-space: pre-wrap; }`,
    },
    'App.vue'
  )
  next.setActive('src/Example.vue')
  next.setImportMap({
    imports: {
      vue: asset('vue.runtime.esm-browser.js'),
      'antdv-next': asset('antd.js'),
      'antdv-next/locale/zh_CN': exampleLocaleUrl,
      'superform-antdv': asset('superform-antdv.js'),
    },
  })
  if (currentLoad === loadId) {
    replStore.value = next
    replRevision.value += 1
  }
}

function selectExample(id: string) {
  if (id === activeId.value) return
  activeId.value = id
}

watch(activeId, () => {
  const url = new URL(location.href)
  url.searchParams.set('example', activeId.value)
  history.replaceState(history.state, '', url)
  loadExample()
})
watch(selectedVersion, loadExample)

await loadExample()
</script>

<template>
  <section class="examples-shell">
    <aside class="examples-nav" aria-label="示例列表">
      <div class="examples-nav__heading">
        <strong>示例</strong>
        <span>{{ allExamples.length }} 个</span>
      </div>
      <label class="examples-mobile-select">
        <span>选择示例</span>
        <select v-model="activeId">
          <optgroup v-for="group in exampleGroups" :key="group.title" :label="group.title">
            <option v-for="item in group.items" :key="item.id" :value="item.id">
              {{ item.level ? `[${item.level}] ` : '' }}{{ item.title }}
            </option>
          </optgroup>
        </select>
      </label>
      <div class="examples-nav__groups">
        <section v-for="group in exampleGroups" :key="group.title" class="examples-nav__group">
          <h2>{{ group.title }}</h2>
          <button
            v-for="item in group.items"
            :key="item.id"
            type="button"
            :class="{ active: item.id === activeId }"
            @click="selectExample(item.id)"
          >
            <div class="examples-nav__title">
              <strong>{{ item.title }}</strong>
              <small v-if="item.level" class="example-level">{{ item.level }}</small>
            </div>
            <span>{{ item.description }}</span>
          </button>
        </section>
      </div>
    </aside>

    <main class="examples-main">
      <header class="examples-toolbar">
        <div>
          <div class="examples-toolbar__title">
            <strong>{{ activeExample.title }}</strong>
            <small v-if="activeExample.level" class="example-level">{{
              activeExample.level
            }}</small>
          </div>
          <span>{{ activeExample.description }}</span>
        </div>
        <div class="examples-toolbar__actions">
          <label>
            <span>组件版本</span>
            <select v-model="selectedVersion">
              <option v-for="item in compatibleVersions" :key="item.version" :value="item.version">
                {{ item.version }}
              </option>
            </select>
          </label>
          <button type="button" @click="loadExample">恢复示例</button>
        </div>
      </header>
      <Repl
        v-if="replStore"
        :key="replRevision"
        :store="replStore"
        :editor="CodeMirror"
        :show-compile-output="false"
        :show-import-map="false"
        :show-ts-config="false"
        :ssr="false"
        :preview-options="examplePreviewOptions"
      />
    </main>
  </section>
</template>

<style>
.examples-shell {
  display: grid;
  grid-template-columns: 264px minmax(0, 1fr);
  height: calc(100vh - var(--vp-nav-height));
  min-height: 680px;
  background: var(--vp-c-bg);
}

.examples-nav {
  min-width: 0;
  overflow: hidden;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.examples-nav__heading,
.examples-toolbar {
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 18px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.examples-nav__heading span,
.examples-toolbar span {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.examples-nav__groups {
  height: calc(100% - 58px);
  padding: 12px;
  overflow: auto;
}

.examples-nav__group + .examples-nav__group {
  margin-top: 18px;
}
.examples-nav__group h2 {
  margin: 0 8px 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 600;
}

.examples-nav__group button {
  width: 100%;
  display: block;
  padding: 9px 10px;
  text-align: left;
  color: var(--vp-c-text-1);
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}

.examples-nav__group button:hover {
  background: var(--vp-c-bg-soft);
}
.examples-nav__group button.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.examples-nav__title,
.examples-toolbar__title {
  display: flex;
  align-items: center;
  gap: 7px;
}
.examples-nav__group button strong {
  font-size: 14px;
}
.examples-nav__group button span {
  display: block;
  margin-top: 2px;
  overflow: hidden;
  color: var(--vp-c-text-3);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.example-level {
  flex: none;
  padding: 1px 5px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
}

.examples-main {
  min-width: 0;
  overflow: hidden;
}
.examples-main .vue-repl {
  height: calc(100% - 58px);
}
.examples-toolbar > div:first-child {
  min-width: 0;
}
.examples-toolbar > div:first-child span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.examples-toolbar__actions,
.examples-toolbar label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.examples-toolbar select,
.examples-toolbar button,
.examples-mobile-select select {
  height: 32px;
  padding: 0 10px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.examples-toolbar button {
  cursor: pointer;
}
.examples-toolbar button:hover {
  border-color: var(--vp-c-brand-1);
}
.examples-mobile-select {
  display: none;
}

@media (max-width: 800px) {
  .examples-shell {
    display: block;
    min-height: 760px;
  }
  .examples-nav {
    height: 58px;
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .examples-nav__heading,
  .examples-nav__groups {
    display: none;
  }
  .examples-mobile-select {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 12px;
  }
  .examples-mobile-select span {
    color: var(--vp-c-text-2);
    font-size: 12px;
  }
  .examples-mobile-select select {
    flex: 1;
    min-width: 0;
  }
  .examples-main {
    height: calc(100% - 58px);
  }
  .examples-toolbar > div:first-child span,
  .examples-toolbar label span {
    display: none;
  }
}
</style>
