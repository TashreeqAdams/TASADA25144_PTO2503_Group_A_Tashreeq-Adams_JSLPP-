import { renderTasks } from "./scripts.js";
import { addTask } from "./scripts.js";

// Modal functionality for add new task button
const taskModal = document.getElementById("header-task-modal");
const openBtn = document.getElementById("header-add-task-button");
const closeBtn = document.getElementById("header-close-modal-btn");

// Open modal
openBtn.addEventListener("click", () => {
  // Reset fields if needed
  document.getElementById("header-modal-task-title").value = "";
  document.getElementById("header-modal-task-desc").value = "";
  document.getElementById("header-modal-task-status").value = "";

  taskModal.showModal();
});

// Close modal
closeBtn.addEventListener("click", () => {
  taskModal.close();
});

// Get elements
const modalTitle = document.getElementById("header-modal-task-title");
const modalDescription = document.getElementById("header-modal-task-desc");
const modalStatus = document.getElementById("header-modal-task-status");
const saveBtn = document.getElementById("header-modal-task-button");

// Save button click
saveBtn.addEventListener("click", () => {
  const currentTasks = JSON.parse(localStorage.getItem("apiData"));
  const taskCount = currentTasks?.length;
  const newTask = {
    id: taskCount + 1,
    title: modalTitle.value.trim(),
    description: modalDescription.value.trim(),
    status: modalStatus.value,
  };

  // Add new task to array
  currentTasks.push(newTask);

  // // Save array back to localStorage
  localStorage.setItem("apiData", JSON.stringify(currentTasks));

  // Render single task
  addTask(newTask);
});

// Setup modal close button
function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

setupModalCloseHandler();
