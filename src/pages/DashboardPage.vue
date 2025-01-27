<script setup>
import { onMounted, ref, watch } from 'vue'
import { useTaskStore } from '@/stores/tasksStore'
import { Chart, registerables } from 'chart.js'

// Регистрируем необходимые модули Chart.js
Chart.register(...registerables)

const tasksStore = useTaskStore()
const chartCanvas = ref(null) // Ссылка на canvas для графика
let chart = null // Переменная для хранения экземпляра графика

// Функция для создания/обновления графика
const updateChart = () => {
  if (!chart) {
    const ctx = chartCanvas.value.getContext('2d')
    chart = new Chart(ctx, {
      type: 'bar', // Тип графика (столбчатый)
      data: {
        labels: ['Всего задач', 'Завершено', 'В работе'], 
        datasets: [
          {
            label: 'Количество задач',
            backgroundColor: ['#3b82f6', '#10B981', '#EF4444'], 
            borderColor: ['#3b82f6', '#10B981', '#EF4444'],
            borderWidth: 1,
            data: [
              tasksStore.tasksArr.length, // Всего задач
              tasksStore.endedTasks.length, // Завершено
              tasksStore.inProcesTasks.length // В работе
            ]
          }
        ]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  } else {
    chart.data.datasets[0].data = [
      tasksStore.tasksArr.length,
      tasksStore.endedTasks.length,
      tasksStore.inProcesTasks.length
    ]
    chart.update() // Обновляем график
  }
}

onMounted(() => {
  updateChart() 
})

// Отслеживаем изменения в данных и обновляем график
watch(
  () => [tasksStore.tasksArr, tasksStore.endedTasks, tasksStore.inProcesTasks],
  () => {
    updateChart() // Обновляем график при изменении данных
  },
  { deep: true }
)
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">📊 Дашборд</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Общая статистика по проекту.</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Карточка "Всего задач" -->
      <div class="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Всего задач</h3>
        <p class="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-2">{{ tasksStore.tasksArr.length }}</p>
      </div>

      <!-- Карточка "Завершено" -->
      <div class="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Завершено</h3>
        <p class="text-3xl font-bold text-green-500 dark:text-green-400 mt-2">{{ tasksStore.endedTasks.length }}</p>
      </div>

      <!-- Карточка "В работе" -->
      <div class="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">В работе</h3>
        <p class="text-3xl font-bold text-red-500 dark:text-red-400 mt-2">{{ tasksStore.inProcesTasks.length }}</p>
      </div>
    </div>

    <!-- График -->
    <div class="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>