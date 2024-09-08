<template>
  <div class="loading">
    Loading...
  </div>
</template>

<script>
export default {
  name: 'custom-loading'
}
</script>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>