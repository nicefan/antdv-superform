# Antdv SuperForm

基于 Ant Design Vue 3.x 开发的超级表单组件库，通过配置化的方式快速构建复杂的表单页面，大幅提升开发效率。

## ✨ 特性

- 🚀 **开箱即用**: 提供 SuperForm、SuperTable、SuperDetail 等核心组件
- 🎯 **高度可配置**: 支持 JSON 配置和函数式配置，灵活满足各种业务场景
- 🔧 **TypeScript 支持**: 完整的 TypeScript 类型定义，提供更好的开发体验
- 📱 **响应式设计**: 基于 Ant Design Vue，完美支持各种屏幕尺寸
- 🎨 **主题定制**: 支持主题定制，轻松适配您的设计系统
- 📦 **轻量级**: 按需加载，体积小巧，性能优秀

## 📦 安装

```bash
npm install antdv-superform
# 或
yarn add antdv-superform
# 或
pnpm add antdv-superform
```

## 🚀 快速开始

```vue
<template>
  <SuperForm @register="formRegister" @submit="handleSubmit">
  </SuperForm>
</template>

<script setup>
import { useForm, SuperForm } from 'antdv-superform'

const [formRegister] = useForm({
  buttons: ['submit', 'reset'],
  subItems: [
    { type: 'Input', field: 'name', label: '姓名', rules: [{ required: true }] },
    { type: 'Select', field: 'gender', label: '性别', options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]}
  ]
})

const handleSubmit = (data) => {
  console.log('提交数据:', data)
}
</script>
```

## 📖 文档

- [在线文档](https://nicefan.github.io/antdv-superform/) - 完整的组件文档和 API 参考
- [快速开始](/guide/quick-start) - 快速上手指南
- [组件文档](/components/) - 详细的组件使用说明
- [示例](/examples/) - 丰富的使用示例

## 🛠️ 开发

```bash
# 克隆项目
git clone https://github.com/nicefan/antdv-superform.git

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动文档服务器
pnpm start:docs
```

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

## 📞 联系方式

- 作者: nicefan
- 邮箱: covien@msn.com
- GitHub: [@nicefan](https://github.com/nicefan) 