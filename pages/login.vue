<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="accent" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Email" v-model="email" prepend-icon="mdi-email" type="email"></v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login" block rounded color="green">Login</v-btn>
          </v-card-actions>
          <v-card-text class="text-center">Or login with</v-card-text>
          <v-card-actions>
            <v-btn @click="google_login" class="mb-3" block rounded color="blue">
              <v-icon left>mdi-google</v-icon> Google
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login() {},
    google_login() {}
  }
}
</script>
