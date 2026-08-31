// ===================================
// POPUPS
// ===================================
const successPopup = document.getElementById("successPopup");
const popups = document.querySelectorAll(".popup");

const taskPopup = document.getElementById("taskPopup");
const deletePopup = document.getElementById("deletePopup");

const confirmDelete = document.getElementById("confirmDelete");
const messageElement = document.getElementById("popupMessage");

const cancelButton = document.querySelectorAll(".cancel-button");
const closeButton = document.getElementById("closePopup");

// ===================================
// TASK FORM
// ===================================
const form = document.getElementById("taskForm");

const addButton = document.getElementById("addButton");

const recurrenceOptions = document.querySelectorAll('input[name="recurrence"]');
const recurrenceGroup = document.querySelector('.recurrence-options');
const daySelection = document.getElementById("daySelection");
const dailyRadio = document.querySelector('input[value="daily"]');
const customRadio = document.querySelector('input[value="custom"]');
const daysError = document.getElementById("daysError");

// ===================================
// TASK VIEWS
// ===================================
const taskTableBody = document.getElementById("taskTableBody");
const weekBody = document.getElementById("weekBody");
const weekList = document.getElementById("weekList");
const todayTasks = document.getElementById("todayTasks");
const currentDate = document.getElementById("currentDate");

// ===================================
// PLANTS
// ===================================
const plantName = document.getElementById("plantName");
const plantProgress = document.getElementById("plantProgress");
const plantImage = document.getElementById("plantImage");

const plantPopupButton = document.getElementById("plantPopupButton");
const plantPopupImage = document.getElementById("plantPopupImage");

const seedButtons = document.querySelectorAll(".seed-button");
const seedImages = document.querySelectorAll(".seed-image");
const seedNames = document.querySelectorAll(".seed-name");
const seedPopup = document.querySelector("#seedPopup");

// ===================================
// GARDEN
// ===================================
const gardenPopup = document.getElementById("gardenPopup");
const gardenContainer = document.getElementById("gardenContainer");
const gardenButton = document.getElementById("gardenButton");
const closeGardenButton = document.getElementById("closeGardenButton");
const gardenNotification = document.getElementById("gardenNotification");