<template>
  <div class="blue">
    <div><slot name="title"></slot></div>
    <div v-if="$slots.extra"><slot name="extra"></slot></div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.blue{
  --descriptions-border-color: #edf05d;
  --descriptions-bg-color: #f9f9e7;
}
</style>
