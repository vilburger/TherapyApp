function renderTaskTable() {
    taskTableBody.innerHTML = "";

    tasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${task.title}</td>
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
            document.body.classList.add("popup-open");
        });

        //Poista (toistaiseksi vain avaa popupin)
        deleteButton.addEventListener("click", function () {
            deletingTask = task;

            deletePopup.style.display = "flex";
            document.body.classList.add("popup-open");
        });

        taskTableBody.appendChild(row);
    })
}

function renderTaskList() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const item = document.createElement("div");
        item.classList.add("task-item");

        item.innerHTML = `
            <div class="task-title">${task.title}</div>

            <div class="task-buttons">
                <button class="editButton">Muokkaa</button>
                <button class="deleteButton">Poista</button>
            </div>
        `;

        const editButton = item.querySelector(".editButton");
        const deleteButton = item.querySelector(".deleteButton");

        editButton.addEventListener("click", function () {
            editingTask = task;

            taskPopupTitle.textContent = "Muokkaa tehtävää";

            fillEditForm(task);
            setRecurrenceUI(task);

            updateRecurrenceUI();

            taskPopup.style.display = "flex";
            document.body.classList.add("popup-open");
        });

        deleteButton.addEventListener("click", function () {
            deletingTask = task;

            deletePopup.style.display = "flex";
            document.body.classList.add("popup-open");
        });

        taskList.appendChild(item);
    });
}

function isTaskActiveOnDate(task, date) {
    const startDate = parseDateOnly(task.startDate);

    if (date < startDate) {
        return false;
    }

    if (task.endDate && task.endDate !== "0000-00-00") {
        const endDate = parseDateOnly(task.endDate);

        if (date > endDate) {
            return false;
        }
    }

    return true;
}

function getDateForWeekday(weekday) {
    const today = new Date();
    const currentDay = today.getDay();

    const currentDayMondayBased = currentDay === 0 ? 7 : currentDay;

    const difference = weekday === 0
        ? 7 - currentDayMondayBased
        : weekday - currentDayMondayBased;

        const date = new Date(today);
        date.setDate(today.getDate() + difference);

        return date;
}

function renderWeekView() {
    weekBody.innerHTML = "";

    const days = [1, 2, 3, 4, 5, 6, 0];

    tasks.forEach(task => {
        const taskDays = task.days.map(d => dayMap[d]);

        const hasActiveDay = days.some(day => {
            const date = getDateForWeekday(day);

            return isTaskActiveOnDate(task, date) &&
                (taskDays.includes(day) || task.recurrence === "daily");
        });

        if (!hasActiveDay) {
            return;
        }

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = task.title;
        nameCell.classList.add("task-name");

        row.appendChild(nameCell);

        days.forEach(day => {
            const cell = document.createElement("td");
            cell.dataset.day = day;

            //const taskDays = task.days.map(d => dayMap[d]);

            const date = getDateForWeekday(day);
            const taskIsActive = isTaskActiveOnDate(task, date);

            if (
                taskIsActive &&
                (taskDays.includes(day) || task.recurrence === "daily") 
            ){
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

function renderWeekList() {
    weekList.innerHTML = "";

    const days = [
        { number: 1, label: "Ma" },
        { number: 2, label: "Ti" },
        { number: 3, label: "Ke" },
        { number: 4, label: "To" },
        { number: 5, label: "Pe" },
        { number: 6, label: "La" },
        { number: 0, label: "Su" }
    ];

    tasks.forEach(task => {
        const taskDays = task.days.map(d => dayMap[d]);

        const hasActiveDay = days.some(day => {
            const date = getDateForWeekday(day.number);

            return isTaskActiveOnDate(task, date) &&
                (taskDays.includes(day.number) || task.recurrence === "daily");
        });

        if (!hasActiveDay) {
            return;
        }

        const card = document.createElement("div");
        card.classList.add("week-card");

        let html = `
            <h3>${task.title}</h3>

            <div class="mobile-days">
        `;

        days.forEach(day => {
            const date = getDateForWeekday(day.number);
            const taskIsActive = isTaskActiveOnDate(task, date);
            
            const active = taskIsActive && 
            (taskDays.includes(day.number) || task.recurrence === "daily");

            const done = task.completedDays.includes(day.number);

            let symbol = "";

            if (active) {
                symbol = done ? "✓" : "○";
            }

            html += `
                <div class="mobile-day">
                    <span>${day.label}</span>
                    <span>${symbol}</span>
                </div>
            `;
        });

        html += `</div>`;

        card.innerHTML = html;

        weekList.appendChild(card);
    });
}

function renderTodayTasks() {
    todayTasks.innerHTML = "";

    const today = new Date();
    const todayWeekday = today.getDay();

    const todayTaskList = tasks.filter(task =>
        isTaskActiveOnDate(task, today) &&
        (
        task.days.map(day => dayMap[day]).includes(todayWeekday) || task.recurrence === "daily"
        )
    );

    todayTaskList.forEach(task => {
        const card = document.createElement("div");

        card.classList.add("today-task");

        const doneToday = task.completedDays.includes(todayWeekday);

        card.innerHTML = `
        <div class="task-info">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
        </div>

        <button 
        class="completeButton"
        data-task="${task.title}">
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

/*
function updateTodayProgress() {
    const today = new Date().getDay();

    const todaysTasks = tasks.filter(task => task.days.map(d => dayMap[d]).includes(today) || task.recurrence === "daily");

    const completed = todaysTasks.filter(task =>
        task.completedDays.includes(today)
    ).length;

    const total = todaysTasks.length;

    const percent = total === 0 ? 0 : Math.round(completed / total * 100);

    todayProgressBar.style.width = percent + "%";

    todayProgressText.textContent = percent + "%";

    todayProgressInfo.textContent = `${completed}/${total} päivän tehtävistä tehty`;
}
    */

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

function highlightToday() {
    const today = new Date().getDay();

    document.querySelectorAll(`[data-day="${today}"]`).forEach(element => {
        element.classList.add("today");
    })
}

function renderCurrentPlant() {
    plantName.textContent = currentPlant.plantName;

    plantProgress.textContent = 
    `${currentPlant.progress} / ${currentPlant.requiredCompletions} tehtävää`;

    //haetaan kasvuvaihe
    const stage = getPlantStage(currentPlant);

    const imagePath = `assets/${currentPlant.imageFolder}/stage${stage}.png`;

    plantImage.src = imagePath;
}

//navbarin puutarha napin toiminto
gardenButton.addEventListener("click", async () => {
    await loadGarden();
    openGarden();
});

//puutarhan avaaminen 
function openGarden() {
    gardenPopup.style.display = "flex";
    document.body.classList.add("popup-open");
}

function closeGarden() {
    gardenPopup.style.display = "none";
    document.body.classList.remove("popup-open");
}