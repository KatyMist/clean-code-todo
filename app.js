const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createElement = function (tagName, properties) {
  const element = document.createElement(tagName);
  Object.assign(element, properties);
  return element;
};

const createDeleteButton = function () {
  const deleteButton = createElement('button', { className: 'delete' });
  deleteButton.appendChild(createElement('img', { src: './remove.svg' }));
  return deleteButton;
};

const createTaskItem = function (taskText) {
  const listItem = document.createElement('li');
  listItem.append(
    createElement('input', { type: 'checkbox' }),
    // innerText, not innerHTML: the task text is user input and must not be parsed as HTML
    createElement('label', { className: 'task', innerText: taskText }),
    createElement('input', { type: 'text', className: 'task' }),
    createElement('button', { className: 'edit', innerText: 'Edit' }),
    createDeleteButton(),
  );
  return listItem;
};

const appendTask = function (listItem, list, onCheckboxChange) {
  list.appendChild(listItem);
  bindTaskEvents(listItem, onCheckboxChange);
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskItem(newTaskInput.value);
  appendTask(listItem, todoList, markTaskCompleted);
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
  this.parentNode.remove();
};

const markTaskCompleted = function () {
  appendTask(this.parentNode, completedList, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  appendTask(this.parentNode, todoList, markTaskCompleted);
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

const bindListEvents = function (list, onCheckboxChange) {
  for (const listItem of list.children) {
    bindTaskEvents(listItem, onCheckboxChange);
  }
};

bindListEvents(todoList, markTaskCompleted);
bindListEvents(completedList, markTaskIncomplete);
