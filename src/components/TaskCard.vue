<script setup>
const props = defineProps({
  title: String,
  creator: String,
  description: String,
  status: String,
})
</script>

<template>
    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h3 class="font-medium text-gray-800 dark:text-gray-200">{{title}}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{creator}}</p>
              <div class="mt-2 flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{creator}}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">•</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ status }}</span>
              </div>
            </div>
</template>
