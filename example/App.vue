<template>
  <h1>关于</h1>
  <a-tabs :default-active-key="tab" @change="changeTab">
    <a-tab-pane v-for="name of tabNames" :key="name" :tab="name" />
  </a-tabs>
  <component :is="comp" msg="about" />
</template>

<script lang="tsx">
import { ref, defineComponent, computed } from 'vue'
import Setups from './setups.vue'
import FirstForm from './form.vue'
const tabs = {
  Setups,
  FirstForm,
}

export default defineComponent({
  props: {
    // msg: {
    //   type: String,
    //   required: true,
    // },
  },
  setup: () => {
    const tabNames = Object.keys(tabs)
    const tab = ref('FirstForm')
    const comp = computed(() => tabs[tab.value])
    const changeTab = (name) => {
      tab.value = name
    }
    return {
      tabNames,
      tab,
      comp,
      changeTab,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
</style>
