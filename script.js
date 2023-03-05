const todoList = document.querySelector('.todoitems');
const itemsLeft = document.querySelector('.itemsleft');
const itemsStatus = document.querySelector('.itemsstatus');
const itemsClear = document.querySelector('.itemsclear');
const addTaskBtn = document.querySelector('#addtaskbtn');
const todoInput = document.querySelector('#todoinput');

let todos = [];

function addTodoItem(todoText) {
  const todoItem = {
    text: todoText,
    completed: false
  };
  todos.push(todoItem);
  renderTodoList();
}

function removeTodoItem(index) {
  todos.splice(index, 1);
  renderTodoList();
}

function toggleTodoItem(index) {
  todos[index].completed = !todos[index].completed;
  renderTodoList();
}

function filterTodoList(status) {
  let filteredTodos = todos;
  if (status === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (status === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }
  renderTodoList(filteredTodos);
}

function clearCompletedTodoItems() {
  todos = todos.filter(todo => !todo.completed);
  renderTodoList();
}

function countActiveTodoItems() {
  const count = todos.filter(todo => !todo.completed).length;
  itemsLeft.textContent = `${count} item${count === 1 ? '' : 's'} left`;
}

function renderTodoList(todosToRender = todos) {
  todoList.innerHTML = '';
  todosToRender.forEach((todo, index) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoitem');

    const check = document.createElement('div');
    check.classList.add('check');

    const checkmark = document.createElement('div');
    checkmark.classList.add('checkmark');
    checkmark.addEventListener('click', () => toggleTodoItem(index));

    if (todo.completed) {
      checkmark.innerHTML = '<img src="tick.png" height="16px" width="16px">';
      todoItem.classList.add('completed');
    }

    const todoText = document.createElement('div');
    todoText.classList.add('todotext');
    todoText.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => removeTodoItem(index));

    check.appendChild(checkmark);
    todoItem.appendChild(check);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
  });

  countActiveTodoItems();
}

todoInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTaskBtn.click();
  }
});

addTaskBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText.length) {
    addTodoItem(todoText);
    todoInput.value = '';
  }
});

itemsStatus.addEventListener('click', event => {
  if (event.target.tagName.toLowerCase() === 'span') {
    const status = event.target.textContent.toLowerCase();
    filterTodoList(status);
    itemsStatus.querySelectorAll('span').forEach(span => {
      span.classList.toggle('active', span.textContent.toLowerCase() === status);
    });
  }
});

itemsClear.addEventListener('click', clearCompletedTodoItems);

renderTodoList();











































