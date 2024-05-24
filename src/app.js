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
    document.getElementById("add-task").style.display = "none";

    const addButton = document.getElementById("add-btn");
    addButton.addEventListener("click", showAddTask);

    for (let button of document.getElementsByClassName('btn-add')) {
        if (button instanceof HTMLButtonElement) {
            button.addEventListener("click", () => {
                const priority = button.dataset["priority"]
                const taskInput = document.getElementById('task-input').value

                createTask(priority, taskInput)
            })
        }
    }
}

function createTask(priority, taskInput) {
    console.log(priority, taskInput);

    const taskElement = document.createElement("div");
    taskElement.classList.add("todo-item", priority);

    const dateText = document.createElement("h6");
    dateText.innerText = new Intl.DateTimeFormat('fr-FR', { dateStyle: "long", timeStyle: "medium" }).format(new Date());
    taskElement.appendChild(dateText);

    const taskText = document.createElement("h2");
    taskText.innerText = taskInput;
    taskElement.appendChild(taskText);

    taskElement.addEventListener("click", () => {
        taskElement.remove();
    })

    const todoList = document.getElementById("todo-list");
    todoList.appendChild(taskElement);
}