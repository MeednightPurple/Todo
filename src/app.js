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
                const priority = button.dataset["priority"];
                const taskInput = document.getElementById('task-input').value;
                const formattedDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: "long", timeStyle: "medium" }).format(new Date());

                const key = genRanHex(32);

                createTask(priority, taskInput, formattedDate, key);
                saveTask({
                    priority: priority,
                    content: taskInput,
                    date: formattedDate
                }, key);
            })
        }
    }

    const tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");

    Object.keys(tasks).forEach((key) => {
        const task = tasks[key];
        createTask(task.priority, task.content, task.date, key);
    })
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


function createTask(priority, taskInput, date, key) {
    console.log(priority, taskInput);

    const taskElement = document.createElement("div");
    taskElement.classList.add("todo-item", priority);
    taskElement.dataset["key"] = key;

    const dateText = document.createElement("h6");
    dateText.innerText = date;
    taskElement.appendChild(dateText);

    const taskText = document.createElement("h2");
    taskText.innerText = taskInput;
    taskElement.appendChild(taskText);

    taskElement.addEventListener("click", () => {
        const tasks = JSON.parse(localStorage.getItem("tasks") ?? "{}");
        delete tasks[taskElement.dataset.key];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskElement.remove();
    })

    const todoList = document.getElementById("todo-list");
    todoList.appendChild(taskElement);
}

function saveTask(task, key) {
    const tasks = JSON.parse(localStorage.getItem("tasks") ?? "{}");
    tasks[key] = task

    const taskJson = JSON.stringify(tasks);
    localStorage.setItem("tasks", taskJson);
}
