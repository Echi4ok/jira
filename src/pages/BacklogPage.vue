<script setup>
import TaskCard from '@/components/TaskCard.vue';
import { useTaskStore } from '@/stores/tasksStore';

const tasksStore = useTaskStore();
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">📂 Бэклог</h2>
        <p class="text-gray-600 dark:text-gray-400">Задачи, которые ещё не начаты.</p>
      </div>
    </div> 

    <!-- Список задач -->
    <div class="space-y-4">
      <TaskCard v-for="element in tasksStore.inPlanTasks" 
            :key="element.id"
            :element="element"
            />
    </div>
  </div>
</template>

