<template>
    <div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">📊 Дашборд</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Общая статистика по проекту.</p>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Карточка "Всего задач" -->
        <div class="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Всего задач</h3>
          <p class="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-2">42</p>
        </div>
  
        <!-- Карточка "Завершено" -->
        <div class="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Завершено</h3>
          <p class="text-3xl font-bold text-green-500 dark:text-green-400 mt-2">28</p>
        </div>
  
        <!-- Карточка "В работе" -->
        <div class="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">В работе</h3>
          <p class="text-3xl font-bold text-red-500 dark:text-red-400 mt-2">14</p>
        </div>
      </div>
    </div>
  </template>

<script setup>

</script>