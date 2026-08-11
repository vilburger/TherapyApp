async function loadCurrentPlant() {
     const response = await fetch("php/getCurrentPlant.php", {
    })

    currentPlant = await response.json();

    renderCurrentPlant();
}

//funktio, joka hakee kasvin oikean kasvuvaiheen
function getPlantStage(plant) {
    //lasketaan edistyminen jakamalla kasvin edistyminen tarvituilla suorituksilla
    const progress = plant.progress / plant.requiredCompletions;
    //lasketaan kasvuvaihe kertomalla äskeinen tulos viidellä ja pyöristämällä alaspäin kokonaislukuun
    const stage = Math.floor(progress * 5);
    return stage;
}

async function loadPlantOptions() {
    const response = await fetch("php/getPlantOptions.php");

    const plantOptions = await response.json();

    renderPlantOptions(plantOptions);
}

function renderPlantOptions(plantOptions) {
    plantOptions.forEach((plant, index) => {
        seedNames[index].textContent = plant.plantName;

        const imagePath = `assets/${plant.imageFolder}/seed.png`;

        seedImages[index].style.backgroundImage = `url("${imagePath}")`;

        //HTML-napille data-attribuutti plantID
        seedButtons[index].dataset.plantId = plant.plantID;
    });
}

//funktio siemenen valinnan avaamiseen
function showPlantChoicePopup() {
    seedPopup.style.display = "block";
}

function setupPlantOptionButtons() {
    seedButtons.forEach(button => {
        button.addEventListener("click", () => {
            const plantID = button.dataset.plantId;

            console.log("Valittu kasvi: ", plantID);

            selectPlant(plantID);
        })
    })
}

async function selectPlant(plantID) {
    const response = await fetch("php/selectPlant.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            plantID: plantID
        })
    });

    const data = await response.json();

    if (data.success) {
        console.log(data.message);

        await loadCurrentPlant();

        seedPopup.style.display = "none";
    } else {
        console.error(data.message);
    }
}