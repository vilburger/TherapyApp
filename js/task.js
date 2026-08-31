// ===================================
// TASK COMPLETION
// ===================================

function completeTask(task) {
    const completion = {
        taskID: task.taskID,
        completedAt: getTodayDate()
    };

    fetch("php/saveCompletion.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    })
    .then(response => response.json())
    .then(async data => {
        if (data.success) {
            console.log(data);
            loadTasks();

            // Kasvia päivitetään vain, jos palvelin ilmoittaa uuden suorituksen syntyneen
            if (data.newCompletion) {
                await loadCurrentPlant();

                if (currentPlant.progress >= currentPlant.requiredCompletions) {
                    gardenNotification.classList.add("active");
                    
                    plantPopupTitle.textContent = "Kasvisi on valmis!";
                    const imagePath = `assets/${currentPlant.imageFolder}/stage5.png`;
                    plantPopupImage.style.backgroundImage = `url("${imagePath}")`;
                    plantPopupText.innerHTML = `Hienoa! Kasvisi ${currentPlant.plantName} kasvoi täyteen mittaansa.<br>
                    <br> 
                    Se on nyt lisätty puutarhaasi, jossa voit tarkastella keräämiäsi kasveja.`;
                    plantPopup.style.display = "flex";
                    document.body.classList.add("popup-open");
                } else {
                        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                        messageElement.textContent = randomMessage;
                        popup.style.display = "flex";
                        document.body.classList.add("popup-open");
                   
                }
            }
        } else {
            console.error(data.message);
        }
    });
}


// ===================================
// ADD, EDIT AND DELETE TASKS
// ===================================

// Avataan tyhjä lomake uuden tehtävän lisäämistä varten
addButton.addEventListener("click", function () {
    editingTask = null;

    taskPopupTitle.textContent = "Uusi tehtävä";
    taskForm.reset();

    updateRecurrenceUI();
    taskPopup.style.display = "flex";
    document.body.classList.add("popup-open");
});

// Lähetetään palvelimelle pyyntö valitun tehtävän poistamisesta
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
            if (data.success) { 
                console.log(data.message); 
                deletingTask = null;
                loadTasks();
                closeAllPopups();
            } else {
                console.error(data.message);
            }

        });

});


// ===================================
// TASK FORM
// ===================================

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const recurrence = document.querySelector('input[name="recurrence"]:checked').value;

    const selectedDays = getSelectedDays();

    // Mukautetussa toistossa vähintään yksi viikonpäivä on valittava
    if (recurrence === "custom" && selectedDays.length === 0) {
        daysError.textContent = "Valitse vähintään yksi viikonpäivä.";
        daysError.classList.remove("hidden");
        return;
    }

    daysError.classList.add("hidden");

    const task = {
        title: taskTitle.value,
        description: taskDescription.value,
        recurrence: recurrence,
        days: recurrence === "daily" ? ["ma", "ti", "ke", "to", "pe", "la", "su"] : selectedDays,
        startDate: startDate.value,
        endDate: endDate.value,

        // Muokatessa säilytetään tehtävän aikaisemmat suoritusmerkinnät
        completedDays: editingTask
            ? editingTask.completedDays
            : []
    };

    if (editingTask) {
        task.taskID = editingTask.taskID;
    }

    // Käytetään eri PHP-tiedostoa sen mukaan, luodaanko uusi tehtävä vai muokataanko olemassa olevaa
    const url = editingTask
        ? "php/updateTask.php"
        : "php/saveTask.php";

    fetch(url, { 
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(task) 
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) { 
                editingTask = null;

                loadTasks();
                closeAllPopups();
            } else {
                console.error(data.message); 
            }
        })
        .catch(error => {
            console.error("Tehtävän tallentaminen epäonnistui:", error);
        });
});