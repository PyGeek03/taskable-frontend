<template>
  <v-container class="fill-height" fluid>
    <UserAuth type="register" :local="localRegister" />
  </v-container>
</template>

<script>
import UserAuth from "@/components/UserAuth";

export default {
  auth: false, // can access without being logged in
  components: {
    UserAuth
  },
  methods: {
    async localRegister(registerDetails) {
      try {
        await this.$axios.post("/register", registerDetails);
        await this.$auth.loginWith("local", {
          data: registerDetails
        });
        this.$router.push("/my_profile");
      } catch (err) {
        console.log(err);
      }
    },
  }
};
</script>
