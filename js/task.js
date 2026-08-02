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
    .then(async data => {
        if (data.success) {
            loadTasks();

            if (data.newCompletion) {
                await loadCurrentPlant();

                if (loadCurrentPlant.progress >= currentPlant.requiredCompletions) {
                    console.log("Kasvi on valmis");
                } else {
                    console.log("Kasvi kasvaa vielä");
                }

                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                messageElement.textContent = randomMessage;
                popup.style.display = "block";
            }
        } else {
            console.error(data.message);
        }
    });
}