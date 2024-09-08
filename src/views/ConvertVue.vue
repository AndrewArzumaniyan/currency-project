<template>
  <div>
    <h1>Convert page</h1>

    <div>
      <div class="row">
        <span class="error">{{ fromErrorText }}</span>

        <custom-select
          class="select"
          :model-value="fromCurrency"
          @update:model-value="fromCurrencySet"
          :options="currencies"
        ></custom-select>

        <custom-input
          class="input"
          :model-value="fromValue"
          @update:model-value="updateFromValue"
        ></custom-input>
      </div>

      <div class="row">
        <span class="error">{{ toErrorText }}</span>

        <custom-select
          class="select"
          :model-value="toCurrency"
          @update:model-value="toCurrencySet"
          :options="currencies"
        ></custom-select>
        
        <custom-input
          class="input"
          :model-value="toValue"
          @update:model-value="updateToValue"
        ></custom-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      fromCurrency: 'usd',
      fromValue: 1,
      toValue: '',
      toCurrency: 'rub',  
      isFromUpdating: false,
      isToUpdating: false,
      fromErrorText: '',
      toErrorText: ''
    };
  },

  mounted() {
    this.convertFrom();
  },

  methods: {
    fromCurrencySet(value) {
      this.fromCurrency = value;
      this.convertFrom();
    },
    toCurrencySet(value) {
      this.toCurrency = value;
      this.convertTo();
    },
    updateFromValue(value) {
      if (!this.isToUpdating) {
        if (isNaN(value)) {
          this.fromErrorText = 'Not a number'
          return
        }
        this.fromErrorText = ''
        this.isFromUpdating = true;
        this.fromValue = value;
        this.debouncedConvertFrom();
      }
    },
    updateToValue(value) {
      if (!this.isFromUpdating) {
        if (isNaN(value)) {
          this.toErrorText = 'Not a number'
          return
        }
        this.toErrorText = ''
        this.isToUpdating = true;
        this.toValue = value;
        this.debouncedConvertTo();
      }
    },
    convertFrom() {
      if (this.fromCurrency && this.toCurrency && this.fromValue) {
        const rate = this.fromCurrency === this.toCurrency ? 1 : this.rates[this.fromCurrency][this.toCurrency];
        if (rate) {
          this.toValue = (this.fromValue * rate).toFixed(2);
        }
      }
      this.isFromUpdating = false;
    },
    convertTo() {
      if (this.fromCurrency && this.toCurrency && this.toValue) {
        const rate = this.fromCurrency === this.toCurrency ? 1 : this.rates[this.toCurrency][this.fromCurrency];
        if (rate) {
          this.fromValue = (this.toValue * (1 / rate)).toFixed(2);
        }
      }
      this.isToUpdating = false;
    },
    debouncedConvertFrom: debounce(function () {
      this.convertFrom();
    }, 300),
    debouncedConvertTo: debounce(function () {
      this.convertTo();
    }, 300)
  },

  watch: {
    fromCurrency: 'convertFrom',
    toCurrency: 'convertTo'
  },

  computed: {
    ...mapState({
      currencies: state => state.currencies,
      rates: state => state.rates
    })
  }
};
</script>

<style lang="scss">
.row {
  position: relative;
  padding-top: 30px;
  margin-bottom: 20px;
}

.error {
  position: absolute;
  top: 0;
  left: 0;
  color: #f00000;
}

.select {
  margin-right: 20px;
}
</style>
