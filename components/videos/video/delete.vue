<template>
  <div>
    <v-tooltip top color="red">
      <template #activator="{ on }">
        <v-btn small color="error" @click="dialog = true" v-on="on">
          <v-icon>mdi-delete-forever</v-icon> ລຶບ
        </v-btn>
      </template>
      ລຶບ
    </v-tooltip>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        persistent
        max-width="300px"
      >
        <v-card>
          <v-card-title
            class="d-flex justify-center"
            style="background-color: #ffc107; color: white; text-shadow: 1px 1px 2px black;"
            >ລຶບຂໍ້ມູນ</v-card-title
          >

          <v-card-text class="pa-2"> ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ບໍ? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red daren-1" text @click="dialog = false"
              >ຍົກເລີກ</v-btn
            >
            <v-btn
              color="blue darken-1"
              :loading="loading"
              text
              @click="deleteItem()"
              >ຢືນຢັນ</v-btn
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
      await this.$store.dispatch("videos/deleteItem", this.item);
      console.log("id", this.item)
      this.dialog = false;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
