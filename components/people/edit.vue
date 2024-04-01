<template>
  <div>
    <v-tooltip top color="green">
      <template #activator="{ on }">
        <v-btn
          class="mx-n3"
          icon
          text
          color="green"
          @click="dialog = true"
          v-on="on"
        >
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
      </template>
      Edit
    </v-tooltip>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        style="z-index: 7"
        :fullscreen="$vuetify.breakpoint.xs ? true : false"
      >
        <v-card>
          <v-form ref="form" v-model="valid">
            <v-card-title>
              <h3 class=" shadow">ສ້າງໃໝ່</h3>
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
                      clearable
                      outlined
                      dense
                      v-model="peopleData.surname"
                      label="ນາມສະກຸນ*"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
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
                      clearable
                      outlined
                      dense
                      v-model="peopleData.tel"
                      label="ເບີ*"
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
              <v-btn color="red darken-1" text @click="dialog = false">
                ປິດ
              </v-btn>
              <v-btn
                color="blue darken-1"
                :loading="loading"
                text
                :disabled="!valid"
                @click="updateItem()"
              >
                ບັນທືກແກ້ໃຂ
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    item: [],
  },
  data: () => ({
    valid: false,
    loading: false,
    dialog: "",
    nameRules: [
      (v) => !!v || "ກະລຸນາປ້ອມຊື່",
      (v) => (v && v.length <= 50) || "ຊື່ຄວາມຕ້ອງໜ້ອຍ 50 ໂຕອັກສອນ",
    ],
    // surnameRules: [
    //   (v) => !!v || "ກະລຸນາປ້ອມນາມສະກຸນ",
    //   (v) => (v && v.length <= 50) || "ນາມສະກຸນຕ້ອງໜ້ອຍ 50 ໂຕອັກສອນ",
    // ],
    statusRules: [
      (v) => !!v || "ກະລຸນາປ້ອມສະຖານະ",
      (v) => (v && v.length <= 100) || "ສະຖານະຕ້ອງໜ້ອຍ 100 ໂຕອັກສອນ",
    ],
    // telephoneRules: [
    //   (v) => !!v || "ກະລຸນາປ້ອມເບີໂທລະສັບ",
    //   (v) => /^\d+$/.test(v) || "ເບີໂທລະສັບຕ້ອງມີຕົວເລກເລີຍ",
    //   (v) => (v && v.length <= 15) || "ເບີໂທລະສັບຕ້ອງໜ້ອຍ 15 ໂຕອັກສອນ",
    // ],
    peopleData: {
      id: null,
      name: null,
      surname: null,
      status: null,
      tel: null,
      detail: null,
      image: null,
      createDate: null,
      updateDate: null,
    },
  }),
  computed: {},
  mounted() {
    this.peopleData.id = this.item.id;
    this.peopleData.name = this.item.name;
    this.peopleData.surname = this.item.surname;
    this.peopleData.status = this.item.status;
    this.peopleData.tel = this.item.tel;
    this.peopleData.detail = this.item.detail;
    this.peopleData.image = this.item.image;
    this.peopleData.createDate = this.item.createDate;
  },

  methods: {
    emitImage(e) {
      this.peopleData.image = e; // Update the imageUrl when received from the child component
    },
    async updateItem() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      this.peopleData.updateDate = new Date();
      await this.$store.dispatch("people/updatePeople", this.peopleData);
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>

<style>
.loading-graphic {
  width: 100%;
  height: 30px;
  background-color: #ddd;
}

.loading-bar {
  height: 100%;
  background-color: #0078d4;
  text-align: right;
  transition: width 0.3s;
}

.loading-number {
  display: inline-block;
  padding: 5px;
  font-size: 12px;
  color: #fff;
}
.shadow {
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  padding: 5px;
  box-shadow: 2px 2px 4px #999;
}
</style>
