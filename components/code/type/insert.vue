<template>
  <div>
    <v-btn class="mt-1" color="teal" dark @click="openDialog()"
      ><v-icon>mdi-plus-box</v-icon>ເພີ່ມໃໝ່</v-btn
    >
    <v-row justify="center">
      <v-dialog v-model="dialog" transition="dialog-top-transition" persistent max-width="600px">
        <v-card>
          <v-form ref="form" v-model="valid">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8" class="py-0">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="videosData.image"
                      label="URL"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n3">
                    <videosTypeUpload @image-uploaded="emitImage" />
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <!-- :rules="typeRules" -->
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="videosData.type"
                      label="ປອ້ມປະເພດ*"
                      required
                      :rules="validationRules.type"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="dialog = false"> ປິດ </v-btn>
              <v-btn color="primary" :loading="loading" @click="insert()"> ບັນທຶກ </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    dialog: false,
    videosData: {
      type: null,
      image: null,
      createDate: null,
      updateDate: null,
    },
    validationRules: {
      type: [
        (v) => !!v || "ປອ້ມປະເພດໃຊ້ຈ່າຍ",
        (v) => (v && v.length <= 50) || "ປະເພດຕ້ອງມີໜ້ອຍກວ່າ 50 ຕົວອັກສອນ",
      ],
    },
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },

    emitImage(e) {
      this.videosData.image = e; // Update the imageUrl when received from the child component
    },
    async insert() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      (this.videosData.createDate = new Date()),
        (this.videosData.updateDate = new Date()),
        await this.$store.dispatch(
          "code/type/addcodingType",
          this.videosData
        );

      this.loading = false;
      this.dialog = false;
      this.videosData = {
        type: "",
        image: "",
        createDate: "",
        updateDate: "",
      };
    },
  },
};
</script>
