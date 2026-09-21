<template>
  <div class="demo-note">基础业务表单：先掌握字段、默认值、校验和提交。</div>
  <SuperForm @register="register" @submit="submitted = $event" />
  <pre class="demo-model">{{ submitted || model }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperForm, useForm } from 'superform-antdv'
import { departmentOptions } from './mock'

const submitted = ref()
const [register, form] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'employeeId' },
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'Input', field: 'mobile', label: '手机号', required: true, rules: { type: 'mobile' } },
    { type: 'Input', field: 'email', label: '邮箱', rules: { type: 'email' } },
    { type: 'DatePicker', field: 'joinedAt', label: '入职日期', required: true },
    {
      type: 'Select',
      field: 'departmentId',
      labelField: 'departmentName',
      label: '所属部门',
      options: { source: departmentOptions },
      required: true,
    },
    { type: 'Input', field: 'position', label: '岗位' },
    { type: 'Switch', field: 'enabled', label: '在职状态', initialValue: true },
    { type: 'TagInput', field: 'skills', label: '技能标签', span: 24, initialValue: ['Vue'] },
  ],
})
const model = form.dataSource
</script>
