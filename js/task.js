function completeTask(task) {
    const completion = {
        taskID: task.taskID,
        completedAt: getTodayDate()
    };

    fetch("php/saveCompletion.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    });

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