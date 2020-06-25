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
            <v-spacer></v-spacer>
            <v-btn color="green" rounded dark class="mb-2" @click="addEmptyTask">Add</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }">
          <v-edit-dialog :return-value.sync="item.name" large @save="saveEdit(item)">
            {{ item.name }}
            <template v-slot:input>
              <v-text-field v-model="item.name" label="Edit" single-line counter></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.due_date="{ item }">
          <v-menu close-on-content-click transition="slide-y-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="item.due_date" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="item.due_date"></v-date-picker>
          </v-menu>
        </template>
        <template v-slot:item.owner="{ item }">
          <v-select :items="team" item-text="name" v-model="item.owner"></v-select>
        </template>
        <template v-slot:item.category="{ item }">
          <v-text-field v-model="item.category" type="text"></v-text-field>
        </template>
        <template v-slot:item.done="{ item }">
          <v-simple-checkbox v-model="item.done"></v-simple-checkbox>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteTask(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="reload">Reset</v-btn>
        </template>
      </v-data-table>
      <v-snackbar v-model="showSaveSnack" :timeout="3000" color="success">
        Edit Saved
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
        </template>
      </v-snackbar>
      <v-snackbar v-model="showDeleteSnack" :timeout="3000" color="error">
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
import { team, tasks } from "~/assets/config";

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
      { text: "Actions", value: "actions", sortable: false, groupable: false }
    ],
    showDeleteSnack: false,
    showSaveSnack: false,
    snackColor: "",
    snackText: "",
    team: [],
    tasks: [],
    defaultTask: {
      name: "",
      due_date: new Date().toISOString().substr(0, 10),
      owner: "",
      category: "",
      done: false
    },
    lastDeletedIndex: -1,
    lastDeletedTask: {}
  }),

  computed: {
    loading() {
      return this.tasks === [];
    }
  },

  async asyncData({ params }) {
      // use await axios to fetch data...
      return {
          team: team,
          tasks: tasks,
      }
  },

  methods: {
    addEmptyTask() {
      let emptyTask = Object.assign({}, this.defaultTask);
      this.tasks.push(emptyTask);
    },

    saveEdit(task) {
      this.showSaveSnack = true;
    },

    deleteTask(task) {
      this.lastDeletedIndex = this.tasks.indexOf(task);
      this.lastDeletedTask = this.tasks.splice(this.lastDeletedIndex, 1)[0];
      this.showDeleteSnack = true;
    },

    undoDelete() {
      this.tasks.splice(this.lastDeletedIndex, 0, this.lastDeletedTask);
      this.lastDeletedIndex = -1;
      this.lastDeletedTask = {};
      this.showDeleteSnack = false;
    }
  }
};
</script>
