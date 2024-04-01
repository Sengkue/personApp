<template>
  <v-app :dark="dark">
    <v-main :class="sun ? '' : ''">
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "DefaultLayout",
  middleware: "auth",
  data() {
    return {
      dark: false,
      sun: false,
    };
  },
  created() {
    this.dark = this.$cookies.get("mode");
    this.$vuetify.theme.dark = this.dark;
    this.sun = this.dark;
  },
};
</script>
