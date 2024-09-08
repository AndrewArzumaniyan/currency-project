<template>
  <div>
    <h1>Home page</h1>

    <ul>
      <li 
        v-for="currency in Object.keys(currentRates)"
        :key="currency"
      >
        1 {{ globalCurrency }} = {{ currentRates[currency].toFixed(2) }} {{ currency }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      globalCurrency: state => state.globalCurrency
    }),
    ...mapGetters({
      currentRates: 'currentRates'
    })
  }
}
</script>

<style lang="scss">
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
