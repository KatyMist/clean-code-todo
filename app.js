const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createTaskItem = function (taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  // innerText, not innerHTML: the task text is user input and must not be parsed as HTML
  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskItem(newTaskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);

  newTaskInput.value = '';
};

const toggleTaskEdit = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
};

const markTaskCompleted = function () {
  const listItem = this.parentNode;
  completedList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  const listItem = this.parentNode;
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (listItem, onCheckboxChange) {
  const checkbox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = toggleTaskEdit;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], markTaskCompleted);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i], markTaskIncomplete);
}
