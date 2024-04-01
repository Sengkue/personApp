<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list v-for="(item, i) in items" :key="i" dense class="pt-0" tile flat>
        <v-list-group
          v-if="item.children"
          :prepend-icon="item.icon"
          :value="isOpenMenu(item.title)"
          no-action
        >
          <template #activator>
            <v-list-item-title class="py-1 ml-n5" style="font-size: 15px">{{
              item.title
            }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, j) in item.children"
            :key="j"
            :to="child.to"
            router
            exact
            active-class="blue-grey lighten-4"
          >
            <v-list-item-action class="ml-n6">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title class="ml-n6" style="font-size: 15px">{{
              child.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :to="item.to"
          router
          exact
          dense
          active-class="blue-grey lighten-4"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="ml-n5">
            <v-list-item-title
              class="py-1"
              style="font-weight: bold; font-size: 15px"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="!$vuetify.breakpoint.xs"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <div v-ripple class="text-center px-3 cursor-pointer" @click="setTheme">
        <div>
          <v-icon :color="sun ? 'yellow' : ''">{{
            !sun ? "mdi-weather-night" : "mdi-white-balance-sunny"
          }}</v-icon>
        </div>
      </div>
      <div v-ripple class="text-center px-3 cursor-pointer" @click="Logout">
        <v-icon>mdi-logout</v-icon>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import { auth } from "~/plugins/firebase";
import { signOut } from "firebase/auth";
export default {
  name: "DefaultLayout",
  middleware: "auth",
  // middleware: "auth",
  data() {
    return {
      dark: false,
      sun: false,
      clipped: true,
      drawer: false,
      fixed: false,
      isOpenManagesMenu: true,
      items: [
        {
          icon: "mdi-home",
          title: "ໜ້າຫຼັກ",
          to: "/",
        },
        {
          icon: "mdi-manjaro",
          title: "ຈັດການຂໍ້ມູນ",
          children: [
            {
              icon: "mdi-cash",
              title: "ລາຍຈ່າຍ",
              to: "/manages/moneyOutCome",
            },
            {
              icon: "mdi-cash",
              title: "ລາຍຮັບ",
              to: "/manages/moneyInCome",
            },

            {
              icon: "mdi-cash",
              title: "ເງິນທີຢືມມາ",
              to: "/manages/moneyGetIn",
            },
            {
              icon: "mdi-cash",
              title: "ເງິນທີຢືມໄປ",
              to: "/manages/moneyGetOut",
            },
            {
              icon: "mdi-cash",
              title: "ປະເພດໃຊ້ຈ່າຍ",
              to: "/manages/moneyType",
            },
            {
              icon: "mdi-account-group",
              title: "ຜູ້ຄົນ",
              to: "/manages/people",
            },
            {
              icon: "mdi-heart-outline",
              title: "ຄຳຄົມ",
              to: "/manages/slide",
            },
          ],
        },
        {
          icon: "mdi-podium-gold",
          title: "ປຸ່ມເມນູແຜນການແລະເປົ້າໝາຍ",
          children: [
            {
              title: "ລາຍການຕ້ອງເຮັດ",
              icon: "mdi-clipboard-text-clock",
              to: "/planningGroup/toDoDateOfMonth",
            },
            {
              title: "ສິ່ງຕ້ອງເຮັດ",
              icon: "mdi-food-turkey",
              to: "/manages/plan",
            },
            {
              title: "ບັນທືກປະຈຳວັນ",
              icon: "mdi-notebook",
              to: "/note",
            },
            {
              title: "Idea & ແນວຄວາມຄິດໃໝ່ໆ",
              icon: "mdi-head-lightbulb",
              to: "/manages/idea",
            },
            {
              title: "ແຜນການແລະເປົ່າໝາຍ",
              icon: "mdi-gold",
              to: "/manages/planGold",
            },
          ],
        },
        {
          icon: "mdi-calculator-variant",
          title: "ປຸ່ມກຸ່ມບວກລົດຄູນຫານ",
          children: [
            {
              title: "ຄິດໄລ່ໂດຍວິທີຄູນ",
              icon: "mdi-calculator-variant",
              to: "/calculator",
            },
          ],
        },
        {
          icon: "mdi-chart-bell-curve-cumulative",
          title: "ລາຍງານ",
          children: [
            {
              icon: "mdi-cash",
              title: "ລາຍຈ່າຍ",
              to: "/reports/moneyOutCome",
            },
            {
              icon: "mdi-cash",
              title: "ລາຍຮັບ",
              to: "/reports/moneyInCome",
            },
            {
              icon: "mdi-cash",
              title: "ເງິນທີຢືມມາ",
              to: "/reports/moneyGetIn",
            },
            {
              icon: "mdi-cash",
              title: "ເງິນທີຢືມໄປ",
              to: "/reports/moneyGetOut",
            },
            {
              icon: "mdi-cash",
              title: "ສະຫຼຸດເງິນສຸດທິ",
              to: "/reports/moneySummary",
            },
            {
              icon: "mdi-account-group",
              title: "ຜູ້ຄົນ",
              to: "/reports/people",
            },
          ],
        },
      ],
      miniVariant: false,
      rightDrawer: false,
      title: "Save Money",
    };
  },
  created() {
    this.dark = this.$cookies.get("mode");
    this.$vuetify.theme.dark = this.dark;
    this.sun = this.dark;
  },
  computed: {
    topLevelItems() {
      return this.items.filter((item) => !item.children);
    },
    itemsWithChildren() {
      return this.items.filter((item) => item.children);
    },
  },
  methods: {
    isOpenMenu(menuTitle) {
      return menuTitle === "ຈັດການຂໍ້ມູນ" ? this.isOpenManagesMenu : false;
    },
    hasChildren(item) {
      return item.children && item.children.length > 0;
    },
    setTheme() {
      this.sun = !this.sun;
      this.dark = this.sun;
      if (this.sun === true) {
        this.$vuetify.theme.dark = true;
        this.$cookies.set("mode", true);
        return true;
      } else {
        this.$vuetify.theme.dark = false;
        this.$cookies.set("mode", false);
        return false;
      }
    },
    Logout() {
      signOut(auth);
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
body {
  font-family: "NotoSerifLao", sans-serif;
}
.no-arrow .v-list-group__header__append-icon {
  display: none;
}
</style>
