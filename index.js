document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("new-task-form");
  const taskInput = document.getElementById("task-input");
  const tasksContainer = document.getElementById("tasks");
     // CARGAR TAREA
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ text, completed }) => addTaskToDOM(text, completed));
  };

  // GUARDAR TAREAS 
  const saveTasks = () => {
    const tasks = Array.from(tasksContainer.children).map((task) => ({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed"),
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // AGREGAR UNA NUEVA TAREA AL DOM
  const addTaskToDOM = (text, completed = false) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    if (completed) taskItem.classList.add("completed");

    const taskText = document.createElement("span");
    taskText.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";

    deleteButton.addEventListener("click", () => {
      taskItem.remove();
      saveTasks();
    });

    taskItem.addEventListener("click", () => {
      taskItem.classList.toggle("completed");
      saveTasks();
    });

    taskItem.append(taskText, deleteButton);
    tasksContainer.appendChild(taskItem);
  };

  // ENVIOS DE FORMULARIO 
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    addTaskToDOM(taskText);
    saveTasks();

    taskInput.value = "";
  });

  loadTasks();
});
