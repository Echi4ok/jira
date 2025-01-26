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
    задачи бэклога не отображаются потому что я в саму карточку передал много всякой дряни по типу isEdit и прочая, кароч это надо будет решить 

    <!-- Список задач -->
    <div class="space-y-4">
      <TaskCard v-for="task in tasksStore.inPlanTasks" 
            :key="task.id"
            :creator="task.creator"
            :title="task.title"
            :description = "task.description"
            :status="task.status"
            />
    </div>
  </div>
</template>

