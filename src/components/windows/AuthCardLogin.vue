<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }} или
        <span class = 'reg' @click = 'reg'>
        Зарегистрироваться
        </span>
      </span>
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
            outlined
            v-model = 'username'
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            outlined
            v-model = 'password'
          ></v-text-field>
          <span class="caption grey--text text--darken-1">
            Введите пароль и логин выше
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <div class="pa-4 text-center">
          <v-progress-circular
            v-if = 'loading'
            indeterminate
            color="primary"
          ></v-progress-circular>
          <v-btn
            v-else
            fab
            large
            error
            outlined
            top
          >
            <v-icon
              color = 'error'
            >mdi-close</v-icon>
          </v-btn>
          <h3 class="title font-weight-light mb-2">
            {{err ? 'Неверный логин или пароль' : 'Спасибо что вы с нами!'}}
          </h3>
          <span class="caption grey--text">
            {{err ? 'Wrong login or password' : 'Thanks for signing up!'}}
          </span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1 || loading"
        text
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 2 || loading"
        color="primary"
        depressed
        outlined
        @click="step++"
      >
        Далее
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
      err: false,
      loading: false,
    }),
    methods: {
      login: function () {
        this.loading = true
        let data = {
          password: this.password,
          username: this.username
        }
        this.$store.dispatch('login', data)
       .then(() => this.$router.push('/'))
       .catch(err => {
         this.err = true
         this.loading = false
         console.log(err)
       })
     },
     reg() {
       this.$emit('register')
     }
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Войти'
          default:
            this.login()
            return this.err ? 'Повторите попытку' : 'Hello again!'
        }
      },
    },
  }
</script>

<style scoped>
.reg {
  color: green;
  cursor: pointer;
}
.reg:hover {
  color: cyan;
}
</style>
