<template>
  <v-container style="max-width: 500px">
    <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
      <v-btn class="pa-0 ma-0" icon @click="$router.go(-1)">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="ml-n10">ສິ່ງຕ້ອງເຮັດ</v-toolbar-title>
      <v-spacer />
      <div></div>
    </v-app-bar>
     <!-- __________________app bar for desktop________________ -->
     <LayoutsNavbar v-else />
    <v-text-field
      v-model="toDoList.task"
      label="ເຈົ້າຈະເຮັດຫຍັງ?"
      solo
      @keydown.enter="create"
    >
      <template v-slot:append>
        <v-fade-transition>
          <v-icon v-if="toDoList?.task" @click="create">
            mdi-plus-circle
          </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>

    <h2 class="success--text pl-4">
      ທັງຫມົດ:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks?.length}`">
          {{ tasks?.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">
        ຍັງເຫຼືອ: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        ສຳເລັດແລ້ວ: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks?.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <template v-for="(item, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item :key="`${i}-${item?.task}`">
            <v-list-item-action>
              <v-checkbox
                :input-value="item.done"
                :color="(item?.done && 'grey') || 'primary'"
                @change="updateTaskStatus(item)"
              >
                <template #label>
                  <div
                    :class="
                      (item.done &&
                        'grey--text text-decoration-line-through') ||
                      'primary--text'
                    "
                    class="ml-4"
                  >
                    {{ item?.task }}
                  </div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="item.done" color="success"> mdi-check </v-icon>
            </v-scroll-x-transition>
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
                      <v-btn icon @click="sendToDelete(item?.id)" v-on="on">
                        <v-icon color="error">mdi-delete-forever-outline</v-icon>
                      </v-btn>
                    </template>
                    Delete
                  </v-tooltip>
                  <v-tooltip top color="green">
                    <template #activator="{ on }">
                      <v-btn icon @click="sendToUpdate(item)" v-on="on">
                        <v-icon color="green">mdi-square-edit-outline</v-icon>
                      </v-btn>
                    </template>
                    Edit
                  </v-tooltip>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
    <!-- _____________edit dialog________________ -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="pt-5">
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" class="py-1" sm="6">
                  <v-text-field
                    clearable
                    outlined
                    dense
                    v-model="updateTask.task"
                    label="ຊື່ປະເພດໃຊ້ຈ່າຍ*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1 d-flex justify-end">
                  
                  <v-btn color="red darken-1" text @click="dialog = false">
                    ປິດ
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :loading="loading"
                    text
                    @click="updatTask()"
                  >
                    ແກ້ໄຂ
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- _____________delete dialog________________ -->
    <v-row justify="center">
      <v-dialog v-model="dialogDelete" persistent max-width="600px">
        <v-card class="pt-5">
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" class="py-1" sm="6">
                  <v-card-title> ເຈົ້າແນ່ໃຈລົດລາຍນີ້ແລ້ວແມ່ນບໍ່? </v-card-title>
                </v-col>
                <v-col cols="12" class="py-1 d-flex justify-end">
                  <v-btn color="red darken-1" text @click="dialogDelete = false">
                    ປິດ
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :loading="loading"
                    text
                    @click="deleteTask()"
                  >
                    ແມ່ນ
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "report",
  data: () => ({
    loading: false,
    dialog: false,
    dialogDelete: false,
    toDoList: {
      task: null,
      done: false,
      planId: null,
    },
    updateTask: {
      task: null,
      done: false,
      planId: null,
    },
  }),

  computed: {
    tasks() {
      return this.$store.state.toDo.toDoData?.filter(
        (item) => item.planId === this.$route.params?.id
      );
    },
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },
  mounted() {
    this.$store.dispatch("toDo/selectAll");
  },

  methods: {
    isChecked(item) {
      return item.done;
    },
    // ________________________________create task____________________________
    create() {
      if (!this.toDoList.task) {
        this.$toast.error("ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ!");
        return;
      }
      this.toDoList.planId = this.$route.params?.id;
      this.$store.dispatch("toDo/addtoDo", this.toDoList);
      this.toDoList.task = null;
    },
    // ____________________________ update status __________________________
    async updateTaskStatus(item) {
      await this.$store.dispatch("toDo/updatetoDo", item);
      // this.$toast.success("ເຮັດໄດ້ດີຫຼາຍ");
    },
    // _____________________update task____________________
    sendToUpdate(item) {
      this.dialog = true;
      this.updateTask.task = item.task;
      this.updateTask.planId = item.planId;
      this.updateTask.done = item.done;
      this.updateTask.id = item.id;
    },
    async updatTask() {
      this.loading = true;
      await this.$store.dispatch("toDo/updateTask", this.updateTask);
      this.loading = false;
      this.dialog = false;
    },
    // _________________________________delete task____________________________
    sendToDelete(id) {
      this.dialogDelete = true;
      this.updateTask.id = id;
    },
    async deleteTask() {
      this.loading = true;
      await this.$store.dispatch("toDo/deleteItem", this.updateTask.id);
      this.loading = false;
      this.dialogDelete = false;
    },
  },
};
</script>
