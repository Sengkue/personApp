<template>
  <div class="pa-0 ma-0">
    <v-expansion-panels v-model="activePanel" accordion class="pa-0 ma-0">
      <v-expansion-panel v-for="(panel, index) in panels" :key="index">
        <v-expansion-panel-header
          class="pa-1"
          style="box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.12)"
        >
          <div class="d-flex justify-space-between align-center px-0 pb-0">
            <div>{{ panel.title }}</div>
            <div></div>
            <v-avatar v-if="panel?.iconImg">
              <v-img
                alt="icon"
                :src="panel?.iconImg"
                lazy-src="https://media.tenor.com/vp3V50Hs-B8AAAAi/loading-waiting.gif"
              ></v-img>
            </v-avatar>
            <v-icon v-else class="color-icon" :large="panel?.icon">{{
              panel?.iconName
            }}</v-icon>
          </div>
          <template v-slot:actions>
            <v-icon color="teal"> </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="ma-0 pa-0"
          :style="{ backgroundColor: panel?.backgroundColor }"
        >
          <v-row class="pa-0 mx-n7 my-0">
            <v-col
              v-for="(item, itemIndex) in panel?.items"
              :key="itemIndex"
              cols="6"
              sm="3"
              lg="3"
              class="d-flex justify-center"
            >
              <v-card
                v-ripple
                class="pa-2 card-bg elevation-0"
                height="100%"
                width="100%"
                :to="item?.to"
              >
                <div>{{ item?.label }}</div>
                <div class="text-end">
                  <v-avatar v-if="item?.iconImg">
                    <v-img
                      alt="icon"
                      :src="item?.iconImg"
                      lazy-src="https://media.tenor.com/vp3V50Hs-B8AAAAi/loading-waiting.gif"
                    ></v-img>
                  </v-avatar>
                  <v-icon v-else class="color-icon" large>{{
                    item.icon
                  }}</v-icon>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  title: "StoreMoneyByFirebaseMobileScreen",

  data() {
    return {
      activePanel: 0,
      panels: [
        {
          title: "ປຸ່ມເມນູການເງິນ",
          icon: true,
          iconName: "mdi-gesture-tap-button",
          iconImg: "/icons/summary.png",
          backgroundColor: "#e7e7e7",
          items: [
            {
              label: "ລາຍຈ່າຍ",
              icon: "mdi-cash-multiple",
              iconImg: "/icons/money.png",
              to: "/manages/moneyOutCome",
            },
            {
              label: "ລາຍຮັບ",
              icon: "mdi-cash-multiple",
              iconImg: "/icons/money.png",
              to: "/manages/moneyInCome",
            },
            {
              label: "ເງິນທີຢືນມາ",
              icon: "mdi-cash-multiple",
              iconImg: "/icons/money.png",
              to: "/manages/moneyGetIn",
            },
            {
              label: "ເງິນທີຢືນໄປ",
              icon: "mdi-cash-multiple",
              iconImg: "/icons/money.png",
              to: "/manages/moneyGetOut",
            },
            {
              label: "ລາຍງານລາຍຈ່າຍ",
              icon: "mdi-chart-box-outline",
              iconImg: "/icons/reportUp.png",
              to: "/reports/moneyOutCome",
            },
            {
              label: "ລາຍງານລາຍຮັບ",
              icon: "mdi-chart-box-outline",
              iconImg: "/icons/reportUp.png",
              to: "/reports/moneyInCome",
            },
            {
              label: "ລາຍງານເງິນທີຢືນມາ",
              icon: "mdi-chart-box-outline",
              iconImg: "/icons/reportUp.png",
              to: "/reports/moneyGetIn",
            },
            {
              label: "ລາຍງານເງິນທີຢືນໄປ",
              icon: "mdi-chart-box-outline",
              iconImg: "/icons/reportUp.png",
              to: "/reports/moneyGetOut",
            },
            {
              label: "ສະຫຼຸດເງິນສຸດທິ",
              icon: "mdi-sigma",
              iconImg: "/icons/summaryMoney.png",
              to: "/reports/moneySummary",
            },
          ],
        },
        {
          title: "ປຸ່ມເມນູແຜນການແລະເປົ້າໝາຍ",
          icon: true,
          iconName: "mdi-podium-gold",
          iconImg: "/icons/planningMoney.png",
          backgroundColor: "#e7e7e7",
          items: [
            {
              label: "ລາຍການຕ້ອງເຮັດ",
              icon: "mdi-clipboard-text-clock",
              to: "/planningGroup/toDoDateOfMonth",
            },
            {
              label: "ສິ່ງຕ້ອງເຮັດ",
              icon: "mdi-food-turkey",
              to: "/manages/plan",
            },
            {
              label: "ບັນທືກປະຈຳວັນ",
              icon: "mdi-notebook",
              to: "/note",
            },
            {
              label: "Idea & ແນວຄວາມຄິດໃໝ່ໆ",
              icon: "mdi-head-lightbulb",
              to: "/manages/idea",
            },
            {
              label: "ແຜນການແລະເປົ່າໝາຍ",
              icon: "mdi-gold",
              to: "/manages/planGold",
            },
          ],
        },
        // {
        //   title: "ປຸ່ມຂໍ້ມູນຕົວເອງ",
        //   icon: true,
        //   iconName: "mdi-calculator-variant",
        //   iconImg: "/icons/personInformation.png",
        //   backgroundColor: "#e7e7e7",
        //   items: [
        //     {
        //       label: "ຈຸດດີ",
        //       icon: "mdi-thumb-up",
        //       to: "/goodPoint",
        //     },
        //     {
        //       label: "ຈຸດອ່ອນ",
        //       icon: "mdi-thumb-down",
        //       to: "/badPoint",
        //     },
        //     {
        //       label: "ກົດລະບຽບຕົວເອງ",
        //       icon: "mdi-thumb-down",
        //       iconImg: "/icons/scaleWeight.png",
        //       to: "/badPoint",
        //     },
        //   ],
        // },
        {
          title: "ປຸ່ມກຸ່ມບວກລົດຄູນຫານ",
          icon: true,
          iconName: "mdi-calculator-variant",
          iconImg: "/icons/calculate.png",
          backgroundColor: "#e7e7e7",
          items: [
            {
              label: "ສູດຄູນໄຂ່ວ",
              icon: "mdi-calculator-variant",
              to: "/calculator",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.card-bg {
  border: 1px solid #ece3e3;
}
.color-icon {
  color: #ecca36;
}
</style>
