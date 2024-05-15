<template>
  <div>
    <v-tooltip top color="green">
      <template #activator="{ on }">
        <v-btn color="warning" small @click="dialog = true" v-on="on">
          <v-icon>mdi-square-edit-outline</v-icon>ແກ້ໄຂ
        </v-btn>
      </template>
      ແກ້ໄຂ
    </v-tooltip>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        transition="dialog-top-transition"
        max-width="600px"
        :fullscreen="$vuetify.breakpoint.xs ? true : false"
      >
        <v-card class="pa-0 ma-0">
          <v-form ref="form" v-model="valid">
            <v-card-title
              class="d-flex justify-center mb-2"
              style="
                background-color: #ffc107;
                color: white;
                text-shadow: 1px 1px 2px black;
              "
            >
              ແກ້ໄຂ
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    clearable
                    outlined
                    dense
                    v-model="dataItem.title"
                    label="URL"
                    required
                    hide-details="auto"
                    append-icon="mdi-content-paste"
                    @click:append="pasteLink"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <CodeTypeSelect
                    :taskType="dataItem.type"
                    ref="resetTypeSelect"
                    @typeValue="emitType"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="datetime-local"
                    v-model="dataItem.timestamp"
                    label="ເວລາ*"
                    clearable
                    required
                    dense
                    outlined
                    :rules="validationRules.timestamp"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <vue-editor
                    v-model="dataItem.description"
                    placeholder="ໃສ່ຄຳອະທິບາຍ..."
                    label="ຄຳອະທິບາຍ"
                  />
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
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    valid: false,
    loading: false,
    dialog: false,
    dataItem: {
      typeId: null,
      title: null,
      type: null,
      description: null,
      timestamp: null,
      createDate: null,
      updateDate: null,
    },
    validationRules: {
      timestamp: [(v) => !!v || "Timestamp is required"],
    },
  }),
  watch: {
    item: {
      handler(newVal) {
        Object.assign(this.dataItem, { ...newVal });
      },
      immediate: true,
    },
  },
  methods: {
    pasteLink() {
      navigator.clipboard.readText().then((text) => {
        this.dataItem.title = text;
      });
    },
    emitType(e) {
      this.dataItem.type = e.type;
      this.dataItem.typeId = e.id;
    },
    openDialog() {
      this.dataItem.timestamp = this.$moment().format("YYYY-MM-DDTHH:mm:ss");
      this.dialog = true;
    },
    async insert() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      (this.dataItem.createDate = new Date()),
        (this.dataItem.updateDate = new Date()),
        await this.$store.dispatch("code/updatecoding", this.dataItem);
      this.loading = false;
      this.dialog = false;
      this.resetFormTypeSelect();
      this.dataItem = {
        typeId: null,
        title: null,
        description: null,
        timestamp: null,
        createDate: null,
        updateDate: null,
      };
    },
    resetFormTypeSelect() {
      this.$refs.resetTypeSelect.resetForm();
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
