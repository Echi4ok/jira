<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
    <!-- Боковое меню -->
    <aside class="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between">
      <div>
        <div class="p-6">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">Jira</h1>
          <p class="text-gray-600 dark:text-gray-400">Управление проектами</p>
        </div>
        <nav class="mt-6">
          <ul>
            <li>
              <RouterLink
                to="/"
                :class="{
                  'bg-blue-50 dark:bg-gray-700': $route.path === '/',
                  'text-gray-800 dark:text-gray-200': true,
                }"
                class="w-full text-left px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 block"
              >
                📊 Дашборд
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/backlog"
                :class="{
                  'bg-blue-50 dark:bg-gray-700': $route.path === '/backlog',
                  'text-gray-800 dark:text-gray-200': true,
                }"
                class="w-full text-left px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 block"
              >
                📂 Бэклог
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/board"
                :class="{
                  'bg-blue-50 dark:bg-gray-700': $route.path === '/board',
                  'text-gray-800 dark:text-gray-200': true,
                }"
                class="w-full text-left px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 block"
              >
                📋 Доска задач
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/releases"
                :class="{
                  'bg-blue-50 dark:bg-gray-700': $route.path === '/releases',
                  'text-gray-800 dark:text-gray-200': true,
                }"
                class="w-full text-left px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 block"
              >
                🚀 Релизы
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/settings"
                :class="{
                  'bg-blue-50 dark:bg-gray-700': $route.path === '/settings',
                  'text-gray-800 dark:text-gray-200': true,
                }"
                class="w-full text-left px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 block"
              >
                ⚙️ Настройки
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Кнопка переключения темы -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          @click="toggleDarkMode"
          class="w-full flex items-center justify-center px-4 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-200"
        >
          <span class="mr-2">{{ isDarkMode ? '🌞' : '🌙' }}</span>
          {{ isDarkMode ? 'Светлая тема' : 'Тёмная тема' }}
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDarkMode = ref(true); // По умолчанию тёмная тема

// Переключение темы
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

</script>

