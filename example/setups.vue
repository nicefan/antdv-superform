<template>
  <div>
    <VIcon type="user"></VIcon>
    <VIcon type="mail2"></VIcon>
    <div>组合式api {{ props.msg }} / {{ props.other }}</div>
    <a-button @click="openForm">弹窗表单</a-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, inject, toRefs } from 'vue'
import VIcon from '../src/icon/VIcon'
import { useExampleModal } from './useExForm'
export default defineComponent({
  components: {
    VIcon,
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
    other: {
      type: String,
      required: true,
    },
  },
  emits: ['my-test'],
  setup(props, { attrs }) {
    const myModel = useExampleModal()
    const openForm = () => {
      myModel.openModal({
        title: '新增测试数据',
        onOk() {
          return myModel.onSubmit().then((data) => {
            console.log(data)
          })
        },
      })
    }

    return {
      props,
      openForm,
    }
  },
})
</script>
