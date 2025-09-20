// initialise data

const sideBarhide = document.getElementById("side-bar-hider-btn");
const navBoard = document.getElementById("side-bar-div");

sideBarhide.addEventListener("click", () => {
  console.log("clicked");
  navBoard.style.display = "none";
});
