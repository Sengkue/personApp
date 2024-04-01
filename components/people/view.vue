<template>
  <div>
    <v-tooltip top color="blue">
      <template #activator="{ on }">
        <v-btn color="blue" text icon @click="dialog = true" v-on="on">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
      ເບີ່ງລາຍລະອຽດ
    </v-tooltip>

    <v-dialog v-model="dialog" persistent max-width="600px" class="pa-5">
      <v-card>
        <v-card-title>
          <h3 class=" shadow">ເບີ່ງລາຍລະອຽດ</h3>
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
                lazy-src="https://media.tenor.com/vp3V50Hs-B8AAAAi/loading-waiting.gif"
                style="border-radius: 15px"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" sm="8">
            <v-row>
              <v-col cols="5">ຊື່:</v-col>
              <v-col cols="6">{{ item?.name }}</v-col>
              <v-col cols="5">ນາມສະກຸນ:</v-col>
              <v-col cols="6">{{ item?.surname }}</v-col>

              <v-col cols="5">ເບີໂທຫຼືວອດແອັບ:</v-col>
              <v-col cols="6">{{ item?.tel }}</v-col>

              <v-col cols="5">ລາຍລະອຽດ:</v-col>
              <v-col cols="6">{{ item?.detail }}</v-col>
              <v-col cols="5">ວັນທີສ້າງ:</v-col>
              <v-col cols="6">{{ item?.createDate | DateToText }}</v-col>
              <v-col cols="5">ວັນທີແກ້ໄຂ:</v-col>
              <v-col cols="6">{{ item?.updateDate | DateToText }}</v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">
            <v-icon small>mdi-close</v-icon>
            ປີດ
          </v-btn>
        </v-card-actions>
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
