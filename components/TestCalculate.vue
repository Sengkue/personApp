<template>
  <v-row>
    <v-col cols="6">
      <label class="form-label fs-6">ລາຄາຂາຍ:</label>
      <div class="input-group mb-2">
        <VueCleave
          :options="options.number"
          class="result-container"
          :modelValue="FormStore.price_sell"
          @update:modelValue="updatePriceSell"
        />
      </div>
    </v-col>
    <v-col cols="6">
      <!-- Money Get -->
      <label class="form-label fs-6">ເງິນຮັບຈາກລູກຄ້າ:</label>
      <div class="input-group mb-2">
        <VueCleave
          :options="options.number"
          class="result-container"
          :modelValue="FormStore.money_get"
          @update:modelValue="updateMoneyGet"
        />
      </div>
    </v-col>
    <v-col cols="12">
      <div class="mt-3"><strong>ເງິນທອນ:</strong> {{ calculateResult }}</div>
    </v-col>
    <v-col cols="12">
      <v-btn
        color="primary"
        class="btn btn-primary"
        @click="calculateMoneyBack"
      >
        Calculate
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import VueCleave from "vue-cleave-component";

export default {
  components: {
    VueCleave,
  },

  data() {
    return {
      options: {
        number: {
          // prefix: "₭",
          numeral: true,
          numeralPositiveOnly: true,
          noImmediatePrefix: true,
          rawValueTrimPrefix: true,
          numeralIntegerScale: 10,
          numeralDecimalScale: 2,
        },
      },
      FormStore: {
        price_sell: "",
        money_get: "",
        money_back: "",
      },
    };
  },

  computed: {
    calculateResult() {
      // Perform the calculation here
      const result =
        parseFloat(this.FormStore.price_sell) -
        parseFloat(this.FormStore.money_get);
      return isNaN(result) ? "" : result.toFixed(2) + " ກີບ";
    },
  },

  methods: {
    updatePriceSell(newValue) {
      this.FormStore.price_sell = newValue;
    },

    updateMoneyGet(newValue) {
      this.FormStore.money_get = newValue;
    },

    updateMoneyBack(newValue) {
      this.FormStore.money_back = newValue;
    },

    calculateMoneyBack() {
      // Calculate money_back based on the formula: money_back = price_sell - money_get
      const result =
        parseFloat(this.FormStore.money_get) -
        parseFloat(this.FormStore.price_sell);
      if (!isNaN(result)) {
        this.FormStore.money_back = result.toFixed(2);
      }
    },
  },
};
</script>

<style scoped>
.result-container {
  padding: 5px;
  border: 1px solid rgb(155, 155, 155);
  border-radius: 5px;
  font-weight: bold;
  width: 85%;
}
</style>
