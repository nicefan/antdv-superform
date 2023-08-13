<script setup lang="ts">
import Collections from '../Collections'
import { Row, Divider } from 'ant-design-vue'
import { CommonProps } from '../propTypes'

const props = defineProps<CommonProps<ExGroupOption>>()
const title = props.option.title || props.option.label
</script>
<template>
  <div v-bind="attrs">
    <Row v-if="title" :span="24" class="title">
      <slot name="title">
        <Divider orientation="left">{{ title }}</Divider>
      </slot>
    </Row>
    <Collections :option="option" :children="model.children" />
  </div>
</template>
