<template>
  <client-only>
    <div>
      <v-data-table
        :headers="headers"
        :items="tasks"
        item-key="id"
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
            <v-spacer></v-spacer>
            <v-btn color="green" rounded dark class="mb-2" @click="addEmptyTask">Add</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }">
          <v-edit-dialog :return-value.sync="item.name" large @save="saveEdit(item)">
            {{ item.name }}
            <template v-slot:input>
              <v-text-field v-model="item.name" single-line counter :rules="nonemptyRule"></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.due_date="{ item }">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="slide-y-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="item.due_date" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker @input="menu = false" @change="saveEdit(item)" v-model="item.due_date"></v-date-picker>
          </v-menu>
        </template>
        <template v-slot:item.owner_id="{ item }">
          <v-select
            :items="team"
            item-text="name"
            item-value="id"
            v-model="item.owner_id"
            :rules="nonemptyRule"
            @change="saveEdit(item)"
          ></v-select>
        </template>
        <template v-slot:item.category="{ item }">
          <v-edit-dialog :return-value.sync="item.category" large @save="saveEdit(item)">
            {{ item.category }}
            <template v-slot:input>
              <v-text-field v-model="item.category" single-line counter :rules="nonemptyRule"></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.done="{ item }">
          <v-checkbox @change="saveEdit(item)" v-model="item.done"></v-checkbox>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-icon small @click="deleteTask(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="reload">Reset</v-btn>
        </template>
      </v-data-table>
      <v-snackbar v-model="showSaveSnack" :timeout="timeout" color="success">
        Edit Saved
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
        </template>
      </v-snackbar>
      <v-snackbar v-model="showDeleteSnack" :timeout="timeout" color="error">
        Task Deleted
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="undoDelete">Undo</v-btn>
          <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
        </template>
      </v-snackbar>
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
      { text: "Owner", value: "owner_id" },
      { text: "Category", value: "category" },
      { text: "Done?", align: "start", value: "done", groupable: false },
      { text: "Delete", value: "delete", sortable: false, groupable: false }
    ],
    timeout: 3000,
    menu: false,
    showDeleteSnack: false,
    showSaveSnack: false,
    snackColor: "",
    snackText: "",
    team: [],
    tasks: [],
    lastDeletedTask: {},
    nonemptyRule: [v => !!v || "Must not be empty"]
  }),

  computed: {
    loading() {
      return this.tasks === [];
    },
    defaultTask() {
      return {
        name: "Edit me!",
        due_date: new Date().toISOString().substr(0, 10),
        owner_id: this.$auth.user.id,
        category: "Uncategorised",
        done: false
      };
    }
  },

  async asyncData({ $axios }) {
    const team = await $axios.$get("/user/all");
    team.map(user => {
      user.is_manager = user.is_manager === 1;
    });
    const tasks = await $axios.$get("/task/all");
    return {
      team,
      tasks
    };
  },

  methods: {
    async addEmptyTask() {
      const newTask = Object.assign({}, this.defaultTask);
      const { data } = await this.$axios.post("/task", newTask);

      newTask.id = data[0]["LAST_INSERT_ID()"];
      
      this.tasks.push(newTask);
    },

    async saveEdit(task) {
      await this.$axios.put("/task", task);
      this.showSaveSnack = true;
    },

    async deleteTask(task) {
      await this.$axios.delete("/task/" + task.id);

      const task_index = this.tasks.indexOf(task);
      this.lastDeletedTask = this.tasks.splice(task_index, 1)[0];

      this.showDeleteSnack = true;
    },

    async undoDelete() {
      console.log(this.lastDeletedTask);

      await this.$axios.post("/task", this.lastDeletedTask);
      this.tasks.push(this.lastDeletedTask);
      this.lastDeletedTask = {};
      this.showDeleteSnack = false;
    }
  }
};
</script>
