<template>
  <div class="pa-0 ma-0">
    <v-expansion-panels
      accordion
      v-if="paginatedItems.length > 0"
      class="pa-0 ma-0"
    >
      <v-expansion-panel v-for="(item, i) in paginatedItems" :key="i">
        <v-expansion-panel-header
          class="pa-0 ma-0"
          style="box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.12)"
        >
          <div class="d-flex justify-space-between pa-0 ma-0">
            <div
              class="d-flex justify-space-between pa-0 ma-0"
              @click="$router.push(`/manages/toDo/${item.id}`)"
            >
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
                    item?.type?.length > 20
                      ? item?.type?.slice(0, 20) + "..."
                      : item?.type
                  }}
                </div>
                <div>{{ formatDateTime(item?.createDate) }}</div>
                <div></div>
              </div>
            </div>
            <div
              class="d-flex flex-column justify-space-between ma-2"
              width="100%"
            >
              <div
                class="d-flex justify-end"
                style="font-size: 14px"
                @click="$router.push(`/manages/toDo/${item.id}`)"
              >
                {{ item?.createDate | DateToText }}
              </div>
              <div class="d-flex justify-end mb-4">
                <managesPlanGroupDelete :item="item?.id" />
                <managesPlanGroupEdit :item="item" class="ml-3" />
              </div>
            </div>
          </div>

          <template v-slot:actions>
            <v-icon color="teal"> </v-icon>
          </template>
        </v-expansion-panel-header>
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
  type: "StoreMoneyByFirebaseMobileScreen",
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
          return item?.type?.toLowerCase().includes(this.search?.toLowerCase());
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
          return item?.type?.toLowerCase().includes(this.search?.toLowerCase());
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
