import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Antdv SuperForm',
  description: '面向中后台系统的 Vue 3 配置式表单与表格组件库',
  lang: 'zh-CN',
  base: '/antdv-superform/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/antdv-superform/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#1677ff' }],
    ['meta', { name: 'keywords', content: 'Vue 3, Ant Design Vue, schema, 表单, 表格' }],
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
    siteTitle: 'Antdv SuperForm',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/form' },
      { text: '示例', link: '/examples/' },
      { text: '演练场', link: '/playground' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        { text: '开始', items: [
          { text: '介绍', link: '/guide/' },
          { text: '安装', link: '/guide/installation' },
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '全局配置', link: '/guide/global-config' },
        ] },
        { text: '核心概念', items: [
          { text: 'Schema 基础', link: '/guide/schema' },
          { text: '数据源与模型', link: '/guide/data-source' },
          { text: '选项和值', link: '/guide/options' },
        ] },
      ],
      '/components/': [
        { text: '核心组件', items: [
          { text: 'SuperForm', link: '/components/form' },
          { text: 'SuperTable', link: '/components/table' },
          { text: 'SuperDetail', link: '/components/detail' },
          { text: 'SuperButtons', link: '/components/buttons' },
          { text: 'SuperModal', link: '/components/modal' },
        ] },
        { text: '字段组件', items: [
          { text: '字段类型', link: '/components/fields' },
          { text: '日期与时间范围', link: '/components/ranges' },
          { text: '数组对象编辑', link: '/components/collections' },
          { text: 'List', link: '/components/list' },
          { text: 'ListGroup', link: '/components/list-group' },
          { text: 'InputList', link: '/components/input-list' },
        ] },
      ],
      '/examples/': [
        { text: '示例总览', items: [
          { text: '功能地图', link: '/examples/' },
          { text: '在线演练场', link: '/playground' },
        ] },
        { text: '表单', items: [
          { text: '基础表单', link: '/examples/basic-form' },
          { text: '动态数据源', link: '/examples/data-source' },
          { text: '选项与联动', link: '/examples/options' },
        ] },
        { text: '表格', items: [
          { text: '查询与刷新', link: '/examples/table-query' },
          { text: '弹窗编辑', link: '/examples/table-editor' },
        ] },
      ],
      '/api/': [
        { text: '公开 API', items: [
          { text: '组合函数', link: '/api/' },
          { text: '表单动作', link: '/api/form-actions' },
          { text: '表格动作', link: '/api/table-actions' },
          { text: '诊断工具', link: '/api/diagnostics' },
        ] },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/nicefan/antdv-superform' }],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    editLink: {
      pattern: 'https://github.com/nicefan/antdv-superform/edit/docs/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    footer: { message: '基于 MIT 许可发布', copyright: 'Antdv SuperForm' },
  },
  vite: {
    ssr: { noExternal: ['@vue/repl'] },
  },
})
