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
    seedPopup.style.display = "flex";
    document.body.classList.add("popup-open");
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
        document.body.classList.remove("popup-open");
    } else {
        console.error(data.message);
    }
}

//puutarhaa varten
async function loadGarden() {
    const response = await fetch("php/getGarden.php");

    const gardenPlants = await response.json();

    console.log(gardenPlants);

    renderGarden(gardenPlants);
}

function renderGarden(gardenPlants) {
    gardenContainer.innerHTML = "";

    if (gardenPlants.length === 0) {
        gardenContainer.textContent = "Puutarhasi on vielä tyhjä! Kasvata ensimmäinen kasvisi, niin se ilmestyy tänne.";
        return;
    }

    gardenPlants.forEach(plant => {
        const plantCard = document.createElement("div");

        plantCard.classList.add("garden-plant");

        const imagePath = `assets/${plant.imageFolder}/stage5.png`;

        plantCard.innerHTML = `
            <div class="garden-plant-image"></div>
            <p class="garden-plant-name">${plant.plantName}</p>
            <p class="garden-plant-amount">x${plant.amount}</p>
        `;

        console.log(imagePath);
        plantCard.querySelector(".garden-plant-image").style.backgroundImage =
            `url("${imagePath}")`;

        gardenContainer.appendChild(plantCard);
    });
}