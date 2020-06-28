<template>
  <v-app dark>
    <v-navigation-drawer v-if="$auth.loggedIn" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in common_items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item v-for="(item, i) in admin_items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon v-if="$auth.loggedIn" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <client-only>
        <div v-if="$auth.loggedIn">
          <nuxt-link to="/my_profile">
            <v-btn text>G'day {{ $auth.user.name }}</v-btn>
          </nuxt-link>
          <v-btn text @click="logout">Logout</v-btn>
        </div>
        <div v-else>
          <nuxt-link to="/login">
            <v-btn text>Login</v-btn>
          </nuxt-link>
          <nuxt-link to="/register">
            <v-btn text>Register</v-btn>
          </nuxt-link>
        </div>
      </client-only>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: true,
      title: "Taskable",

      common_items: [
        {
          icon: "mdi-calendar",
          title: "My Tasks",
          to: "/"
        },
        {
          icon: "mdi-account-box",
          title: "My Profile",
          to: "/my_profile"
        }
      ]
    };
  },

  computed: {
    admin_items() {
      if (this.$auth.loggedIn && this.$auth.user.is_manager)
        return [
          {
            icon: "mdi-apps",
            title: "Manage Tasks",
            to: "/manage_all_tasks"
          },
          {
            icon: "mdi-account-group",
            title: "Manage Users",
            to: "/manage_all_users"
          }
        ];
      else if (this.$auth.loggedIn)
        return [
          {
            icon: "mdi-apps",
            title: "All Tasks",
            to: "/all_tasks"
          },
          {
            icon: "mdi-account-group",
            title: "All Users",
            to: "/all_users"
          }
        ];
      else return [];
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>
