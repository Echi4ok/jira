import { ref, computed, onMounted, watchEffect } from 'vue'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', () => {
  let tasksArr = ref([]); // масиив  данных со всеми задачами
  let endedTasks = ref([]); // массив с отфильтованными задачами со статусом "завершено"
  let inProcesTasks = ref([]); // массив с отфильтованными задачами со статусом "в процессе"
  let inPlanTasks = ref([]); // массив с отфильтованными задачами со статусом "в плане"
  // ну ваще так то апишка мне позволяет сразу обращаться к ней с параметрами и получать сразу отфильтрованный массив без всей этой санины
  // ну я так подумал это примено столько же кода будет + кто я такой чтобы искать легкие пути

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

  function patchTasks() { // обновление задач после перетаскивания между колонками
  tasksArr.value = inPlanTasks.value.concat(inProcesTasks.value, endedTasks.value)// склеиваем все массивы для того чтобы отправить и обновить все задачи на серваке
  axios.patch('https://f8385ab52a8f6d50.mokky.dev/tasks', tasksArr.value)
  .then((res) => {
    console.log(res); // Посмотри структуру ответа в консоли
    alert(res.data.message || 'Данные успешно обновлены');
  })
  .catch((err) => {
    console.error(err); // Посмотри структуру ошибки в консоли
    alert(err.response?.data?.message || 'Произошла ошибка');
  });
  }
 // Plan, InProces, Ended
 const updateTaskStatus = (targetColumn) => {
  if (targetColumn === 'Plan') {
    inPlanTasks.value.forEach(task => task.status = 'В плане');
  } else if (targetColumn === 'InProces') {
    inProcesTasks.value.forEach(task => task.status = 'В работе');
  } else if (targetColumn === 'Ended') {
    endedTasks.value.forEach(task => task.status = 'Завершено');
  }

}; 

// сдлеать так чтобы если пользователь не сделает изменений то не отправлять запрос на сервер
  

  onMounted(getTasks);
  return { getTasks, tasksArr, endedTasks, inProcesTasks, inPlanTasks, filterEnd, filterInProces, filterInPlan, updateTaskStatus, patchTasks }
})
