<!DOCTYPE html>
<html lang="fi">

<head>
    <meta charset="UTF-8">
    <title>Terapiasovellus</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/buttons.css">
    <link rel="stylesheet" href="css/tables.css">
    <link rel="stylesheet" href="css/progress.css">
    <link rel="stylesheet" href="css/daily.css">
    <link rel="stylesheet" href="css/forms.css">
    <link rel="stylesheet" href="css/popup.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/utilities.css">
</head>

<body>
    <main class="dashboard">
        <section class="welcome">
            <h1>Hauska nähdä taas, Vilma!</h1>
        </section>

        <section class="daily card" aria-labelledby="daily-task-heading">

            <p id="currentDate" aria-label="Päivämäärä"></p>
            <h2 id="daily-task-heading">Tämän päivän tehtävät</h2>

            <div id="todayTasks"></div>

        </section>

        <section class="progress card">

            <h2>Päivän edistyminen</h2>

            <div class="progress-container">
                <div class="progress-bar" id="todayProgressBar"></div>
                <span id="todayProgressText">0%</span>
            </div>

            <p id="todayProgressInfo"></p>

        </section>

        <section class="weekly card">
            <h2>Viikkonäkymä</h2>

            <table class="week-table"
                aria-label="Viikon tehtävien suoritusnäkymä">
                <thead>
                    <tr>
                        <th class="task-name">Tehtävä</th>
                        <th data-day="1">ma</th>
                        <th data-day="2">ti</th>
                        <th data-day="3">ke</th>
                        <th data-day="4">to</th>
                        <th data-day="5">pe</th>
                        <th data-day="6">la</th>
                        <th data-day="0">su</th>
                    </tr>
                </thead>

                <tbody id="weekBody">
                </tbody>
            </table>
        </section>

        <section class="task-management card">
            <h2>Tehtävienhallinta</h2>

            <table class="task-table"
                aria-label="Aktiiviset tehtävät">
                <thead>
                    <tr>
                        <th>Aktiiviset tehtäväsi</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="taskTableBody">

                </tbody>
            </table>
            <button id="addButton" aria-label="Lisää uusi tehtävä">Lisää tehtävä</button>
        </section>

    </main>

    <div id="popupContainer">

        <div id="successPopup" class="popup">
            <div class="popup-content">
                <h3>Tehtävä suoritettu</h3>
                <p id="popupMessage"></p>
                <button id="closePopup">Sulje</button>
            </div>

        </div>

        <div id="taskPopup" class="popup">
            <div class="popup-content">
                <h3 id="taskPopupTitle">Uusi tehtävä</h3>
                <form id="taskForm">
                    <label for="taskName">Tehtävän nimi:</label>
                    <input type="text" id="taskName" name="taskName" required>

                    <label for="taskDescription">Tehtävän kuvaus:</label>
                    <textarea id="taskDescription" name="taskDescription"></textarea>

                    <div class="form-group">
                        <label>Valitse toistuvuus</label>

                        <div class="recurrence-options">
                            <label>
                                <input type="radio" name="recurrence" value="daily" checked>Päivittäin
                            </label>

                            <label>
                                <input type="radio" name="recurrence" value="custom">Valitut viikonpäivät
                            </label>
                        </div>

                        <div id="daySelection">
                            <label><input type="checkbox" value="ma">Ma</label>
                            <label><input type="checkbox" value="ti">Ti</label>
                            <label><input type="checkbox" value="ke">Ke</label>
                            <label><input type="checkbox" value="to">To</label>
                            <label><input type="checkbox" value="pe">Pe</label>
                            <label><input type="checkbox" value="la">La</label>
                            <label><input type="checkbox" value="su">Su</label>
                        </div>
                    </div>

                    <label for="startDate">Aloituspäivä</label>
                    <input type="date" id="startDate" required>

                    <label for="endDate">Lopetuspäivä</label>
                    <input type="date" id="endDate"> <br>

                    <button type="submit">Tallenna</button>
                    <button type="button" class="cancelButton">Peruuta</button>
                </form>
            </div>
        </div>

        <div id="deletePopup" class="popup">
            <div class="popup-content">
                <h3>Poista tehtävä</h3>
                <p>Haluatko varmasti poistaa tämän tehtävän?</p>
                <button id="confirmDelete">Poista</button>
                <button type="button" class="cancelButton">Peruuta</button>
            </div>
        </div>

    </div>

    <script src="js/script.js"></script>
</body>

</html>