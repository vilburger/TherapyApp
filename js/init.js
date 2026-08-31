// ===================================
// APPLICATION INITIALIZATION
// ===================================
loadUserName();
loadTasks();
renderCurrentDate();
highlightToday();
loadCurrentPlant();
loadPlantOptions();
setupPlantOptionButtons();

closeGardenButton.addEventListener("click", () => {
    closeGarden();
});