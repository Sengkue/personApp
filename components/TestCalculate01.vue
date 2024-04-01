<template>
  <div class="col-md-6">
    <!-- ____________________________Currency___________________ -->

    <label class="form-label fs-6"
      >ລາຄາຂາຍ: <span class="text-danger">*</span></label
    >
    <div class="input-group mb-2">
      <VueCleave
        :options="options.number"
        class="result-container"
        :modelValue="FormStore.price_sell"
        @update:modelValue="updatePriceSell"
      />
      <span class="input-group-text">ກີບ</span>
    </div>
    <!-- ____________________________Enter credit card___________________ -->
    <label class="form-label fs-6"
      >Enter credit card: <span class="text-danger">*</span></label
    >
    <div class="input-group mb-2">
      <VueCleave
        :options="options.creditCard"
        class="result-container"
        :modelValue="FormStore.card"
        @update:modelValue="updateCard"
      />
      <span class="input-group-text">ກີບ</span>
    </div>
    <!-- ____________________________Enter date with___________________ -->
    <label class="form-label fs-6"
      >Enter date with: <span class="text-danger">*</span></label
    >
    <div class="input-group mb-2">
      <VueCleave
        :options="options.date"
        class="result-container"
        :modelValue="FormStore.date"
        @update:modelValue="updateDate"
      />
      <span class="input-group-text">ກີບ</span>
    </div>
    <div class="input-group mb-2">
      {{ FormStore }}
    </div>
  </div>
</template>

<script>
import VueCleave from "vue-cleave-component";

export default {
  components: {
    VueCleave,
  },

  data() {
    return {
      // options: {
      //   numeral: true,
      //   numeralPositiveOnly: true,
      //   noImmediatePrefix: true,
      //   rawValueTrimPrefix: true,
      //   numeralIntegerScale: 10,
      //   numeralDecimalScale: 2,
      //   numeralDecimalMark: ".",
      //   delimiter: ",",
      // },
      options: {
        creditCard: {
          creditCard: true,
          delimiter: "-",
        },
        date: {
          date: true,
          datePattern: ["d", "m", "Y"],
          delimiter: "/",
        },
        number: {
          prefix: "₭ ",
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
        card: "",
        date: "",
      },
    };
  },

  methods: {
    updatePriceSell(newValue) {
      this.FormStore.price_sell = newValue;
    },

    updateCard(newValue) {
      this.FormStore.card = newValue;
    },

    updateDate(newValue) {
      this.FormStore.date = newValue;
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
