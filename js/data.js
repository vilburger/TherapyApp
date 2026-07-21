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

let editingTask = null;
let deletingTask = null;

//funktio, joka hakee tehtävät palvelimelta
function loadTasks() {
    //fetch juttu PHP:n kanssa yhteistyötä varten
    fetch("php/getTasks.php")
        .then(response => response.json())
        .then(data => {
            tasks = data; //tasks-taulukkoon asetetaan haettu data

            //renderöinti-funktiot toimivat samoin kuin ennen
            renderTaskTable();
            renderWeekView();
            renderTodayTasks();
            updateTodayProgress();
        });
}