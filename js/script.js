//Elementit
const completeButton = document.getElementById("completeButton");
const popup = document.getElementById("successPopup");
const closeButton = document.getElementById("closePopup");
const messageElement = document.getElementById("popupMessage");
const addButton = document.getElementById("addButton");
const editButton = document.querySelector(".editButton");
const deleteButton = document.querySelector(".deleteButton");
const deletePopup = document.getElementById("deletePopup");
const taskPopup = document.getElementById("taskPopup");
const cancelButton = document.querySelectorAll(".cancelButton");
const popups = document.querySelectorAll(".popup");
const recurrenceOptions = document.querySelectorAll('input[name="recurrence"]');
const daySelection = document.getElementById("daySelection");
const form = document.getElementById("taskForm");
const dailyRadio = document.querySelector('input[value="daily"]');
const customRadio = document.querySelector('input[value="custom"]');
const recurrenceGroup = document.querySelector('.recurrence-options');
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");

//Viestit
const messages = [
    "Hienosti tehty!",
    "Hyvä sinä!",
    "Jatka samaan malliin!",
    "Olet edistynyt hienosti!"
];

//mock data
const mockTask = {
    name: "Venyttely",
    description: "Tee venytyksiä 5 minuuttia",
    recurrence: "custom",
    days: ["ma", "ke", "pe"],
    startDate: "2026-06-01",
    endDate: "2026-06-30"
};

let completedTasks = 0;
let totalTasks = 3;


//tehdään Merkitse valmiiksi napista klikattava
completeButton.addEventListener("click", function () {
    //teksti vaihtuu
    completeButton.textContent = "Tehty";
    //ei voi klikata uudestaan
   

    //edistymisen päivitys
    completedTasks++;
    updateProgress();

    //valitaan randomilla viesti
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    //asetetaan viesti tekstielementtiin
    messageElement.textContent = randomMessage;

    popup.style.display = "block";

    document.body.style.overflow = "hidden";
});

//Sulje-napille toiminto
closeButton.addEventListener("click", closePopup);

//ikkunan voi sulkea klikkaamalla taustaa pelkän napin sijaan
popup.addEventListener("click", function(event) {
    if (event.target === popup) {
        closePopup();
    }
});

//ikkunan voi sulkea myös esc-näppäimellä
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeAllPopups();
    }
})

//Lisää-nappia voi klikata
addButton.addEventListener("click", function() {
    taskPopupTitle.textContent = "Uusi tehtävä";
    taskForm.reset();

    updateRecurrenceUI();
    taskPopup.style.display = "flex";
});
//Muokkaa-nappia voi klikata
editButton.addEventListener("click", function() {
    taskPopupTitle.textContent = "Muokkaa tehtävää";

    fillEditForm(mockTask);
    setRecurrenceUI(mockTask);

    updateRecurrenceUI();

    taskPopup.style.display = "flex";
});
//Poista-nappia voi klikata
deleteButton.addEventListener("click", function() {
    deletePopup.style.display="flex";
});
//Käydään läpi kaikki dokumentin Peruuta-napit, ja lisätään niille sulkemistoiminto (eli asetetaan display noneksi)
cancelButton.forEach(function(button) {
    button.addEventListener("click", function() {
        taskPopup.style.display = "none";
        deletePopup.style.display="none";
    });
});

popups.forEach(function(popup) {
    popup.addEventListener("click", function(event) {
        if (event.target === popup) {
            closeAllPopups();
        }
    });
});


recurrenceOptions.forEach(option => {
    option.addEventListener("change", updateRecurrenceUI);
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    closeAllPopups();

    completeButton.disabled = true;
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

    document.body.style.overflow="auto";
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
    if(dailyRadio.checked) {
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

function updateProgress() {
    const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    progressBar.style.width = percent + "%";

    //ARIA
    progressContainer.setAttribute("aria-valuenow", percent);

    //teksti
    progressText.textContent = `${completedTasks}/${totalTasks} tehtävää suoritettu`;

    progressPercent.textContent = percent + "%";
}

//alustus
updateProgress();