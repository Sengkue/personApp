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
      >
        <v-card class="pt-5">
          <v-form ref="form" v-model="valid">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8" class="py-0">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyTypeData.image"
                      label="URL"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n3">
                    <managesMoneyTypeUpload @image-uploaded="emitImage" />
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyTypeData.type"
                      label="ຊື່ປະເພດໃຊ້ຈ່າຍ*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
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
                @click="updateItem()"
              >
                ແກ້ໄຂ
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
    moneyTypeData: {
      id: null,
      type: null,
      image: null,
      createDate: null,
    },
  }),
  computed: {},
  mounted() {
    this.moneyTypeData.id = this.item?.id;
    this.moneyTypeData.type = this.item?.type;
    this.moneyTypeData.image = this.item?.image;
    this.moneyTypeData.createDate = this.item?.createDate;
  },

  methods: {
    emitImage(e) {
      this.moneyTypeData.image = e; // Update the imageUrl when received from the child component
    },
    async updateItem() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      this.moneyTypeData.updateDate = new Date();
      await this.$store.dispatch(
        "moneyType/updatemoneyType",
        this.moneyTypeData
      );
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>
