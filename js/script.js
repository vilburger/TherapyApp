//Elementit
const popup = document.getElementById("successPopup");
const closeButton = document.getElementById("closePopup");
const messageElement = document.getElementById("popupMessage");
const addButton = document.getElementById("addButton");
//const editButton = document.querySelector(".editButton");
//const deleteButton = document.querySelector(".deleteButton");
const deletePopup = document.getElementById("deletePopup");
const confirmDelete = document.getElementById("confirmDelete");
const taskPopup = document.getElementById("taskPopup");
const cancelButton = document.querySelectorAll(".cancelButton");
const popups = document.querySelectorAll(".popup");
const recurrenceOptions = document.querySelectorAll('input[name="recurrence"]');
const daySelection = document.getElementById("daySelection");
const form = document.getElementById("taskForm");
const dailyRadio = document.querySelector('input[value="daily"]');
const customRadio = document.querySelector('input[value="custom"]');
const recurrenceGroup = document.querySelector('.recurrence-options');
const taskTableBody = document.getElementById("taskTableBody");
const weekBody = document.getElementById("weekBody");
const todayTasks = document.getElementById("todayTasks");
const todayProgressBar = document.getElementById("todayProgressBar");
const todayProgressText = document.getElementById("todayProgressText");
const todayProgressInfo = document.getElementById("todayProgressInfo");
const currentDate = document.getElementById("currentDate");


//Viestit
const messages = [
    "Hienosti tehty!",
    "Hyvä sinä!",
    "Jatka samaan malliin!",
    "Olet edistynyt hienosti!"
];


const dayMap = {
    ma: 1,
    ti: 2,
    ke: 3,
    to: 4,
    pe: 5,
    la: 6,
    su: 0
}

let tasks = [
    {
        name: "venyttely",
        description: "Tee venytyksiä 5 minuuttia",
        recurrence: "custom",
        days: ["ma", "to", "pe"],
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        completedDays: []
    },
    {
        name: "juoksu",
        description: "Käy juoksemassa töiden jälkeen",
        recurrence: "custom",
        days: ["ma", "ti", "ke", "to", "pe"],
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        completedDays: []
    }
];

let editingTask = null;
let deletingTask = null;

//Sulje-napille toiminto
closeButton.addEventListener("click", closePopup);

//ikkunan voi sulkea klikkaamalla taustaa pelkän napin sijaan
popup.addEventListener("click", function (event) {
    if (event.target === popup) {
        closePopup();
    }
});

//ikkunan voi sulkea myös esc-näppäimellä
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeAllPopups();
    }
})

//Lisää-nappia voi klikata
addButton.addEventListener("click", function () {
    editingTask = null;

    taskPopupTitle.textContent = "Uusi tehtävä";
    taskForm.reset();

    updateRecurrenceUI();
    taskPopup.style.display = "flex";
});

confirmDelete.addEventListener("click", function () {
    tasks = tasks.filter(t => t !== deletingTask);

    deletingTask = null;

    renderTaskTable();
    renderWeekView();
    renderTodayTasks();
    updateTodayProgress();

    closeAllPopups();
});
/*
//Muokkaa-nappia voi klikata
editButton.addEventListener("click", function () {
    taskPopupTitle.textContent = "Muokkaa tehtävää";

    fillEditForm(mockTask); //Korjaa tää!
    setRecurrenceUI(mockTask);

    updateRecurrenceUI();

    taskPopup.style.display = "flex";
});
//Poista-nappia voi klikata
deleteButton.addEventListener("click", function () {
    deletePopup.style.display = "flex";
});
*/

//Käydään läpi kaikki dokumentin Peruuta-napit, ja lisätään niille sulkemistoiminto (eli asetetaan display noneksi)
cancelButton.forEach(function (button) {
    button.addEventListener("click", function () {
        taskPopup.style.display = "none";
        deletePopup.style.display = "none";
    });
});

popups.forEach(function (popup) {
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            closeAllPopups();
        }
    });
});


recurrenceOptions.forEach(option => {
    option.addEventListener("change", updateRecurrenceUI);
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const recurrence = document.querySelector('input[name="recurrence"]:checked').value;

    const task = {
        name: taskName.value,
        description: taskDescription.value,
        recurrence: recurrence,
        days: recurrence === "daily" ? ["ma", "ti", "ke", "to", "pe", "la", "su"] : getSelectedDays(),
        startDate: startDate.value,
        endDate: endDate.value,

        completedDays: editingTask
            ? editingTask.completedDays
            : []
    };

    if (editingTask) {
        Object.assign(editingTask, task);
        editingTask = null;
    } else {
        tasks.push(task);
    }


    renderTaskTable();
    renderWeekView();
    renderTodayTasks();
    updateTodayProgress();

    closeAllPopups();
})

// funktiot
function closePopup() {
    popup.style.display = "none";

    document.body.style.overflow = "auto";
}

function closeAllPopups() {
    popup.style.display = "none";
    taskPopup.style.display = "none";
    deletePopup.style.display = "none";

    document.body.style.overflow = "auto";
}

function fillEditForm(task) {
    taskName.value = task.name;
    taskDescription.value = task.description;

    document.querySelectorAll("#daySelection input").forEach(cb => {
        cb.checked = task.days.includes(cb.value);
    });

    startDate.value = task.startDate;
    endDate.value = task.endDate;
}

function updateRecurrenceUI() {
    if (dailyRadio.checked) {
        daySelection.classList.add("dimmed");
        recurrenceGroup.classList.remove("dimmed");
    }

    if (customRadio.checked) {
        daySelection.classList.remove("dimmed");
        recurrenceGroup.classList.remove("dimmed");
    }
}

function setRecurrenceUI(task) {
    document.querySelector(`input[value="${task.recurrence}"]`).checked = true;

    updateRecurrenceUI();
}

function highlightToday() {
    const today = new Date().getDay();

    document.querySelectorAll(`[data-day="${today}"]`).forEach(element => {
        element.classList.add("today");
    })
}

function getSelectedDays() {
    return Array.from(document.querySelectorAll('#daySelection input:checked')).map(cb => cb.value);
}

function renderTaskTable() {
    taskTableBody.innerHTML = "";

    tasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${task.name}</td>
        <td><button class="editButton">Muokkaa</button></td>
        <td><button class="deleteButton">Poista</button></td>
        `;

        //Haetaan juuri tämän rivin painikkeet
        const editButton = row.querySelector(".editButton");
        const deleteButton = row.querySelector(".deleteButton");

        //Muokkaa
        editButton.addEventListener("click", function () {
            editingTask = task;

            taskPopupTitle.textContent = "Muokkaa tehtävää";

            fillEditForm(task);
            setRecurrenceUI(task);

            updateRecurrenceUI();

            taskPopup.style.display = "flex";
        });

        //Poista (toistaiseksi vain avaa popupin)
        deleteButton.addEventListener("click", function () {
            deletingTask = task;

            deletePopup.style.display = "flex";
        });

        taskTableBody.appendChild(row);
    })
}

function updateTodayProgress() {
    const today = new Date().getDay();

    const todaysTasks = tasks.filter(task => task.days.map(d => dayMap[d]).includes(today));

    const completed = todaysTasks.filter(task =>
        task.completedDays.includes(today)
    ).length;

    const total = todaysTasks.length;

    const percent = total === 0 ? 0 : Math.round(completed / total * 100);

    todayProgressBar.style.width = percent + "%";

    todayProgressText.textContent = percent + "%";

    todayProgressInfo.textContent = `${completed}/${total} tehtävää tehty`;

    console.log({
        completed,
        total,
        percent
    });
}

function renderWeekView() {
    weekBody.innerHTML = "";

    const days = [1, 2, 3, 4, 5, 6, 0];

    tasks.forEach(task => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = task.name;
        nameCell.classList.add("task-name");

        row.appendChild(nameCell);

        days.forEach(day => {
            const cell = document.createElement("td");
            cell.dataset.day = day;

            const taskDays = task.days.map(d => dayMap[d]);

            if (taskDays.includes(day)) {
                const done = task.completedDays.includes(day);

                cell.innerHTML = `
                <span class="dot ${done ? "done" : ""}"></span>`;
            }
            row.appendChild(cell);
        });

        weekBody.appendChild(row);

    });

    highlightToday();
}


function renderTodayTasks() {
    todayTasks.innerHTML = "";

    const today = new Date().getDay();

    const todayTaskList = tasks.filter(task =>
        task.days.map(day => dayMap[day]).includes(today)
    );

    todayTaskList.forEach(task => {
        const card = document.createElement("div");

        card.classList.add("today-task");

        const doneToday = task.completedDays.includes(today);

        card.innerHTML = `
        <div class="task-info">
            <h3>${task.name}</h3>
            <p>${task.description}</p>
        </div>

        <button 
        class="completeButton"
        data-task="${task.name}">
        ${doneToday ? "Tehty" : "Merkitse tehdyksi"}
        </button>
        `;

        todayTasks.appendChild(card);

        const button = card.querySelector(".completeButton");

        button.addEventListener("click", function () {
            completeTask(task);
        });
    });
}

function completeTask(task) {
    const today = new Date().getDay();

    if (task.completedDays.includes(today)) {
        return;
    }

    task.completedDays.push(today);

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
    popup.style.display = "block";

    renderTodayTasks();
    renderWeekView();
    updateTodayProgress();
}

function renderCurrentDate() {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric"
    };

    currentDate.textContent = today.toLocaleDateString("fi-FI", options);
}

//alustus
highlightToday();

renderTaskTable();
renderWeekView();

renderTodayTasks();

renderCurrentDate();
updateTodayProgress();