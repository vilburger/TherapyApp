//Elementit
const completeButton = document.getElementById("markdone_button");
const popup = document.getElementById("successPopup");
const closeButton = document.getElementById("closePopup");
const messageElement = document.getElementById("popupMessage");

//Viestit
const messages = [
    "Hienosti tehty!",
    "Hyvä sinä!",
    "Jatka samaan malliin!",
    "Olet edistynyt hienosti!"
];


//tehdään Merkitse valmiiksi napista klikattava
completeButton.addEventListener("click", function () {
    completeButton.textContent = "Tehty";
    //ei voi klikata uudestaan
    completeButton.disabled = true;

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    messageElement.textContent = randomMessage;

    popup.style.display = "block";
});


closeButton.addEventListener("click", function () {
    popup.style.display = "none";
});

