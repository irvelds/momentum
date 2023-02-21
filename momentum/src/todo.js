const todoBtn = document.querySelector('.todo-btn');
const todoContainer = document.querySelector('.todo-widget-container');
const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.todo-add-new-btn');
const todoList = document.querySelector('.todo-list');
const todoDescription = document.querySelector('.todo-description');


/*Открываем, прячем TodoWidget по кнопке*/
todoBtn.addEventListener('click', () => {
    if (todoContainer.classList.contains('active')) {
        todoContainer.classList.remove('active')
    }
    else {
        todoContainer.classList.add('active');
        initTodo();
    }

})


let id = localStorage.getItem('todoId') ? +localStorage.getItem('todoId') : 0;
let todo = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
let todoDone = JSON.parse(localStorage.getItem('todoDone')) ? JSON.parse(localStorage.getItem('todoDone')) : [];
let todoNone = JSON.parse(localStorage.getItem('todoNone')) ? JSON.parse(localStorage.getItem('todoNone')) : [];
let selectTodoItem1 = localStorage.getItem('selectTodoItem1') ? localStorage.getItem('selectTodoItem1') : 'all';
function initTodo() {
    if (todo.length === 0) {
        todoDescription.style.display = 'block';
        todoAddBtn.style.display = 'inline-block';
        todoInput.style.display = 'none';
    }
    else {
        todoDescription.style.display = 'none';
        todoInput.style.display = 'block';
    }
}


todoAddBtn.addEventListener('click', (e) => {
    todoInput.style.display = 'block';
    e.target.style.display = 'none';
})


class Todo {
    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}


const createTodoItemsTemplate = (todo) => {

    const li = document.createElement('li');
    li.classList.add('todo-items');

    const check = document.createElement('input');
    check.type = "checkbox";
    check.id = todo.id;
    check.classList.add('todo-check');
    check.checked = todo.completed;
    li.append(check);
    check.addEventListener('change', todoCompleted);

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark')
    li.append(checkmark);

    const text = document.createElement('div');
    text.id = `b${todo.id}`;
    text.contentEditable = "false";
    text.innerText = todo.title;
    text.classList.add('todo-val-input');
 

    text.addEventListener('input', todoChangeValue);


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
    li.append(delBtn);
    delBtn.addEventListener('click', deleteTodo)


    const editBtn = document.createElement('button');
    editBtn.id = `d${todo.id}`;
    editBtn.classList.add('todo-button', 'todo-edit');
    li.append(editBtn);
    editBtn.addEventListener('click', todoEdit)

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



const list2 = document.querySelector('#list2');

let filter = [
    { value: 'all', text: 'All', length: todo.length, checked: true },
    { value: 'done', text: 'Done', length: todoNone.length, checked: false},
    { value: 'none', text: 'Not yet', length: todoDone.length, checked: false},
]




function createTodoFilterTemplate(e){

    const input = document.createElement('input');
    input.classList.add('selectopt');
    input.type = "radio";
    input.name = "todo-item";
    input.value = e.value;
    input.id = e.value;
    input.setAttribute('checked', e.check )

    list2.append(input);

    const label = document.createElement('label');
    label.classList ="select-option";
    label.setAttribute('for', e.value);
    label.id = `lab-${e.value}`;
    label.innerText = e.text;

    const count = document.createElement('span');
    count.classList.add('count');
    count.innerText = e.length;
    label.appendChild(count);

    list2.append(label)

}

filter.forEach(e=>{
    createTodoFilterTemplate(e);
})



function createTodoList(todos) {
    todoList.innerHTML = '';
    if (todos.length > 0) {
        todos.forEach((todo) => {
            createTodoItemsTemplate(todo);
        }
        );
    }
}



// const list2 = document.querySelectorAll('#list2 .selectopt');

const form = document.querySelector('form');

form.elements["todo-item"].value = selectTodoItem1;
form.addEventListener('change', (e) => {

    selectTodoItem1 = e.target.value;
    if (e.target.value === 'all') {
        localStorage.setItem('selectTodoItem1', 'all');
        createTodoList(todo);
    }
    else if (e.target.value === 'done') {
        localStorage.setItem('selectTodoItem1', 'done');
        createTodoList(todoDone);
    }
    else if (e.target.value === 'none') {
        localStorage.setItem('selectTodoItem1', 'none');
        createTodoList(todoNone);
    }
    return selectTodoItem1
}
)

function setTodoList() {
    if (selectTodoItem1 == 'all') {
        createTodoList(todo);
    }
    else if (selectTodoItem1 == 'done') {
        createTodoList(todoDone);
    }
    else if (selectTodoItem1 == 'none') {
        createTodoList(todoNone);
    }
}

setTodoList();






function setTodoDone() {
    todoDone = todo.filter(todo => {
        return todo.completed == true;
    });
}
setTodoDone();

function setTodoNone() {
    todoNone = todo.filter(todo => {
        return todo.completed == false;
    });
}
setTodoNone();


function setCount(){
    filter[0].length = todo.length;
    document.querySelector('#lab-all span').innerText =  filter[0].length;
    filter[1].length = todoDone.length;
    document.querySelector('#lab-done span').innerText =  filter[1].length;
    filter[2].length = todoNone.length;
    document.querySelector('#lab-none span').innerText =  filter[2].length;
}

setCount();


todoInput.addEventListener('keypress', (event) => {
    if ((event.which === 13) && (todoInput.value !== '')) {
        id += 1;
        localStorage.setItem('todoId', id);
        let completed = false;
        selectTodoItem1 == 'done' ? completed = true : completed = false;
        todo.push(new Todo(id, todoInput.value, completed));
        setTodoDone();
        setTodoNone();
        setCount();
        saveTodoStorage();
        setTodoList();
        initTodo();
        todoInput.value = '';
      
    }
});

function todoChangeValue() {
    let item = todo.find(el => el.id == (this.id).slice(1));
    item.title = this.innerText.trim();
    setTodoDone();
    setTodoNone();
    saveTodoStorage();
}



function todoEdit() {
    const todoItemsEditInput = document.querySelectorAll('.todo-val-input');
    let item = Array.from(todoItemsEditInput).find(el => (el.id).slice(1) == (this.id).slice(1));
    item.contentEditable = "true";
    item.focus();
}

function todoCompleted() {
    let item = todo.find(el => el.id == this.id);
    item.completed = !item.completed;
    setTodoDone();
    setTodoNone();
    setCount();
    saveTodoStorage();
    setTodoList();
}


function deleteTodo() {
    todo = todo.filter(el => {
        return el.id != (this.id).slice(1)
    });
    setTodoDone();
    setTodoNone();
    setCount();
    saveTodoStorage();
    setTodoList();
    initTodo();
}




export function saveTodoStorage() {
    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('todoDone', JSON.stringify(todoDone));
    localStorage.setItem('todoNone', JSON.stringify(todoNone));
    // localStorage.setItem('selectTodoItem1',  selectTodoItem1);
}
window.addEventListener('beforeunload', saveTodoStorage);




export function getTodoStorage() {
    if (localStorage.getItem('todo')) {
        todo = JSON.parse(localStorage.getItem('todo'));
    }
    if (localStorage.getItem('todoDone')) {
        todoDone = JSON.parse(localStorage.getItem('todoDone'));
    }
    if (localStorage.getItem('todoNone')) {
        todoNone = JSON.parse(localStorage.getItem('todoNone'));
    }
    if (localStorage.getItem('selectTodoItem1')) {
        selectTodoItem1 = JSON.parse(localStorage.getItem('selectTodoItem1'));
    }
}

window.addEventListener('load', getTodoStorage);



