<template>
  <div class="pa-0 ma-0">
    <v-text-field
      v-model="selectedItem.name"
      clearable
      outlined
      dense
      label="ເງິນໃຜ*"
      required
      @click="openDialog"
    ></v-text-field>

    <v-dialog
      v-model="dialog"
      class="pa-0 ma-0"
      transition="dialog-top-transition"
      max-width="600px"
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
    >
      <v-card class="pa-0 ma-0 rounded-0">
        <v-card
          elevation="0"
          class="goldBackground rounded-0 d-flex justify-space-between align-center pl-6 ma-0"
          style="height: 45px"
          dark
        >
          ເລືອກຜູ້ຄົນທີຕ້ອງການ
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
            <PeopleInsert />
          </v-card-actions>
        </div>
        <v-card-text
          class="pa-0 ma-0"
          style="position: relative; height: 75vh; overflow: auto"
        >
          <v-list v-if="filteredItems.length > 0">
            <v-list-item
              v-for="item in filteredItems"
              :key="item.id"
              class="box2"
              @click="selectItem(item)"
            >
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
              <v-list-item-content class="pl-2">
                <v-list-item-title>{{ item?.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  item?.status?.length > 15
                    ? item?.status.substring(0, 25) + "..."
                    : item?.status?.length
                    ? item?.status
                    : "..."
                }}</v-list-item-subtitle>
              </v-list-item-content>
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
                          <v-icon color="green">mdi-square-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      ແກ້ໄຂ
                    </v-tooltip>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>
          </v-list>
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
                  <span class="text-h5 shadow">Create people</span>
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
                          :rules="nameRules"
                          clearable
                          outlined
                          dense
                          v-model="peopleData.name"
                          label="ຊື່*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0" sm="6">
                        <v-text-field
                          :rules="surnameRules"
                          clearable
                          outlined
                          dense
                          v-model="peopleData.surname"
                          label="ນາມສະກຸນ*"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0" sm="6">
                        <v-text-field
                          :rules="statusRules"
                          clearable
                          outlined
                          dense
                          v-model="peopleData.status"
                          label="ສະຖານະ*"
                          placeholder="ຕົວຢ່າງ: ພໍ່ແມ່, ໝູ່ເພື່ອນ..."
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" class="py-0" sm="6">
                        <v-text-field
                          :rules="telephoneRules"
                          clearable
                          outlined
                          dense
                          v-model="peopleData.tel"
                          label="ເບີ*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0" sm="6"
                        ><v-text-field
                          :rules="nameRules"
                          clearable
                          outlined
                          dense
                          v-model="peopleData.facebook"
                          label="ເຟສບຸກ*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-textarea
                          clearable
                          outlined
                          dense
                          v-model="peopleData.detail"
                          label="ລາຍລະອຽດ*"
                          required
                        ></v-textarea>
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
  name: "StoreMoneyByFirebaseInsert",
  props: {
    task: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      valid: false,
      dialog: false,
      selectedItem: { id: null, name: null, image: null, createDate: null },
      search: "",
      dialogDelete: false,
      deleteId: null,
      dialogUpdate: false,
      peopleData: {
        id: null,
        name: null,
        surname: null,
        status: null,
        tel: null,
        detail: null,
        facebook: null,
        image: null,
        createDate: null,
        updateDate: null,
      },
      nameRules: [
        (v) => !!v || "ກະລຸນາປ້ອມຊື່",
        (v) => (v && v.length <= 50) || "ຊື່ຄວາມຕ້ອງໜ້ອຍ 50 ໂຕອັກສອນ",
      ],
      surnameRules: [
        (v) => !!v || "ກະລຸນາປ້ອມນາມສະກຸນ",
        (v) => (v && v.length <= 50) || "ນາມສະກຸນຕ້ອງໜ້ອຍ 50 ໂຕອັກສອນ",
      ],
      statusRules: [
        (v) => !!v || "ກະລຸນາປ້ອມສະຖານະ",
        (v) => (v && v.length <= 100) || "ສະຖານະຕ້ອງໜ້ອຍ 100 ໂຕອັກສອນ",
      ],
      telephoneRules: [
        (v) => !!v || "ກະລຸນາປ້ອມເບີໂທລະສັບ",
        (v) => /^\d+$/.test(v) || "ເບີໂທລະສັບຕ້ອງມີຕົວເລກເລີຍ",
        (v) => (v && v.length <= 15) || "ເບີໂທລະສັບຕ້ອງໜ້ອຍ 15 ໂຕອັກສອນ",
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
    filteredItems() {
      const regex = new RegExp(this.search.trim(), "i");
      return this.getItem.filter(
        (item) => regex.test(item.name) || regex.test(item.createDate)
      );
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("people/selectAll");
    this.loading = false;
    this.allUpdate();
  },
  methods: {
    //----------------- when update any value
    allUpdate() {
      if (this.task) {
        this.selectedItem.name = this.task;
      }
    },
    // ----------------reset form after submit
    resetForm() {
      this.selectedItem = {
        id: null,
        name: null,
        image: null,
        createDate: null,
      };
    },
    emitImage(e) {
      this.peopleData.image = e; // Update the imageUrl when received from the child component
    },
    // delete session___________________________________________________________
    sendToDelete(id) {
      this.dialogDelete = true;
      this.deleteId = id;
    },
    async deleteItem() {
      this.loading = true;
      await this.$store.dispatch("people/deleteItem", this.deleteId);
      this.dialogDelete = false;
      this.loading = false;
    },
    // update session___________________________________________________________
    sendToEdit(item) {
      this.dialogUpdate = true;
      this.peopleData.id = item?.id;
      this.peopleData.name = item?.name;
      this.peopleData.surname = item?.surname;
      this.peopleData.status = item?.status;
      this.peopleData.tel = item?.tel;
      this.peopleData.detail = item?.detail;
      this.peopleData.facebook = item?.facebook;
      this.peopleData.image = item?.image;
      this.peopleData.createDate = item?.createDate;
    },
    async updateItem() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      this.peopleData.updateDate = new Date();
      await this.$store.dispatch("people/updatePeople", this.peopleData);
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
      this.$emit("peopleValue", this.selectedItem);
      this.dialog = false;
    },

    filterItems() {
      // The filteredItems computed property will automatically update based on the search input.
    },
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
