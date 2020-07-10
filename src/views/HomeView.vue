<template>
  <MainLayout>
    <template v-slot:centered-window>
      <EventList/>
    </template>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout'
import EventList from '@/components/lists/EventList'
export default{
  name: 'home-view',
  components: {
    MainLayout,
    EventList
  },
};
</script>

<style>
</style>
