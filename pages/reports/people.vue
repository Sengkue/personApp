<template>
  <div>
    <v-card class="px-5">
      <v-row>
        <v-col cols="12" sm="12">
          <div class="d-flex justify-center">
            <v-card class="px-5 py-2" elevation="0">
              <h2>ຈັດການຂໍ້ມູນຜູ້ຄົນ</h2>
            </v-card>
          </div>
        </v-col>
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
        <v-col cols="12" sm="12" class="mt-2">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                v-model="search"
                label="ຄົ້ນຫາ"
                outlined
                hide-details
                clearable
                dense
                small
                class="box2"
              >
              </v-text-field
            ></v-col>
            <v-col cols="12" sm="6">
              <div class="d-flex justify-end">
                <PeopleInsert />
              </div>
            </v-col>
          </v-row>
          <div></div>
        </v-col>
        <v-col cols="12" sm="12">
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
                      item.image
                        ? item.image
                        : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                    }`"
                    width="60"
                    height="60"
                    style="border-radius: 10px; border: 2px solid #ccc"
                  ></v-img>
                </div>
              </template>
              <template #[`item.createDate`]="{ value }">
                {{ value | DateToText }}
              </template>
              <template #[`item.actions`]="{ item }">
                <div class="d-flex">
                  <peopleDelete :item="item.id" />

                  <peopleEdit :item="item" />

                  <peopleView :item="item" />
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
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
        { text: "ຊື່", value: "name" },
        { text: "ນາມສະກຸນ", value: "surname" },
        { text: "ເບີ", value: "tel" },
        { text: "ວັນທີສ້າງ", value: "createDate" },
        { text: "ຈັດການ", value: "actions" },
      ],
    };
  },
  computed: {
    getItem() {
      return this.$store.state.people.peopleData.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("people/selectAll");
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
