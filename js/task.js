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
            console.log(data);
            loadTasks();

            if (data.newCompletion) {
                await loadCurrentPlant();

                if (currentPlant.progress >= currentPlant.requiredCompletions) {
                    gardenNotification.classList.add("active");
                    
                    plantPopupTitle.textContent = "Kasvisi on valmis!";
                    const imagePath = `assets/${currentPlant.imageFolder}/stage5.png`;
                    plantPopupImage.style.backgroundImage = `url("${imagePath}")`;
                    plantPopupText.innerHTML = `Hienoa! Kasvisi ${currentPlant.plantName} kasvoi täyteen mittaansa.<br>
                    <br> 
                    Se on nyt lisätty puutarhaasi, jossa voit tarkastella keräämiäsi kasveja.`;
                    plantPopup.style.display = "flex";
                    document.body.classList.add("popup-open");
                } else {
                    /*if (window.innerWidth <= 600) { */ 
                        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                        messageElement.textContent = randomMessage;
                        popup.style.display = "flex";
                        document.body.classList.add("popup-open");
                   
                }
            }
        } else {
            console.error(data.message);
        }
    });
}

