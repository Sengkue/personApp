<template>
  <div>
    <v-btn class="mt-1" color="teal" dark @click="openDialog()">
      <v-icon>mdi-plus-box</v-icon>ເພີ່ມໃໝ່
    </v-btn>
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
                              background: item.value,
                            }"
                          ></div>
                          <span class="ml-2">{{ item.color }}</span>
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
                              background: item.value,
                            }"
                          ></div>
                          <span class="ml-2">{{ item.color }}</span>
                        </v-col>
                      </v-row>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12">
                  {{ itemData.color }}
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
              <v-btn color="blue darken-1" text @click="dialog = false">
                ປິດ
              </v-btn>
              <v-btn
                color="blue darken-1"
                :loading="loading"
                text
                :disabled="!valid"
                @click="insert"
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
  }),
  methods: {
    openDialog() {
      this.itemData.timestamp = this.$moment().format('YYYY-MM-DDTHH:mm:ss');;
      this.dialog = true;
    },
    async insert() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      (this.itemData.createDate = new Date()),
        (this.itemData.updateDate = new Date()),
        await this.$store.dispatch("slide/addslide", this.itemData);

      this.loading = false;
      this.dialog = false;
      this.resetItemData();
    },
    resetItemData() {
      this.itemData.title = null;
      this.itemData.status = "0";
      this.itemData.color = null;
      this.itemData.backgroundColor = null;
      this.itemData.createDate = null;
      this.itemData.updateDate = null;
      this.valid = false;
    },
  },
};
</script>

<style>
.shadow {
  /* create text shadow here  */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
