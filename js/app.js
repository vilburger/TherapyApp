
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
    fetch("php/deleteTask.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ taskID: deletingTask.taskID })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) { //JSON muodostuu kahdesta osasta. Success = true
                console.log(data.message); //message = Tehtävä tallennettiin onnistuneesti
                deletingTask = null;
                loadTasks();
                closeAllPopups();
            } else {
                console.error(data.message); //virheviesti
            }

        });

});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const recurrence = document.querySelector('input[name="recurrence"]:checked').value;

    const task = {
        title: taskTitle.value,
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
        task.taskID = editingTask.taskID;
    }

    console.log(task);

    const url = editingTask
        ? "php/updateTask.php"
        : "php/saveTask.php";

    //fetch juttu PHP:n kanssa yhteistyötä varten
    fetch(url, { //lähetä pyyntö tiedostolle saveTask.php, joka sijaitsee php-kansiossa
        method: "POST", //POST=lähetä uutta tietoa (koska lisätään uusi tehtävä)
        headers: {
            "Content-Type": "application/json"
        }, //koko headers-osio kertoo PHP:lle, että sille lähetetään JSON-muotoista dataa
        body: JSON.stringify(task) //muuttaa JavaScript olion tekstiksi
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) { //JSON muodostuu kahdesta osasta. Success = true
                console.log(data.message); //message = Tehtävä tallennettiin onnistuneesti
                loadTasks();
            } else {
                console.error(data.message); //virheviesti
            }

        });

    if (recurrence === "custom" && getSelectedDays().length === 0) {
        daysError.textContent = "Valitse vähintään yksi viikonpäivä.";
        daysError.classList.remove("hidden");
        return;
    }

    daysError.classList.add("hidden");

    loadTasks();

    closeAllPopups();
});

recurrenceOptions.forEach(option => {
    option.addEventListener("change", updateRecurrenceUI);
});

document.querySelectorAll("#daySelection input").forEach(cb => {
    cb.addEventListener("change", () => {
        if (getSelectedDays().length > 0) {
            daysError.classList.add("hidden");
        }
    });
});

plantPopupButton.addEventListener("click", () => {
    plantPopup.style.display = "none";
    //jos kasvi valmis, siirtyy siemenen valintaan
    showPlantChoicePopup();
})