function completeTask(task) {
    const today = new Date().getDay();

    if (task.completedDays.includes(today)) {
        return;
    }

    task.completedDays.push(today);

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
    popup.style.display = "block";

    renderTodayTasks();
    renderWeekView();
    renderWeekList();
    updateTodayProgress();
}