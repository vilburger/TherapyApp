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
    <link rel="stylesheet" href="css/mobile.css">
    <link rel="stylesheet" href="css/navbar.css">
</head>

<body>
    <div class="navbar">
            <ul>
                <li><a href="#taskManagement">Tehtävienhallinta</a></li>
                <li>
                <button id="gardenButton" class="garden-link">Puutarha</button>
</li>
            </ul>
        </div>
    <main class="dashboard">
        
        <section class="welcome">
            <h1>Hauska nähdä taas, Vilma!</h1>
        </section>

        <section class="top-cards">
        <section class="daily card" aria-labelledby="daily-task-heading">

            <p id="currentDate" aria-label="Päivämäärä"></p>
            <h2 id="daily-task-heading">Tämän päivän tehtävät</h2>

            <div id="todayTasks"></div>
        </section>
        <section class="plant card">
            <h2>Kasvisi</h2>
            <img id="plantImage" class="plant-image" src="" alt="Kasvin kuva">
            <h3 id="plantName"></h3>
            <p id="plantProgress"></p>
        </section>
        </section>
<!--
        <section class="progress card">

            <h2>Päivän edistyminen</h2>

            <div class="progress-container">
                <div class="progress-bar" id="todayProgressBar"></div>
                <span id="todayProgressText">0%</span>
            </div>

            <p id="todayProgressInfo"></p>

        </section>
-->
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

            <!-- mobiilin listanäkymä -->
            <div id="weekList" class="week-list"></div>
        </section>

        <section class="task-management card" id="taskManagement">
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

            <!-- listanäkymä mobiilia varten -->
            <div class="task-list">
                <h3 id="taskHeading">Aktiiviset tehtäväsi</h3>
                <div id="taskList"></div>
            </div>

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
                    <label for="taskTitle">Tehtävän nimi:</label>
                    <input type="text" id="taskTitle" name="taskTitle" required>

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

                        <div id="daysError" class="error-message hidden"></div>
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

        <div id="plantPopup" class="popup">
            <div class="popup-content">
                <h2 id="plantPopupTitle"></h2>

                <div class="plant-celebration">
                    <div class="plant-glow"></div>

                    <span class="sparkle sparkle-1">✦</span>
                    <span class="sparkle sparkle-2">✧</span>
                    <span class="sparkle sparkle-3">✦</span>
                    <span class="sparkle sparkle-4">✧</span>

                    <div class="plantPopupImage"></div>
        </div>

                <p id="plantPopupText"></p>
                <button id="plantPopupButton">Jatka</button>
            </div>
        </div>

        <div id="seedPopup" class="popup">
            <div class="popup-content">
                <h2>Valitse seuraava siemen</h2>

                <div class="seed-container">
                    <button class="seedButton">
                        <div class="seedImage"></div>
                        <p class="seedName"></p>
                    </button>
                    <button class="seedButton">
                        <div class="seedImage"></div>
                        <p class="seedName"></p>
                    </button>
                    <button class="seedButton">
                        <div class="seedImage"></div>
                        <p class="seedName"></p>
                    </button>
                </div>
            </div>
        </div>

        <div id="gardenPopup" class="popup">
            <div class="popup-content">
                <h2>Puutarha</h2>
                <h3>Täällä näet keräämäsi kasvit</h3>

                <div id="gardenContainer"></div>

                <button id="closeGardenButton">Sulje</button>
            </div>
        </div>

    </div>

    <script src="js/config.js"></script>
    <script src="js/data.js"></script>
    <script src="js/dom.js"></script>

    <script src="js/utils.js"></script>

    <script src="js/popup.js"></script>
    <script src="js/task.js"></script>
    <script src="js/plant.js"></script>
    <script src="js/ui.js"></script>

    <script src="js/app.js"></script>
    <script src="js/init.js"></script>

</body>

</html>