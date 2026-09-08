<template>
  <ModalDemo />
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { useModalForm } from 'superform-antdv'

const ModalDemo = defineComponent({
  setup() {
    const modal = useModalForm(
      {
        title: '编辑用户',
        subSpan: 24,
        subItems: [
          { type: 'Hidden', field: 'id' },
          { type: 'Input', field: 'name', label: '姓名', required: true },
          { type: 'Switch', field: 'enabled', label: '启用' },
        ],
      },
      {
        width: 520,
        onOk: async (data) => console.log('提交数据', data),
      }
    )
    const open = () => modal.openModal({ data: { id: 1, name: '张三', enabled: true } })
    return () => h('button', { class: 'open', onClick: open }, '编辑用户')
  },
})
</script>

<style>
.open {
  padding: 8px 16px;
  color: white;
  background: #1677ff;
  border: 0;
  border-radius: 6px;
}
</style>
