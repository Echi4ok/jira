<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-8">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
/* Дополнительные стили, если нужно */
</style>
