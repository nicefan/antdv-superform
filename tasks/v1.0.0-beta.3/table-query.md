# 表格查询、统一事件与全局配置

日期：2026-10-10。状态：已实现，待人工验证。

## 实施前

两套 UI 的筛选、排序事件签名不同，Core 未保存独立表格参数。表单、tabs 和动态 params 混合维护，替换或清空某个来源时容易保留旧值。分页的 onChange 与 onShowSizeChange 均立即请求，AntDV 筛选又会触发分页回调；索引列直接读取当前分页，新页数据返回前旧记录已提前换号。SuperTable 和表单内 Table 共用 defaultProps.Table。

## 关键变更

- 新增公开的 UITableSorter、UITableParams、UITableChange。统一事件为 onTableChange，携带 action: filter/sort/paginate、filters、sorters 和标准分页；嵌套字段使用点分路径，排序方向使用 asc/desc，取消排序和清空筛选移除对应项。Schema 回调签名为 onTableChange(effectData, change)，attrs 回调签名为 onTableChange(change)。原生 Table 事件继续使用各 UI 的原生签名。
- Adapter 负责原生事件归一化。AntDV 保留上次排序状态以识别取消排序；Element Plus 合并增量筛选，并为列设置稳定的 columnKey。统一事件保留完整 filters/sorters，另以 remoteParams 提供排除本地比较和筛选函数后的远程状态，避免本地条件在后续翻页或刷新时带入接口。远程筛选/排序的有效查询条件变化后回第一页查询。Element Plus 保留原生单列排序能力，统一 sorters 数组不额外模拟多列排序。
- 表单、tabs、动态 params、标准远程表格状态、转换后的表格条件和分页分别维护。来源更新使用快照替换，监听 params 的对象替换及深层变化。getQueryParams() 返回合并后的当前查询条件副本，包含已保存的表格转换结果，不含分页、本次临时参数及 beforeQuery 的加工；不提供额外的表格参数 getter 或 effectData.tableParams。query(param) 的参数仍只用于本次请求。
- 新增 attrs.filterSortTransform({ filters, sorters })，默认关闭，只支持 false 或函数；未配置时继承 SuperTable 全局默认，false 覆盖全局配置并禁止筛选/排序自动加入查询条件。函数只接收远程表格状态副本，状态或函数配置变化时执行并固定保存结果，查询及导出共用；返回 void 时保存本次输入副本。刷新、翻页及 getter 读取不重复转换相同状态，关闭或转换后条件未变化时不因筛选/排序发起请求。新增 attrs.pageTransform({ current, size })，输出请求分页字段；未配置或设置为 false 时使用标准 current/size，false 可覆盖全局转换器。attrs.pagination: false 不生成分页请求字段。转换器只在 Core 消费，不传给原生 Table；RootTableOption 根级不再提供转换器及 pagination。
- 请求合并顺序为分页转换结果 → getQueryParams() 的条件副本（表单 → tabs → 动态 params → 已保存的表格条件）→ 本次临时参数 → beforeQuery；getter、转换器及请求加工使用独立副本，不修改保存的条件。beforeQuery/afterQuery 仍为实例根级钩子，响应按 attrs.resultTransform → afterQuery → 分页处理与数据回写执行；resultTransform 将接口响应转换为数组或标准分页结果，未配置时沿用接口响应，afterQuery 在此基础上处理单表业务，返回 void 时沿用转换结果。全局默认结果转换器配置在 defaultProps.SuperTable.resultTransform，局部 attrs 或组件传入属性可覆盖。不再提供 tableApiSetting；分页字段映射统一通过 attrs.pageTransform 配置。末页失效时使用修正后的分页补查，覆盖本次临时参数中的旧页码。
- 分页及远程筛选/排序统一由 onTableChange 驱动查询；分页 onChange/onShowSizeChange 只通知业务，onChange 使用标准的两个参数，不再携带请求开关。AntDV 使用原生 Table.change，筛选附带的分页回调不再触发查询；本地筛选保留原生分页复位。Element Plus 使用原生 Pagination.change 合并页码与条数变化，Adapter 内同步受控分页模型，上下双分页共享模型，一次交互只发出一次统一分页事件，外部回写不重新查询。每页条数变更回第一页，同一分页状态不重复查询。
- 远程索引列使用已回写数据所属的分页快照，数据与索引同步切换；等待、失败、取消或过期请求不提前改动旧记录的序号。请求开始时捕获标准分页，回写优先采用响应的 current/size，缺省时使用本次请求的分页；数组结果按第一页处理。首次响应前沿用索引列初始化时的分页，本地分页仍即时更新；setPageData 同步更新数据所属分页，快照仅在 Core 内部提供，不新增公开动作或 Adapter 协议。
- Core 移除分页 nextTick 队列、排队计数器和整轮事件屏蔽。统一表格事件直接更新状态并查询；显式 query/reload/goPage 立即执行，不被同轮事件屏蔽。初始化及表单/params/tabs 自动查询保留原有 300ms 尾部节流，直接查询会取消待执行的自动查询；卸载取消自动查询及活动请求。请求取消与过期响应丢弃机制保留。
- defaultProps.SuperTable 与 RootTableOption['attrs'] 的属性范围一致，保持扁平结构且不包含 attrs；标准分页、filterSortTransform、pageTransform 和 resultTransform 均在 attrs 类型中声明。SuperTable 只读取自己的默认属性，按全局默认属性 → 局部 Schema.attrs → 组件传入属性合成 attrs，并提取高度策略；来源数据、查询接口、初始化开关、请求前后钩子、搜索及编辑等 Schema 配置由当前表格提供。全局 onTableChange 沿用属性回调签名 onTableChange(change)。不维护完整 Schema 键表及 defaults.ts 分流模块，SuperTableDefaultProps 直接从 attrs 类型派生，放在 exaTypes.d.ts 中。
- 分页只从 attrs.pagination 读取，按 SuperTable 默认值 → 局部 attrs → 组件传入分页配置逐层合并，组件只传回调时仍保留局部 pageSize 等属性。高优先级 false 关闭分页，后续显式对象可重新开启；不读取 defaultProps.Table.pagination。共享示例和 REPL 代码示例已将根级分页移入 attrs。高度策略由 SuperTable 默认属性提供，支持局部 attrs 或根级覆盖。
- defaultProps.Table 由共享 Table 本层消费，不在 SuperTable 中提前合并。原生属性最终按 Table 基础默认值 → SuperTable 原生默认值 → 局部属性覆盖；Table 内置布局与分页回退值先于基础默认值应用，SuperTable 的受控分页覆盖原生分页默认值。初始化行键、选择、树形子字段和展开状态也在 Table 层读取基础默认值，局部配置优先；序号列沿用基础默认值及专项覆盖。不配置或清除 SuperTable 高度策略时，未指定的 scroll 不以 undefined 覆盖下层原生默认值。
- 文档站的 SuperTable、全局配置、接口适配、事件上下文、Table 容器、API 索引及 AI 编码指引、安装包 AI_GUIDE.md 已按当前表格代码同步，不保留旧配置说明。AI 手册明确配置层级、转换器默认值、统一事件签名、导出条件边界和避免分页重复查询的用法。新增 REPL 示例 table-query-transform 和双 UI 共用的“表格查询”（#table-query）页，演示远程列筛选排序、offset/limit 分页、非标准响应解包、resultTransform → afterQuery 的顺序、导出条件边界及请求计数；共享演示另提供动态参数、tabs、转换器关闭、慢请求及失败开关。在线 REPL 的运行包待更新后再验证。

配置示例：

```ts
superform.configure({
  defaultProps: {
    SuperTable: {
      pagination: { pageSize: 20 },
      filterSortTransform: ({ filters, sorters }) => ({ where: filters, orderBy: sorters }),
      pageTransform: ({ current, size }) => ({ offset: (current - 1) * size, limit: size }),
      resultTransform: (result) => result.data,
      size: 'small',
    },
    Table: { size: 'large' },
  },
})

// 单表在 attrs 中设置 filterSortTransform: false、pageTransform: false，覆盖对应全局默认。
```

## 验证

已静态核对事件归一化、请求调度、参数替换、筛选/排序转换范围、属性位置及全局默认值合并，确认 Core 已无 tableApiSetting 引用，结果转换器在 Core 消费且在 afterQuery 前执行，分页处理与数据回写使用最终结果；文档站的配置与示例入口已核对，新增演示源码已格式化，差异空白检查通过。按项目约定未新增或修改单元测试，未运行测试、类型检查、构建或浏览器验证。现有测试待后续迁移，在线 REPL 运行包待更新，见 CHECKLIST.md。
