// =========================
// Fetch API data only if localStorage is empty
// =========================
async function fetchDataAndStore() {
  if (localStorage.getItem("apiData")) return; // do not overwrite existing tasks

  const apiUrl = "https://jsl-kanban-api.vercel.app/";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    localStorage.setItem("apiData", JSON.stringify(data));

    renderTasks(data);
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  }
}

fetchDataAndStore();
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
 * Clears all existing task-divs from all task containers.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

let todoCount = 0;
let doingCount = 0;
let doneCount = 0;

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

///////////////// MODAL /////////////////

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
    // Instead of overwriting whole textContent, preserve current structure
    // Here your taskDiv only has textContent for title, so safe to update
    taskElement.textContent = titleInput.value;
    taskElement.dataset.status = statusSelect.value;
  }

  let allDivs = document.getElementsByClassName("task-div");

  Array.from(allDivs).forEach((item) => item.remove());

  const tasks = JSON.parse(localStorage.getItem("apiData")) || [];
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

  const modal = document.getElementById("task-modal");
  modal.close();
});

// Setup modal close button
function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

// Initialize modal and tasks
function initTaskBoard() {
  setupModalCloseHandler();

  // Render existing tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("apiData")) || [];
  renderTasks(tasks);
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard);
