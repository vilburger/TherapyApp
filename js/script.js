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

//Viestit
const messages = [
    "Hienosti tehty!",
    "Hyvä sinä!",
    "Jatka samaan malliin!",
    "Olet edistynyt hienosti!"
];


//tehdään Merkitse valmiiksi napista klikattava
completeButton.addEventListener("click", function () {
    //teksti vaihtuu
    completeButton.textContent = "Tehty";
    //ei voi klikata uudestaan
    completeButton.disabled = true;

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

    taskPopup.style.display = "flex";
});
//Muokkaa-nappia voi klikata
editButton.addEventListener("click", function() {
    taskPopupTitle.textContent = "Muokkaa tehtävää";

    taskName.value = "Venyttely";

    taskDescription.value = "Tee venytyksiä 5 minuuttia";

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

recurrenceOptions.forEach(function(option) {
    option.addEventListener("change", function() {
        if (this.value === "custom") {
            daySelection.style.display = "flex";
        } else {
            daySelection.style.display = "none";
        }
    });
});

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

