window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
