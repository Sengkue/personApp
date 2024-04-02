<template>
  <div class="pa-0 ma-0">
    <v-expansion-panels
      accordion
      v-if="paginatedItems?.length > 0"
      class="pa-0 ma-0"
    >
      <v-expansion-panel v-for="(item, i) in paginatedItems" :key="i">
        <v-expansion-panel-header
          class="pa-0 ma-0"
          style="box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.12)"
        >
          <div class="d-flex justify-space-between pa-0 ma-0">
            <div class="d-flex justify-space-between pa-0 ma-0">
              <div>
                <v-img
                  class="align-center ma-2"
                  :src="`${
                    item?.image
                      ? item?.image
                      : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                  }`"
                  lazy-src="https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                  width="65"
                  height="65"
                  style="border-radius: 10px"
                  contain
                >
                  <div
                    style="
                      width: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 25px;
                      font-weight: bold;
                      color: white;
                      text-shadow: 2px 2px 4px #000000;
                    "
                  >
                    {{ item?.index }}
                  </div>
                </v-img>
              </div>
              <div
                class="d-flex flex-column justify-space-between ma-2"
                style="font-size: 14px"
              >
                <div>
                  {{
                    item?.name?.length > 13
                      ? item?.name?.slice(0, 13) + "..."
                      : item?.name
                  }}
                </div>
                <div>{{ formatPrice(item?.money) }} ກີບ</div>
                <div
                  :class="item?.status === '1' ? 'green--text' : 'red--text'"
                >
                  {{ item?.status === "1" ? "ຄືນແລ້ວ" : "ຍັງບໍ່ໄດ້ຄືນ" }}
                </div>
              </div>
            </div>
            <div
              class="d-flex flex-column justify-space-between ma-2"
              width="100%"
            >
              <div class="d-flex justify-end" style="font-size: 14px">
                {{ item?.createDate | DateToText }}
              </div>
              <div class="d-flex justify-end mb-4">
                <moneyGetInDelete :item="item?.id" />
                <moneyGetInEdit :item="item" class="ml-3" />
              </div>
            </div>
          </div>

          <template v-slot:actions>
            <v-icon color="teal"> </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="ma-0 pa-0">
          <v-row class="pa-0 ma-0">
            <v-col cols="12" sm="4" class="pa-0 pt-1 ma-0">
              <div class="d-flex justify-center" max-width="100%">
                <v-img
                  :src="`${
                    item?.image
                      ? item?.image
                      : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                  }`"
                  lazy-src="https://media.tenor.com/vp3V50Hs-B8AAAAi/loading-waiting.gif"
                  style="border-radius: 15px"
                  max-width="200px"
                  max-height="150px"
                  contain
                ></v-img>
              </div>
            </v-col>
            <v-col cols="12" sm="8" class="pa-0 ma-0">
              <v-row class="pa-0 ma-0">
                <v-col cols="5" class="pa-3">ຈຳນວນເງິນ:</v-col>
                <v-col cols="6" class="pa-3"
                  >{{ formatPrice(item?.money) }} ກີບ</v-col
                >

                <v-col cols="5" class="pa-3">ເງິນໃຜ:</v-col>
                <v-col cols="6" class="pa-3">{{ item?.whoseMoney }}</v-col>
                <v-col cols="5" class="pa-3">ສະຖານະ:</v-col>
                <v-col cols="6" class="pa-3"
                  ><div
                    :class="item?.status === '1' ? 'green--text' : 'red--text'"
                  >
                    {{ item?.status === "1" ? "ຄືນແລ້ວ" : "ຍັງບໍ່ໄດ້ຄືນ" }}
                  </div></v-col
                >
                <v-col cols="5" class="pa-3">ເວລາໃຊ້ຈ່າຍ:</v-col>
                <v-col cols="6" class="pa-3">{{
                  formatDateTime(item?.timestamp)
                }}</v-col>

                <v-col cols="5" class="pa-3">ເວລາສ້າງ:</v-col>
                <v-col cols="6" class="pa-3">{{
                  item?.createDate | DateToText
                }}</v-col>
                <v-col cols="5" class="pa-3">ເວລາແກ້ໃຂ:</v-col>
                <v-col cols="6" class="pa-3">{{
                  item?.updateDate | DateToText
                }}</v-col>
                <v-col cols="5" class="pa-3">ລາຍລະອຽດ:</v-col>
                <v-col :cols="`${item?.description?.length > 25 ? 12 : 6}`">
                  <div
                    v-if="item?.description"
                    v-html="item?.description"
                  ></div>
                  <div v-else>ບໍ່ມີຂໍ້ມູນ</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-footer fixed app class="pa-0 ma-0">
        <v-row class="pa-0 ma-0">
          <v-col cols="8">
            <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="3"
              circle
            ></v-pagination>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="itemsPerPage"
              :items="itemsPerPageOptions"
              label="ເລືອກລາຍການສະແດງ"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </v-footer>
    </v-expansion-panels>
    <v-row v-else class="pa-5 ma-5 text-center">
      <v-col cols="12">
        <h3>ບໍ່ມີຂໍ້ມູນ!</h3>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StoreMoneyByFirebaseMobileScreen",
  props: {
    filteredItems: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
    },
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 5,
      itemsPerPageOptions: [5, 10, 20, 50],
      direction: "left",
    };
  },
  computed: {
    paginatedItems() {
      let filtered;
      if (this.search === null || this.search === "") {
        filtered = this.filteredItems;
      } else {
        filtered = this.filteredItems?.filter((item) => {
          return item?.name?.toLowerCase().includes(this.search?.toLowerCase());
        });
      }
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered?.slice(start, end);
    },
    totalPages() {
      let filtered;
      if (this.search === null || this.search === "") {
        filtered = this.filteredItems;
      } else {
        filtered = this.filteredItems?.filter((item) => {
          return item?.name?.toLowerCase().includes(this.search?.toLowerCase());
        });
      }
      return Math.ceil(filtered?.length / this.itemsPerPage);
    },
  },
  mounted() {
    // Perform any necessary operations upon component mount
  },
  methods: {
    // Define component methods if needed
  },
};
</script>
