// import { renderTasks } from "./scripts";

// // =========================
// // Fetch API data only if localStorage is empty
// // =========================
// const loader = document.getElementById("loader");

// async function fetchDataAndStore() {
//   loader.style.display = "block";

//   try {
//     if (localStorage.getItem("apiData")) {
//       return; // early exit is fine now
//     }

//     const apiUrl = "https://jsl-kanban-api.vercel.app/";
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     localStorage.setItem("apiData", JSON.stringify(data));
//     renderTasks(data);
//   } catch (error) {
//     console.error("Error fetching or storing data:", error);
//   } finally {
//     loader.style.display = "none"; // ✅ always runs, even on return
//   }
// }

// fetchDataAndStore();
