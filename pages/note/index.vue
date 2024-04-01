<template>
  <v-container>
    <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
      <v-btn class="pa-0 ma-0" icon @click="$router.push('/')">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="ml-n10">ບັນທຶກປະຈຳວັນ</v-toolbar-title>
      <v-spacer />
      <div></div>
    </v-app-bar>
    <!-- __________________app bar for desktop________________ -->
    <LayoutsNavbar v-else />
    <v-row v-if="results.length <= 0">
      <v-col cols="12">
        <v-card class="mx-auto text-center" height="300" elevation="0">
          <div style="padding-top: 150px">
            <v-progress-linear
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="6"
              class="px-5"
            ></v-progress-linear
            ><br />
            <h4>ຍັງບໍ່ມີຂໍ້ມູນ</h4>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="data in results" :key="data.id" cols="12">
        <v-hover #default="{ hover }">
          <v-card
            class="py-1 pl-3 mb-n5 note-card"
            :elevation="hover ? '9' : '3'"
            @click.stop="goView(data)"
          >
            <div width="100%">
              <div class="d-flex justify-space-between align-center">
                <div
                  class="text-truncate"
                  v-html="
                    `${
                      data?.noteTitle?.length > 12
                        ? data?.noteTitle?.slice(0, 12) + '...'
                        : data?.noteTitle
                    }`
                  "
                ></div>
                <v-menu left>
                  <template #activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item class="px-2 ma-0">
                      <v-tooltip top color="error">
                        <template #activator="{ on }">
                          <v-btn
                            icon
                            v-on="on"
                            @click.stop="deleteNote(data?.id)"
                          >
                            <v-icon color="error"
                              >mdi-delete-forever-outline</v-icon
                            >
                          </v-btn>
                        </template>
                        Delete
                      </v-tooltip>
                      <v-tooltip top color="green">
                        <template #activator="{ on }">
                          <v-btn
                            icon
                            v-on="on"
                            @click.stop="updateNote(data?.id)"
                          >
                            <v-icon color="green"
                              >mdi-square-edit-outline</v-icon
                            >
                          </v-btn>
                        </template>
                        Edit
                      </v-tooltip>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
            <div class="d-flex justify-space-between align-center pr-4">
              <p class="pt-4 text-truncate">{{ data?.date }}</p>
              <p class="pt-4 text-truncate">{{ data?.date | DateToText }}</p>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-btn
      color="teal"
      fab
      large
      dark
      bottom
      right
      absolute
      fixed
      class="mb-16"
      to="/note/create"
    >
      <v-icon>mdi-square-edit-outline</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="teal" elevation="0" default>
          <v-toolbar-title>ບັນທຶກຂໍ້ມູນ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn icon dark @click="updateNote(noteDetail.id)">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn> -->
            <v-btn icon color="white" @click.stop="deleteNote(noteDetail.id)">
              <v-icon>mdi-delete-forever</v-icon>
            </v-btn>
            <v-btn icon color="dark" @click.stop="updateNote(noteDetail.id)">
              <v-icon>mdi-note-edit</v-icon>
            </v-btn>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <div class="pa-4">
          <h2
            v-html="noteDetail?.noteTitle"
            style="font-weight: bold; color: #d8d8d8"
          ></h2>
        </div>
        <div class="px-4 mt-n5 d-flex">
          <p
            v-html="noteDetail?.date"
            style="font-size: 10px; font-weight: bold"
          ></p>
          |
          <p style="font-size: 10px; font-weight: bold">
            {{ noteDetail?.date | DateToText }}
          </p>
        </div>
        <div class="pa-2">
          <p v-html="noteDetail?.noteText" style="font-weight: normal"></p>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  layout: "report",
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      direction: "left",
      results: [],
      hoverIndex: 2,
      noteDetail: {},
    };
  },
  mounted() {
    this.getAllNote();
  },
  methods: {
    async getAllNote() {
      await this.$axios.get("/note.json").then((res) => {
        console.log(res.data);
        const fetchedData = res.data;
        const ArrData = [];
        for (let key in fetchedData) {
          ArrData.push({ id: key, ...fetchedData[key] });
        }
        this.results = ArrData;
      });
    },
    async deleteNote(id) {
      try {
        await this.$axios.delete(`/note/${id}.json`).then((res) => {
          this.getAllNote();
          this.dialog = false;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateNote(id) {
      try {
        this.$router.push(`/note/update/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    async goView(data) {
      try {
        this.dialog = true;
        console.log(data);
        this.noteDetail = data;
        // this.$router.push(`/note/view/${id}`)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.note-card {
  background-color: #f4e888;
  color: #c65a53;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  overflow: hidden;
}

.note-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 50%, #ffffff80 50%);
  z-index: -1;
  transform-origin: bottom right;
  transform: rotate(-6deg);
}
</style>
