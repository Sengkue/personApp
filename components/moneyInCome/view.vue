<template>
  <div>
    <v-tooltip top color="blue">
      <template #activator="{ on }">
        <v-btn color="blue" text icon @click="dialog = true" v-on="on">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
      View
    </v-tooltip>

    <v-dialog v-model="dialog" persistent max-width="600px" class="pa-5">
      <v-card>
        <v-card-title>
          <span class="shadow">ລາຍລະອຽດຂອງການໃຊ້ຈ່າຍ</span>
        </v-card-title>
        <v-row class="pa-0 ma-0">
          <v-col cols="12" sm="4">
            <div>
              <v-img
                :src="`${
                  item.image
                    ? item.image
                    : 'https://media0.giphy.com/media/ZXkraFrlIW1D25M6ZJ/giphy.gif?cid=ecf05e47pm0kx6y0au52i7n7izc0faihyvmz80t1kotwmd8x&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                }`"
                style="border-radius: 15px"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" sm="8">
            <v-row>
              <v-col cols="5">ຈຳນວນເງິນ:</v-col>
              <v-col cols="6">{{ formatPrice(item.money) }} ກີບ</v-col>

              <v-col cols="5">ຮັບຈາກ:</v-col>
              <v-col cols="6">{{ item.whoseMoney }}</v-col>
              <v-col cols="5">ເວລາຮັບ:</v-col>
              <v-col cols="6">{{ formatDateTime(item?.timestamp) }}</v-col>

              <v-col cols="5">ເວລາສ້າງ:</v-col>
              <v-col cols="6">{{ item.createDate | DateToText }}</v-col>
              <v-col cols="5">ເວລາແກ້ໃຂ:</v-col>
              <v-col cols="6">{{ item.updateDate | DateToText }}</v-col>
       
              <v-col cols="5">ລາຍລະອຽດ:</v-col>
              <v-col :cols="`${item.description.length > 25 ? 12 : 6}`">{{
                item.description? item.description : "ບໍ່ມີຂໍ້ມູນ"
              }}</v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
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
