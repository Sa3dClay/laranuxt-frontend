<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            LaraNuxt
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <!-- icon -->
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <!-- content -->
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>LaraNuxt</v-toolbar-title>

      <v-spacer />

      <div v-if="authenticated">
        <v-btn plain rounded>{{user.name}}</v-btn>
        <v-btn plain rounded @click.prevent="logout">Logout</v-btn>
      </div>

      <div v-else>
        <v-btn plain rounded to="/login">Login</v-btn>
        <v-btn plain rounded to="/register">Register</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer class="px-12 py-4" app>
      <p class="ma-0">
        Copyright@2021
      </p>
      
      <v-spacer />

      <v-btn icon class="ma-0 pa-0">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>

      <v-btn icon class="ma-0 pa-0">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          link: '/',
          title: 'home',
          icon: 'mdi-view-dashboard'
        },
        {
          link: '/posts',
          title: 'Posts',
          icon: 'mdi-post'
        }
      ],
      drawer: false
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
