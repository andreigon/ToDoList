const addTaskBtn = document.querySelector('.input');
const taskInput = document.querySelector('.text');
const todosHolder = document.querySelector('.todos');

let tasks;
!localStorage.tasks ? tasks=[] : tasks=JSON.parse(localStorage.getItem('tasks'))


function Task(description) {
  this.description=description;
  this.complited=false;
}

const createTemplate = (task, index) =>{
  return `
   <li><span class="todo_task ${task.complited ? 'checked' : '' } " > ${task.description} </span> <input oneclick="completeTask(${index})" class="complete" type="checkbox" ${task.complited ? 'checked' : '' }></input> <button class="delet">delet</button></li>
`
}

const updateHTML=() =>{
  todosHolder.innerHTML= "" ;
    if(tasks.length > 0) {
      tasks.forEach((item, index) => {
        todosHolder.innerHTML += createTemplate(item, index);
      })
    }
  }

  updateHTML();

const updateStorage = () =>{
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = index => {
  console.log(index);
  tasks[index].complited = !tasks[index].complited
}

addTaskBtn.addEventListener('click',() =>{
  tasks.push(new Task(taskInput.value));
  updateStorage();
  updateHTML();
  taskInput.value = '';
})