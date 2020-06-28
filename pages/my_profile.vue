<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-form v-model="valid">
      <v-row class="mx-2">
        <v-col cols="12">
          <v-text-field
            v-model="user.name"
            label="Name"
            prepend-icon="mdi-card-account-details-outline"
            type="text"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="user.email"
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            :rules="emailRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="user.mobile_phone"
            label="Mobile Phone"
            prepend-icon="mdi-cellphone-iphone"
            type="tel"
            :rules="phoneRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="user.role"
            label="Role"
            prepend-icon="mdi-account-tie"
            type="tel"
            :rules="roleRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-menu v-model="menu" :close-on-content-click="false" transition="slide-y-transition" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="user.birthday"
                prepend-icon="mdi-cake-variant"
                label="Birthday"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker @input="menu = false" v-model="user.birthday"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="mx-3">
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" text @click="reload">Cancel</v-btn>
      <v-btn :disabled="!valid" text color="success" @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  nameRules,
  emailRules,
  phoneRules
} from "~/assets/rules";

export default {
  data() {
    return {
      title: "My Profile",
      menu: false,
      valid: false,
      new_password: "",
      retyped_password: "",
      user: Object.assign({}, this.$auth.user),
      nameRules: [v => !!v || "Name is required"],
      emailRules,
      phoneRules,
      roleRules: [v => !!v || "Role is required"],
    };
  },

  methods: {
    reload() {
      this.user = Object.assign({}, this.$auth.user);
    },
    async save() {
      await this.$axios.put('/user', this.user);
      await this.$auth.fetchUser();
    },
    logout() {}
  }
};
</script>