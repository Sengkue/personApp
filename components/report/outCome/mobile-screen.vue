<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="(item, i) in paginatedItems" :key="i">
      <v-expansion-panel-header
        class="pa-0 ma-0"
        style="box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.12)"
      >
        <v-row class="pa-0 ma-0">
          <v-col cols="2">
            <v-avatar max-width="50">
              <v-img
                class="align-end"
                :src="`${
                  item.image
                    ? item.image
                    : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                }`"
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
                  {{ item.index }}
                </div>
              </v-img>
            </v-avatar>
          </v-col>
          <v-col cols="4" class="d-flex align-center">
            {{
              item.name.length > 15 ? item.name.slice(0, 15) + "..." : item.name
            }}
          </v-col>
          <v-col cols="4" class="d-flex align-center">
            <div class="pl-1">{{ formatPrice(item.money) }} ກີບ</div>
          </v-col>
        </v-row>

        <!-- <v-divider vertical inset class="pl-1"></v-divider> -->
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row class="pa-0 ma-0">
          <v-col cols="12" sm="4" class="pa-0 pt-1 ma-0">
            <div class="d-flex justify-center">
              <v-img
                :src="`${
                  item.image
                    ? item.image
                    : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                }`"
                style="border-radius: 15px"
                max-width="200px"
                max-height="150px"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" sm="8">
            <v-row class="pa-0 ma-0">
              <v-col cols="5">ໃຊ້ຈ່າຍກັບ:</v-col>
              <v-col cols="6">{{ item.name }}</v-col>
              <v-col cols="5">ຈຳນວນເງິນ:</v-col>
              <v-col cols="6">{{ formatPrice(item.money) }} ກີບ</v-col>

              <v-col cols="5">ເງິນໃຜ:</v-col>
              <v-col cols="6">{{ item.whoseMoney }}</v-col>
              <v-col cols="5">ເວລາໃຊ້ຈ່າຍ:</v-col>
              <v-col cols="6">{{ formatDateTime(item?.timestamp) }}</v-col>

              <v-col cols="5">ເວລາສ້າງ:</v-col>
              <v-col cols="6">{{ item.createDate | DateToText }}</v-col>
              <v-col cols="5">ເວລາແກ້ໃຂ:</v-col>
              <v-col cols="6">{{ item.updateDate | DateToText }}</v-col>
              <v-col cols="5">ລາຍລະອຽດ:</v-col>
              <v-col cols="5" class="pa-3">ລາຍລະອຽດ:</v-col>
              <v-col :cols="`${item?.description?.length > 25 ? 12 : 6}`">
                <div v-if="item?.description" v-html="item?.description"></div>
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
</template>
<script>
export default {
  name: "StoreMoneyByFirebaseMobileScreen",
  props: {
    filteredItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 3,
      itemsPerPageOptions: [3, 5, 10, 20], // Add more options if needed
    };
  },
  computed: {
    paginatedItems() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  mounted() {},

  methods: {},
};
</script>
