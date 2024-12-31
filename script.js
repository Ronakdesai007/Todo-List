const list = JSON.parse(localStorage.getItem("tasks")) || [];

const newTaskForm = document.querySelector(".form");
const newTaskInput = document.querySelector(".form__input");
const taskList = document.querySelector(".todo-list-container__list");
const taskTemplate = document.querySelector("#task-template");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(list));
}

function renderTasks() {
  taskList.innerHTML = "";
  list.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector(".task__checkbox");
    const label = taskElement.querySelector(".task__label");
    const deleteButton = taskElement.querySelector(".delete-button");
    const editButton = taskElement.querySelector(".edit-button");

    checkbox.checked = task.completed;
    label.textContent = task.name;

    // Attach event listeners
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
    });

    deleteButton.addEventListener("click", () => {
      const index = list.indexOf(task);
      if (index !== -1) {
        list.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    });

    editButton.addEventListener("click", () => {
      const newName = prompt("Edit Task", task.name);
      if (newName) {
        task.name = newName;
        saveTasks();
        renderTasks();
      }
    });

    taskList.appendChild(taskElement);
  });
}

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value.trim();
  if (!taskName) return;

  const newTask = { name: taskName, completed: false };
  list.push(newTask);
  saveTasks();
  renderTasks();
  newTaskInput.value = "";
});

renderTasks();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
