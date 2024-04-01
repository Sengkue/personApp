<template>
  <v-app :dark="dark">
    <LayoutsNavbar />
    <!-- <v-main :class="sun ? '' : 'teal lighten-5'"> -->
    <v-main>
      <Nuxt />
    </v-main>
    <LayoutsFooter />
  </v-app>
</template>
<script>
import { auth } from "~/plugins/firebase";
import { signOut } from "firebase/auth";
export default {
  name: "DefaultLayout",
  middleware: "auth",
  data() {
    return {
      dark: false,
      sun: false,
      clipped: true,
      drawer: false,
      fixed: false,

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
    startLoading() {
      this.$nuxt.$loading.start();
    },
    stopLoading() {
      this.$nuxt.$loading.finish();
    }
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
