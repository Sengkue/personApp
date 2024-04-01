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
      ແກ້ໄຂ
    </v-tooltip>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px" :fullscreen="$vuetify.breakpoint.xs ? true : false">
        <v-card>
          <v-form ref="form" v-model="valid">
            <v-card-title>
              <span class="shadow">ແກ້ໄຂຂໍ້ມູນເງິນຢືມໄປ</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8" class="py-0">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyGetInData.image"
                      label="URL"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n3">
                    <moneyGetInUpload @image-uploaded="emitImage" />
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyGetInData.name"
                      label="ໃຊ້ຈ່າຍກັບ*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyGetInData.money"
                      label="ຈຳນວນເງິນ*"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12"  sm="6">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyGetInData.whoseMoney"
                      label="ເງິນໃຜ*"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"  sm="6">
                    <v-text-field
                      type="datetime-local"
                      v-model="moneyGetInData.timestamp"
                      label="ເວລາໃໍຊ້*"
                      clearable
                      required
                      dense
                      outlined
                      hide-details="auto"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-radio-group v-model="moneyGetInData.status">
                      <v-radio label="ຄືນແລ້ວ" value="1"></v-radio>
                      <v-radio label="ຍັງບໍ່ໄດ້ຄືນ" value="0"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-textarea
                      clearable
                      outlined
                      dense
                      v-model="moneyGetInData.description"
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
    moneyGetInData: {
      id: null,
      name: null,
      money: null,
      whoseMoney: null,
      description: null,
      timestamp: null,
      status: null,
      image: null,
      createDate: null,
      updateDate: null,
    },
  }),
  computed: {},
  mounted() {
    this.moneyGetInData.id = this.item.id;
    this.moneyGetInData.name = this.item.name;
    this.moneyGetInData.money = this.item.money;
    this.moneyGetInData.whoseMoney = this.item.whoseMoney;
    this.moneyGetInData.description = this.item.description;
    this.moneyGetInData.status = this.item.status;
    this.moneyGetInData.timestamp = this.item.timestamp;
    this.moneyGetInData.image = this.item.image;
    this.moneyGetInData.createDate = this.item.createDate;
  },

  methods: {
    emitImage(e) {
      this.moneyGetInData.image = e; // Update the imageUrl when received from the child component
    },
    async updateItem() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      this.moneyGetInData.updateDate = new Date();
      await this.$store.dispatch(
        "moneyGetIn/updatemoneyGetIn",
        this.moneyGetInData
      );
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
