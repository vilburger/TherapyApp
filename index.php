<!DOCTYPE html>
<html lang="fi">

<head>
    <meta charset="UTF-8">
    <title>Terapiasovellus</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <main class="dashboard">
        <section class="welcome">
            <h1>Hauska nähdä taas, Vilma!</h1>
        </section>

        <section class="daily card" aria-labelledby="daily-task-heading">
            <p aria-label="Päivämäärä">Torstai 18.6.2026</p>
            <h2 id="daily-task-heading">Päivän tehtävä: venyttely</h2>
            <p>Kuvaus: tee eilen sovittuja venytyksiä 5 minuutin ajan.</p>
            <button
                id="done"
                aria-label="Merkitse päivän tehtävä suoritetuksi">Merkitse valmiiksi</button>
        </section>

        <section class="weekly card">
            <h2>Viikkonäkymä</h2>

            <table class="week-table"
                aria-label="Viikon tehtävien suoritusnäkymä">
                <thead>
                    <tr>
                        <th>ma</th>
                        <th>ti</th>
                        <th>ke</th>
                        <th>to</th>
                        <th>pe</th>
                        <th>la</th>
                        <th>su</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                        <td aria-label="Tehtävä suoritettu"><span class="dot done" aria-hidden="true"></span></td>
                        <td></td>
                        <td aria-label="Tehtävä suorittamatta"><span class="dot" aria-hidden="true"></span></td>
                        <td></td>
                        <td></td>
                        <td aria-label="Tehtävä suorittamatta"><span class="dot" aria-hidden="true"></span></td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="progress card" aria-labelledby="progress-heading">
            <h2 id="progress-heading">Edistyminen</h2>

            <div class="progress-container"
                role="progressbar"
                aria-valuenow="33"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Viikon tehtävien eteneminen">
                <div class="progress-bar">
                    <!-- span class="prog-text">33%</span -->
                </div>
            </div>
            <p>1/3 tehtävää suoritettu</p>
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
                <tbody>
                    <tr>
                        <td>venyttely</td>
                        <td>
                            <button aria-label="Muokkaa tehtävää">Muokkaa</button>
                        </td>
                        <td>
                            <button aria-label="Poista tehtävä">Poista</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button id="add" aria-label="Lisää uusi tehtävä">Lisää tehtävä</button>
        </section>
    </main>
</body>

</html>