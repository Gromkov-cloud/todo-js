const LSInput = document.querySelector("#LS-input")
const LSSubmit = document.querySelector("#LS-submit")
const LSTodo = document.querySelector(".LS-todo")

let todoData = JSON.parse(localStorage.getItem("todoData")) || []
// console.log(todoData)
// console.log(localStorage)

const createTodo = (todo) => {
    const TODO = document.createElement("li")
    TODO.textContent = todo.todoText
    TODO.classList.add("todo-item")
    TODO.insertAdjacentHTML(
        "beforeend",
        `
        <div class="todo-close" data-todo-close="${todo.todoId}">&times;</div>
    `
    )

    return TODO
}
const createTodoData = todoText => {
    const todo = {
        todoId: Math.random(),
        todoText: todoText, 
    }
    todoData.push(todo)
    updateLocalStorage(todoData)

    return todo
}
const updateLocalStorage = (todoData) => {
    localStorage.setItem("todoData", JSON.stringify(todoData))
}
const insertTodo = (todo) => {
    LSTodo.insertAdjacentElement("afterbegin", todo)
}

const renderTodo = () => {
    LSTodo.innerHTML = ''
    if (todoData) {
        todoData.forEach((todo) => {
            LSTodo.insertAdjacentElement("afterbegin", createTodo(todo))
        })
    }
}
renderTodo()

const LSSubmitHandler = (e) => {
    e.preventDefault()
    const todoText = LSInput.value

    insertTodo(createTodo(createTodoData(todoText)))
}
const LSTodoClickHandler = (e) => {
    if (e.target.dataset.todoClose) {
        todoData = todoData.filter(
            (todo) => todo.todoId !== +e.target.dataset.todoClose
        )
        updateLocalStorage(todoData)
        renderTodo()
    }
}

LSSubmit.addEventListener("click", (e) => LSSubmitHandler(e))
LSTodo.addEventListener("click", (e) => LSTodoClickHandler(e))
