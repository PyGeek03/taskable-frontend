<template>
  <client-only>
    <div>
      <v-data-table
        :headers="headers"
        :items="tasks"
        :search="search"
        show-group-by
        :loading="loading"
        loading-text="Loading all tasks..."
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
          <v-simple-checkbox disabled v-model="item.done"></v-simple-checkbox>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="reload">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    title: "All Tasks",
    dialog: false,
    search: "",
    headers: [
      {
        text: "Task",
        value: "name",
        groupable: false
      },
      { text: "Due Date", value: "due_date", align: "center" },
      { text: "Owner", value: "owner" },
      { text: "Category", value: "category" },
      { text: "Done?", align: "start", value: "done", groupable: false },
      { text: "Delete", value: "delete", sortable: false, groupable: false }
    ],
    team: [],
    tasks: []
  }),

  computed: {
    loading() {
      return this.tasks === [];
    }
  },

  async asyncData({ $axios }) {
    const team = await $axios.$get("/user/all");
    team.map(user => {
      user.is_manager = user.is_manager === 1;
    });
    const tasks = await $axios.$get("/task/all");
    tasks.map(task => {
      task.done = task.done === 1;
      task.owner = team.filter(user => user.id === task.owner_id)[0].name;
    });
    
    return {
      team,
      tasks
    };
  }
};
</script>
