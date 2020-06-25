<template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="tasks"
      item-key="name"
      :search="search"
      show-group-by
      :loading="loading"
      loading-text="Loading your tasks..."
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
      <template v-slot:item.done="{ item }">
        <v-simple-checkbox v-model="item.done"></v-simple-checkbox>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="reset">Reset</v-btn>
      </template>
    </v-data-table>
  </client-only>
</template>

<script>
import { tasks, userName } from "~/assets/config";

export default {
  data: () => ({
    title: "My Tasks",
    search: "",
    headers: [
      {
        text: "Task",
        value: "name",
        groupable: false
      },
      { text: "Due", value: "due_date", align: "center" },
      { text: "Category", value: "category" },
      { text: "Done?", align: "start", value: "done", groupable: false }
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
      tasks: tasks.filter(task => task.owner === userName)
    };
  },

  methods: {}
};
</script>
