import data from "./myTasks.js"

const taskList = document.querySelector(".tasks__list")

const form = document.querySelector(".buttons")

const input = document.querySelector('.user-input__field')

const importBtn = document.querySelector(".button--import")

const exportBtn = document.querySelector(".button--export")


function addTask(text, state = "active"){
    const newTask = document.createElement("div")
    newTask.classList.add("task")

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("done-button")
    doneBtn.innerText = "DONE";
    
    doneBtn.addEventListener("click", () => {
        taskText.classList.toggle("task-done")
        
        if(taskText.classList.contains("task-done")){
            taskText.style.textDecoration = "line-through";
            newTask.classList.remove("active")
            newTask.classList.add("done")
        }
        else{
            taskText.removeAttribute("style");
            newTask.classList.add("active")
        }
        
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete-button")
    deleteBtn.innerText = "DELETE";

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(newTask);
    })
    
    const taskText = document.createElement("p")

    taskText.classList.add("task--text")

    taskText.innerText = text

    newTask.append(taskText, doneBtn, deleteBtn)
    taskList.append(newTask)
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const value = input.value.trim();
    if (value) {
        addTask(value)
        input.value = '';
    }
});

function importTasksFromlist() {
    const tasks = taskList.children;
    const allTasks = [];

    for (let task of tasks) {
        const text = task.querySelector(".task--text").textContent;
        const state = task.classList.contains("done") ? "done" : "active";

        allTasks.push({
            text: text,
            state: state
        });
    }

    return JSON.stringify(allTasks, null, 2)
}

function downloadJSON(jsonString, fileName = "data.json") {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

importBtn.addEventListener("click", () => {
    const jsonString = importTasksFromlist()
    downloadJSON(jsonString, "myTasks.json");
})

exportBtn.addEventListener("click", () => {
    taskList.replaceChildren();
    const exportedTasks = JSON.parse(data); 

    exportedTasks.tasks.forEach(task => {
    addTask(task.text, task.state);
    })
})

