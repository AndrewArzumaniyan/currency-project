<template>
  <input :value="modelValue" @input="updateInput" v-bind="$attrs" class="input" type="text">
</template>

<script>
export default {
  name: 'custom-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss">
</style>