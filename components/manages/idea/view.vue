<template>
  <div class="pa-0 ma-0">
    <v-tooltip top color="blue">
      <template #activator="{ on }">
        <v-btn color="blue" text icon @click="dialog = true" v-on="on">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
      ເບິ່ງລາຍລະອຽດ
    </v-tooltip>

    <v-dialog v-model="dialog" persistent max-width="600px" class="pa-5">
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span>ລາຍລະອຽດແນວຄວາມຄິດ</span>
          <v-btn color="blue darken-1" icon @click="dialog = false">
            <v-icon color="error">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-row class="pa-0 ma-0">
          <v-col cols="12" sm="4">
            <div>
              <v-img
                :src="`${
                  item?.image
                    ? item?.image
                    : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                }`"
                style="border-radius: 15px"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" sm="8">
            <v-row>
              <v-col cols="5">ຫົວຂໍ້:</v-col>
              <v-col cols="6">{{ item?.title }}</v-col>
              <v-col cols="5">ສະທານະ:</v-col>
              <v-col cols="6">
                <div v-if="item?.status === '0'" class="blue--text">
                  ກຳລັງດຳເນີນ
                </div>
                <div v-if="item?.status === '1'" class="green--text">
                  ສຳເລັດ
                </div>
                <div v-if="item?.status === '2'" class="red--text">
                  ລົ້ມເຫຼວ
                </div>
              </v-col>

              <v-col cols="5">ວັນເວລາ:</v-col>
              <v-col cols="6">{{ formatDateTime(item?.timestamp) }}</v-col>

              <v-col cols="5">ເວລາສ້າງ:</v-col>
              <v-col cols="6">{{ item?.createDate | DateToText }}</v-col>
              <v-col cols="5">ເວລາແກ້ໃຂ:</v-col>
              <v-col cols="6">{{ item?.updateDate | DateToText }}</v-col>
              <v-col cols="5">ລາຍລະອຽດ:</v-col>
              <v-col :cols="`${item?.description?.length > 25 ? 12 : 6}`">{{
                item?.description ? item?.description : "..."
              }}</v-col>
              <v-col cols="5">ບັນຫາ:</v-col>
              <v-col :cols="`${item?.note?.length > 25 ? 12 : 6}`">{{
                item?.note ? item?.note : "..."
              }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
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
  }),
  methods: {},
};
</script>
