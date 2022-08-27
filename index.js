const LSInput = document.querySelector("#LS-input")
const LSSubmit = document.querySelector("#LS-submit")
const LSTodo = document.querySelector(".LS-todo")
const LSErr = document.querySelector(".LS-input-err")

let todoData = JSON.parse(localStorage.getItem("todoData")) || []

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
const createTodoData = (todoText) => {
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
    LSTodo.innerHTML = ""
    if (todoData) {
        todoData.forEach((todo) => {
            LSTodo.insertAdjacentElement("afterbegin", createTodo(todo))
        })
    }
}
renderTodo()

const LSSubmitHandler = (e) => {
    e.preventDefault()

    if (LSInput.value.length >= 5) {
        LSErr.textContent = ""
        const todoText = LSInput.value
        insertTodo(createTodo(createTodoData(todoText)))
        LSInput.value = ""
    } else {
        LSErr.textContent = "Invalid todo length. Min length - 5 letters"
    }
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
