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

function openTaskPopup() {
    taskPopup.style.display = "flex";
}

function openDeletePopup() {
    deletePopup.style.display = "flex";
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
