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
      <template v-slot:no-data>
        <v-btn color="primary" @click="reload">Reset</v-btn>
      </template>
    </v-data-table>
  </client-only>
</template>

<script>
import { team } from "~/assets/config";

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
    tasks: []
  }),

  computed: {
    loading() {
      return this.tasks === [];
    }
  },

  async asyncData({ params }) {
    // use await axios to fetch data...
    return {
      team: team
    };
  },

  methods: {}
};
</script>
