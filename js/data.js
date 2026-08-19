/*
let tasks = [
    {
        title: "venyttely",
        description: "Tee venytyksiä 5 minuuttia",
        recurrence: "custom",
        days: ["ma", "to", "pe"],
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        completedDays: []
    },
    {
        title: "juoksu",
        description: "Käy juoksemassa töiden jälkeen",
        recurrence: "custom",
        days: ["ma", "ti", "ke", "to", "pe"],
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        completedDays: []
    }
];
*/
let tasks = [];

let currentPlant = null;
let garden = [];

let editingTask = null;
let deletingTask = null;

//funktio, joka hakee tehtävät palvelimelta
function loadTasks() {
fetch("php/getTasks.php")
    .then(async response => {

        const text = await response.text();

        return JSON.parse(text);
    })
    .then(data => {
        tasks = data;

        renderTaskTable();
        renderTaskList();
        renderWeekView();
        renderWeekList();
        renderTodayTasks();
        /*updateTodayProgress();*/
    });
}

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