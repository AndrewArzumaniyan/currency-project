<template>
  <div v-if="!isRatesLoading">
    <div class="dialog" v-if="!globalCurrency">
      <div @click.stop class="dialog__content">
        <custom-select
          :model-value="globalCurrency"
          @update:model-value="setGlobalCurrency"
          :options="currencies"
        >
        </custom-select>
      </div>
    </div>

    <div v-else>
      <custom-header 
        :model-value="globalCurrency"
        @update:model-value="setGlobalCurrency"
        :options="currencies"
      ></custom-header>
    
      <div class="app">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <custom-loading v-else>
    ...loading
  </custom-loading>
</template>

<script>
import CustomHeader from './components/CustomHeader.vue';
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    CustomHeader
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapMutations({
      setRates: 'setRates',
      setCurrencies: 'setCurrencies',
      setLoading: 'setLoading',
      setGlobalCurrency: 'setGlobalCurrency',
    }),
    ...mapActions({
      fetchRates: 'fetchRates'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
  },
  mounted() {
    this.fetchRates()
  },
  computed: {
    ...mapState({
      rates: state => state.rates,
      currencies: state => state.currencies,
      isRatesLoading: state => state.isRatesLoading,
      globalCurrency: state => state.globalCurrency
    })
  }
}
</script>

<style lang="scss">

</style>
