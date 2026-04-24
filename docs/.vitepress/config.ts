import { defineConfig } from 'vitepress'

const guide = [
  {
    text: '开始使用',
    items: [
      { text: '文档导览', link: '/guide/' },
      { text: '介绍', link: '/guide/introduction' },
      { text: '安装', link: '/guide/installation' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '基础概念', link: '/guide/concepts' },
    ],
  },
  {
    text: '使用建议',
    items: [
      { text: '常见场景', link: '/guide/scenarios' },
      { text: 'AI 使用建议', link: '/guide/ai-usage' },
      { text: '最佳实践', link: '/guide/best-practices' },
      { text: '约束与坑点', link: '/guide/gotchas' },
      { text: '常见问题', link: '/guide/faq' },
    ],
  },
]

const components = [
  {
    text: '核心组件',
    items: [
      { text: '组件导览', link: '/components/' },
      { text: 'SuperTable', link: '/components/super-table' },
      { text: 'SuperForm', link: '/components/super-form' },
      { text: 'SuperDetail', link: '/components/super-detail' },
      { text: 'SuperButtons / useButtons', link: '/components/buttons' },
      { text: 'useModal / useModalForm', link: '/components/modal' },
    ],
  },
  {
    text: 'Hooks',
    items: [
      { text: 'useTable', link: '/components/use-table' },
      { text: 'useForm', link: '/components/use-form' },
      { text: 'useDetail', link: '/components/use-detail' },
    ],
  },
]

const reference = [
  {
    text: '核心参考',
    items: [
      { text: 'API 参考导览', link: '/reference/' },
      { text: 'RootTableOption', link: '/reference/root-table-option' },
      { text: 'Schema 总览', link: '/reference/schema' },
      { text: '场景差异配置', link: '/reference/context-props' },
    ],
  },
  {
    text: 'Schema 细节',
    items: [
      { text: 'Schema 约定', link: '/reference/schema-conventions' },
      { text: '字段类型', link: '/reference/field-types' },
      { text: '常用字段配方', link: '/reference/field-recipes' },
      { text: '容器类型', link: '/reference/container-types' },
    ],
  },
  {
    text: '集成能力',
    items: [
      { text: '表格查询协议', link: '/reference/table-query' },
      { text: 'Upload 扩展', link: '/reference/upload' },
      { text: '插件与全局配置', link: '/reference/plugin-api' },
    ],
  },
]

const examples = [
  {
    text: '示例导览',
    items: [{ text: '示例总览', link: '/examples/' }],
  },
  {
    text: '基础示例',
    items: [
      { text: '基础表单', link: '/examples/basic-form' },
      { text: '表格 CRUD', link: '/examples/table-crud' },
      { text: '表单与详情复用', link: '/examples/detail-reuse' },
      { text: '自定义扩展组件', link: '/examples/custom-component' },
    ],
  },
  {
    text: 'SuperTable 模板',
    items: [
      { text: '基础列表', link: '/examples/table-template-basic-list' },
      { text: '弹窗 CRUD', link: '/examples/table-template-modal-crud' },
      { text: '列表 + 详情', link: '/examples/table-template-master-detail' },
      { text: '行内编辑', link: '/examples/table-template-inline-edit' },
    ],
  },
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'antdv-superform',
  description: '基于 Vue 3 与 Ant Design Vue 3 的声明式业务组件库文档',
  base: '/antdv-superform/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '快速开始', link: '/guide/getting-started' },
      { text: 'SuperTable', link: '/reference/root-table-option' },
      { text: '组件', link: '/components/' },
      { text: 'API 参考', link: '/reference/' },
      { text: '示例模板', link: '/examples/' },
      { text: '仓库', link: 'https://github.com/nicefan/antdv-superform' },
    ],
    sidebar: {
      '/guide/': guide,
      '/components/': components,
      '/reference/': reference,
      '/examples/': examples,
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/nicefan/antdv-superform' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 antdv-superform',
    },
    search: {
      provider: 'local',
    },
  },
})
