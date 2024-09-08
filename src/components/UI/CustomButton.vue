<template>
  <button class="btn" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'custom-button'
}
</script>

<style lang="scss">
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>