<template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="team"
      item-key="name"
      :search="search"
      show-group-by
      :loading="loading"
      loading-text="Loading all users..."
      sort-by="due_date"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Type to search..."
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.is_manager="{ item }">
        <v-checkbox disabled v-model="item.is_manager"></v-checkbox>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="reload">Reset</v-btn>
      </template>
    </v-data-table>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    title: "All Users",
    search: "",
    headers: [
      {
        text: "Name",
        value: "name",
        groupable: false
      },
      { text: "Role", value: "role" },
      { text: "Manager", value: "is_manager" },
      { text: "Email", value: "email", groupable: false },
      { text: "Mobile", value: "mobile_phone", groupable: false },
      { text: "Birthday", value: "birthday", groupable: false }
    ],
    team: []
  }),

  computed: {
    loading() {
      return this.team === [];
    }
  },

  async asyncData({ $axios }) {
    const users = await $axios.$get("/user/all");
    users.map(user => {
      user.is_manager = user.is_manager === 1;
    });
    return {
      team: users
    };
  },

  methods: {}
};
</script>
