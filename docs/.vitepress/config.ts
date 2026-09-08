import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'SuperForm',
  description:
    '基于 Vue 3 的配置式表单与表格组件库，提供 AntDV Next 与 Element Plus 官方产品包',
  lang: 'zh-CN',
  base: '/antdv-superform/',
  srcExclude: ['README.md', 'manual/_partials/**'],
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/antdv-superform/favicon.svg',
      },
    ],
    ['meta', { name: 'theme-color', content: '#1677ff' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'Vue 3, AntDV Next, Element Plus, schema, 表单, 表格',
      },
    ],
  ],
  markdown: {
    config(md) {
      const originalFence = md.renderer.rules.fence!
      md.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index]
        if (!/(?:^|\s)playground(?:\s|$)/.test(token.info)) {
          return originalFence(tokens, index, options, env, self)
        }
        const info = token.info
        token.info = info.replace(/(?:^|\s)playground(?=\s|$)/, '')
        const rendered = originalFence(tokens, index, options, env, self)
        token.info = info
        const encoded = Buffer.from(token.content, 'utf8').toString('base64')
        return `<div class="playable-code">${rendered}<button type="button" class="playable-code__button" data-playground-code="${encoded}">演示预览 <span aria-hidden="true">↗</span></button></div>`
      }
    },
  },
  themeConfig: {
    siteTitle: 'SuperForm',
    aside: 'left',
    nav: [
      { text: '手册', link: '/manual/' },
      { text: '示例', link: '/examples' },
      {
        text: '演练场',
        items: [
          { text: 'AntDV', link: '/playground' },
          { text: 'Element Plus', link: '/playground-element-plus' },
        ],
      },
    ],
    sidebar: {
      '/manual/': [
        {
          text: '入门',
          items: [
            { text: '介绍', link: '/manual/' },
            { text: '安装', link: '/manual/installation' },
            { text: '快速开始', link: '/manual/quick-start' },
          ],
        },
        {
          text: '核心设计',
          items: [
            { text: 'Schema 与数据模型', link: '/manual/schema' },
            { text: '布局与结构', link: '/manual/layout' },
            { text: '响应式与联动', link: '/manual/reactivity' },
            { text: '校验机制', link: '/manual/validation' },
            { text: '渲染与插槽', link: '/manual/rendering' },
            { text: '配置属性索引', link: '/manual/property-index' },
          ],
        },
        {
          text: '页面组件',
          items: [
            { text: '表单 SuperForm', link: '/manual/super-form' },
            { text: '表格 SuperTable', link: '/manual/super-table' },
            { text: '详情 SuperDetail', link: '/manual/super-detail' },
            { text: '弹窗 SuperModal', link: '/manual/super-modal' },
            { text: '按钮组 SuperButtons', link: '/manual/super-buttons' },
          ],
        },
        {
          text: '字段组件',
          items: [
            { text: '基础输入', link: '/manual/fields/basic-inputs' },
            { text: '选择输入', link: '/manual/fields/selections' },
            { text: '日期与时间', link: '/manual/fields/date-time' },
            { text: '文件上传', link: '/manual/fields/upload' },
            { text: '展示与辅助', link: '/manual/fields/display' },
            { text: '数组与表格', link: '/manual/fields/collections' },
            { text: '布局容器', link: '/manual/fields/containers' },
          ],
        },
        {
          text: '项目集成',
          items: [
            { text: '全局配置', link: '/manual/global-config' },
            { text: '接口与数据适配', link: '/manual/backend-contracts' },
            {
              text: '字典与权限',
              link: '/manual/dictionaries-and-permissions',
            },
          ],
        },
        {
          text: '扩展开发',
          items: [
            { text: 'UI 组件解耦', link: '/manual/ui-decoupling' },
            { text: 'Schema 组件自动导入', link: '/manual/auto-components' },
            { text: '自定义字段', link: '/manual/custom-fields' },
            { text: '替换底层组件', link: '/manual/component-overrides' },
          ],
        },
        {
          text: 'AI 辅助与工程化',
          items: [
            { text: 'AI 编码指引', link: '/manual/ai-guide' },
            { text: 'Schema 诊断', link: '/manual/schema-diagnostics' },
            { text: 'antdv-next 升级支持', link: '/manual/antdv-next-upgrade' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nicefan/antdv-superform' },
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    editLink: {
      pattern:
        'https://github.com/nicefan/antdv-superform/edit/next-doc/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    footer: { message: '基于 MIT 许可发布', copyright: 'SuperForm' },
  },
  vite: {
    resolve: {
      alias: {
        'superform-antdv': fileURLToPath(
          new URL('../../packages/superform-antdv/src/index.ts', import.meta.url)
        ),
      },
    },
    ssr: { noExternal: ['@vue/repl'] },
  },
})
