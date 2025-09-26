import { fetchDataAndStore } from "./apiData.js";

/* variables */
let todoCount = 0;
let doingCount = 0;
let doneCount = 0;

/**
 * Creates a single task DOM element.
 * @param {Object} task - Task data object.
 * @param {string} task.title - Title of the task.
 * @param {number} task.id - Unique task ID.
 * @param {string} task.status - Status column: 'todo', 'doing', or 'done'.
 * @returns {HTMLElement} The created task div element.
 */
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;
  taskDiv.id = `id-${task.id}`;

  taskDiv.addEventListener("click", (e) => {
    openTaskModal(e.target);
  });

  return taskDiv;
}

/**
 * Finds the task container element based on task status.
 * @param {string} status - The task status ('todo', 'doing', or 'done').
 * @returns {HTMLElement|null} The container element, or null if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Renders all tasks from initial data to the UI.
 * Groups tasks by status and appends them to their respective columns.
 * @param {Array<Object>} tasks - Array of task objects.
 */
export function renderTasks(tasks) {
  tasks.forEach((task) => {
    addTask(task); // calls function that renders a single task
  });
}

/**
 * Adds a task element to the DOM inside the correct container based on the task's status.
 *
 * @param {Object} task - The task object to be added.
 * @param {string} task.title - Title of the task.
 * @param {string} task.description - Description of the task.
 * @param {string} task.status - The status of the task (e.g., "todo", "doing", "done").
 */
export function addTask(task) {
  const container = getTaskContainerByStatus(task?.status);
  if (container) {
    const taskElement = createTaskElement(task);
    container.appendChild(taskElement);
  }
  if (task.status === "todo") {
    todoCount++;
    console.log(todoCount);
  }
  if (task.status === "doing") {
    doingCount++;
    console.log(doingCount);
  }
  if (task.status === "done") {
    doneCount++;
    console.log(doneCount);
  }

  document.getElementById("toDoText").innerText = "TODO (" + todoCount + ")";
  document.getElementById("doingText").innerText = "DOING (" + doingCount + ")";
  document.getElementById("doneText").innerText = "DONE (" + doneCount + ")";
}

// Fetch from localStorage
const fetchFromLocalStorage = () => {
  const array = localStorage.getItem("apiData");
  return JSON.parse(array);
};

let retrievedArray = fetchFromLocalStorage();
let selectedTaskId = null;

// Open modal
function openTaskModal(taskEl) {
  let fromLocalStorage = fetchFromLocalStorage();
  const taskId = taskEl.dataset.taskId;
  const task = fromLocalStorage.find((tsk) => tsk.id === +taskId);

  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;
  selectedTaskId = task.id;

  modal.showModal();
}

// Modal buttons
const modalSaveBtn = document.getElementById("modal-save-btn");
const modalDltBtn = document.getElementById("modal-dlt-btn");

// Save button
modalSaveBtn.addEventListener("click", () => {
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  // Ensure retrievedArray is always an array
  retrievedArray = JSON.parse(localStorage.getItem("apiData")) || [];

  // Update array
  retrievedArray = retrievedArray.map((task) => {
    if (task.id === selectedTaskId) {
      return {
        ...task,
        title: titleInput.value,
        description: descInput.value,
        status: statusSelect.value,
      };
    }
    return task;
  });

  // Save to localStorage
  localStorage.setItem("apiData", JSON.stringify(retrievedArray));

  // Update DOM: keep structure, update only title
  const taskElement = document.getElementById(`id-${selectedTaskId}`);
  if (taskElement) {
    taskElement.textContent = titleInput.value;
    taskElement.dataset.status = statusSelect.value;
  }

  let allDivs = document.getElementsByClassName("task-div");

  Array.from(allDivs).forEach((item) => item.remove());

  const tasks = JSON.parse(localStorage.getItem("apiData")) || [];
  todoCount = 0;
  doingCount = 0;
  doneCount = 0;
  renderTasks(tasks);

  // Close modal
  const modal = document.getElementById("task-modal");
  modal.close();

  console.log("Task updated:", selectedTaskId);
});

// Delete button
modalDltBtn.addEventListener("click", () => {
  retrievedArray = retrievedArray.filter((task) => task.id !== selectedTaskId);
  localStorage.setItem("apiData", JSON.stringify(retrievedArray));

  const taskElement = document.getElementById(`id-${selectedTaskId}`);
  if (taskElement) taskElement.remove();

  // Reset counters and re-render
  let allDivs = document.getElementsByClassName("task-div");
  Array.from(allDivs).forEach((item) => item.remove());

  const tasks = JSON.parse(localStorage.getItem("apiData")) || [];
  todoCount = 0;
  doingCount = 0;
  doneCount = 0;
  renderTasks(tasks);

  const modal = document.getElementById("task-modal");
  modal.close();
});

// Initialize modal and tasks
async function initTaskBoard() {
  // Render existing tasks from localStorage
  let tasks = fetchFromLocalStorage();
  if (!tasks) tasks = await fetchDataAndStore();
  if (tasks) renderTasks(tasks);
}

initTaskBoard();
