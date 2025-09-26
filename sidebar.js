// initialise data

const sideBarhide = document.getElementById("side-bar-hider-btn");
const navBoard = document.getElementById("side-bar-div");
const showNavBtn = document.getElementById("show-nav-bar-btn");

// Hide sidebar and show button
sideBarhide.addEventListener("click", () => {
  navBoard.classList.add("hidden");
  showNavBtn.classList.remove("hidden");
});

// Show sidebar and hide button
showNavBtn.addEventListener("click", () => {
  navBoard.classList.remove("hidden");
  showNavBtn.classList.add("hidden");
});

// Mobile Modal

const mobileLogoBtn = document.getElementById("mobile-header-logo");
const mobileModal = document.getElementById("mobile-logo-modal");
const mobileModalCloseBtn = document.getElementById("mobile-modal-close-btn");
const backdrop = document.getElementById("mobile-backdrop");

mobileLogoBtn.addEventListener("click", () => {
  mobileModal.style.display = "block";
  backdrop.style.display = "block";
  console.log("clicked");
});

mobileModalCloseBtn.addEventListener("click", () => {
  mobileModal.style.display = "none";
  backdrop.style.display = "none";
});
