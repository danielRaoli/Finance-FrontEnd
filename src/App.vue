<script setup lang="ts">
import MainHeader from './components/MainHeader.vue';

</script>

<template>
  <MainHeader/>
  <main class="view">
    <RouterView></RouterView>
  </main>

</template>

<style scoped>

.view{
  height: auto;
  width: 100%;
}



</style>
