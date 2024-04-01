<template>
  <div>
    <v-card
      v-ripple="{ class: `green--text` }"
      elevation="2"
      class="white--text pa-2 goldBackground"
      style="
        cursor: pointer;
      "
    >
      <div class="d-flex justify-space-between align-center">
        <div class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6">
          <h3 style="color: #e0f7fa">ລາຍຈ່າຍ</h3>
          <span>{{ formatPrice(calculateTotalMoney()) }}ກີບ</span>
        </div>
        <div>
          <v-icon color="white" :size="$vuetify.breakpoint.xs ? 35 : 50"
            >mdi-cash-multiple</v-icon
          >
        </div>
      </div>
      <v-divider class="white mt-n2 mb-1"></v-divider>
      <div class="d-flex">
        <v-icon v-ripple color="white" @click="Income()">{{
          `mdi-arrow-${cardExpenseStatus === 1 ? "down" : "up"}-circle-outline`
        }}</v-icon>
        <div>{{ getStatusText(cardExpenseStatus) }}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "StoreMoneyByFirebaseCateMonth",

  data() {
    return {
      moneyData: [],
      cardExpenseStatus: 1, // Default to current date
    };
  },

  computed: {
    filteredMoneyData() {
      const currentDate = new Date().toISOString().split("T")[0];

      switch (this.cardExpenseStatus) {
        case 1: // Filter data for the current date
          return this.moneyData.filter((item) => {
            return item.timestamp.split("T")[0] === currentDate;
          });
        case 2: // Filter data for the current month
          const currentMonth = new Date().toISOString().split("-")[1];
          return this.moneyData.filter((item) => {
            return item.timestamp.includes(currentMonth);
          });
        case 3: // Filter data for the current year
          const currentYear = new Date().toISOString().split("-")[0];
          return this.moneyData.filter((item) => {
            return item.timestamp.includes(currentYear);
          });
        case 4: // Show all data
          return this.moneyData;
        default:
          return [];
      }
    },
  },

  mounted() {
    this.getMoneyData();
  },

  methods: {
    Income() {
      // Toggle between 1, 2, 3, 4
      this.cardExpenseStatus = (this.cardExpenseStatus % 4) + 1;
    },

    getMoneyData() {
      this.$axios.get("/moneyOutCome.json").then((res) => {
        const fetchedData = res.data;
        const dataArr = [];
        for (let key in fetchedData) {
          dataArr.push({ id: key, ...fetchedData[key] });
        }
        this.moneyData = dataArr;
      });
    },

    calculateTotalMoney() {
      return this.filteredMoneyData.reduce((total, item) => {
        // Assuming 'money' property contains the amount
        return total + parseInt(item.money, 10);
      }, 0);
    },

    getStatusText(status) {
      switch (status) {
        case 1:
          return "ພາຍໃນມື້";
        case 2:
          return "ພາຍໃນເດືອນ";
        case 3:
          return "ພາຍໃນປີ";
        case 4:
          return "ທັງໝົດ";
        default:
          return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
