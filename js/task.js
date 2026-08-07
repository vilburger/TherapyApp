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

                if (currentPlant.progress >= currentPlant.requiredCompletions) {
                    plantPopupTitle.textContent = "Kasvisi on valmis!";
                    plantPopupText.textContent = `Hienoa! Kasvisi ${currentPlant.plantName} kasvoi täyteen mittaansa.`;
                    plantPopup.style.display = "block";
                } else {
                    console.log("Kasvi kasvaa vielä");

                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    messageElement.textContent = randomMessage;
                    popup.style.display = "block";
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