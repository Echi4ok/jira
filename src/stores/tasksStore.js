import { ref, computed, onMounted, watchEffect, watch } from 'vue'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', () => {
  let tasksArr = ref([]); // масиив  данных со всеми задачами
  let endedTasks = ref([]); // массив с отфильтованными задачами со статусом "завершено"
  let inProcesTasks = ref([]); // массив с отфильтованными задачами со статусом "в процессе"
  let inPlanTasks = ref([]); // массив с отфильтованными задачами со статусом "в плане"
  // ну ваще так то апишка мне позволяет сразу обращаться к ней с параметрами и получать сразу отфильтрованный массив без всей этой параши
  // ну я так подумал это примено столько же кода будет + кто я такой чтобы искать легкие пути


  function filterEnd() {
    endedTasks.value = endedTasks.value.filter((task) => { // фильтруем массив
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
   }

  function getTasks() {
    axios.get('https://f8385ab52a8f6d50.mokky.dev/tasks')
    .then((res) => {
      tasksArr.value = res.data;
      tasksArr.value = tasksArr.value.map((task) => { // на стороне клиента добавляем у каждого обьекта поле isSelect
        return task = {...task, isSelect: false};
      })
      console.log(tasksArr.value);
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

  function deleteSelectedTasks () {
    let checkArr = ref([]);
    checkArr.value = inPlanTasks.value.concat(inProcesTasks.value, endedTasks.value)
    checkArr.value = checkArr.value.filter((el) => el.isSelect == true);
    if(checkArr.value.length != 0) {
    inPlanTasks.value = inPlanTasks.value.filter((el) => el.isSelect == false); // в массив падают только те задачи которые не были выбраны
    inProcesTasks.value = inProcesTasks.value.filter((el) => el.isSelect == false); // в массив падают только те задачи которые не были выбраны
    endedTasks.value = endedTasks.value.filter((el) => el.isSelect == false); // в массив падают только те задачи которые не были выбраны
    patchTasks();
    } else {
      alert('Выберите задачи, которые хотите удалить')
    }
  }

  function patchTasks() { // обновление задач после перетаскивания между колонками либо после удаления
  tasksArr.value = inPlanTasks.value.concat(inProcesTasks.value, endedTasks.value) // склеиваем все массивы для того чтобы отправить и обновить все задачи на серваке
  axios.patch('https://f8385ab52a8f6d50.mokky.dev/tasks', tasksArr.value)
  .then((res) => {
    console.log(res);
    alert('Данные успешно обновлены');
  })
  .catch((err) => {
    console.error(err); 
    alert('Произошла ошибка');
  });
  }

  function patchOneTask(updatedTask) { 
    console.log(updatedTask)
    axios.patch(`https://f8385ab52a8f6d50.mokky.dev/tasks/${updatedTask.id}`, updatedTask)
    .then((res) => {
      let responseTask = res.data;
      inPlanTasks.value = inPlanTasks.value.filter((el) => el.id !== responseTask.id);
      inProcesTasks.value = inProcesTasks.value.filter((el) => el.id !== responseTask.id);
      endedTasks.value = endedTasks.value.filter((el) => el.id !== responseTask.id);

      switch (responseTask.status) {
        case "В плане" :
        inPlanTasks.value.push(responseTask);
        break;  
        case "В работе" :
        inProcesTasks.value.push(responseTask);
        break;
        case "Завершено" :
        endedTasks.value.push(responseTask);
        break;
      }
      alert('Данные таски успешно обновлены');
    })
    .catch((err) => {
      console.error(err); 
      alert('Произошла ошибка');
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

  function postTask (newTask) {
    axios.post("https://f8385ab52a8f6d50.mokky.dev/tasks", newTask)
    .then((res) => {
      if(newTask.status == "В плане") {
        inPlanTasks.value.push(res.data);
      } else if(newTask.status == "В работе") {
        inProcesTasks.value.push(res.data);
      } else if (newTask.status == "Завершено") {
        endedTasks.value.push(res.data);
      } 
      alert('Новая таска успешно создана')
    }).catch((err) => {
      console.log(err)
      alert("Произошла ошибка")
    })
  }

 


// сдлеать так чтобы если пользователь не сделает изменений то не отправлять запрос на сервер
  

  onMounted(getTasks);
  return { getTasks, tasksArr, endedTasks, inProcesTasks, inPlanTasks, filterEnd, filterInProces, filterInPlan, updateTaskStatus, patchTasks, postTask, deleteSelectedTasks, patchOneTask }
})
