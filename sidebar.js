// initialise data

const sideBarhide = document.getElementById("side-bar-hider-btn");
const navBoard = document.getElementById("side-bar-div");
const showNavBtn = document.getElementById("show-nav-bar-btn");

/** Hides Nav Bar */

sideBarhide.addEventListener("click", () => {
  navBoard.style.display = "none";
  showNavBtn.style.display = "block";
});

/** Shows Nav Bar */

showNavBtn.addEventListener("click", () => {
  navBoard.style.display = "block";
  showNavBtn.style.display = "none";
});

// Mobile Modal

const mobileLogoBtn = document.getElementById("mobile-header-logo");
const mobileModal = document.getElementById("mobile-logo-modal");

mobileLogoBtn.addEventListener("click", () => {
  mobileModal.style.display = "block";
  console.log("clicked");
});
