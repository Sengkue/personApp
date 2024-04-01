<template>
  <div class="pa-0 ma-0">
    <v-text-field
      v-model="selectedItem.type"
      clearable
      outlined
      dense
      label="ປະເພດ*"
      required
      @click="openDialog"
    ></v-text-field>

    <v-dialog
      v-model="dialog"
      class="pa-0 ma-0"
      max-width="600px"
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
    >
      <!-- max-width="600px" -->
      <v-card class="pa-0 ma-0 rounded-0">
        <v-card
          elevation="0"
          class="goldBackground rounded-0 d-flex justify-space-between align-center pl-6 ma-0"
          style="height: 45px"
          dark
        >
          ເລືອກປະເພດທີຕ້ອງການ
          <v-card-actions>
            <v-btn x-small color="error" @click="closeDialog"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
        <div class="d-flex align-center pl-2 mb-2">
          <v-text-field
            v-model="search"
            label="Search"
            solo-inverted
            @input="filterItems"
            dense
            hide-details
          ></v-text-field>
          <v-card-actions class="mt-n7">
            <managesMoneyTypeInsert />
          </v-card-actions>
        </div>
        <v-card-text
          class="pa-0 ma-0"
          style="position: relative; height: 75vh; overflow: auto"
        >
          <div v-if="filteredItems.length > 0" class="d-flex flex-wrap">
            <v-card
              v-for="item in filteredItems"
              :key="item.id"
              class="box2"
              width="100px"
              @click="selectItem(item)"
            >
              <div class="d-flex justify-center align-center" width="100%">
                <v-avatar :tile="true">
                  <v-img
                    :src="`${
                      item?.image
                        ? item?.image
                        : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                    }`"
                    lazy-src="https://media.tenor.com/vp3V50Hs-B8AAAAi/loading-waiting.gif"
                    alt="Avatar"
                  >
                    <div
                      style="
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        font-weight: bold;
                        color: white;
                        text-shadow: 2px 2px 4px #000000;
                      "
                    >
                      {{ item?.index }}
                    </div></v-img
                  >
                </v-avatar>
              </div>

              <v-list-item-content class="pl-2 text-center">
                <v-list-item-title>{{ item?.type }}</v-list-item-title>
              </v-list-item-content>
              <div class="d-flex justify-end">
                <v-menu left>
                  <template #activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item class="px-2 ma-0">
                      <v-tooltip top color="error">
                        <template #activator="{ on }">
                          <v-btn icon @click="sendToDelete(item?.id)" v-on="on">
                            <v-icon color="error"
                              >mdi-delete-forever-outline</v-icon
                            >
                          </v-btn>
                        </template>
                        ລືບ
                      </v-tooltip>
                      <v-tooltip top color="green">
                        <template #activator="{ on }">
                          <v-btn icon @click="sendToEdit(item)" v-on="on">
                            <v-icon color="green"
                              >mdi-square-edit-outline</v-icon
                            >
                          </v-btn>
                        </template>
                        ແກ້ໄຂ
                      </v-tooltip>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card>
          </div>
          <v-card v-else class="no-data-message">
            <v-card-text>ບໍ່ມີຂໍ້ມູນ!</v-card-text>
          </v-card>
          <!-- Dialog Delete_________________________________________________________ -->
          <v-dialog v-model="dialogDelete" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <h3 class="">ລືບຂໍ້ມູນ</h3>
              </v-card-title>

              <v-card-text> ທ່ານຕ້ອງການລືບຂໍ້ມູນໂຕນີ້ບໍ? </v-card-text>
              <v-card-actions>
                <v-btn color="red daren-1" text @click="dialogDelete = false"
                  >ຍົກເລີກ</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  :loading="loading"
                  text
                  @click="deleteItem()"
                  >ຕົກລົງ</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Dialog Update________________________________________________________ -->
          <v-dialog
            v-model="dialogUpdate"
            persistent
            max-width="600px"
            style="z-index: 7"
            :fullscreen="$vuetify.breakpoint.xs ? true : false"
          >
            <v-card>
              <v-form ref="form" v-model="valid">
                <v-card-title>
                  <span class="text-h5 shadow">ແກ້ໄຂປະເພດ</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="8" class="py-0">
                        <v-text-field
                          clearable
                          outlined
                          dense
                          v-model="peopleData.image"
                          label="URL"
                          required
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4" class="mt-n3">
                        <peopleUpload @image-uploaded="emitImage" />
                      </v-col>
                      <v-col cols="12" class="py-0" sm="6">
                        <v-text-field
                          :rules="typeRules"
                          clearable
                          outlined
                          dense
                          v-model="peopleData.type"
                          label="ປະເພດ*"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogUpdate = false"
                  >
                    ປິດ
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :loading="loading"
                    text
                    :disabled="!valid"
                    @click="updateItem()"
                  >
                    ບັນທືກແກ້ໄຂ
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  type: "TypeSelect",

  data() {
    return {
      loading: false,
      valid: false,
      dialog: false,
      selectedItem: { id: null, type: null, image: null, createDate: null },
      search: "",
      dialogDelete: false,
      deleteId: null,
      dialogUpdate: false,
      peopleData: {
        id: null,
        type: null,
        image: null,
        createDate: null,
        updateDate: null,
      },
      typeRules: [
        (v) => !!v || "ກະລຸນາປ້ອມຊື່",
        (v) => (v && v.length <= 50) || "ຊື່ຄວາມຕ້ອງໜ້ອຍ 50 ໂຕອັກສອນ",
      ],
    };
  },

  computed: {
    getItem() {
      return this.$store.state.moneyType.moneyTypeData?.map((item, index) => ({
        ...item,
        money: parseInt(item.money),
        index: index + 1,
      }));
    },
    filteredItems() {
      const regex = new RegExp(this.search.trim(), "i");
      return this.getItem.filter(
        (item) => regex.test(item.type) || regex.test(item.createDate)
      );
    },

    reset() {
      if (this.$store.state.moneyType.resetType) {
        this.selectedItem.type = null;
        this.selectedItem.id = null;
        this.$store.commit("moneyType/setResetType", false);
      }
      return this.$store.state.moneyType.resetType;
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("moneyType/selectAll");
    this.loading = false;
  },
  methods: {
    emitImage(e) {
      this.peopleData.image = e;
    },
    // delete session___________________________________________________________
    sendToDelete(id) {
      this.dialogDelete = true;
      this.deleteId = id;
    },
    async deleteItem() {
      this.loading = true;
      await this.$store.dispatch("moneyType/deleteItem", this.deleteId);
      this.dialogDelete = false;
      this.loading = false;
    },
    // update session___________________________________________________________
    sendToEdit(item) {
      this.dialogUpdate = true;
      this.peopleData.id = item?.id;
      this.peopleData.type = item?.type;
    },
    async updateItem() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      this.peopleData.updateDate = new Date();
      await this.$store.dispatch("moneyType/updatemoneyType", this.peopleData);
      this.loading = false;
      this.dialogUpdate = false;
    },
    openDialog() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    selectItem(item) {
      this.selectedItem = { ...item };
      this.$emit("typeValue", this.selectedItem);
      this.dialog = false;
    },

    filterItems() {},
  },
};
</script>

<style lang="scss" scoped>
.no-data-message {
  background-color: #f4f4f4;
  text-align: center;
  padding: 16px;
  border-radius: 4px;
  color: #757575;
  font-size: 16px;
}
</style>
