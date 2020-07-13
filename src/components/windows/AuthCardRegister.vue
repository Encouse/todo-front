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
          <v-form
            v-model = 'valid'
          >
            <v-text-field
              outlined
              label="Username"
              value="john"
              v-model = 'username'
              :rules = 'unameRules'
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              outlined
              value="john@vuetifyjs.com"
              v-model = 'email'
              :rules = 'emailRules'
              required
            ></v-text-field>
          </v-form>
          <span class="caption grey--text text--darken-1">
            Введите ваш EMAIL и логин выше
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-form
            ref = 'formp'
            v-model = 'valid'
          >
            <v-text-field
              label="Password"
              type="password"
              outlined
              v-model = 'password'
              :rules = 'pswdRules'
              required
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
              v-model = 'confirm_password'
              outlined
              required
            ></v-text-field>
          </v-form>
          <span class="caption grey--text text--darken-1">
            Введите пароль
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          <h3 class="title font-weight-light mb-2">Спасибо что вы с нами!</h3>
          <span class="caption grey--text">Thanks for signing up!</span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1 & loading === true"
        text
        @click="step--"
        outlined
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3 || loading === true || !valid"
        color="primary"
        depressed
        @click="step++"
        outlined
      >
        Далее
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      email: null,
      password: null,
      confirm_password: null,
      username: null,
      loading: false,
      err: false,
      step: 1,
      valid: false,
      emailRules: [
        v => !!v || 'Введите EMAIL',
        v => /.+@.+\..+/.test(v) || 'EMAIL в неверном формате',
      ],
      unameRules: [
        v => !!v || 'Введите логин',
        v => (v && v.length >= 6) || 'Не менее 6 символов',
      ],
      pswdRules: [
        v => !!v || 'Введите пароль',
        v => (v && v.length >= 6) || 'Не менее 6 символов',
        v => (v === this.confirm_password) || 'd'
      ],
    }),
    methods: {
     register: function () {
       this.loading = true
       let data = {
         username: this.username,
         email: this.email,
         password: this.password,
       }
       this.$store.dispatch('register', data)
      .then(() => {
        this.loading = false
        console.log('registered sucessfully!');
        this.$router.push('/')
      })
      .catch(err => {
        this.err = true
        this.loading = false
        console.log(err)
      })
    },

    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Регистрация'
          case 2: return 'Создайте пароль'
          default:
            this.register()
            return 'Account created'
        }
      },
    },
  }
</script>

<style>
</style>
