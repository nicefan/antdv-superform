<template>
  <section class="input-list-test">
    <h2>InputList 交叉校验测试</h2>
    <p>规则：每一行的 value1 或 value2 至少填写一项。</p>

    <SuperForm @register="register" />

    <Space class="test-actions">
      <Button data-testid="validate-empty" @click="validateForm">校验当前值</Button>
      <Button data-testid="fill-value1" @click="fillValue1">填写 value1</Button>
      <Button data-testid="fill-value2" @click="fillValue2">填写 value2</Button>
      <Button data-testid="fill-array-value" @click="fillArrayValue">填写普通数组</Button>
      <Button data-testid="reset-values" @click="resetValues">重置</Button>
    </Space>

    <Alert
      :type="validationState === 'success' ? 'success' : validationState === 'error' ? 'error' : 'info'"
      :message="validationMessage"
      show-icon
      data-testid="validation-result"
    />
    <pre data-testid="source-data">{{ JSON.stringify(dataSource, null, 2) }}</pre>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Alert, Button, Space } from 'antdv-next'
import { SuperForm, useForm } from 'superform-antdv'

const dataSource = reactive({
  list: [{ value1: '', value2: '' }],
})

const validationState = ref<'idle' | 'success' | 'error'>('idle')
const validationMessage = ref('尚未校验')

const [register, form] = useForm({
  dataSource,
  subSpan: 12,
  subItems: [
    {
      type: 'InputList',
      field: 'list',
      label: '至少填写一项',
      compact: true,
      rowButtons: {
        actions: [
          { name: 'add', attrs: { 'data-testid': 'object-add' } },
          { name: 'delete', attrs: { 'data-testid': 'object-delete' } },
        ],
      },
      columns: [
        {
          type: 'Input',
          field: 'value1',
          label: 'value1',
          rules: {
            validator: ({ current }) => {
              const value1 = String(current.value1 || '').trim()
              const value2 = String(current.value2 || '').trim()
              return !!(value1 || value2) || new Error('value1 或 value2 至少填写一项')
            },
          },
        },
        {
          type: 'Input',
          field: 'value2',
          label: 'value2',
        },
      ],
    },
    {
      type: 'InputList',
      field: 'plainList',
      label: '普通数组行校验',
      initialValue: () => [''],
      rowButtons: {
        actions: [
          { name: 'add', attrs: { 'data-testid': 'array-add' } },
          { name: 'delete', attrs: { 'data-testid': 'array-delete' } },
        ],
      },
      columns: [
        {
          type: 'Input',
          field: '$index',
          // label: '数组值',
          required: true,
        },
      ],
    },
  ],
})

async function validateForm() {
  try {
    await form.submit()
    validationState.value = 'success'
    validationMessage.value = 'PASS：校验通过'
  } catch {
    validationState.value = 'error'
    validationMessage.value = 'EXPECTED：value1 或 value2 至少填写一项'
  }
}

function fillValue1() {
  form.setFieldsValue({ list: [{ value1: 'filled by value1', value2: '' }] })
  validationState.value = 'idle'
  validationMessage.value = '已填写 value1，请点击校验'
}

function fillValue2() {
  form.setFieldsValue({ list: [{ value1: '', value2: 'filled by value2' }] })
  validationState.value = 'idle'
  validationMessage.value = '已填写 value2，请点击校验'
}

function fillArrayValue() {
  form.setFieldsValue({ plainList: ['filled array value'] })
  validationState.value = 'idle'
  validationMessage.value = '已填写普通数组，请点击校验'
}

function resetValues() {
  form.resetFields({ list: [{ value1: '', value2: '' }], plainList: [''] })
  validationState.value = 'idle'
  validationMessage.value = '尚未校验'
}
</script>

<style scoped>
.input-list-test {
  display: grid;
  gap: 16px;
}

.test-actions {
  flex-wrap: wrap;
}

pre {
  margin: 0;
  padding: 12px;
  overflow: auto;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
