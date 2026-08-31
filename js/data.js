// ===================================
// APPLICATION STATE
// ===================================
let tasks = [];
let currentPlant = null;

let editingTask = null;
let deletingTask = null;


// ===================================
// DATA LOADING
// ===================================
function loadTasks() {
fetch("php/getTasks.php")
    .then(response => response.json()) 
    .then(data => {
        tasks = data;

        // Päivitetään kaikki tehtäviä näyttävät näkymät
        renderTaskTable();
        renderTaskList();
        renderWeekView();
        renderWeekList();
        renderTodayTasks();
    })
    .catch(error => {
        console.error("Tehtävien lataaminen epäonnistui:", error);
    });
}

// Hakee käyttäjän nimen tietokannasta ja näyttää sen tervehdyksessä
function loadUserName() {
    fetch("php/getUser.php")
    .then(response => response.json())
    .then(data => {
        const greeting = document.getElementById("greeting");

        greeting.textContent = `Hauska nähdä taas, ${data.userName}!`;
    })
    .catch(error => {
        console.error("Käyttäjän nimeä ei voitu hakea:", error);
    });
}