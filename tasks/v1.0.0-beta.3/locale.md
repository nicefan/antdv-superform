# 语言包

日期：2026-10-03。状态：源码已修改，待人工验证。

## 实施前

内置文案分散在 Core 和两套 UI 适配层；字段缓存保存中文提示前缀，按钮及校验规则初始化时固定文案。全局 configure 没有语言配置。

## API 与行为

- Core 集中提供 zhCN、enUS、SuperFormLocale、SuperFormLocaleConfig；三个产品根入口统一导出。configure({ locale }) 接受完整或部分语言包；默认简体中文，缺省消息键回退到简体中文。configure({ locale: undefined }) 恢复默认语言，未传 locale 时保持当前语言。
- 语言包结构为 { name, messages }，messages 为带类型的完整句子模板，使用 {label}/{min}/{max} 等参数。覆盖英文部分文案时以 enUS 为基础展开 messages，避免未传键回退中文。
- SDK 提供 translate，供 Adapter 读取 Core 当前文案；不引入额外 i18n 依赖，不自动切换原生 UI 或日期库语言。业务通过对应 ConfigProvider 独立配置。
- 接入按钮及确认、输入和范围提示、内置规则、弹窗标题、表格操作/序号标题、布尔展示、标签添加无障碍文案、上传列表/限制/进度及失败反馈。开发诊断、Schema label/选项、业务内容及接口错误原文不翻译。
- 按钮及字段消费时读取语言，保留原有按钮 pending、模型和草稿；弹窗标题及服务默认按钮使用响应式渲染。下一次校验失败时按当前语言生成默认消息，已有错误不自动重验。
- 显式 defaultButtons、Schema、attrs.placeholder、自定义规则消息及弹窗文案仍优先；类型与范围规则也使用显式 message，避免默认语言包覆盖业务提示。校验约束、上传流程及 UI 属性优先级保持现有语义。

```ts
import SuperForm, { enUS, zhCN } from 'superform-element-plus'

SuperForm.configure({ locale: enUS })
SuperForm.configure({
  locale: {
    ...enUS,
    messages: { ...enUS.messages, submit: 'Send' },
  },
})
SuperForm.configure({ locale: zhCN })
```

## 验证与后续

已静态核对源码调用链、语言消息键和变更差异，并确认已安装校验器支持消息函数。未新增或修改单元测试，未运行测试、类型检查、构建或浏览器交互验证。人工验证及声明检查见本阶段 Checklist。文档站已同步语言包页面、全局配置、接入说明、按钮及校验的文案优先级，并补充侧栏和 API 索引；未运行文档站构建或预览。
