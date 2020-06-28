<template>
  <v-row align="center" justify="center">
    <v-col cols="12" xs="8" sm="6" lg="3">
      <v-card class="elevation-12">
        <v-toolbar color="green" dark flat>
          <v-toolbar-title style="text-transform: capitalize">{{type}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-if="type === 'register'"
              label="Name"
              v-model="userInput.name"
              prepend-icon="mdi-card-account-details-outline"
              type="text"
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="userInput.email"
              prepend-icon="mdi-email"
              type="email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="userInput.password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwordRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="local(userInput)" block rounded color="green" :disabled="!valid">{{type}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { nameRules, emailRules, passwordRules } from "~/assets/rules";

export default {
  props: ["type", "local"],
  data() {
    return {
      userInput: { name: "", email: "", password: "" },
      valid: false,
      nameRules,
      emailRules,
      passwordRules: [v => !!v || "Password is required"].concat(
        this.type === "register" ? passwordRules : []
      )
    };
  }
};
</script>
