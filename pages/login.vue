<template>
  <div>
    <div class="hidden-md-and-up" style="margin-top: 130px">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <div class="d-flex justify-center pt-3">
        <v-avatar size="100">
          <v-img src="logo.png"></v-img>
        </v-avatar>
      </div>

      <v-card-title class="d-flex justify-center">ເຂົ້າສູ່ລະບົບ</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            type="email"
            v-model="user.email"
            :rules="emailRules"
            outlined
            dense
            label="ອີເມວລະບົບ"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-account-key</v-icon>
            </template>
          </v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ລະຫັດຜ່ານ"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            @keyup.enter="login()"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-key-plus </v-icon>
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" block :loading="loading" @click="login()">
            ເຂົ້າສູ່ລະບົບ
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-row class="mt-0 px-3" @click="$router.push('/ForgotPassword')">
          <v-col
            cols="12"
            class="text-end primary--text"
            style="cursor: pointer"
          >
            ລືມລະຫັດຜ່ານ?
          </v-col>
        </v-row>
        <!-- <v-row class="mt-0 px-3" @click="register">
          <v-col cols="6"> ຍັງບໍ່ມີບັນຊີ! </v-col>
          <v-col cols="6" class="d-flex justify-end">
            <v-icon>mdi-account</v-icon>ລົງທະບຽບ
          </v-col>
        </v-row> -->
      </v-form>
    </div>
    <v-card
      class="mx-auto my-5 mt-10 hidden-sm-and-down"
      style="opacity: 0.9"
      max-width="400"
      elevation="10"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <div class="d-flex justify-center pt-3">
        <v-avatar size="100">
          <v-img src="logo.png"></v-img>
        </v-avatar>
      </div>

      <v-card-title class="d-flex justify-center">ເຂົ້າສູ່ລະບົບ</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            type="email"
            v-model="user.email"
            :rules="emailRules"
            outlined
            dense
            label="ອີເມວລະບົບ"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-account-key</v-icon>
            </template>
          </v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ລະຫັດຜ່ານ"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-key-plus </v-icon>
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions class="mb-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            block
            :loading="loading"
            @click="login()"
            class="mb-10"
          >
            ເຂົ້າສູ່ລະບົບ
          </v-btn>
        </v-card-actions>
        <v-row class="mt-0 px-3" @click="$router.push('/ForgotPassword')">
          <v-col
            cols="12"
            class="text-end primary--text"
            style="cursor: pointer"
          >
            ລືມລະຫັດຜ່ານ?
          </v-col>
          <!-- <v-col cols="6" class="d-flex justify-end">
            <v-icon>mdi-account</v-icon>ລົງທະບຽບ
          </v-col> -->
        </v-row>
        <!-- <v-card-text class="text-center mt-0" @click="register">
          <div><v-icon>mdi-account</v-icon>ລົງທະບຽບ</div>
        </v-card-text> -->
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  layout: "Black",
  name: "LoginPage",
  middleware: "unAuth",
  data() {
    return {
      valid: false,
      show: false,
      loading: false,
      AllUser: [],
      user: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "ຈຳເປັນ", // Check if email is provided
        (v) => /.+@.+\..+/.test(v) || "ກະລຸນາໃສ່ອີເມວທີ່ຖືກຕ້ອງ", // Check if it's a valid email
      ],
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    async login() {
      this.loading = true;
      if (!this.user.email || !this.user.password) {
        this.$toast.error("ປ້ອນຊື່ ແລະ ລະຫັດຜ່ານ");
        this.loading = false;
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        // Access the user and token if needed
        const user = userCredential.user;
        const token = await user.getIdToken();
        this.$cookies.set("token", token, {
          secure: true,
          path: "/",
          // maxAge: 3600, // Expires in 180 seconds (3 minutes)
          maxAge: 43200, // Expires in 12 hours
        });
        this.loading = false;
        this.$router.push("/");
      } catch (error) {
        if (error.code === "auth/invalid-login-credentials") {
          this.$toast.error("ຂໍ້ມູນການເຂົ້າສູ່ລະບົບບໍ່ຖືກຕ້ອງ");
        }
      }
      this.loading = false;
    },
  },
};
</script>
