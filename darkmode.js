const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load theme preference if saved
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  mobileThemeToggle.checked = true;
}

mobileThemeToggle.addEventListener("change", () => {
  if (mobileThemeToggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});
