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

    todayProgressInfo.textContent = `${completed}/${total} päivän tehtävistä tehty`;
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

function highlightToday() {
    const today = new Date().getDay();

    document.querySelectorAll(`[data-day="${today}"]`).forEach(element => {
        element.classList.add("today");
    })
}