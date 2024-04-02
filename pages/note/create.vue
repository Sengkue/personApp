<template>
  <v-container>
    <v-app-bar fixed app elevation="0">
      <v-spacer />
      <v-btn elevation="0" color="teal" dark @click="createNote">
        <v-icon>mdi-check</v-icon> ບັນທຶກ
      </v-btn>
      <v-btn elevation="0" class="ml-2" color="dark" outlined @click="cancel">
        <v-icon>mdi-close</v-icon>ຍົກເລິກ
      </v-btn>
    </v-app-bar>
    <v-row class="mt-16" no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="data.noteTitle"
          append-icon="mdi-format-title"
          label="ຫົວຂໍ້"
        />
      </v-col>
      <v-col cols="12">
        <!-- <vue-editor name="content" v-model="data.noteText" v-validate="required" /></b-col> -->
        <vue-editor
          color="teal"
          v-model="data.noteText"
          style="height: 60vh"
        ></vue-editor>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CreatePqge",
  layout: "report",
  data() {
    return {
      data: {
        noteTitle: "",
        noteText: "",
      },
    };
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    async createNote() {
      try {
        this.data.date =this.$moment().format(
        "YYYY-MM-DDTHH:mm:ss"
      );
        await this.$axios.post("/note.json", this.data).then((res) => {
          this.$router.back();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
