<template>
  <div>
    <v-btn class="mt-1" color="teal" dark @click="openDialog()"
      ><v-icon>mdi-plus-box</v-icon>ເພີ່ມໃໝ່</v-btn
    >
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        transition="dialog-top-transition"
        max-width="600px"
        :fullscreen="$vuetify.breakpoint.xs ? true : false"
      >
        <v-card>
          <v-form ref="form" v-model="valid">
            <v-card-title>
              <span class="shadow">ບັນທຶກຂໍ້ມູນການໃຊ້ຈ່າຍ</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8" class="py-0">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyOutComeData.image"
                      label="URL"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n3">
                    <moneyOutComeUpload @image-uploaded="emitImage" />
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <!-- :rules="nameRules" -->
                    <!-- <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyOutComeData.name"
                      label="ໃຊ້ກັບ*"
                      required
                      :rules="validationRules.name"
                    ></v-text-field> -->
                    <ManagesMoneyTypeSelect
                      ref="resetTypeSelect"
                      @typeValue="emitType"
                    />
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <!-- :rules="surnameRules" -->
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyOutComeData.money"
                      label="ຈຳນວນເງິນ*"
                      :rules="validationRules.money"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <PeopleSelectPeople ref="resetPeopleSelect" @peopleValue="emitPeople" />
                    <!-- <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyOutComeData.whoseMoney"
                      label="ເງິນໃຜ*"
                      required
                      :rules="validationRules.whoseMoney"
                    ></v-text-field> -->
                  </v-col>
                  <!-- <v-col cols="12" sm="6" class="py-0">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyOutComeData.address"
                      label="ສະຖານທີ່*"
                      required
                      :rules="validationRules.address"
                    >
                    </v-text-field>
                  </v-col> -->

                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
                      type="datetime-local"
                      v-model="moneyOutComeData.timestamp"
                      label="ເວລາໃໍຊ້*"
                      clearable
                      required
                      dense
                      outlined
                      :rules="validationRules.timestamp"
                    />
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-textarea
                      clearable
                      outlined
                      dense
                      v-model="moneyOutComeData.description"
                      label="ລາຍລະອຽດ*"
                      required
                    ></v-textarea>
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
  data: () => ({
    valid: false,
    loading: false,
    dialog: false,
    moneyOutComeData: {
      typeId: null,
      name: null,
      money: null,
      whoseMoney: null,
      whoseId: null,
      description: null,
      address: null,
      categoryId: null,
      timestamp: null,
      image: null,
      timestamp: null,
      createDate: null,
      updateDate: null,
    },
    validationRules: {
      name: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
      money: [
        (v) =>
          v === null ||
          v === undefined ||
          v === "" ||
          /^\d+(\.\d{1,2})?$/.test(v) ||
          "Invalid money format",
      ],
      whoseMoney: [(v) => !!v || "Whose money is required"],
      description: [(v) => !!v || "Description is required"],
      address: [(v) => !!v || "Address is required"],
      timestamp: [(v) => !!v || "Timestamp is required"],
      // Add rules for other fields as needed
    },
  }),
  computed: {},
  mounted() {},
  methods: {
    openDialog() {
      this.moneyOutComeData.timestamp = this.$moment().format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      this.dialog = true;
    },

    emitImage(e) {
      this.moneyOutComeData.image = e;
    },
    emitType(e) {
      this.moneyOutComeData.typeId = e.id;
      this.moneyOutComeData.name = e.type;
    },
    emitPeople(e) {
      this.moneyOutComeData.whoseId = e.id;
      this.moneyOutComeData.whoseMoney = e.name;
    },
    async insert() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      (this.moneyOutComeData.createDate = new Date()),
        (this.moneyOutComeData.updateDate = new Date()),
        await this.$store.dispatch(
          "moneyOutCome/addmoneyOutCome",
          this.moneyOutComeData
        );

      this.resetFormMoneyTypeSelect();
      this.resetFormPeopleSelect();

      this.loading = false;
      this.dialog = false;

      this.moneyOutComeData = {
        name: null,
        money: null,
        whoseMoney: null,
        description: null,
        timestamp: null,
        address: null,
        categoryId: null,
        image: null,
        createDate: null,
        updateDate: null,
      };
    },
    resetFormMoneyTypeSelect() {
      this.$refs.resetTypeSelect.resetForm();
    },
    resetFormPeopleSelect() {
      this.$refs.resetPeopleSelect.resetForm();
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
