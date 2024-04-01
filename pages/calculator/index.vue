<template>
  <div>
    <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
      <v-btn class="pa-0 ma-0" icon @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="ml-n10">ສູດຄຸນໄຂ່ວ</v-toolbar-title>
      <v-spacer />
      <div></div>
    </v-app-bar>
    <!-- __________________app bar for desktop________________ -->
    <LayoutsNavbar v-else />
    <v-row class="pa-1 ma-0 pa-1 content-center">
      <v-col cols="12">
        <v-row>
          <v-col cols="5">
            <v-text-field
              v-model="formattedValue1"
              @input="formatValue('value1')"
              label="ເທົ່ານີ້"
              outlined
              hide-details
              dense
              :rules="[numericRule]"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="d-flex justify-center align-center">
            <v-icon style="width: 100%">mdi-arrow-right-thin</v-icon>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="formattedValue2"
              @input="formatValue('value2')"
              label="ມີເທົ່ານີ້"
              outlined
              hide-details
              dense
              :rules="[numericRule]"
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="formattedValue3"
              @input="formatValue('value3')"
              label="ຖ້າເທົ່ານີ້"
              outlined
              hide-details
              dense
              :rules="[numericRule]"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="d-flex justify-center align-center">
            <v-icon style="width: 100%">mdi-arrow-right-thin</v-icon>
          </v-col>
          <v-col cols="5" class="d-flex justify-start align-center">
            <div v-if="calculateData?.value4" class="result-container">
              {{ formatPrice(calculateData?.value4) }}
            </div>
            <div class="result-container" v-else>X</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-btn elevation="0" color="primary"  @click="calculate()">ຄຳນວນ</v-btn>
        <v-btn elevation="0" color="error" @click="clearValues">ລ້າງ</v-btn>
      </v-col>
      <!-- <v-col cols="12" class="d-flex flex-column">
        <hr width="100%"/>
         <TestCalculate/>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "report",
  data() {
    return {
      isLoading: false,
      loading: false,
      viewLoading: false,
      search: "",
      showDialog: "",
      calculateData: {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
      },
      numericRule: (value) =>
        /^[0-9,]+$/.test(value) || "Input must be a number",
    };
  },
  computed: {
    formattedValue1: {
      get() {
        return this.formatPrice(this.calculateData.value1);
      },
      set(value) {
        // Check if the value is null or undefined, and set it accordingly
        this.calculateData.value1 = value
          ? parseFloat(value.replace(/,/g, ""))
          : null;
      },
    },
    formattedValue2: {
      get() {
        return this.formatPrice(this.calculateData.value2);
      },
      set(value) {
        this.calculateData.value2 = value
          ? parseFloat(value.replace(/,/g, ""))
          : null;
      },
    },
    formattedValue3: {
      get() {
        return this.formatPrice(this.calculateData.value3);
      },
      set(value) {
        this.calculateData.value3 = value
          ? parseFloat(value.replace(/,/g, ""))
          : null;
      },
    },
  },
  methods: {
    formatValue(fieldName) {
      // Use computed properties for formatting while keeping the original value
      const formattedValue =
        this[
          `formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
        ];
      this[
        `formatted${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
      ] = formattedValue;
    },
    calculate() {
      // Extract values from calculateData
      const { value1, value2, value3 } = this.calculateData;

      // Perform your calculations
      const result =
        (parseFloat(value2) * parseFloat(value3)) / parseFloat(value1);

      // Update the value of calculateData.value4
      this.calculateData.value4 = result; // Adjust the precision as needed
    },
    clearValues() {
      // Set all values in calculateData to null
      this.calculateData.value1 = null;
      this.calculateData.value2 = null;
      this.calculateData.value3 = null;
      this.calculateData.value4 = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.result-container {
  padding: 10px;
  border: 1px solid rgb(155, 155, 155);
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
}
.content-center{
  position: absolute;
  top: 5%;
}
</style>
