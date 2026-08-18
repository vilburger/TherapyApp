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