<template>
    <div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">📋 Доска задач</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Задачи, разделённые по статусам.</p>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Колонка "В плане" -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">В плане</h3>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h3 class="font-medium text-gray-800 dark:text-gray-200">Создать 90-дневные планы</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Для всех отделов в офисе Марса</p>
              <div class="mt-2 flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">Иван</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">•</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">В плане</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Колонка "В работе" -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">В работе</h3>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h3 class="font-medium text-gray-800 dark:text-gray-200">Разработать сетевой план</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Для офиса Марса</p>
              <div class="mt-2 flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">Мария</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">•</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">В работе</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Колонка "Завершено" -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Выполнено</h3>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h3 class="font-medium text-gray-800 dark:text-gray-200">Запустить Saturn's Rings Resort</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Как предпочтительного поставщика</p>
              <div class="mt-2 flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">Алексей</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">•</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">Завершено</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>

</script>