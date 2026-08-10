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
    });
}