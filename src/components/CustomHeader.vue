<template>
  <div class="navbar">
    <custom-select
      :model-value="globalCurrency"
      @update:model-value="setGlobalCurrency"
      :options="currencies"
    >
    </custom-select>
    <div class="navbar__btns">
      <custom-button class="navbar__btn" @click="$router.push('/')">Home</custom-button>
      <custom-button class="navbar__btn" @click="$router.push('/convert')">Convert</custom-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'custom-header',
  methods: {
    ...mapMutations({
      setGlobalCurrency: 'setGlobalCurrency'
    }),
  },
  computed: {
    ...mapState({
      currencies: state => state.currencies,
      globalCurrency: state => state.globalCurrency
    })
  }
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
}

.navbar__btns {
  & .navbar__btn {
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>