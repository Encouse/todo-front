<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            label="username"
            value="John"
            v-model = 'username'
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model = 'password'
          ></v-text-field>
          <span class="caption grey--text text--darken-1">
            This is the email you will use to login to your Vuetify account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          ></v-img>
          <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
          <span class="caption grey--text">Thanks for signing up!</span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3"
        color="primary"
        depressed
        @click="step++"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      password: null,
      username: null,
      step: 1,
    }),
    methods: {
      login: function () {
        let data = {
          password: this.password,
          username: this.username
        }
        this.$store.dispatch('login', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
     },
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Sign-up'
          default:
            this.login()
            return 'Hello again!'
        }
      },
    },
  }
</script>

<style>
</style>
