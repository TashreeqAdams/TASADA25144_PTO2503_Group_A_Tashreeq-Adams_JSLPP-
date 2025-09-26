// =========================
// Fetch API data only if localStorage is empty
// =========================
const loader = document.getElementById("loader");

export async function fetchDataAndStore() {
  loader.style.display = "block";

  try {
    if (localStorage.getItem("apiData")) {
      return null;
    }

    const apiUrl = "https://jsl-kanban-api.vercel.app/";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem("apiData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  } finally {
    loader.style.display = "none";
  }
}
