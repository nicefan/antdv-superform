# 待验证及文档清单

## 待验证

- [ ] 按需检查 Core、两套产品及示例的类型声明，确认废弃 API 清理、SwitchFieldOption 类型别名及现行配置可用；两套 UI 人工检查 exclude、block/breakAfter、unauthorized/visibleIn/targetSlot、rowEditor、searchForm 和 useForm.resetFields。
- [ ] 用户明确要求后，核对并清理正式文档中的废弃配置及 useForm.setData 写法；保留 useTable/useDetail.setData 的现行说明。

- [ ] 两套 UI 人工检查 useTable/useDetail 的 Schema.dataSource：对象、同步及异步 Schema、外部 Ref 替换与 setData；补查 useDetail 注册前 setData。检查 useSectionStyle 在表单、详情和独立表格的 Schema/组件属性及内部包装中的样式保持。
- [ ] 两套 UI 人工检查表格 detailOption：未配置时复用表格列，独立 subItems 的字段范围、title、buttons、mode/attrs.mode、布局、分区样式、字符串详情插槽；当前记录及 apis.info 结果优先于 detailOption.dataSource，详情弹窗属性与本次打开参数覆盖、切换记录及 destroyOnClose 重复打开。
- [x] 文档站同步 useTable/useDetail 单参数及 Schema.dataSource、useSectionStyle、表格 detailOption 完整类型与独立详情示例，移除对应旧参数及名称。
- [ ] 按需执行 pnpm build:repl 更新文档站的 REPL 运行包，再人工检查详情数据源替换、setData 和表格独立详情示例；检查两套本地演示的分区样式开关及成员详情。

- [ ] 人工检查两套 UI 的语言包：默认中文、英文、部分文案覆盖和缺省回退；已挂载表单/详情/表格、已打开弹窗及确认框切换语言；按钮 pending、编辑草稿和表单值保持；下一次校验使用新语言，已有错误不自动重验；上传状态、限制/失败提示、列表操作及标签添加无障碍文案；显式按钮、placeholder、校验消息和弹窗配置优先，原生 UI 文案由各自 ConfigProvider 配置。
- [ ] 按需执行 Core 和两套产品的类型检查，确认语言包导出及生产声明。
- [x] 文档站同步语言配置用法及双 UI 语言协同。

- [ ] 人工检查两套 UI 的 TagInput 标签间距、添加入口与输入框同行、窄容器换行、聚焦及失焦添加、回车确认且不提交表单、中文输入法选词不误提交，切换输入框及增删时已有标签不重新播放入场动画；TagSelect 单多选、单选再次点击保留选中、check/change 事件、字符串序列化及空状态。
- [ ] 人工检查两套 UI 的 destroyOnClose 重复打开、打开参数切换及 afterClose 替换；Element Plus 多实例确认/信息框更新与销毁互不影响、上传删除失败反馈和下载提示。
- [ ] 人工检查两套 UI 的 `useModalForm.onSubmitError`：各阶段失败只通知一次、原错误透传、弹窗保留及 loading 恢复，打开参数可覆盖默认回调。
- [ ] 人工检查 Element Plus 表格查询表单及 `ignoreRules` 表单：不同 size、嵌套 FormItem 的上下间距均为 6px，普通表单间距不受影响。
- [ ] 人工检查两套 UI 的 Buttons：全局 defaultButtons 和局部覆盖、保存/取消、展开/收起、权限与组禁用、普通下拉、更多菜单及折叠下拉、自定义渲染 tooltip、事件冒泡。
- [ ] 人工检查确认框异步成功、失败重试、取消及销毁后的 pending 恢复。
- [ ] 人工检查两套 UI 在未设置顶层 `span` 时保留 `colProps.span`，显式设置时由顶层配置覆盖。
- [ ] 人工检查 Element Plus 的 `span/subSpan: 'auto'` 不生成 `el-col-24`，且能占据剩余空间。
- [ ] 人工检查两套 UI 的 `ignoreRules`：必填标记、输入触发及显式校验。

## 表格行编辑待验证

- [ ] 在两套 UI 的“表格高度”（#table-scroll）页人工检查三个场景：窗口和底部测试区变化时跟随页面高度；只改变真实父元素高度时填充容器；动态 maxHeight 在多行时滚动、少量数据时自然收缩。补查隐藏表头、非对称父容器内边距、反复挂载/卸载后的显示，以及 Element Plus 与 AntDV 的最大行高度表现。
- [ ] 人工检查不配置 maxHeight 时的自然布局，以及动态开启/清除 maxHeight、切换 fixedHeight 后的显示效果。
- [ ] AntDV：在三种高度场景中切换 60 行、3 行、空数据，内容未超高时不显示纵向滚动条，恢复多行后可滚动；补查固定高度下翻页、展开行和文本换行后的高度变化，以及横向滚动条占高。
- [ ] 人工检查两套 UI 的表格标题与按钮同行，保留按钮对齐配置，只有标题或只有按钮时布局正常。
- [ ] 人工检查 Element Plus 的 pagination.placement：上下六种位置、上下双分页、none、默认右下方及 16px 间距；双分页同步切页、分页大小切换及自适应高度。
- [ ] 两套 UI：普通行及树形子行、多行编辑/新增的校验、保存、取消和失败重试互不影响；并发校验不过期，无规则行不校验其他行。
- [ ] 两套 UI：必填错误阻止保存、未展示及只读列规则、动态 editable/hidden/disabled；行内及整表编辑无额外边距、隐藏校验文本；弹窗新增在本地第二页插入位置正确。
- [ ] 人工检查 `rowEditor.singleEdit: true` 时 query/reload/远程翻页成功加载及 setPageData 后退出编辑，查询失败可继续编辑原草稿；默认多行模式与本地翻页保留草稿。
- [ ] 人工检查保存结果独立于刷新结果，刷新异常由请求层处理，保存正常结束且无需重复提交。

## 表格查询待验证

- [ ] 两套 UI 人工检查统一 onTableChange：多列筛选、清空筛选、排序及取消、嵌套字段、Schema/attrs 回调与原生回调共存；AntDV 多列排序与 Element Plus 单列排序，本地条件不额外触发远程查询且不会在后续翻页或刷新时带入接口，remoteParams 与完整事件状态互不影响。
- [ ] 两套 UI 人工检查网络请求次数：分页只由统一事件查询，原生及标准分页回调只通知业务；Element Plus 条数与页码联动、每页条数变更回第一页、上下双分页及受控分页回写不重复查询。检查 query/reload/goPage 立即执行并取消待执行的自动查询，同轮显式调用不被屏蔽；卸载取消、末页失效补查及过期响应处理。检查表单、tabs、动态 params 替换/删除与筛选排序互不清除，翻页/reload 保留状态，临时参数仅本次生效。
- [ ] 两套 UI 人工检查远程索引列：慢请求翻页及修改每页数量时，旧数据保留旧索引，成功回写后数据与索引同步更新；失败、取消、连续快速跳页及过期响应不提前换号，响应分页修正及缺省 current/size 正确处理。补查首次加载前的初始页、数组结果、setPageData、本地分页即时编号及自定义索引列渲染。
- [ ] 人工检查全局/单表 attrs.filterSortTransform：默认关闭、继承及局部 false、函数及返回 void、切换配置后及时更新条件、清空条件、相同状态不重复转换；查询与 getQueryParams 共用保存的转换结果，导出修改返回副本不影响后续查询，beforeQuery 加工及本次临时参数不写回 getter。补查 attrs.pageTransform 覆盖及 false、默认 current/size、嵌套分页和 offset/limit、attrs.pagination: false；attrs.resultTransform 的全局继承与局部覆盖、先转换再执行 afterQuery、afterQuery 返回 void 沿用转换结果、数组及标准分页结果、末页补查，确认不再读取 tableApiSetting。
- [ ] 人工检查扁平 defaultProps.SuperTable 与实例 attrs 的合并，以及 Table 本层的基础默认值及局部覆盖，确认 Table.pagination 不影响 SuperTable 分页配置；分页按全局、Schema、组件逐层合并，组件只传回调时保留局部页大小，false 关闭后显式对象可重新开启。补查默认行键、选择、树形子字段、展开、布局、共享序号列、局部高度配置及清除高度后恢复原生 scroll，转换器不透传原生 Table。
- [ ] 按需检查 Core 与两套产品的类型声明，确认统一事件、attrs.filterSortTransform 的 UITableParams 输入、attrs.pageTransform、attrs.resultTransform、分页 onChange 的两个标准参数，以及 defaultProps.SuperTable 与 RootTableOption['attrs'] 的一致性；根级不接受 pagination 和转换器，全局配置不接受 tableApiSetting，全局 onTableChange 使用属性签名，不接受 attrs 嵌套配置。
- [ ] 用户明确要求后，将现有 useQuery.test.ts 中的根级 pagination 配置迁移到 attrs，并按新 API 验证查询、取消及过期响应行为。
- [x] 同步文档站及 AI_GUIDE.md 中的 attrs.filterSortTransform、attrs.pageTransform、attrs.resultTransform、attrs.pagination、统一事件、分页调度及全局 SuperTable/Table 配置说明，移除 tableApiSetting，展示 SuperTable 扁平默认属性及 Table 基础属性的合并顺序；补充文档站和双 UI 共享查询演示。
- [ ] 用户明确要求构建后执行 `pnpm build:repl` 更新在线 REPL 运行包，再人工检查文档站 table-query-transform 示例及两套 UI 的 #table-query 页中的筛选排序、转换器关闭、导出条件、请求次数、结果转换顺序和慢请求索引。

## 上传组件待验证

- [ ] 人工检查原生 text/picture/picture-card 列表、隐藏入口后保留列表、异步校验拒绝后无临时文件残留、取消删除保留文件，以及 Element Plus 下载插槽和操作开关。

- [ ] 补查 AntDV 非法文件拒绝、下载成功及 Element Plus 图片预览。
- [ ] 人工检查连续两次提交不重复删除；多项删除有一项失败时仍等待其余任务完成。
- [ ] 人工检查选入 Base64/text 文件后立即提交、读取失败保留文件并阻止提交，以及上传/读取中删除或卸载后的迟到结果。
- [ ] 人工检查 Element Plus 图片点击与多图片定位、详情/禁用列表无法删除；两套 UI 的大写扩展名、带空白 accept 规则和非图片短后缀。
- [ ] 人工检查 Element Plus 自动上传失败文件保留，以及 useModalForm.onSubmitError 收到原始上传异常。
- [ ] 人工核对两套 UI 五种上传模式、异步 beforeSelect、数量及重名限制、单文件替换、file 插槽、只读/各操作开关、图片及文件下载；确认不触发原生网络上传。
