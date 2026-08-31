// ===================================
// POPUP CONTROLS
// ===================================

cancelButton.forEach(function (button) {
    button.addEventListener("click", function () {
        taskPopup.style.display = "none";
        deletePopup.style.display = "none";
        document.body.classList.remove("popup-open");
    });
});

popups.forEach(function (popup) {
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            closeAllPopups();
        }
    });
});

// Sulkee onnistumis-popupin
function closePopup() {
    successPopup.style.display = "none";
    document.body.classList.remove("popup-open");
}

// Sulkee kaikki avoinna olevat popupit
function closeAllPopups() {
    popups.forEach(popup => {
        popup.style.display = "none";
    });

    document.body.classList.remove("popup-open");
}


// ===================================
// TASK FORM
// ===================================

function fillEditForm(task) {
    taskTitle.value = task.title;
    taskDescription.value = task.description;

    document.querySelectorAll("#daySelection input").forEach(cb => {
        cb.checked = task.days.includes(cb.value);
    });

    startDate.value = task.startDate;
    endDate.value = task.endDate;
}

function getSelectedDays() {
    return Array.from(document.querySelectorAll('#daySelection input:checked')).map(cb => cb.value);
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


// ===================================
// PLANT POPUP
// ===================================

// Siirtyy kasvin valmistumis-popupista siemenen valintaan
plantPopupButton.addEventListener("click", () => {
    plantPopup.style.display = "none";
    document.body.classList.remove("popup-open");

    showPlantChoicePopup();
})


// ===================================
// POPUP EVENT HANDLERS
// ===================================

// Sulje-napin toiminto
closeButton.addEventListener("click", closePopup);

// Sulkee popupit esc-näppäimellä
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeAllPopups();
    }
})