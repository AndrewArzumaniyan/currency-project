import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    rates: {},
    currencies: [],
    isRatesLoading: false,
    globalCurrency: ''
  },

  mutations: {
    setRates(state, rates) {
      state.rates = rates;
    },
    setCurrencies(state, currencies) {
      state.currencies = currencies;
    },
    setLoading(state, isLoading) {
      state.isRatesLoading = isLoading;
    },
    setGlobalCurrency(state, currency) {
      state.globalCurrency = currency;
    }
  },

  getters: {
    currentRates(state) {
      return state.rates[state.globalCurrency];
    }
  },

  actions: {
    async fetchRates({ commit }) {
      commit('setLoading', true);

      try {
        const response = await axios.get('https://status.neuralgeneration.com/api/currency')
        
        if (!response.data) return;

        let rates = {};
        let currencies = [];

        for (let key in response.data) {
          let [from, to] = key.split('-');
          if (!rates[from]) rates[from] = {};
          rates[from][to] = response.data[key];
        }

        for (let key of Object.keys(rates)) {
          currencies.push({
            key: key,
            value: key
          })
        }

        commit('setRates', rates);
        commit('setCurrencies', currencies);
      } catch (e) {
        console.error(e)
      } finally {
        commit('setLoading', false);
      }
    },
  },
})