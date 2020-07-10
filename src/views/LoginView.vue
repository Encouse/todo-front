<template>
  <MainLayout>
    <template v-slot:centered-window>
      <component :is = "'AuthCardLogin'">
      </component>
    </template>
  </MainLayout>
</template>

<script>
//import AuthCardRegister from '@/components/windows/AuthCardRegister'
import AuthCardLogin from '@/components/windows/AuthCardLogin'
import MainLayout from '@/components/layouts/MainLayout'
export default{
  name: 'home-view',
  components: {
    MainLayout,
    //AuthCardRegister,
    AuthCardLogin,
  },
  data() {
    return {
      comps: ['AuthCardLogin', 'AuthCardRegister']
    }
  }
};
</script>

<style>
</style>
