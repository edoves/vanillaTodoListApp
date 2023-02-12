let form = document.getElementById('form')
let todoInput = document.getElementById('todoInput')
let todoList = document.querySelector('.todo__list')
const fragment = document.createDocumentFragment()

eventListener()
function eventListener() {
  form.addEventListener('submit', submitTodos)
}

function submitTodos(e) {
  e.preventDefault()
  let todo = todoInput.value

  if (!todo) {
    console.log('nothing')
  } else {
    uiDisplayTodoItem(todo)
  }
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
