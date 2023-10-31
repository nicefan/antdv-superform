import { defineComponent, provide, readonly } from 'vue';

export const DataProvider = defineComponent({
  name: 'DataProvider',
  props: {
    name: {
      type: String,
      require: true,
    },
    data: {
      type: undefined,
      require: true,
    }
  },
  setup(props, ctx) {
    provide(props.name, props.data || {})
    return ctx.slots.default
  },
})
