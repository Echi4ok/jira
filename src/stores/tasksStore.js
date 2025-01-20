import { ref, computed, onMounted } from 'vue'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', () => {
  let tasksArr = ref([]);
  let endedTasks = ref([]); // массив с отфильтованными задачами со статусом "завершено"
  let inProcesTasks = ref([]); // массив с отфильтованными задачами со статусом "в процессе"
  let inPlanTasks = ref([]); // массив с отфильтованными задачами со статусом "в плане"

  function filterEnd() {
    endedTasks.value = endedTasks.value.filter((task) => {
      return task.status == "Завершено";
    })
  }

  function filterInProces() {
   inProcesTasks.value = inProcesTasks.value.filter((task) => {
      return task.status == "В работе";
    })
  }

  function filterInPlan() {
    inPlanTasks.value = inPlanTasks.value.filter((task) => {
       return task.status == "В плане";
     })
     console.log(inPlanTasks.value.length)
   }

  function getTasks() {
    axios.get('https://f8385ab52a8f6d50.mokky.dev/tasks')
    .then((res) => {
      tasksArr.value = res.data;
      console.log(res.data);
      if(tasksArr.value.length) {
        endedTasks.value = cloneDeep(tasksArr.value); // делаем копии оригинального массива
        inProcesTasks.value = cloneDeep(tasksArr.value); // делаем копии оригинального массива
        inPlanTasks.value = cloneDeep(tasksArr.value); // делаем копии оригинального массива
      } else {
        throw new Error;
      }
    }).catch((err) => {
      alert(err.message)
    }).finally(() => {
      filterEnd();
      filterInProces();
      filterInPlan();
    })
  }
  
  function postTasks() {
    axios.get('')
    .then(() => {

    }).catch((err) => {
      alert(err.message)
    })
  }

  function patchTasks() {
    axios.get('')
    .then(() => {

    }).catch((err) => {
      alert(err.message)
    })
  }

  function deleteTasks() {
    axios.get('')
    .then(() => {

    }).catch((err) => {
      alert(err.message)
    })
  }

  onMounted(getTasks);
  return { getTasks, tasksArr, endedTasks, inProcesTasks, inPlanTasks, filterEnd, filterInProces, filterInPlan }
})
