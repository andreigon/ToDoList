const addTaskBtn = document.querySelector('.input');
const taskInput = document.querySelector('.text');
const todosHolder = document.querySelector('.todos');

let tasks;
!localStorage.tasks ? tasks=[] : tasks=JSON.parse(localStorage.getItem('tasks'))


let todoTaskElements=[];

function Task(description) {
  this.description=description;
  this.complited=false;
}

const createTemplate = (task, index) =>{
  return `
   <li><span class="todo_task ${task.complited ? 'checked' : '' } " > ${task.description} </span> <input onclick="completeTask(${index})" class="complete" type="checkbox" ${task.complited ? 'checked' : '' }></input> <button onclick="deleteTask(${index})" class="delet">delet</button></li>
`
}

const filterTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.complited == false)
  const complitedTask = tasks.length && tasks.filter(item => item.complited == true)
  tasks=[...activeTasks,...complitedTask];

}

const updateHTML=() =>{
  todosHolder.innerHTML= "" ;
    if(tasks.length > 0) {
      filterTasks();
      tasks.forEach((item, index) => {
        todosHolder.innerHTML += createTemplate(item, index);
      });
      todoTaskElements=document.querySelectorAll('.todo_task');
    }
  }

  updateHTML();

const updateStorage = () =>{
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = index => {
  tasks[index].complited = !tasks[index].complited;
  if(tasks[index].complited){
    todoTaskElements[index].classList.add('checked');
  } else{
    todoTaskElements[index].classList.remove('checked');
  }
  updateStorage();
  updateHTML();
}

addTaskBtn.addEventListener('click',() =>{
  tasks.push(new Task(taskInput.value));
  updateStorage();
  updateHTML();
  taskInput.value = '';
})

const deleteTask = index => {
  todoTaskElements[index].classList.add('action');
  setTimeout(() => {
    tasks.splice(index, 1);
    updateStorage();
    updateHTML() ;
  },1000)
}