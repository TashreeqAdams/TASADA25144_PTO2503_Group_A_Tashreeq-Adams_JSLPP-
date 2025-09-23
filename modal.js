import { storedData } from "./scripts.js";
import { renderTasks } from "./scripts.js";
import { addTask } from "./scripts.js";

// Modal functionality for add new task button

document.addEventListener("DOMContentLoaded", () => {
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
});

// Saving data to local storage

if (!localStorage.getItem("apiData")) {
  const dataToStore = JSON.stringify(storedData);
  localStorage.setItem("apiData", dataToStore);
}

// get elements
const modalTitle = document.getElementById("header-modal-task-title");
const modalDescription = document.getElementById("header-modal-task-desc");
const modalStatus = document.getElementById("header-modal-task-status");
const saveBtn = document.getElementById("header-modal-task-button");

// // Load tasks from localStorage (or start with an empty array)
// let newTasks = JSON.parse(localStorage.getItem("apiData")) || [];
// if (newTasks) renderTasks(newTasks);

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
