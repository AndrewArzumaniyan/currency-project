<template>
  <select v-model="selectedValue">
    <option 
      v-for="option in options" 
      :value="option.value" 
      :key="option.key"
    >
      {{ option.value }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'custom-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>

<style lang="scss">

</style>