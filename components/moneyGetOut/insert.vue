<template>
  <div>
    <v-btn class="mt-1" color="teal" dark @click="openDialog()"
      ><v-icon>mdi-plus-box</v-icon>ເພີ່ມໃໝ່</v-btn
    >
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
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
                      v-model="moneyGetOutData.image"
                      label="URL"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n3">
                    <moneyGetOutUpload @image-uploaded="emitImage" />
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <!-- :rules="nameRules" -->
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyGetOutData.name"
                      label="ໃຊ້ກັບ*"
                      required
                      :rules="validationRules.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <!-- :rules="surnameRules" -->
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyGetOutData.money"
                      label="ຈຳນວນເງິນ*"
                      :rules="validationRules.money"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6"
                    > <PeopleSelectPeople @peopleValue="emitPeople"/>
                  </v-col>

                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
                      type="datetime-local"
                      v-model="moneyGetOutData.timestamp"
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
                      v-model="moneyGetOutData.description"
                      label="ລາຍລະອຽດ*"
                      required
                      :rules="validationRules.description"
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
    moneyGetOutData: {
      name: null,
      money: null,
      whoseMoney: null,
      description: null,
      status: "0",
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
      this.moneyGetOutData.timestamp = this.timeNow;
      this.dialog = true;
    },

    emitImage(e) {
      this.moneyGetOutData.image = e; // Update the imageUrl when received from the child component
    },
    emitPeople(e){
      this.moneyGetOutData.whoseId = e.id;
      this.moneyGetOutData.whoseMoney = e.name;
    },
    async insert() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      (this.moneyGetOutData.createDate = new Date()),
        (this.moneyGetOutData.updateDate = new Date()),
        await this.$store.dispatch(
          "moneyGetOut/addmoneyGetOut",
          this.moneyGetOutData
        );

      this.loading = false;
      this.dialog = false;
      this.moneyGetOutData = {
        name: null,
        money: null,
        whoseMoney: null,
        description: null,
        timestamp: null,
        image: null,
        timestamp: null,
        createDate: null,
        updateDate: null,
      };
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
