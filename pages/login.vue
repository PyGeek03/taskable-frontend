<template>
  <v-container class="fill-height" fluid>
    <UserAuth type="login" :local="localLogin" />
  </v-container>
</template>

<script>
import UserAuth from "@/components/UserAuth";

export default {
  components: {
    UserAuth
  },
  methods: {
    async localLogin(loginDetails) {
      try {
        await this.$auth.loginWith("local", {
          data: loginDetails
        });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
