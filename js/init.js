loadTasks();
renderCurrentDate();
highlightToday();
loadCurrentPlant();
loadPlantOptions();
setupPlantOptionButtons();
loadGarden();

closeGardenButton.addEventListener("click", () => {
    closeGarden();
});