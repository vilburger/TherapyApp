async function loadCurrentPlant() {
     const response = await fetch("php/getCurrentPlant.php", {
    })

    currentPlant = await response.json();
    console.log(currentPlant);
}