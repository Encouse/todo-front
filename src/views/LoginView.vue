<template>
  <MainLayout @register = 'register' @login = 'login'>
    <template v-slot:centered-window>
      <component :is = "currentComp" @register='register'>
      </component>
    </template>
  </MainLayout>
</template>

<script>
import AuthCardRegister from '@/components/windows/AuthCardRegister'
import AuthCardLogin from '@/components/windows/AuthCardLogin'

import MainLayout from '@/components/layouts/MainLayout'
export default{
  name: 'home-view',
  components: {
    MainLayout,
    AuthCardRegister,
    AuthCardLogin,
  },
  data() {
    return {
      currentComp: 'AuthCardLogin',
      comps: ['AuthCardLogin', 'AuthCardRegister']
    }
  },
  methods: {
    register() {
      this.currentComp = this.comps[1]
    },
    login() {
      this.currentComp = this.comps[0]
    }
  }
};
</script>

<style>
</style>
