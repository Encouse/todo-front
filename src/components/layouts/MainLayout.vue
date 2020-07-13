<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Coming soon</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Coming soon</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class = 'ttl' v-if = '$vuetify.breakpoint.mdAndUp'>Events</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if = "token"
        tile
        outlined
        text
        @click = 'logout'
      >
      Выход
      </v-btn>
      <v-btn
        v-if = '!token'
        tile
        outlined
        text
        @click = 'register'
      >
      Регистрация
      </v-btn>
      <v-btn
        v-if = '!token'
        tile
        outlined
        text
        @click = 'login'
      >
      Вход
      </v-btn>

    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"

      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <slot name="centered-window"></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
      status: null,
      token: localStorage.getItem('token'),
    }),
    created () {
      this.status = this.$store.getters.status
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
        .catch(err => {console.log(err);})
      },
      register() {
        this.$emit('register')
      },
      login() {
        this.$emit('login')
      }
    }
  }
</script>
<style scoped>
.ttl:hover {
  color: cyan;
}
</style>
