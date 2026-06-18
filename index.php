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

        <section class="daily card">
            <!-- korjaa h6 p:ks -->
            <h6>Torstai 18.6.2026</h6>
            <h2>Päivän tehtävä: venyttely</h2>
            <p>Kuvaus: tee eilen sovittuja venytyksiä 5 minuutin ajan.</p>
            <button id="done" title="Paina merkitäksesi tehtävän suoritetuksi">Merkitse valmiiksi</button>
        </section>

        <section class="weekly card">
            <h2>Viikkonäkymä</h2>

            <!-- erottele thead ja body - tutki vaik et miks -->
            <table class="week-table">
                <tr>
                    <th>ma</th>
                    <th>ti</th>
                    <th>ke</th>
                    <th>to</th>
                    <th>pe</th>
                    <th>la</th>
                    <th>su</th>
                </tr>
                <!-- lisää aria labelit! -->
                <tr>
                    <td></td>
                    <td><span class="dot done"></span></td>
                    <td></td>
                    <td><span class="dot"></span></td>
                    <td></td>
                    <td></td>
                    <td><span class="dot"></span></td>
                </tr>
            </table>
        </section>

        <section class="progress card">
            <h2>Edistyminen</h2>

            <!-- tänne myös aria-labelit:
             <div class="progress-container"
            role="progressbar"
            aria-valuenow="33"
            aria-valuemin="0"
            aria-valuemax="100">
            -->
            <div class="progress-container">
                <div class="progress-bar">
                    <!-- span class="prog-text">33%</span -->
                </div>
            </div>
            <p>1/3 tehtävää suoritettu</p>
        </section>

        <!-- korjaa kebab-case sk-ma -->
        <section class="taskManagement card">
            <h2>Tehtävienhallinta</h2>

            <!-- tänne kans head ja body -->
            <table class="task-table">
                <tr>
                    <th>Aktiiviset tehtäväsi</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>venyttely</td>
                    <td>
                        <button>Muokkaa</button>
                    </td>
                    <td>
                        <button>Poista</button>
                    </td>
                </tr>
            </table>
            <button id="add">Lisää tehtävä</button>
        </section>
    </main>
</body>

</html>