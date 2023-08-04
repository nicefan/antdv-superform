import { defineComponent, provide, readonly } from 'vue';

export const DataProvider = defineComponent({
  props: {
    data: Object,
    apis: Object,
  },
  setup(props, ctx) {
    provide('exaProvider', readonly(props || {}))
    return ctx.slots.default
  },
})
