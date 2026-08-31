// Palauttaa tämän päivän päivämäärän muodossa YYYY-MM-DD
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Muuntaa YYYY-MM-DD-muotoisen päivämäärän JavaScriptin Date-olioksi
function parseDateOnly(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
}

// Tarkistaa, onko tehtävä aktiivinen annetulla päivämäärällä. 
// Tehtävä on aktiivinen, jos päivämäärä osuu tehtävän alku- ja loppupäivän väliin.
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

// Palauttaa annetun viikonpäivän päivämäärän nykyiseltä viikolta
function getDateForWeekday(weekday) {
    const today = new Date();
    const currentDay = today.getDay();

    // Muuntaa sunnuntain arvon 0 maanantaipohjaisen viikon laskentaa varten
    const currentDayMondayBased = currentDay === 0 ? 7 : currentDay;

    // Laskee viikonpäivän päivämäärän nykyisellä viikolla
    const difference = weekday === 0
        ? 7 - currentDayMondayBased
        : weekday - currentDayMondayBased;

        const date = new Date(today);
        date.setDate(today.getDate() + difference);

        return date;
}