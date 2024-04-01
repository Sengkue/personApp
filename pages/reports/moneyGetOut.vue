<template>
  <div class="pa-1">
    <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
      <v-btn class="pa-0 ma-0" icon @click="$router.push('/')">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-spacer />

      <v-toolbar-title class="ml-n10">ລາຍງານເງິນທີຢືມໄປ</v-toolbar-title>
      <v-spacer />
      <div></div>
    </v-app-bar>
    <!-- __________________app bar for desktop________________ -->
    <LayoutsNavbar v-else />
    <v-row class="ma-0 pa-0">
      <!-- __________________________picker startDate and endDate________________________ -->
      <v-col cols="12" sm="6" md="6" class="mb-0 ab-0">
        <v-row>
          <v-col cols="6" sm="6" class="pa-1 ma-0">
            <v-dialog
              ref="startDialog"
              v-model="startModal"
              :return-value.sync="startDate"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="Start Date"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startModal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startDialog.save(startDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="6" class="pa-1 ma-0">
            <v-dialog
              ref="endDialog"
              v-model="endModal"
              :return-value.sync="endDate"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="End Date"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endModal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endDialog.save(endDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
      <!-- ______________________________show sumary_____________________________________ -->
      <v-col cols="12" sm="6" md="6" class="d-flex justify-end ma-0 pa-0">
        <v-card class="mb-2 teal white--text">
          <div class="pa-8">
            <div class="d-flex">
              <h3 class="mr-1">ລວມເງິນທັງໝົດ:</h3>
              <span> {{ formatPrice(totalMoney) }} ກີບ</span>
            </div>
            <div class="d-flex">
              <h3 class="mr-1">ລວມຈຳນວນທັງໝົດ:</h3>
              <span> {{ filteredItems?.length }} ລາຍການ</span>
            </div>
          </div>
        </v-card>
      </v-col>
      <!-- ____________________________print button__________________________ -->
      <v-col cols="12" class="d-flex justify-end pt-0 mt-0">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="print-button primary" v-on="on">
              <v-icon color="yellow">mdi-file-export-outline</v-icon>
              ສົ່ງອອກ
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <!-- :name="title" -->
              <!-- :header="e_headers" -->
              <download-excel
                class="download"
                worksheet="ລາຍງານ"
                :fetch="download"
                :before-finish="finishDownload"
              >
                <v-btn color="success" dark>
                  <v-icon left>mdi-microsoft-excel</v-icon>
                  ດາວໂຫຼດ Excel
                </v-btn>
              </download-excel>
            </v-list-item>
            <!-- <v-list-item>
              <v-btn color="error">
                <v-icon left>mdi-file-pdf-box</v-icon>
                ດາວໂຫຼດ pdf</v-btn
              >
            </v-list-item> -->
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <!-- ________________________________________mobile screen ____________________________________________ -->
    <v-row v-if="$vuetify.breakpoint.xs" justify="center" class="pa-0 ma-0">
      <ReportGetOutMobileScreen :filteredItems="filteredItems" />
    </v-row>
    <!-- ________________________________________desktop screen____________________________________ -->
    <v-data-table
      v-else
      :headers="headers"
      :items="filteredItems"
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
      <template #[`item.createDate`]="{ value }">
        {{ value | DateToText }}
      </template>
       <template #[`item.timestamp`]="{ value }">
              {{ formatDateTime(value)}}
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="d-flex">
          <moneyInComeView :item="item" />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "moneyInCome",
  layout: "report",
  data() {
    return {
      page: 1,
      search: "",
      startDate: this.startDate, // Use the startDate from the global mixin
      endDate: this.endDate, // Use the endDate from the global mixin
      endModal: false,
      startModal: false,
      headers: [
        { text: "ລຳດັບ", value: "index" },
        { text: "ຮູບ", value: "image" },
        { text: "ໃຊ້ກັບ", value: "name" },
        { text: "ຈຳນວນເງິນ", value: "money" },
        { text: "ເງິນໃຜ", value: "whoseMoney" },
        { text: "ເວລາໃຊ້ຈ່າຍ", value: "timestamp" },
        { text: "ວັນທີສ້າງ", value: "createDate" },
        { text: "ຈັດການ", value: "actions" },
      ],
      loading: false,
      dialog: false,
    };
  },

  computed: {
    filteredItems() {
      const startDate = this.$moment(this.startDate);
      const endDate = this.$moment(this.endDate);

      return this.$store.state.moneyGetOut?.moneyGetOutData
        ?.filter((item) => {
          const itemTimestamp = this.$moment(item?.timestamp);
          return itemTimestamp.isBetween(startDate, endDate, null, "[]");
        })
        .map((item, index) => ({
          ...item,
          money: parseInt(item?.money),
          index: index + 1,
        }));
    },
    totalMoney() {
      return this.filteredItems.reduce(
        (total, item) => total + parseInt(item?.money),
        0
      );
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("moneyGetOut/selectAll");
    this.loading = false;
  },
  methods: {
    // ___________________________download as excel________________________________
    async download() {
      try {
        var list = [],
          index = 0;
        for (let i = 0; i < this.filteredItems?.length; i++) {
          var el = this.filteredItems[i];
          index = parseInt(i) + 1;
          var obj = {
            ລຳດັບ: el.index++,
            // image: el.image,
            ໃຊ້ກັບ: el.name,
            ຈຳນວນເງິນ: el?.money,
            ເງິນໃຜ: el?.whoseMoney,
            ສະທານະ: el?.status==="0"?"ຍັງບໍ່ໄດ້ຄືນ":"ຄືນແລ້ວ",
            ຄຳອະທິບາຍ: el?.description,
            ເວລາໃຊ້ຈ່າຍ: this.$moment(el?.timestamp).format("DD/MM/YYYY hh:mm:ss A"),
            ວັນທີສ້າງ: this.$moment(el?.createDate).format("DD/MM/YYYY hh:mm:ss A"),
            // ຈັດການ: el.actions,
          };
          list.push(obj);
        }
        return list;
      } catch (error) {
        console.log(error);
      }
    },
    finishDownload() {
      this.$toast.success("ດາວໂຫຼດຂໍ້ມູນເຂົ້າ excel ສຳເລັດແລ້ວ...");
    },
  },
};
</script>

<style lang="scss" scoped></style>
