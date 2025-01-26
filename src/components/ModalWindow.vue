<script setup>
import {reactive, ref} from 'vue';
import TaskCard from './TaskCard.vue';
import { useTaskStore } from '@/stores/tasksStore';
import { update } from 'lodash';

let tasksStore = useTaskStore();
let title = ref('');
let description = ref('');
let creator = ref('');
let status = ref('В плане');


const props = defineProps({
  cancelTask: Function,
  closeWindow: Function,
  checkmark: Boolean,
  objForEditWindow: Object,
  isShowWindow: Boolean,
  objElement: Object,
})

const createTask = () => {
  props.closeWindow();
  const newTask = {
    creator: creator.value,
    title: title.value,
    description: description.value,
    status: status.value,
  }
  tasksStore.postTask(newTask);
}


if(props.checkmark) {
  title.value = props.objForEditWindow.title 
  description.value = props.objForEditWindow.description 
  creator.value = props.objForEditWindow.creator 
  status.value = props.objForEditWindow.status 
}

const updateTask = () => {
  const updatedTask = Object.assign(props.objElement, {
    title: title.value,
    description: description.value,
    creator: creator.value,
    status: status.value,
  });
  tasksStore.patchOneTask(updatedTask) // отправляем изменения таски на сервер
  props.closeWindow();// закрываем окно
}
</script>

<template>
    <!-- Модальное окно -->
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{{ props.checkmark ? "Редактирование задачи" : "Создание задачи"}}</h3>
        <form>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Имя создателя</label>
            <input v-model="creator" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200" placeholder="Ваше имя" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Название задачи</label>
            <input v-model="title" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200" placeholder="Название задачи" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Описание задачи</label>
            <textarea v-model="description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200" placeholder="Введите описание задачи"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Статус</label>
            <select v-model="status" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200">
              <option value="В плане">В плане</option>
              <option value="В работе">В работе</option>
              <option value="Завершено">Выполнено</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="props.cancelTask()" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200">Отмена</button>
            <button v-if="!props.checkmark" type="button" @click="createTask" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Создать</button>
            <button v-else type="button" @click="updateTask" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
</template>