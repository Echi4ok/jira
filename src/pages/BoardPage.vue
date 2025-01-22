<script setup>
import {ref, watch } from 'vue';
import draggable from 'vuedraggable';
import ModalWindow from '@/components/ModalWindow.vue';
import TaskCard from '@/components/TaskCard.vue';
import { useTaskStore } from '@/stores/tasksStore';
import { endsWith } from 'lodash';

const tasksStore = useTaskStore();
let isEdit = ref(false);


const changeEdit = () => {
  isEdit.value = !isEdit.value;
  if(isEdit.value == false) {
    tasksStore.patchTasks();
  }
}

const toogleSelection = (element) => {
  element.isSelect = !element.isSelect;
}

</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">📋 Доска задач</h2>
        <p class="text-gray-600 dark:text-gray-400">Задачи, разделённые по статусам.</p>
      </div>
      <div class="flex space-x-2">
        <button v-if="isEdit" @click="tasksStore.deleteSelectedTasks" class="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Удалить выбранные задачи</button>
        <button @click="changeEdit" class="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
          {{ isEdit ? "Отменить редактирование" : "Режим редактирования" }}
        </button>
        <ModalWindow />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Колонка "В плане" -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">В плане</h3>
        <draggable 
          v-model="tasksStore.inPlanTasks" 
          item-key="id" 
          group="tasks" 
          :disabled="!isEdit"
          @change="tasksStore.updateTaskStatus('Plan')"
        >
          <template #item="{ element }">
            <TaskCard
              :element="element"
              :isEdit="isEdit"
              :is-select="element.isSelect"
              :toogleSelection="toogleSelection"
              :class="{ shake: isEdit }"
              class="mb-4"
            />
          </template>
        </draggable>
      </div>

      <!-- Колонка "В работе" -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">В работе</h3>
        <draggable 
          v-model="tasksStore.inProcesTasks" 
          item-key="id" 
          group="tasks" 
          :disabled="!isEdit"
          @change="tasksStore.updateTaskStatus('InProces')"
        >
          <template #item="{ element }">
            <TaskCard
              :element="element"
              :isEdit="isEdit"
              :is-select="element.isSelect"
              :toogleSelection="toogleSelection"
              :class="{ shake: isEdit }"
              class="mb-4"
            />
          </template>
        </draggable>
      </div>

      <!-- Колонка "Завершено" -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Выполнено</h3>
        <draggable 
          v-model="tasksStore.endedTasks" 
          item-key="id" 
          group="tasks" 
          :disabled="!isEdit"
          @change="tasksStore.updateTaskStatus('Ended')"
        >
          <template #item="{ element }">
            <TaskCard
              :element="element"
              :isEdit="isEdit"
              :is-select="element.isSelect"
              :toogleSelection="toogleSelection"
              :class="{ shake: isEdit }"
              class="mb-4"
            />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(1.5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(1.5deg); }
  100% { transform: rotate(0deg); }
}

.shake {
  animation: shake 0.8s infinite;
}
</style>