<script setup>
const props = defineProps({
  element: Object,
  isEdit: Boolean,
  isSelect: Boolean,
  toogleSelection: Function,
  editFunction: Function,
});
</script>

<template>
  <div v-if="element" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
    <h3 class="font-medium text-gray-800 dark:text-gray-200">{{ element.title }}</h3>
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ element.description }}</p>
    <div class="mt-2 flex items-center space-x-2">
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ element.creator }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">•</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ element.status }}</span>
      <div 
        v-if="isEdit" 
        @click="toogleSelection(element)" 
        class="absolute top-2 right-2 w-6 h-6 border-2 border-black rounded-md flex items-center justify-center cursor-pointer bg-white hover:border-blue-500"
      >
        <span v-if="isSelect" class="checkmark">✔</span>
      </div>
      <button v-if="isEdit" @click="props.editFunction(element)" class="absolute top-15 right-2 h-6 p-1 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors duration-200">Редактировать</button>
    </div>
  </div>
  <div v-else>
    <p>Задача не найдена.</p>
  </div>
</template>

