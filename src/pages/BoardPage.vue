<script setup>
import {ref} from 'vue';
import { VueDraggable } from 'vuedraggable';
import ModalWindow from '@/components/ModalWindow.vue';
import TaskCard from '@/components/TaskCard.vue';
import { useTaskStore } from '@/stores/tasksStore';

const tasksStore = useTaskStore();
let isEdit = ref(false);

const changeEdit = () => {
  isEdit.value = !isEdit.value;
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">📋 Доска задач</h2>
        <p class="text-gray-600 dark:text-gray-400">Задачи, разделённые по статусам.</p>
      </div>
      <!-- Кнопка "Создать задачу" справа -->
      <button @click="changeEdit">{{isEdit ? "Отменить редактирование" : "Режим редактирования"}}</button>
      <ModalWindow/>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Колонка "В плане" -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">В плане</h3>
        <div class="space-y-4">
          <TaskCard
            :class="{shake : isEdit}"
            v-for="task in tasksStore.inPlanTasks"
            :key="task.id"
            :creator="task.creator"
            :title="task.title"
            :description="task.description"
            :status="task.status"
          />
        </div>
      </div>

      <!-- Колонка "В работе" -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">В работе</h3>
        <div class="space-y-4">
          <TaskCard
            class="item"
            v-for="task in tasksStore.inProcesTasks"
            :key="task.id"
            :creator="task.creator"
            :title="task.title"
            :description="task.description"
            :status="task.status"
          />
        </div>
      </div>

      <!-- Колонка "Завершено" -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Выполнено</h3>
        <div class="space-y-4">
          <TaskCard
            :class="{shake : isEdit}"
            v-for="task in tasksStore.endedTasks"
            :key="task.id"
            :creator="task.creator"
            :title="task.title"
            :description="task.description"
            :status="task.status"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

.shake {
  animation: shake 0.2s infinite;
}
</style>