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
        :fullscreen="$vuetify.breakpoint.xs ? true : false"
      >
        <v-card>
          <v-card-title>
            <span>ແຜນການແລະເປົ່າໝາຍ</span>
          </v-card-title>
          <v-form ref="form" v-model="valid">
            <v-card-text>
              <v-row>
                <v-col cols="8" class="py-0">
                  <v-text-field
                    clearable
                    outlined
                    dense
                    v-model="itemData.image"
                    label="URL"
                    required
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="mt-n3">
                  <moneyGetOutUpload @image-uploaded="emitImage" />
                </v-col>
                <v-col cols="12" class="py-0" sm="6">
                  <!-- :rules="titleRules" -->
                  <v-text-field
                    clearable
                    outlined
                    dense
                    v-model="itemData.title"
                    label="ຫົວຂໍ້*"
                    required
                    :rules="validationRules.title"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="py-0" sm="6">
                  <!-- Start Date -->
                  <v-text-field
                    type="datetime-local"
                    v-model="itemData.startDate"
                    label="ວັນທີເລີ່ມຕົ້ນ*"
                    clearable
                    required
                    dense
                    outlined
                  />
                </v-col>

                <v-col cols="12" class="py-0" sm="6">
                  <!-- End Date -->
                  <v-text-field
                    type="datetime-local"
                    v-model="itemData.endDate"
                    label="ວັນທີສິ້ນສຸດ*"
                    clearable
                    required
                    dense
                    outlined
                    hide-details
                  />
                </v-col>
                <v-col cols="12" class="py-0" sm="6">
                  <v-radio-group v-model="itemData.status" row>
                    <v-radio label="ກຳລັງດຳເນີນ" value="0"></v-radio>
                    <v-radio label="ສຳເລັດ" value="1"></v-radio>
                    <v-radio label="ລົ້ມເຫຼວ" value="2"></v-radio>
                  </v-radio-group>
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-textarea
                    clearable
                    outlined
                    dense
                    v-model="itemData.description"
                    label="ລາຍລະອຽດ*"
                    required
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-textarea
                    clearable
                    outlined
                    dense
                    v-model="itemData.problem"
                    label="ລາຍລະອຽດ*"
                    required
                    rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                ປິດ
              </v-btn>
              <v-btn
                color="blue darken-1"
                :loading="loading"
                text
                :disabled="!valid"
                @click="insert()"
              >
                ບັນທຶກ
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
    dialog: false,
    itemData: {
      title: null,
      description: null,
      problem: null,
      status: "0",
      startDate: null,
      endDate: null,
      image: null,
      createDate: null,
      updateDate: null,
    },
    validationRules: {
      title: [
        (v) => !!v || "title is required",
        (v) => (v && v.length <= 50) || "title must be less than 50 characters",
      ],
      description: [(v) => !!v || "Description is required"],
      address: [(v) => !!v || "Address is required"],
      timestamp: [(v) => !!v || "Timestamp is required"],
      // Add rules for other fields as needed
    },
  }),
  computed: {},
  watch: {
    item: {
      handler(newItem) {
        this.itemData.id = newItem?.id;
        this.itemData.title = newItem?.title;
        this.itemData.description = newItem?.description;
        this.itemData.problem = newItem?.problem;
        this.itemData.startDate = newItem?.startDate;
        this.itemData.endDate = newItem?.endDate;
        this.itemData.status = newItem?.status;
        this.itemData.image = newItem?.image;
        this.itemData.createDate = newItem?.createDate;
      },
      immediate: true, // This ensures that the handler is called immediately on component creation
    },
  },
  methods: {
    openDialog() {
      this.itemData.startDate = this.$moment().format('YYYY-MM-DDTHH:mm:ss');;
      this.dialog = true;
    },

    emitImage(e) {
      this.itemData.image = e; // Update the imageUrl when received from the child component
    },
    async insert() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      (this.itemData.updateDate = new Date()),
        await this.$store.dispatch("planGold/updateplanGold", this.itemData);
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>

<style>
.shadow {
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  padding: 5px;
  box-shadow: 2px 2px 4px #999;
}
</style>
