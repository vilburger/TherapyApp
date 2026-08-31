// Päivittää toistuvuuden käyttöliittymän, kun käyttäjä vaihtaa valintaa
recurrenceOptions.forEach(option => {
    option.addEventListener("change", updateRecurrenceUI);
});

// Piilottaa viikonpäivävalinnan virheilmoituksen, kun käyttäjä on valinnut vähintään yhden päivän
document.querySelectorAll("#daySelection input").forEach(cb => {
    cb.addEventListener("change", () => {
        if (getSelectedDays().length > 0) {
            daysError.classList.add("hidden");
        }
    });
});

