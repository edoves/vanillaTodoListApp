let form = document.getElementById('form')
let todoInput = document.getElementById('todoInput')
let todoList = document.querySelector('.todo__list')
let todo__header = document.querySelector('.todo__header')
const fragment = document.createDocumentFragment()

// array of todos from localStorage
let todos = storeToLocalStorage()

eventListener()
function eventListener() {
  document.addEventListener('DOMContentLoaded', loadTodosFromStorage)

  form.addEventListener('submit', submitTodos)
  todoList.addEventListener('click', listOptions)
}

function submitTodos(e) {
  e.preventDefault()
  let todo = todoInput.value

  if (!todo) {
    uiConfirmMessage('The field is empty', 'alert alert-danger')
  } else {
    uiDisplayTodoItem(todo)
    addToLocalStorage(todo)
    uiConfirmMessage('Todos added', 'alert alert-success')

    this.reset()
  }
}

function uiConfirmMessage(msg, cls) {
  const spanEl = document.createElement('span')
  spanEl.textContent = msg
  spanEl.classList = cls

  todaysDate.insertAdjacentElement('afterend', spanEl)

  setTimeout(() => {
    spanEl.remove()
  }, 1000)
}

function uiDisplayTodoItem(todo, status) {
  const li = document.createElement('li')
  li.classList.add('bounceIn')

  if (status) {
    li.classList = 'checked'
    li.innerHTML = `<span class="text">${todo}</span>
  <div class="options">
    <span id="undo"><i class="fas fa-undo"></i></span>
    <span id="trash"><i class="fa fa-trash"></i></span>
  </div>`
  } else {
    li.innerHTML = `<span class="text">${todo}</span>
    <div class="options">
      <span id="check"><i class="fa fa-check"></i></span>
      <span id="edit"><i class="fa fa-edit"></i></span>
      <span id="trash"><i class="fa fa-trash"></i></span>
    </div>`
  }
  fragment.appendChild(li)
  todoList.appendChild(fragment)
}

function listOptions(e) {
  let item = e.target

  if (item.classList.contains('fa-trash') || item.id === 'trash') {
    uiDeleteToDoItem(item)
  } else if (item.classList.contains('fa-check') || item.id === 'check') {
    uiDoneToDoItem(item)
  } else if (item.classList.contains('fa-undo') || item.id === 'undo') {
    uiUndoTodoItem(item)
  }
}

function uiDeleteToDoItem(item) {
  const todoItemEl = item.closest('li')
  todoItemEl.classList.remove('bounceIn')
  todoItemEl.classList.add('bounceOutDown')
  setTimeout(() => {
    todoItemEl.remove()
  }, 1000)

  item = item.closest('li').firstChild.textContent

  // todos.forEach((todo, idx) => {
  //   if (todo === item) {
  //     todos.splice(idx, 1)
  //   }
  // })
  // delete from localstorage
  todos = todos.filter(({ todo }) => item !== todo)

  localStorage.setItem('todos', JSON.stringify(todos))
}

function uiDoneToDoItem(item) {
  const todoItemEl = item.closest('li')
  todoItemEl.classList.add('checked')
  item = item.closest('li').firstChild.textContent
  doneToDoItemToLocalStorage(item)
}

function uiUndoTodoItem(item) {
  const todoItemEl = item.closest('li')
  todoItemEl.classList.remove('checked')
  item = item.closest('li').firstChild.textContent
  undoToDoItemToLocalStorage(item)
}

// setup date to insert to localstorage
function storeToLocalStorage() {
  let todos
  let storage = localStorage.getItem('todos')
  if (storage === null) {
    todos = []
  } else {
    todos = JSON.parse(storage)
  }
  return todos
}

// Load data from localstorage when the page loads
function loadTodosFromStorage() {
  todos.forEach(({ todo, status }) => {
    uiDisplayTodoItem(todo, status)
  })
}

// add todo into the localstorage
function addToLocalStorage(todo) {
  todos.push({ id: todos.length + 1, todo, status: false })

  localStorage.setItem('todos', JSON.stringify(todos))
}

//
function doneToDoItemToLocalStorage(item) {
  // turn status to true
  todos.forEach((todo) => {
    if (todo.todo === item) {
      todo.status = true
    }
  })

  rerenderData()
}

function undoToDoItemToLocalStorage(item) {
  // turn status to false
  todos.forEach((todo) => {
    if (todo.todo === item) {
      todo.status = false
    }
  })

  rerenderData()
}

function rerenderData() {
  // delete every first element in UL element
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild)
  }

  // rerender UI
  loadTodosFromStorage()

  // remove bounceIn class in every li
  let chectLi = Array.from(todoList.children)
  chectLi.forEach((li) => {
    console.log(li.classList.remove('bounceIn'))
  })

  // update status to true in local storage
  localStorage.setItem('todos', JSON.stringify(todos))
}
