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

      <v-card-title class="d-flex justify-center">ລົງທະບຽບ</v-card-title>

      <v-card-text>
        <v-text-field
          type="email"
          v-model="user.email"
          :rules="[(v) => !!v || 'ຈຳເປັນ']"
          outlined
          dense
          label="ອີເມວ"
        >
          <template #prepend-inner>
            <v-icon color="primary" right>mdi-email</v-icon>
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
        <v-text-field
          v-model="user.password1"
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

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" block :loading="loading" @click="register()">
          ລົງທະບຽບບັນຊີ
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-row class="mt-0 px-3" @click="$router.push('/login')">
        <v-col cols="6"> ມີບັນຊີແລ້ວ! </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-icon>mdi-account</v-icon>ເຂົ້າສູ່ລະບົບ
        </v-col>
      </v-row>
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
      <v-card-text>
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

        <v-text-field
          v-model="user.password1"
          :rules="[(v) => !!v || 'ຈຳເປັນ']"
          outlined
          dense
          label="ລະຫັດຜ່ານ"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
        >
          <template #prepend-inner>
            <v-icon color="primary" right>mdi-lock </v-icon>
          </template>
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          block
          :loading="loading"
          @click="register()"
          class="mb-10"
        >
          ລົງທະບຽບບັນຊີ
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-row class="mt-0 px-3" @click="$router.push('/login')">
        <v-col cols="6"> ຍັງບໍ່ມີບັນຊີ! </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-icon>mdi-account</v-icon>ລົງທະບຽບ
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default {
  layout: "Black",
  name: "LoginPage",
  middleware: "unAuth",
  data() {
    return {
      show: false,
      loading: false,
      AllUser: {},
      user: {
        email: "xeebkwmvaj@gmail.com",
        password: "78781525",
        password1: "78781525",
      },
    };
  },
  methods: {
    async register() {
      this.loading = true;

      if (!this.user.email || !this.user.password || !this.user.password1) {
        this.$toast.error("ປ້ອນຊື່, ອີເມວ ແລະ ລະຫັດຜ່ານ");
        this.loading = false;
        return;
      }

      if (this.user.password !== this.user.password1) {
        this.$toast.error("ລະຫັດຜ່ານບໍຖືຕ້ອງ");
        this.loading = false;
        return;
      }

      try {
        await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        ).then((res) => {
          this.$toast.success("ລົງທະບຽງສຳເລັດ");
          this.loading = false;
          this.$router.push("/login");
          // console.log(res.user);
        });
      } catch (error) {
        // console.error(error.message);
        if (error.code === "auth/email-already-in-use") {
          this.$toast.error("ອີເມວນີ້ຖືກລົງທະບຽບໄປແລ້ວ");
        }
      }

      this.loading = false;
    },
  },
};
</script>
