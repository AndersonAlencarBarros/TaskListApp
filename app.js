// Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo");

// Events
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodoTask);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);

// Functions 
function addTodoTask(event) { 
    // Impede a página de atualizar
    event.preventDefault();
    // Adiciona uma div que é a atividade a ser realizada
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // adiciona o li ao todoDiv
    const newTodo = document.createElement("li");
    newTodo.textContent = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // adiciona para o armazenamento local
    saveLocalTodos(todoInput.value);
    // adiciona o botão de completar ao todoDiv
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // adiciona o botão de remover ao todoDiv
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // adiciona a lista
    todoList.appendChild(todoDiv);
    // limpa a caixa de texto
    todoInput.value = "";
}
 
function deleteAndCheck(e) {
    const item = e.target; 
    // Deletar tarefa
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement; 
        // A classe "fall" é responsável pela animação
        todo.classList.add("fall");
        // Deleta do localStorage
        removeLocalTodos(todo);
        // Após a animação, o elemento é removido da DOM
        todo.addEventListener("transitionend", ()=>{
            todo.remove();
        });
    } 

    // Completar tarefa
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement; 
        todo.classList.toggle("completed");
    } 
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo)=>{
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } 
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } 
                break;
        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    // verifica se há algo armazenado no localStorage
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    // verifica se há algo armazenado no localStorage
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo)=>{
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // adiciona o li ao todoDiv
        const newTodo = document.createElement("li");
        newTodo.textContent = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); 
        // adiciona o botão de completar ao todoDiv
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // adiciona o botão de remover ao todoDiv
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // adiciona a lista
        todoList.appendChild(todoDiv); 
    });
}

function removeLocalTodos(todo) {
    let todos;
    // verifica se há algo armazenado no localStorage
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoName = todo.children[0].innerText; 
    todos.splice(todos.indexOf(todoName), 1); 
    localStorage.setItem("todos", JSON.stringify(todos)); 
}