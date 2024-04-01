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
          <v-form ref="form" v-model="valid">
            <v-card-title>
              <span class="shadow">ແກ້ໄຂຂໍ້ມູນລາຍຮັບ</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8" class="py-0">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyInComeData.image"
                      label="URL"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n3">
                    <moneyInComeUpload @image-uploaded="emitImage" />
                  </v-col>
                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyInComeData.money"
                      label="ຈຳນວນເງິນ*"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="py-0" sm="6">
                    <v-text-field
                      clearable
                      outlined
                      dense
                      v-model="moneyInComeData.whoseMoney"
                      label="ເງິນໃຜ*"
                      required
                    ></v-text-field>
                  </v-col>
               
                  <v-col cols="12" class="py-0" sm="6">
                    <input
                      type="datetime-local"
                      v-model="moneyInComeData.timestamp"
                      label="ເວລາຮັບ*"
                      required
                      style="
                        padding: 6px;
                        width: 100%;
                        border: 1px solid #7f7e7e;
                        border-radius: 5px;
                      "
                    />
                  </v-col>
                  <v-col cols="12" class="pt-5">
                    <v-textarea
                      clearable
                      outlined
                      dense
                      v-model="moneyInComeData.description"
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
                ບັນທືກແກ້ໄຂ
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
    moneyInComeData: {
      id: null,
      money: null,
      whoseMoney: null,
      description: null,
      timestamp: null,
      image: null,
      createDate: null,
      updateDate: null,
    },
  }),
  computed: {},
  mounted() {
    this.moneyInComeData.id = this.item?.id;
    this.moneyInComeData.money = this.item?.money;
    this.moneyInComeData.whoseMoney = this.item?.whoseMoney;
    this.moneyInComeData.description = this.item?.description;
    this.moneyInComeData.timestamp = this.item?.timestamp;
    this.moneyInComeData.image = this.item?.image;
    this.moneyInComeData.createDate = this.item?.createDate;
  },

  methods: {
    emitImage(e) {
      this.moneyInComeData.image = e; // Update the imageUrl when received from the child component
    },
    async updateItem() {
      this.$refs.form.validate();
      if (!this.valid) return;
      this.loading = true;
      this.moneyInComeData.updateDate = new Date();
      await this.$store.dispatch(
        "moneyInCome/updatemoneyInCome",
        this.moneyInComeData
      );
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
