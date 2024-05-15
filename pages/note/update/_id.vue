<template>
  <v-container>
    <v-app-bar fixed app elevation="0">
      <v-spacer />
      <v-btn elevation="0" color="teal" dark @click="updateNote">
        <v-icon>mdi-check</v-icon> ບັນທຶກ
      </v-btn>
      <v-btn elevation="0" class="ml-2" color="dark" outlined @click="cancel">
        <v-icon>mdi-close</v-icon>ຍົກເລິກ
      </v-btn>
    </v-app-bar>
    <v-card elevation="0" class="mt-16">
      <v-card-text>
        <v-text-field
          v-model="data.noteTitle"
          append-icon="mdi-format-title"
          label="ຫົວຂໍ້"
        />
        <vue-editor
          color="red"
          v-model="data.noteText"
          style="height: 60vh"
        ></vue-editor>
        <!-- {{ id }} -->
        <!-- <v-text-field
          v-model="data.title"
          placeholder="ຫົວຂໍ້"
          dense
        ></v-text-field>
        <v-textarea
          v-model="data.desc"
          placeholder="ເນື້ອໃນ"
          dense
          outlined
          counter="1200"
          rows="10"
        ></v-textarea> -->
      </v-card-text>
      <!-- <v-card-actions class="d-flex justify-end"> -->
      <!-- <v-btn color="error" @click="cancel"> ຍົກເລິກ</v-btn> -->
      <!-- <v-btn color="teal" dark @click="createNote">ບັນທຶກ</v-btn> -->
      <!-- </v-card-actions> -->
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CreatePqge",
  layout: "Black",
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.getOne();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    async getOne() {
      try {
        await this.$axios.get(`/note/${this.id}.json`).then((res) => {
          console.log(res.data);
          this.data = res.data;
          //   this.$router.back()
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateNote() {
      try {
        await this.$axios
          .put(`/note/${this.id}.json`, this.data)
          .then((res) => {
            //   console.log(res.data);
            // this.data = res.data
            this.$router.back();
          });
        // console.log(this.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
