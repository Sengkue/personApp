<template>
  <div>
    <home-banners-image />
    <v-row class="pa-2 ma-0">
      <v-col cols="12" class="d-flex justify-space-between align-center pa-0">
        <div>ລາຍງານຂໍ້ມູນ</div>
        <div></div>
        <v-icon class="color-icon" large>mdi-finance</v-icon>
      </v-col>
      <v-col cols="12">
        <HomeCardDashboard />
      </v-col>
      <v-col cols="12" class="pa-1" color="white">
        <HomeButtonGroup />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ItcSaubLandingIndex",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.card-bg {
  // background-color: #f9f6f6;
  border: 1px solid #ece3e3;
}
.color-icon {
  color: #ecca36;
}
</style>
