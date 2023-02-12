let form = document.getElementById('form')
let todoInput = document.getElementById('todoInput')
let todoList = document.querySelector('.todo__list')
let todo__header = document.querySelector('.todo__header')
const fragment = document.createDocumentFragment()

eventListener()
function eventListener() {
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

function uiDisplayTodoItem(todo) {
  const li = document.createElement('li')
  li.classList.add('bounceIn')
  li.innerHTML = `<span class="text">${todo}</span>
  <div class="options">
    <span id="check"><i class="fa fa-check"></i></span>
    <span id="edit"><i class="fa fa-edit"></i></span>
    <span id="trash"><i class="fa fa-trash"></i></span>
  </div>`
  fragment.appendChild(li)
  todoList.appendChild(fragment)
}

function listOptions(e) {
  deleteToDoIten(e.target)
}

function deleteToDoIten(item) {
  if (item.classList.contains('fa-trash') || item.id === 'trash') {
    const todoItemEl = item.closest('li')
    todoItemEl.classList.remove('bounceIn')
    todoItemEl.classList.add('bounceOutDown')
    setTimeout(() => {
      todoItemEl.remove()
    }, 1000)
  }
}
