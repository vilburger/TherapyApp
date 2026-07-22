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
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadTasks();

            if (data.newCompletion) {
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                messageElement.textContent = randomMessage;
                popup.style.display = "block";
            }
        } else {
            console.error(data.message);
        }
    });
}