const todoForm = document.getElementById('form')
const todoInput = document.getElementById('todoInput')
const todoList = document.querySelector('.todo__list')

const fragment = document.createDocumentFragment()

let todos = storeToLocalStorage()

eventListener()
function eventListener() {
  document.addEventListener('DOMContentLoaded', loadTodosFromStorage)

  form.addEventListener('submit', submitTodos)
  todoList.addEventListener('click', listOptions)
}

function submitTodos(e) {
  e.preventDefault()
  const item = todoInput.value

  if (!item) {
    uiRenderMessage('The input field is empty', 'alert alert-danger')
  } else {
    const todo = {
      id: randomId(),
      item,
      status: false,
    }
    todos.push(todo)

    uiRenderMessage('Todos added', 'alert alert-success')

    if (todos.length === 1) todoList.innerHTML = ''

    uiRenderTodos(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
  }

  this.reset()
}

function uiRenderTodos(todo) {
  const htmlTagLi = document.createElement('li')
  // htmlTagLi.classList = todo.status ? 'checked' : ''
  htmlTagLi.setAttribute('data-id', todo.id)
  htmlTagLi.classList.add('bounceIn')

  if (todo.status) {
    htmlTagLi.classList = 'checked'
    htmlTagLi.innerHTML = `
    <div class="list">      
        <input type="text" class="text" value="${todo.item}" readonly />    
    </div>
    <div class="options">
    <span id="undo"><i class="fas fa-undo"></i></span>
    <span id="trash"><i class="fa fa-trash"></i></span>
    </div>`
  } else {
    htmlTagLi.innerHTML = `
    <div class="list">
      <form>
        <input type="text" class="text" value="${todo.item}" readonly />
      </form>
    </div>
    <div class="options">
      <span id="check"><i class="fa fa-check"></i></span>
      <span id="edit"><i class="fa fa-edit"></i></span>
      <span id="trash"><i class="fa fa-trash"></i></span>
    </div>`
  }

  fragment.appendChild(htmlTagLi)
  todoList.appendChild(fragment)
}

function listOptions(e) {
  // Edit function
  editOption(e)

  // check if todo item is already done set to true
  todoStatus(e)

  // undo todoStatus function set to false
  undoTodoStatus(e)

  // undo todoStatus function set to false
  trashOption(e)
}

function editOption(e) {
  const editBtn = e.target.closest('#edit')

  if (!editBtn) return
  const htmlTagLi = e.target.closest('li')

  const form = htmlTagLi.querySelector('form')
  const input = htmlTagLi.querySelector('input')

  editBtn.parentElement.classList.remove('options')
  editBtn.parentElement.classList.add('none')

  if (input.hasAttribute('readonly')) {
    input.removeAttribute('readonly')
    input.focus()
    input.style.color = '#fca1a1'
  }

  form.addEventListener('submit', updateTodoItem)
}

function todoStatus(e) {
  const checkBtn = e.target.closest('#check')

  if (!checkBtn) return
  const htmlTagLi = e.target.closest('li')
  const input = htmlTagLi.querySelector('input')

  const id = htmlTagLi.dataset.id
  const index = todos.findIndex((todo) => todo.id === id)

  // toggle status from false to true
  todos[index].status = true

  reRenderData()
}

function undoTodoStatus(e) {
  const checkBtn = e.target.closest('#undo')

  if (!checkBtn) return
  const htmlTagLi = e.target.closest('li')
  const id = htmlTagLi.dataset.id
  const index = todos.findIndex((todo) => todo.id === id)

  // toggle status from false to true
  todos[index].status = false

  reRenderData()
}

function trashOption(e) {
  const trash = e.target.closest('#trash')

  if (!trash) return
  const htmlTagLi = e.target.closest('li')
  htmlTagLi.classList.remove('bounceIn')
  htmlTagLi.classList.add('bounceOutDown')

  const id = htmlTagLi.dataset.id

  todos = todos.filter((todo) => todo.id !== id)

  localStorage.setItem('todos', JSON.stringify(todos))

  setTimeout(() => {
    htmlTagLi.remove()
  }, 1000)
}

function updateTodoItem(e) {
  e.preventDefault()
  const htmlTagLi = this.closest('li')
  const input = htmlTagLi.querySelector('input')
  const options = htmlTagLi.querySelector('.none')

  options.classList.remove('none')
  options.classList.add('options')

  input.setAttribute('readonly', '')
  input.style.color = 'white'

  const id = htmlTagLi.dataset.id
  const index = todos.findIndex((todo) => todo.id === id)
  todos[index].item = input.value

  localStorage.setItem('todos', JSON.stringify(todos))
}

function uiRenderMessage(msg, cls) {
  const spanEl = document.createElement('span')
  spanEl.textContent = msg
  spanEl.classList = cls

  todaysDate.insertAdjacentElement('afterend', spanEl)

  setTimeout(() => {
    spanEl.remove()
  }, 1000)
}

function reRenderData() {
  // delete every first element in UL element
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild)
  }

  // rerender UI
  loadTodosFromStorage()

  // remove bounceIn class in every li
  let chectLi = Array.from(todoList.children)
  chectLi.forEach((li) => {
    li.classList.remove('bounceIn')
  })

  // update date from localstorage
  localStorage.setItem('todos', JSON.stringify(todos))
}

function loadTodosFromStorage() {
  if (todos.length === 0) {
    todoList.innerHTML = '<p class="empty_message">Todos will go here</p>'
  } else {
    todos.map((todo) => uiRenderTodos(todo))
  }
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

//taken from the internet
function randomId() {
  const s4 = () => {
    return Math.floor(1 + Math.random() * 0x10000)
      .toString(16)
      .substring(1)
  }
  return `${s4()}-${s4()}`
}
