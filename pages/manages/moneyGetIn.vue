<template>
  <div>
    <v-row class="pa-1 ma-0">
      <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
        <v-btn class="pa-0 ma-0" icon @click="$router.push('/')">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-spacer />
        <v-toolbar-title class="ml-n10">ຈັດການຂໍ້ມູນຢືມມາ</v-toolbar-title>
        <v-spacer />
        <div></div>
      </v-app-bar>
       <!-- __________________app bar for desktop________________ -->
       <LayoutsNavbar v-else />
      <v-col v-if="isLoading" cols="12" sm="12">
        <div class="d-flex justify-center">
          <v-progress-circular
            :size="40"
            :width="5"
            color="teal"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
      <v-col cols="12" sm="12" class="pa-0 ma-0">
        <v-row class="pa-0 ma-0">
          <v-col cols="12" sm="6">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              label="ຄົ້ນຫາ"
              outlined
              hide-details="auto"
              clearable
              dense
              small
              class="box2"
            >
            </v-text-field
          ></v-col>
          <v-col cols="12" sm="6" class="mb-4">
            <div class="d-flex justify-end">
              <moneyGetInInsert />
            </div>
          </v-col>
        </v-row>
        <div></div>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.xs" cols="12" sm="12" class="pa-0 ma-0">
        <moneyGetInMobileScreen :filteredItems="getItem" :search="search" />
      </v-col>
      <v-col v-else cols="12" sm="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="getItem"
            :search="search"
            :items-per-page="10"
            class="elevation-1"
            :loading="loading"
          >
            <template #[`item.image`]="{ item }">
              <div>
                <v-img
                  :src="`${
                    item?.image
                      ? item?.image
                      : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                  }`"
                  lazy-src="https://media.tenor.com/vp3V50Hs-B8AAAAi/loading-waiting.gif"
                  width="60"
                  height="60"
                  style="
                    border-radius: 10px;
                    border: 2px solid #ccc;
                  "
                ></v-img>
              </div>
            </template>
            <template #[`item.money`]="{ value }">
              {{ formatPrice(value) }} ກີບ
            </template>
            <template #[`item.status`]="{ value }">
              <div v-if="value === '1'" class="teal--text">ຄືນແລ້ວ</div>
              <div v-else class="red--text">ຍັງບໍ່ໄດ້ຄືນ</div>
            </template>
            <template #[`item.createDate`]="{ value }">
              {{ formatDateTime(value) }}
            </template>
            <template #[`item.timestamp`]="{ value }">
              {{ formatDateTime(value)}}
            </template>
            <template #[`item.actions`]="{ item }">
              <div class="d-flex">
                <moneyGetInDelete :item="item?.id" />

                <moneyGetInEdit :item="item" />

                <moneyGetInView :item="item" />
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
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
      headers: [
        { text: "ລຳດັບ", value: "index" },
        { text: "ຮູບ", value: "image" },
        // { text: "ໃຊ້ກັບ", value: "name" },
        { text: "ຈຳນວນເງິນ", value: "money" },
        { text: "ເງິນໃຜ", value: "whoseMoney" },
        { text: "ສະຖານະ", value: "status" },
        { text: "ເວລາໃຊ້ຈ່າຍ", value: "timestamp" },
        { text: "ວັນທີສ້າງ", value: "createDate" },
        { text: "ຈັດການ", value: "actions" },
      ],
    };
  },
  computed: {
    getItem() {
      return this.$store.state.moneyGetIn?.moneyGetInData?.map(
        (item, index) => ({
          ...item,
          money: parseInt(item.money),
          index: index + 1,
        })
      );
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("moneyGetIn/selectAll");
    this.loading = false;
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.my-swal-container {
  padding: 25px;
  margin: 25px;
}
</style>
