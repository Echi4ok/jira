<script setup>
import TaskCard from '@/components/TaskCard.vue';
import {ref} from 'vue';

let isCreatedTask = ref(false);

const createTask = () => {
  isCreatedTask.value = !isCreatedTask.value;
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">📂 Бэклог</h2>
        <p class="text-gray-600 dark:text-gray-400">Задачи, которые ещё не начаты.</p>
      </div>
      <button @click="createTask" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
        {{ isCreatedTask ? "Отменить создание" : "Создать задачу" }}
      </button>
    </div>

    <!-- Модальное окно -->
    <div v-if="isCreatedTask" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Создание задачи</h3>
        <form @submit.prevent="submitTask">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Имя создателя</label>
            <input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200" placeholder="Ваше имя" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Название задачи</label>
            <input type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200" placeholder="Название задачи" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Описание задачи</label>
            <textarea rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200" placeholder="Введите описание задачи"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Статус</label>
            <select class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200">
              <option value="todo">В плане</option>
              <option value="in-progress">В работе</option>
              <option value="done">Выполнено</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="createTask" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200">Отмена</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Создать</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Список задач -->
    <div class="space-y-4">
      <TaskCard />
      <TaskCard />
    </div>
  </div>
</template>

