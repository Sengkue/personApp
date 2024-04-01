<template>
  <div>
    <v-app-bar fixed app elevation="0">
      <v-btn class="pa-0 ma-0" icon @click="$router.push('/')">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-spacer />

      <v-toolbar-title class="ml-n10">ລືມລະຫັດຜ່ານ</v-toolbar-title>
      <v-spacer />
      <div></div>
    </v-app-bar>
    <div class="forgot-password-container pa-5">
      <div class="center-box">
        <img src="/logo.png" alt="Logo" class="logo" />
        <!-- <h2>ລືມລະຫັດຜ່ານ</h2> -->
        <v-text-field
          v-model="email"
          outlined
          dense
          label="ອີເມວ"
          placeholder="example@gmail.com"
          @keyup.enter="resetPassword"
        />
        <v-btn color="primary" block @click="resetPassword" dark>
          ຣີເຊັດລະຫັດຜ່ານ
        </v-btn>
        <!-- v-if="resetSuccessful" -->
        <div class="reset-note ">
          ຫຼັງຈາກກົດປຸ່ມຣີເຊັດລະຫັດຜ່ານແລ້ວກະລຸນາໄປກວດເບິ່ງຢູ່ທາງອິເອວຂອງທາງ ແລະ
          ປ່ຽນຢູ່ນັ້ນ
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, sendPasswordResetEmail } from "~/plugins/firebase";
export default {
  layout: "Black",
  data() {
    return {
      email: "",
      resetSuccessful: false,
    };
  },
  methods: {
    async resetPassword() {
      try {
        // Validate email format before sending the password reset email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          this.$toast.error("ອີເມວບໍ່ຖືກຕ້ອງ");
          return;
        }

        await sendPasswordResetEmail(auth, this.email);
        this.$toast.success("ສົ່ງອີເມວການຕັ້ງລະຫັດຜ່ານໃໝ່ມາທາງອິເມວແລ້ວ", {
          timeout: 18000,
        });
        this.resetSuccessful = true;
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000); // Redirect to login page after 5 seconds
      } catch (error) {
        this.$toast.error("ການຕັ້ງລະຫັດຜ່ານຜິດພາດ:", error.message);
      }
    },
  },
};
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center-box {
  text-align: center;
}

.logo {
  max-width: 100px; /* Adjust the size of the logo as needed */
  margin-bottom: 20px; /* Adjust the spacing between the logo and the heading */
}

.reset-note {
  margin-top: 10px;
  color: #4caf50; /* Green color for success note */
}
</style>
