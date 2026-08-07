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