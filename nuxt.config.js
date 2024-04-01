import colors from "vuetify/es5/util/colors";
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

export default {
  head: {
    // titleTemplate: '%s - store_money',
    titleTemplate: "ລະບົບເກັບຄ່າໃຊ້ຈ່າຍ",
    title: "store_money",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
      {
        httpEquiv: 'Content-Security-Policy',
        content: "default-src 'self'; script-src 'self' https://*.firebaseio.com",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/global.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/dayjs.js" },
    {
      src: "~/plugins/ckEditor.js",
      mode: "client",
    },
    "~/plugins/global.js",
    "~/plugins/firebase.js",
    "~/plugins/jsonExcel.js",
  ],
 
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/firebase",
    "@nuxtjs/moment",
  ],
  firebase: {
    config: {
      apiKey: "AIzaSyA5HuZyFMZ03egHNeIM4nEsvfCknddn0OI",
      authDomain: "sengkuevangallinone.firebaseapp.com",
      databaseURL: "https://sengkuevangallinone-default-rtdb.firebaseio.com",
      projectId: "sengkuevangallinone",
      storageBucket: "sengkuevangallinone.appspot.com",
      messagingSenderId: "453885743625",
      appId: "1:453885743625:web:624ac4469494aee43f5ed8",
      measurementId: "G-7KEWNTZEDM"
    },
    onFirebaseHosting: true, // Set this if you are using Firebase Hosting
    services: {
      storage: true, // Enable Firebase Storage service
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    "@nuxtjs/pwa",
    [
      "@nuxtjs/toast",
      {
        duration: 4000,
        position: "top-center",
        iconPack: "mdi",
        type: "error",
        closeOnSwipe: false,
        width: "300px",
      },
    ],
  ],
  pwa: {
    meta: {
      name: "Store Money",
      author: "save money every day",
    },
    manifest: {
      name: "Store Money",
      short_name: "S-M-P",
      description: "Save money every day",
      lang: "en",
      display: "standalone",
      background_color: "#F7C327",
      theme_color: colors.white,
      // theme_color: colors.blue.darken2,
      icons: [
        {
          src: "/static/logo.png",
          sizes: "512x512",
          type: "image/png/gif",
        },
      ],
    },
    icon: {
      source: "/static/logo.png",
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL:
      "https://sengkuevangallinone-default-rtdb.firebaseio.com",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  target: 'server',
};
