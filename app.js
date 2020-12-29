// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeneres

loadEventListeners();

// load all event listeners

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // add a task event
  form.addEventListener('submit',addTask);
  // remove a task event
  taskList.addEventListener('click',removeTask);
  // clear all tasks
  clearBtn.addEventListener('click',removeAllTasks);
  // filter task event
  filter.addEventListener('keyup',filterTasks);
}

// load DOM content from LS

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // create a li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    // create a Text Node and append it to li
    li.appendChild(document.createTextNode(task));
    // create a new link element
    const link = document.createElement('a');
    // add a class
    link.className = 'delete-item secondary-content';
    // add a icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

  })
}

// add a event
function addTask(e){
  if(taskInput.value === ''){
    alert('add a task');
  }
  else{
    // create a li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    // create a Text Node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create a new link element
    const link = document.createElement('a');
    // add a class
    link.className = 'delete-item secondary-content';
    // add a icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  }

    // Store in Local storage

    storeTaskInLocalStorage(taskInput.value);

    // clear input

    taskInput.value = "";

    e.preventDefault();
    
  
}

// remove task event

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure ?')){
    e.target.parentElement.parentElement.remove();
    
    // remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  }

  }
}
//remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
// remove All Tasks

function removeAllTasks(e){
  if(confirm('Are you sure to clear all tasks?'))
  {
    // method-1
    // const lis = document.querySelectorAll('.collection-item');
   
    // lis.forEach(function(l){
      
    //   l.remove();
    // })

    // method-2 (not that Faster)
    //taskList.innerHTML = '';

    // method-3 (Faster)

    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTasksFromLocalStorage();

  }
}

// clear from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// filter tasks

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  const list = document.querySelectorAll('.collection-item');
  list.forEach(function(li){
    const item = li.firstChild.textContent;
    
     if(item.toLowerCase().indexOf(text)!=-1){
       li.style.display = 'block';

     }else{
          li.style.display = 'none';
     }
  })
}

// add a task to local storage

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
