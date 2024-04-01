<template>
  <div>
    <v-row class="pa-1 ma-0">
      <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
        <v-btn class="pa-0 ma-0" icon @click="$router.push('/')">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-spacer />
        <v-toolbar-title class="ml-n10">ຄຳຄົມ</v-toolbar-title>
        <v-spacer />
        <div></div>
      </v-app-bar>
      <!-- __________________app bar for desktop________________ -->
      <LayoutsNavbar v-else />
      <v-col cols="12" sm="12" class="pt-0 pb-1 px-0 ma-0">
        <div class="d-flex justify-end">
          <managesSlideInsert />
        </div>
      </v-col>
      <v-col cols="12">
        <v-row class="mt-2">
          <v-col
            v-for="image in getItem"
            :key="image.index"
            class="d-flex child-flex pa-1 ma-0"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              :style="{
                backgroundColor: image?.backgroundColor,
                color: image?.color,
              }"
              class="d-flex align-center justify-space-between flex-center pa-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h4"
              @click="openDialog(image?.url)"
              ><div></div>
              {{ image?.title }}
              <v-menu left>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    :style="{
                      color: image?.color,
                    }"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item class="px-2 ma-0">
                    <v-tooltip top color="error">
                      <template #activator="{ on }">
                        <v-btn icon @click="sendToDelete(image?.id)" v-on="on">
                          <v-icon color="error"
                            >mdi-delete-forever-outline</v-icon
                          >
                        </v-btn>
                      </template>
                      Delete
                    </v-tooltip>
                    <v-tooltip top color="green">
                      <template #activator="{ on }">
                        <v-btn icon @click="sendToEdit(image)" v-on="on">
                          <v-icon color="green">mdi-square-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      Edit
                    </v-tooltip>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card>
          </v-col>
        </v-row>

        <!-- Advanced Dialog for full-screen image  _____________________________-->
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-fade"
        >
          <v-card
            class="overflow-hidden d-flex justify-center align-center backgroundDark"
          >
            <v-carousel v-if="dialog" hide-delimiter-background>
              <v-carousel-item v-for="item in getItem" :key="item.index">
                <v-sheet
                  :style="{
                    background: item.backgroundColor,
                    color: item.color,
                  }"
                  height="100%"
                >
                  <v-row class="fill-height" align="center" justify="center">
                    <div
                      class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h4"
                    >
                      {{ item.title }}
                    </div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
            <v-btn icon class="close-button" @click="closeDialog">
              <v-icon color="error">mdi-close-thick</v-icon>
            </v-btn>
          </v-card>
        </v-dialog>
        <!-- Dialog for delete ________________________________________________ -->
        <v-dialog v-model="dialogDelete" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">ລືບຂໍ້ມູນ</span>
            </v-card-title>

            <v-card-text> ທ່ານຕ້ອງການລືບຂໍ້ມູນນີ້ບໍ? </v-card-text>
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
        <!-- Dialog for edit _______________________________________________________ -->
        <v-dialog
          v-model="dialogEdit"
          persistent
          max-width="600px"
          :fullscreen="$vuetify.breakpoint.xs ? true : false"
        >
          <v-card>
            <v-card-title>
              <span>ແຜນການແລະເປົ່າໝາຍ</span>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-text>
                <v-row>
                  <v-col cols="12" class="py-0" sm="6">
                    <v-autocomplete
                      v-model="itemData.backgroundColor"
                      :items="colorOptions"
                      label="ສີພາບພື້ນຫຼັງ"
                      outlined
                      dense
                      required
                      persistent-hint
                      item-text="color"
                      item-value="value"
                    >
                      <template v-slot:item="{ item }">
                        <v-row style="background-color: #e0f2f1">
                          <v-col cols="24" class="d-flex">
                            <div
                              :style="{
                                width: '20px',
                                height: '20px',
                                background: item?.value,
                              }"
                            ></div>
                            <span class="ml-2">{{ item?.color }}</span>
                          </v-col>
                        </v-row>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <v-autocomplete
                      v-model="itemData.color"
                      :items="colorOptions"
                      label="ສິຕົວໜັງສື"
                      outlined
                      dense
                      required
                      persistent-hint
                      item-text="color"
                      item-value="value"
                    >
                      <template v-slot:item="{ item }">
                        <v-row style="background-color: #e0f2f1">
                          <v-col cols="24" class="d-flex">
                            <div
                              :style="{
                                width: '20px',
                                height: '20px',
                                background: item?.value,
                              }"
                            ></div>
                            <span class="ml-2">{{ item?.color }}</span>
                          </v-col>
                        </v-row>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    {{ itemData?.color }}
                  </v-col>

                  <v-col cols="12" class="py-0">
                    <v-textarea
                      clearable
                      outlined
                      dense
                      v-model="itemData.title"
                      label="ຄຳຄົມ*"
                      required
                      :rules="validationRules.title"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-card
                      :style="{
                        backgroundColor: itemData.backgroundColor,
                        color: itemData.color,
                      }"
                    >
                      <v-card-title>
                        {{ itemData.title }}
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogEdit = false">
                  ປິດ
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  :loading="loading"
                  text
                  :disabled="!valid"
                  @click="EditItem()"
                >
                  ບັນທຶກ
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StoreMoneyByFirebaseIndex",
  layout: "report",
  data() {
    return {
      isLoading: false,
      loading: false,
      viewLoading: false,
      showDialog: "",
      dialog: false,
      dialogDelete: false,
      deleteId: null,
      dialogEdit: false,
      valid: false,
      itemData: {
        title: null,
        status: "0",
        color: null,
        backgroundColor: null,
        createDate: null,
        updateDate: null,
      },
      validationRules: {
        title: [(v) => !!v || "ປ້ອມຂໍ້ມູນໃຫ້ຄົບ"],
      },
      colorOptions: [
        { color: "ແດງ", value: "Red" },
        { color: "ຟ້າ", value: "Blue" },
        { color: "ຂຽວ", value: "Green" },
        { color: "ດຳ", value: "Black" },
        { color: "ຂາວ", value: "White" },
        { color: "ບົວ", value: "Pink" },
        { color: "ມ່ວງ", value: "Purple" },
        { color: "ນ້ຳຕານ", value: "Brown" },
        { color: "ເຫລືອງ", value: "Yellow" },
        { color: "ສົ້ມ", value: "Orange" },
        { color: "ເທົາ", value: "Gray" },
        { color: "ຟ້າອ່ອນ", value: "Cyan" },
        { color: "ມາເຈນຕ້າ", value: "Magenta" },
        { color: "ສີໝາກນາວ", value: "Lime" },
        { color: "ສີຄວັນ", value: "Teal" },
        { color: "ຄາມ", value: "Indigo" },
        { color: "ສີມ່ວງອ່ອນ", value: "Violet" },
        { color: "ສີໝາກເດື່ອ", value: "Maroon" },
        { color: "ສີໝາກກອກ", value: "Olive" },
        { color: "ຟ້າເຂັ້ມ", value: "Navy" },
      ],
    };
  },
  computed: {
    getItem() {
      return this.$store.state.slide?.slideData
        ?.map((item, index) => ({
          ...item,
          index: index + 1,
        }))
        .sort((a, b) => b.index - a.index);
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("slide/selectAll");
    this.loading = false;
  },

  methods: {
    // delete session___________________________________________________________
    sendToDelete(id) {
      this.dialogDelete = true;
      this.deleteId = id;
    },
    async deleteItem() {
      this.loading = true;
      await this.$store.dispatch("slide/deleteItem", this.deleteId);
      this.dialogDelete = false;
      this.loading = false;
    },
    // update session___________________________________________________________
    sendToEdit(item) {
      this.dialogEdit = true;
      this.itemData.title = item?.title;
      this.itemData.backgroundColor = item?.backgroundColor;
      this.itemData.color = item?.color;
      this.itemData.status = item?.status;
      this.itemData.createDate = item?.createDate;
      this.itemData.updateDate = item?.updateDate;
      this.itemData.id = item?.id;
    },
    async EditItem() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      await this.$store.dispatch("slide/updateslide", this.itemData);
      this.loading = false;
      this.dialogEdit = false;
      this.resetItemData();
    },
    resetItemData() {
      this.itemData.id = null;
      this.itemData.title = null;
      this.itemData.status = "0";
      this.itemData.color = null;
      this.itemData.backgroundColor = null;
      this.itemData.createDate = null;
      this.itemData.updateDate = null;
      this.valid = false; // Reset the validation status if needed
    },

    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-swal-container {
  padding: 25px;
  margin: 25px;
}

.v-dialog__container {
  background-color: transparent;
}

.v-carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-btn.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  color: white;
  z-index: 2;
}

.v-card {
  overflow: hidden;
  border-radius: 0;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.5s;
}

.dialog-fade-enter, .dialog-fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.shadow {
  /* create text shadow here  */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
