<template>
  <section class="demo-section">
    <h2>布局与动态成员列表</h2>
    <div class="demo-guide">
      切换列表样式，体验同一份数据的卡片、页签与折叠呈现。姓名同时是列表标题；列表新增、编辑和删除会同步更新模型。弹窗模式保存后才写回，取消保留原值。
    </div>
    <div class="demo-actions">
      <label class="demo-control-label"
        >列表样式<select class="demo-control-input" v-model="kind">
          <option>CardList</option>
          <option>TabList</option>
          <option>CollapseList</option>
        </select></label
      ><label class="demo-control-label"
        ><input class="demo-control-input" v-model="modalEdit" type="checkbox" />弹窗编辑</label
      ><label class="demo-control-label"
        ><input class="demo-control-input" v-model="viewOnly" type="checkbox" />查看模式</label
      ><label class="demo-control-label" v-if="kind === 'CardList'"
        >卡片列数<select class="demo-control-input" v-model.number="span">
          <option :value="24">一列</option>
          <option :value="12">二列</option>
          <option :value="8">三列</option>
        </select></label
      ><button class="demo-control" @click="run('容器校验', () => form?.submit())" :disabled="viewOnly">校验</button>
    </div>
    <SuperDetail v-if="viewOnly" :key="pageKey" :schema="schema" :data-source="model" />
    <SuperForm v-else :key="pageKey" :schema="schema" @register="register" />
    <p role="status" class="demo-status">{{ status }}</p>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 激活项、增删与插入锚点</h2>
        <div class="dev-controls">
          <button class="demo-control" @click="model.members.reverse()">反转成员</button
          ><button class="demo-control" @click="model.members.shift()">移除首行/锚点</button
          ><button class="demo-control" @click="model.members = []">清空成员</button
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="hideAdvanced" type="checkbox" />隐藏高级页</label
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="disableAdvanced" type="checkbox" />禁用高级页</label
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="customGroup" type="checkbox" />GroupList 自定义包装</label
          >
        </div>
        <ol>
          <li>选择高级页后隐藏/禁用，应回退有效页；观察窗显示 Tabs/Collapse 激活值。</li>
          <li>新增应激活/展开新行；删除当前行后回退相邻项。</li>
          <li>弹窗新增期间反转成员，保存仍应位于原锚点后；删除锚点后应拒绝保存。</li>
          <li>InputList 的组级规则要求至少填写一项，增删后校验路径应与当前位置一致。</li>
        </ol>
      </div></Teleport
    >
  </section>
</template>
<script setup lang="ts">
import { computed, defineComponent, h, reactive, ref } from 'vue'
import { SuperForm, SuperDetail, type ExtFormOption } from '@demo/product'
import { useDemo } from '../context'
const kind = ref<'CardList' | 'TabList' | 'CollapseList'>('CardList')
const modalEdit = ref(false),
  viewOnly = ref(false),
  customGroup = ref(false),
  span = ref(12)
const hideAdvanced = ref(false),
  disableAdvanced = ref(false)
const activeTab = ref('basic'),
  activeCollapse = ref<string[]>(['first'])
const model = reactive({
  members: [
    { id: 1, name: '陈清禾', role: '设计', code: 'M001' },
    { id: 2, name: '林小满', role: '开发', code: 'M002' },
  ],
  groups: [
    { name: '第一期', money: 100 },
    { name: '第二期', money: 200 },
  ],
  contacts: [{ phone: '', email: '' }],
  customers: ['明川工作室', '青禾设计'],
  payments: [{ date: '2026-09-21' }],
})
const { run, status, event, isElement } = useDemo(() => ({
  model,
  activeTab: activeTab.value,
  activeCollapse: activeCollapse.value,
}))
let form: { submit: () => Promise<unknown> } | undefined
function register(_actions: unknown, instance?: typeof form) {
  form = instance
}
const pageKey = computed(() => [kind.value, modalEdit.value, viewOnly.value, span.value, customGroup.value].join(':'))
const BusinessGroup = defineComponent({
  setup(_, { slots }) {
    return () =>
      h('section', { class: 'business-group' }, [h('header', [slots.title?.(), slots.actions?.()]), slots.default?.()])
  },
})
const schema = computed<ExtFormOption>(() => ({
  dataSource: model,
  subSpan: 12,
  subItems: [
    {
      type: 'Group',
      title: '基础分组',
      slots: { extra: () => '业务 extra 插槽' },
      subItems: [{ type: 'Input', field: 'project', label: '项目名称' }],
    },
    {
      type: 'Card',
      title: '业务卡片',
      slots: { title: () => '自定义卡片标题', extra: () => 'Card extra' },
      subItems: [{ type: 'Input', field: 'owner', label: '负责人' }],
    },
    {
      type: 'Tabs',
      field: 'tabs',
      activeKey: activeTab,
      attrs: {
        tabPosition: 'top',
        [isElement ? 'onUpdate:modelValue' : 'onUpdate:activeKey']: (key) => event('Tabs 切换', key),
      },
      slots: { extra: () => 'Tabs extra 插槽' },
      subItems: [
        {
          key: 'basic',
          field: 'basic',
          label: '基础信息',
          subItems: [{ type: 'Input', field: 'name', label: '标题' }],
        },
        {
          key: 'advanced',
          field: 'advanced',
          label: '高级信息',
          hidden: () => hideAdvanced.value,
          disabled: () => disableAdvanced.value,
          subItems: [{ type: 'Input', field: 'note', label: '说明' }],
        },
      ],
    },
    {
      type: 'Collapse',
      field: 'collapse',
      title: '补充信息',
      activeKey: activeCollapse,
      attrs: {
        accordion: false,
        [isElement ? 'onUpdate:modelValue' : 'onChange']: (value) => event('Collapse 切换', value),
      },
      subItems: [
        {
          key: 'first',
          field: 'first',
          label: '联系信息',
          subItems: [{ type: 'Input', field: 'text', label: '地址' }],
        },
        {
          key: 'second',
          field: 'second',
          label: '其他信息',
          subItems: [{ type: 'Input', field: 'text', label: '备注' }],
        },
      ],
    },
    {
      type: kind.value,
      field: 'members',
      label: '项目成员',
      titleField: 'name',
      block: true,
      attrs: { rowKey: 'id', ...(kind.value === 'CardList' ? { span: span.value } : {}) },
      ...(modalEdit.value ? { editModal: { modalProps: { width: 620 } } } : {}),
      rowButtons: { labelMode: 'label' },
      columns: [
        { type: 'Input', field: 'name', label: '姓名', required: true },
        { type: 'Select', field: 'role', label: '职责', options: { source: ['设计', '开发', '测试'] } },
        { type: 'Input', field: 'code', label: '展示编号', exclude: ['form'] },
      ],
    },
    {
      type: 'GroupList',
      field: 'groups',
      label: '分期费用（按当前位置累计）',
      ...(customGroup.value ? { component: BusinessGroup } : {}),
      columns: [
        { type: 'Input', field: 'name', label: '期次', required: true },
        { type: 'InputNumber', field: 'money', label: '金额', attrs: { min: 0 }, required: true },
        {
          type: 'InputNumber',
          field: 'total',
          label: '截至本期累计',
          attrs: { readonly: true },
          computed: (_value, { formData, parent }) =>
            formData.groups.slice(0, parent.index + 1).reduce((sum, row) => sum + (Number(row.money) || 0), 0),
        },
        {
          type: 'InputNumber',
          field: 'withFee',
          label: '累计含服务费',
          attrs: { readonly: true },
          computed: (_value, { current }) => (current.total || 0) + 10,
        },
      ],
    },
    // 单字段绑定 $index 时直接存字符串数组，与下面日期对象数组形成对照。
    {
      type: 'InputList',
      field: 'customers',
      label: '客户名单（至少两项）',
      rules: { required: true, min: 2 },
      columns: [{ type: 'Input', field: '$index', required: true }],
    },
    {
      type: 'InputList',
      field: 'payments',
      label: '付款日期',
      compact: true,
      columns: [{ type: 'DatePicker', field: 'date', required: true, attrs: { valueFormat: 'YYYY-MM-DD' } }],
    },
    {
      type: 'InputList',
      field: 'contacts',
      label: '紧凑联系方式',
      columns: [
        {
          type: 'InputGroup',
          rules: { validator: (_context, value) => value.phone || value.email || new Error('电话和邮箱至少填一项') },
          subItems: [
            { type: 'Input', field: 'phone', label: '电话' },
            { type: 'Input', field: 'email', label: '邮箱' },
          ],
        },
      ],
    },
  ],
}))
</script>
