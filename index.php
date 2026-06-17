<!DOCTYPE html>
<html lang="fi">

<head>
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
            <h2>Päivän tehtävä: venyttely</h2>
            <p>Kuvaus: tee eilen sovittuja venytyksiä 5 minuutin ajan.</p>
            <button id="done" title="Paina merkitäksesi tehtävän suoritetuksi">Merkitse valmiiksi</button>
        </section>

        <section class="weekly card">
            <h2>Viikkonäkymä</h2>
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
            <p>1/3 tehtävää suoritettu</p>
        </section>

        <section class="taskManagement card">
            <h2>Tehtävienhallinta</h2>
            <button>Lisää tehtävä</button>
            <button>Muokkaa tehtävää</button>
            <button>Poista tehtävä</button>
        </section>
    </main>
</body>

</html>