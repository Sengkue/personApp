<template>
  <div>
    <v-tooltip top color="red">
      <template #activator="{ on }">
        <v-btn icon text color="red" @click="dialog = true" v-on="on">
          <v-icon>mdi-delete-forever</v-icon>
        </v-btn>
      </template>
      ລືບ
    </v-tooltip>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">ລືບຂໍ້ມູນ</span>
          </v-card-title>

          <v-card-text> ທ່ານຕ້ອງການລືບຂໍ້ມູນີ້ບໍ? </v-card-text>
          <v-card-actions>
            <v-btn color="red daren-1" text @click="dialog = false"
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
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StoreMoneyDelete",
  props: {
    item: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      dialog: false,
    };
  },

  mounted() {},

  methods: {
    async deleteItem() {
      this.loading = true;
      await this.$store.dispatch("planGold/deleteItem", this.item);
      this.dialog = false;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
