---
sidebar: false
aside: false
outline: false
prev: false
next: false
pageClass: api-index-page
---

# API 索引

## 组件与方法

<div class="api-index-grid">

<section class="api-index-card">

### SuperForm · 表单

- [useForm](/manual/super-form#useform-注册模式)
- [声明式 props](/manual/super-form#props-声明式模式)
- [根 Schema 配置](/manual/super-form#根-schema-属性)
- [onSubmit / onReset / submit 事件](/manual/super-form#schema-回调与组件事件)
- [submit / resetFields / setFieldsValue](/manual/super-form#useform-动作)
- [getData / dataSource / getForm / asyncCall](/manual/super-form#useform-动作)
- [buttons](/manual/super-form#表单按钮)

</section>

<section class="api-index-card">

### SuperTable · 查询页面

- [useTable](/manual/super-table#基本使用)
- [根配置](/manual/super-table#根配置总览)
- [apis.query / info / save / update / delete](/manual/super-table#apis-完整契约)
- [params / beforeQuery / afterQuery / getQueryParams](/manual/super-table#查询参数与转换)
- [searchForm](/manual/super-table#搜索表单)
- [immediate / 搜索触发策略](/manual/super-table#查询触发方式怎么选)
- [pagination / query / reload / goPage / resetSearchForm](/manual/super-table#分页与请求动作)
- [columns / rowSelection / expandedRowKeys](/manual/super-table#列、选择与展开)
- [tabs](/manual/super-table#tabs-标签筛选)
- [isContainer / 高度配置](/manual/super-table#页面容器与高度策略)
- [setData / getData / dataSource / setColumns](/manual/super-table#usetable-动作与状态)
- [selectedRows / selectedRowKeys / setSelectedRows](/manual/super-table#usetable-动作与状态)
- [setExpandedRowKeys / expandAll](/manual/super-table#usetable-动作与状态)
- [add / edit / delete / detail](/manual/super-table#usetable-动作与状态)
- [getTable / tableRef / validate / redoHeight / onLoaded / asyncCall](/manual/super-table#usetable-动作与状态)

</section>

<section class="api-index-card">

### SuperDetail · 详情

- [useDetail](/manual/super-detail#注册模式)
- [SuperDetail 根配置](/manual/super-detail#根配置)
- [detail.setData](/manual/super-detail#当前数据更新)
- [mode / descriptionsProps](/manual/super-detail#extdescriptionsprops-细节)

</section>

<section class="api-index-card">

### Modal · 弹窗

- [useModalForm](/manual/super-modal#usemodalform)
- [useModal](/manual/super-modal#usemodal)
- [createModal](/manual/super-modal#选择哪一个-api)
- [openModal / closeModal / setModal / modalRef / modalSlot / formActions](/manual/super-modal#返回动作)

</section>

<section class="api-index-card">

### SuperButtons · 按钮

- [SuperButtons / buttons 配置](/manual/super-buttons#按钮组全部属性)
- [ButtonItem](/manual/super-buttons#单个-buttonitem-全部属性)
- [actions](/manual/super-buttons#actions-的三种写法)
- [roleName / visibleIn](/manual/super-buttons#权限与显示范围)

</section>

</div>

## Schema 配置

<div class="api-index-grid">

<section class="api-index-card">

### 结构与数据 · 字段 / 容器

- [defineForm / defineTable / defineDetail](/manual/schema#类型辅助)
- [type / attrs / 配置分层](/manual/schema#配置分层)
- [subItems / columns](/manual/schema#根节点、容器与字段)
- [exclude](/manual/schema#一份字段-多种页面场景)
- [field](/manual/fields-and-paths#field-是模型中的地址)
- [initialValue / value](/manual/fields-and-paths#模型怎样被建立)
- [labelField](/manual/fields-and-paths#labelfield-同时保存值与显示文本)
- [endField](/manual/fields-and-paths#endfield-把范围拆成两个业务字段)
- [vModelFields](/manual/fields-and-paths#vmodelfields-扩展额外-v-model)
- [dataSource / 对象与 Ref](/manual/fields-and-paths#对象与-ref-的差异)
- [字段 value 绑定 Ref](/manual/fields-and-paths#字段级-ref)
- [重置与局部更新边界](/manual/fields-and-paths#数据动作的边界)

</section>

<section class="api-index-card">

### 布局 · 表单 / 容器

- [span / subSpan / gutter / rowProps](/manual/layout#自动栅格分组)
- [block / breakAfter](/manual/layout#block-与-breakafter)

</section>

<section class="api-index-card">

### 展示 · 表单 / 表格 / 详情

- [label / labelSlot / tooltip / formItemProps](/manual/fields/display#字段标签与提示)
- [viewRender](/manual/rendering#viewrender-自定义只读内容)
- [slots](/manual/rendering#slots-定制底层组件局部区域)
- [render](/manual/rendering#render-字符串与函数)
- [InputSlot](/manual/rendering#inputslot-完全接管输入控件)
- [InfoSlot](/manual/rendering#infoslot-插入非字段内容)
- [Form / FormItem UI 属性](/manual/super-form#form-与-formitem-属性)

</section>

<section class="api-index-card">

### 状态与动态 · 字段

- [hidden](/manual/reactivity#hidden-控制是否渲染)
- [disabled](/manual/reactivity#disabled-控制是否允许输入)
- [editable](/manual/reactivity#editable-在编辑与只读之间切换)
- [dynamicAttrs](/manual/reactivity#dynamicattrs-计算底层组件属性)
- [computed](/manual/reactivity#computed-计算并写回字段)

</section>

<section class="api-index-card">

### 事件与校验 · 表单 / 编辑

- [on / onXxx](/manual/events-and-context#两种事件写法)
- [onUpdate](/manual/events-and-context#onupdate-与组件事件的区别)
- [effectData / current / formData / parent / value / record / index](/manual/events-and-context#effectdata-上下文)
- [required](/manual/validation#required-的自动展开)
- [rules](/manual/validation#rules-的展开方式)
- [validator](/manual/validation#自定义校验器)
- [ignoreRules](/manual/validation#ignorerules-的边界)

</section>

<section class="api-index-card">

### 查询与编辑 · 表格

- [params / beforeQuery / afterQuery](/manual/super-table#查询参数与转换)
- [searchForm](/manual/super-table#搜索表单)
- [pagination](/manual/super-table#分页与请求动作)
- [columnProps · 表格根](/manual/super-table#列、选择与展开)
- [columnProps · 字段列](/manual/fields/table#列-extcolumnsitem)
- [rowEditor / editable](/manual/fields/table#四种编辑方式)
- [descriptionsProps · 详情](/manual/super-detail#extdescriptionsprops-细节)

</section>

</div>

## UI 字段与增强能力

<div class="api-index-grid">

<section class="api-index-card">

### UI 输入组件

- [AntDV 支持清单](/manual/fields/basic-inputs#antdv-支持清单)
- [Element Plus 支持清单](/manual/fields/basic-inputs#element-plus-支持清单)
- [适配能力对照](/manual/fields/basic-inputs#superform-适配能力)
- [Input](/manual/fields/basic-inputs#input)
- [TextArea](/manual/fields/basic-inputs#textarea)
- [InputNumber](/manual/fields/basic-inputs#inputnumber)
- [AutoComplete](/manual/fields/basic-inputs#autocomplete)

</section>

<section class="api-index-card">

### 选项与值处理

- [Select](/manual/fields/selections#select)
- [TreeSelect](/manual/fields/selections#treeselect)
- [RadioGroup](/manual/fields/selections#radiogroup)
- [CheckboxGroup](/manual/fields/selections#checkboxgroup)
- [Switch](/manual/fields/selections#switch)
- [options](/manual/fields/selections#通用-options-格式)
- [fieldNames](/manual/fields/selections#fieldnames)
- [值转换配置](/manual/fields/selections#通用值转换属性)
- [远程搜索](/manual/fields/selections#远程搜索)

</section>

<section class="api-index-card">

### 日期与范围值

- [DatePicker](/manual/fields/date-time#datepicker)
- [DateRangePicker](/manual/fields/date-time#daterangepicker-的三种值模式)
- [TimePicker](/manual/fields/date-time#timepicker)
- [TimeRangePicker](/manual/fields/date-time#timerangepicker)

</section>

</div>

## 内置组件

<div class="api-index-grid">

<section class="api-index-card">

### 组合输入

- [InputGroup](/manual/fields/built-in-inputs#inputgroup)
- [TagInput](/manual/fields/built-in-inputs#taginput)
- [TagSelect](/manual/fields/built-in-inputs#tagselect)

</section>

<section class="api-index-card">

### 文件上传

- [Upload / uploadMode](/manual/fields/upload#五种-uploadmode)
- [上传 apis](/manual/fields/upload#apis-契约)
- [infoNames](/manual/fields/upload#infonames-映射)

</section>

<section class="api-index-card">

### 数组容器

- [InputList](/manual/fields/collections#inputlist)
- [ListGroup](/manual/fields/collections#listgroup)
- [List](/manual/fields/collections#list)

</section>

<section class="api-index-card">

### Table · 模型数组表格

- [Table](/manual/fields/table#table-数组容器)
- [列配置](/manual/fields/table#列-extcolumnsitem)
- [选择与展开](/manual/fields/table#attrs、选择与展开)
- [编辑方式](/manual/fields/table#四种编辑方式)
- [CRUD 接口](/manual/fields/table#crud-接口)

</section>

<section class="api-index-card">

### 布局容器

- [Group](/manual/fields/containers#group)
- [Fragment](/manual/fields/containers#fragment)
- [Card](/manual/fields/containers#card)
- [Tabs](/manual/fields/containers#tabs)
- [Collapse](/manual/fields/containers#collapse)
- [Descriptions](/manual/fields/containers#descriptions)

</section>

<section class="api-index-card">

### 展示与内容

- [Text](/manual/fields/display#text)
- [HTML](/manual/fields/display#html)
- [Hidden](/manual/fields/display#hidden)

</section>

</div>

## 项目配置与扩展

<div class="api-index-grid">

<section class="api-index-card">

### 初始化与全局服务

- [initialize](/manual/installation#显式初始化)
- [configure](/manual/global-config#统一应用入口)
- [registerComponent / registerComponents](/manual/custom-fields#注册项目组件)
- [defaultProps / setDefaultProps](/manual/global-config#defaultprops-合并顺序)
- [dictApi](/manual/backend-contracts#字典接口)
- [tableApiSetting](/manual/global-config#tableapisetting)
- [buttonRoles / defaultButtons](/manual/global-config#图标、权限与按钮)
- [tagViewer](/manual/rendering#tagviewer-只读配置)

</section>

<section class="api-index-card">

### unplugin 与自定义字段

- [SuperFormComponents 插件](/manual/auto-components#官方产品配置)
- [自动导入选项](/manual/auto-components#常用选项)
- [Schema 类型扩展](/manual/custom-fields#补充-schema-类型)

</section>

<section class="api-index-card">

### Adapter 与诊断

- [defineUIAdapter / useAdapter](/manual/ui-decoupling#何时需要自定义-adapter)
- [第三方 Adapter](/manual/ui-decoupling#第三方-adapter)
- [diagnoseSchema](/manual/schema-diagnostics#运行时-api-动态-schema)
- [schemaDiagnostics](/manual/schema-diagnostics#开发期自动诊断)
- [diagnose-schema CLI](/manual/schema-diagnostics#cli-可序列化-schema)

</section>

</div>
