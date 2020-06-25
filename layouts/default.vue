<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
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
        <v-list-item v-for="(item, i) in bottom_items" :key="i" :to="item.to" router exact>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'All Tasks',
          to: '/'
        },
        {
          icon: 'mdi-calendar',
          title: 'My Tasks',
          to: '/my_tasks'
        }
      ],
      bottom_items: [
        {
          icon: 'mdi-account-group',
          title: 'All Users',
          to: '/all_users'
        },
        {
          icon: 'mdi-account-box',
          title: 'My Profile',
          to: '/my_profile'
        },
        {
          icon: 'mdi-account-plus-outline',
          title: 'Register',
          to: '/register'
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login'
        }
      ],
      miniVariant: true,
      title: 'Taskable'
    }
  }
}
</script>
