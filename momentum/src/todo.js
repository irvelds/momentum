const todoBtn = document.querySelector('.todo-btn');
const todoContainer = document.querySelector('.todo-widget-container');
const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.todo-add-new-btn');
const todoList = document.querySelector('.todo-list');
const todoDescription = document.querySelector('.todo-description');

let todoItemsComplete;
let todoItemsDel;
// let todoItemsEditBtn;
// let todoItemsEditInput;
/*Открываем, прячем TodoWidget по кнопке*/
todoBtn.addEventListener('click', ()=>{
    //todoContainer.classList.toggle('active');
    if(todoContainer.classList.contains('active')){
        todoContainer.classList.remove('active')
    }
    else {
        todoContainer.classList.add('active');
        initTodo();
    }

})



let id = localStorage.getItem('todoId') ? +localStorage.getItem('todoId') : 0;
let todo = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : []


function initTodo(){
    if(todo.length === 0){
        todoDescription.style.display = 'block';
        todoAddBtn.style.display = 'inline-block';
        todoInput.style.display = 'none';
    }
    else {
        todoDescription.style.display = 'none';
        todoInput.style.display = 'block'; 
    }  
}


todoAddBtn.addEventListener('click', (e)=>{
    todoInput.style.display = 'block';
    e.target.style.display = 'none';
})


class Todo {
    constructor(id, title) {
        this.id  = id;
        this.title = title;
        this.completed = false;
    }
}


const createTodoItemsTemplate = (todo) => {
    const li = document.createElement('li');
    li.classList.add('todo-items');

    const check = document.createElement('input');
    check .type = "checkbox";
    check.id = todo.id;
    check.classList.add('todo-check');
    check.checked = todo.completed;
    li.append(check);
    check.addEventListener('change',  todoCompleted);

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark')
    li.append(checkmark);


    // const text = document.createElement('input');
    const text = document.createElement('div');
    text.id = `b${todo.id}`;
    text.contentEditable = "false";
    text.innerText = todo.title;
    // text.value = todo.title;
    text.classList.add('todo-val-input');
    // text.disabled = true;


    text.addEventListener('input',  todoChangeValue);


    text.addEventListener('keypress', (event) => {
        if ((event.which === 13)) {
            text.contentEditable = "false";
        }
      });

    const label = document.createElement('label');
    label.classList.add('todo-label');
    label.appendChild(text);
    li.append(label);


    const delBtn = document.createElement('button');
    delBtn.id = `c${todo.id}`;
    delBtn.classList.add('todo-button', 'todo-del');
    // delBtn.innerText = 'x';
    li.append(delBtn);
    delBtn.addEventListener('click',  deleteTodo)


    const editBtn = document.createElement('button');
    editBtn.id = `d${todo.id}`;
    editBtn.classList.add('todo-button', 'todo-edit');
    // editBtn.innerText = 'e';
    li.append(editBtn);
    editBtn.addEventListener('click',  todoEdit)




    todoList.prepend(li);

    // return `<div class="todo-items">
    // <input id="${todo.id}" name="check" ${todo.completed ? 'checked' : ''} class="todo-check" type="checkbox">
    // <label class="todo-label"  for="check">
    // <input id="b${todo.id}" type = "text" value="${todo.title}" disabled class="todo-val-input">
    // </label>
    // <button id="c${todo.id}" class="todo-del">del</button>
    // <button id="d${todo.id}" class="todo-edit">edit</button>
    // </div>`

   }

function createTodoList() {
    todoList.innerHTML = '';
    if (todo.length > 0) {
    todo.forEach((todo) => {
        createTodoItemsTemplate(todo)
    }
    );
}
}
createTodoList();





todoInput.addEventListener('keypress', (event) => {
    if ((event.which === 13) && (todoInput.value !== '')) {
      id += 1;
      localStorage.setItem('todoId', id);
      todo.push(new Todo(id, todoInput.value));
      saveTodoStorage();
      createTodoList();
      initTodo();
      todoInput.value = '';

    }
  });

function todoChangeValue(){

        let item = todo.find(el => el.id == (this.id).slice(1));
        item.title = this.innerText.trim();
        console.log(todo)
        // item.contentEditable = "false";
        saveTodoStorage();
        // createTodoList();
}



function todoEdit(){
        const todoItemsEditInput = document.querySelectorAll('.todo-val-input');
        let item = Array.from(todoItemsEditInput).find(el => (el.id).slice(1) == (this.id).slice(1));
        console.log(item)
        // item.disabled = false;
        item.contentEditable = "true";
        item.focus();
}

function todoCompleted(){
    let item = todo.find(el => el.id == this.id);
    item.completed = !item.completed;
    saveTodoStorage();
    createTodoList();
}


function deleteTodo(){
    todo = todo.filter(el =>{
        return el.id != (this.id).slice(1)
    });
    saveTodoStorage();
    createTodoList();
    initTodo();
}


export function saveTodoStorage() {
    localStorage.setItem('todo',  JSON.stringify(todo));
}
window.addEventListener('beforeunload', saveTodoStorage)

export function getTodoStorage() {
    if (localStorage.getItem('todo')) {
        todo = JSON.parse(localStorage.getItem('todo'));
    }
}
window.addEventListener('load', getTodoStorage);



