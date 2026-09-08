<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { Repl, ReplStore } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'

type ReplProduct = 'antdv' | 'element-plus'

const props = withDefaults(defineProps<{ product?: ReplProduct }>(), {
  product: 'antdv',
})

interface VersionEntry {
  version: string
  vue: string
  path: string
  createdAt: string
  hashes: Record<string, string>
}

interface Manifest {
  latest: string
  versions: VersionEntry[]
}

interface Workspace {
  version: string
  mainFile: string
  files: Record<string, string>
  updatedAt?: string
}

const productConfig = props.product === 'element-plus'
  ? {
      title: 'Element Plus 在线演练场',
      packageName: 'superform-element-plus',
      uiPackageName: 'element-plus',
      productBundle: 'superform-element-plus.js',
      productStyle: 'superform-element-plus.css',
      uiBundle: 'element-plus.js',
      uiStyle: 'element-plus.css',
      initializedKey: '__superformElementPlusReplInitialized',
    }
  : {
      title: 'AntDV 在线演练场',
      packageName: 'superform-antdv',
      uiPackageName: 'antdv-next',
      productBundle: 'superform-antdv.js',
      productStyle: 'style.css',
      uiBundle: 'antd.js',
      uiStyle: 'antd.css',
      initializedKey: '__superformAntdvReplInitialized',
    }

const storagePrefix = `${productConfig.packageName}:repl`
const workspaceKey = `${storagePrefix}:workspace`
const base = import.meta.env.BASE_URL
const manifest = await fetch(`${base}repl/versions.json`).then(async (response) => {
  if (!response.ok) throw new Error('演练场版本清单加载失败')
  return response.json() as Promise<Manifest>
})

if (!manifest.versions.length) throw new Error('演练场尚未生成可用版本')

const saved = readJson<Workspace>(workspaceKey)
const snippetId = new URLSearchParams(location.search).get('snippet')
const snippet = snippetId
  ? readJson<{ code: string }>(`${storagePrefix}:snippet:${snippetId}`)
  : null
const latestMajor = manifest.latest.split('.')[0]
const compatibleVersions = manifest.versions.filter(
  (item) =>
    item.version.split('.')[0] === latestMajor &&
    Boolean(item.hashes[productConfig.productBundle]),
)
if (!compatibleVersions.length) {
  throw new Error(`${productConfig.packageName} 尚未生成可用版本`)
}
const canRestoreVersion =
  saved?.version.split('.')[0] === latestMajor &&
  compatibleVersions.some((item) => item.version === saved.version)
const selectedVersion = shallowRef(
  canRestoreVersion ? saved!.version : compatibleVersions[0].version,
)
const replStore = shallowRef<ReplStore>()
const saveLabel = shallowRef('准备就绪')

const selectedEntry = computed(() =>
  compatibleVersions.find((item) => item.version === selectedVersion.value) ?? compatibleVersions[0],
)

const starter = [
  '<template>',
  '  <SuperForm @register="register" />',
  '</template>',
  '',
  '<script setup>',
  `import { SuperForm, useForm } from '${productConfig.packageName}'`,
  '',
  'const [register] = useForm({',
  "  title: '在线演练',",
  "  buttons: { actions: ['submit', 'reset'] },",
  '  subItems: [',
  "    { type: 'Input', field: 'name', label: '姓名', required: true },",
  "    { type: 'Select', field: 'status', label: '状态', options: ['启用', '停用'] },",
  '  ],',
  '})',
  '</' + 'script>',
].join('\n')

const previewOptions = {
  customCode: {
    importCode: `import superform, { fieldComponents } from '${productConfig.packageName}'`,
    useCode: `if (!globalThis['${productConfig.initializedKey}']) {
  superform.initialize({ components: fieldComponents })
  globalThis['${productConfig.initializedKey}'] = true
}`,
  },
}

function readJson<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : null
  } catch {
    return null
  }
}

function asset(filename: string) {
  return `${base}${selectedEntry.value.path}/${filename}`
}

function currentFiles() {
  if (!replStore.value) return null
  return {
    files: replStore.value.getFiles(),
    mainFile: replStore.value.state.mainFile,
  }
}

async function loadStore(seed?: { files: Record<string, string>; mainFile: string }) {
  const initial = seed ?? currentFiles() ?? (snippet?.code
    ? { files: { 'App.vue': snippet.code }, mainFile: 'App.vue' }
    : saved?.files
      ? { files: saved.files, mainFile: saved.mainFile }
      : { files: { 'App.vue': starter }, mainFile: 'App.vue' })

  const next = new ReplStore({
    defaultVueRuntimeURL: asset('vue.runtime.esm-browser.js'),
    defaultVueRuntimeProdURL: asset('vue.runtime.esm-browser.prod.js'),
    showOutput: true,
    outputMode: 'preview',
  })
  await next.setFiles({
    ...initial.files,
    'main.css': `@import '${asset(productConfig.uiStyle)}';\n@import '${asset(productConfig.productStyle)}';\nbody { margin: 0; padding: 20px; }`,
  }, initial.mainFile)
  next.setImportMap({
    imports: {
      vue: asset('vue.runtime.esm-browser.js'),
      [productConfig.uiPackageName]: asset(productConfig.uiBundle),
      [productConfig.packageName]: asset(productConfig.productBundle),
    },
  })
  replStore.value = next
  saveLabel.value = `已加载 ${selectedVersion.value}`
}

async function resetWorkspace() {
  localStorage.removeItem(workspaceKey)
  await loadStore({ files: { 'App.vue': starter }, mainFile: 'App.vue' })
}

watch(selectedVersion, () => loadStore())
watch(
  () => {
    if (!replStore.value) return null
    return {
      version: selectedVersion.value,
      mainFile: replStore.value.state.mainFile,
      files: Object.fromEntries(
        Object.entries(replStore.value.state.files).map(([name, file]) => [name, file.code]),
      ),
    }
  },
  (workspace) => {
    if (!workspace) return
    localStorage.setItem(workspaceKey, JSON.stringify({
      ...workspace,
      updatedAt: new Date().toISOString(),
    }))
    saveLabel.value = `已自动保存 ${new Date().toLocaleTimeString()}`
  },
  { deep: true },
)

await loadStore()
</script>

<template>
  <section class="repl-shell">
    <header class="repl-toolbar">
      <div class="repl-toolbar__title">
        <strong>{{ productConfig.title }}</strong>
        <span>{{ saveLabel }}</span>
      </div>
      <div class="repl-toolbar__actions">
        <label>
          <span>组件版本</span>
          <select v-model="selectedVersion">
            <option v-for="item in compatibleVersions" :key="item.version" :value="item.version">
              {{ item.version }}
            </option>
          </select>
        </label>
        <button type="button" @click="resetWorkspace">恢复默认</button>
      </div>
    </header>
    <Repl
      v-if="replStore"
      :store="replStore"
      :editor="CodeMirror"
      :show-compile-output="false"
      :show-import-map="false"
      :show-ts-config="false"
      :ssr="false"
      :preview-options="previewOptions"
    />
  </section>
</template>

<style>
.repl-shell {
  height: calc(100vh - var(--vp-nav-height));
  min-height: 680px;
  background: var(--vp-c-bg);
}

.repl-toolbar {
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.repl-toolbar__title,
.repl-toolbar__actions,
.repl-toolbar label {
  display: flex;
  align-items: center;
  gap: 12px;
}

.repl-toolbar__title span,
.repl-toolbar label span {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.repl-toolbar select,
.repl-toolbar button {
  height: 32px;
  padding: 0 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.repl-toolbar button { cursor: pointer; }
.repl-toolbar button:hover { border-color: var(--vp-c-brand-1); }
.repl-shell .vue-repl { height: calc(100% - 58px); }

@media (max-width: 720px) {
  .repl-toolbar__title span,
  .repl-toolbar label span { display: none; }
  .repl-toolbar { padding: 0 12px; }
}
</style>
