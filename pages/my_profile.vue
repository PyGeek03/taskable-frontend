<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-container>
      <v-row class="mx-2">
        <v-col cols="12">
          <v-text-field
            v-model="user.name"
            label="Name"
            prepend-icon="mdi-card-account-details-outline"
            type="text"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="user.email" label="Email" prepend-icon="mdi-email" type="email"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-menu close-on-content-click transition="slide-y-transition" offset-y>
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
            <v-date-picker v-model="user.birthday"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="user.mobile_phone"
            label="Mobile Phone"
            prepend-icon="mdi-cellphone-iphone"
            type="tel"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="user.role" label="Role" prepend-icon="mdi-account-tie" type="tel"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-checkbox :label="manager_label" v-model="user.is_manager"></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="New Password"
            v-model="new_password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Retype Password"
            v-model="retyped_password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions class="mx-3">
      <v-btn class="ml-3" @click="google_calendar_sync" color="blue">
        <v-icon left>mdi-google</v-icon>Sync tasks with Google Calendar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="reload">Cancel</v-btn>
      <v-btn text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { team, userName } from "~/assets/config";

export default {
  data: () => ({
    title: 'My Profile',
    user: {},
    new_password: '',
    retyped_password: ''
  }),

  computed: {
    manager_label() {
      return this.user.is_manager ? 'Is Manager' : 'Not Manager'
    }
  },

  async asyncData({ params }) {
    // use await axios to fetch data...
    return {
      user: team.find(user => user.name === userName)
    };
  },

  methods: {
    save() {},
    google_calendar_sync() {}
  }
}
</script>