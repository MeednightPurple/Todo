function showAddTask() {
    const addTask = document.getElementById("add-task");
    const addBtn = document.getElementById("add-btn")

    if (addTask.style.display == "none") {
        addTask.style.display = "flex";
        addBtn.textContent = "Close";
    } else {
        addTask.style.display = "none";
        addBtn.textContent = "Add";
    }
}

window.onload = () => {
    let a = 0;
    document.getElementById("add-task").style.display = "none";

    const addButton = document.getElementById("add-btn");
    addButton.addEventListener("click", showAddTask);

}