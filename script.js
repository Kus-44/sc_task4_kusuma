// ✅ Ask for Notification Permission at the top of the file
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// 🔽 Your existing code starts below
document.addEventListener("DOMContentLoaded", function () {
  // your to-do app logic here
});
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("taskList");
const successSound = document.getElementById("success sound");
const darkModeToggle = document.getElementById("darkModeToggle");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (Notification.permission === "granted") {
  new Notification("📝 Task Added", {
    body: "Your new task was successfully added!",
    icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png" // optional
  });
}
  const taskText = document.getElementById("task-input").value.trim();
  const priority = document.getElementById('task-priority').value;
  const category = document.getElementById("task-category").value;
  const dueDate = document.getElementById("due-date-input").value;

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>
      <input type="checkbox" class="task-checkbox">
      <strong>${taskText}</strong> 
      <small style="color: gray;"> (${category}) - ${dueDate}</small>
    </span>
    <button class="delete-btn">🗑</button>
  `;

  taskList.appendChild(li);
  document.getElementById("task-input").value = "";
  document.getElementById("due-date-input").value = "";

  const checkbox = li.querySelector(".task-checkbox");
  const successSound=new Audio("successsound");
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    if (checkbox.checked) {
      taskTestSpan.classList.add("completed");
      listitem.classList.add("completed");
      successsound.play();
      confetti();
    }
  });
  function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");
  const successound=document.getElementById("successsound");
  if(successSound){
    successsound.currentTime = 0; // Reset sound
    successsound.play().catch(err=>console.log("sound play blocked",err)) ;// Play sound
  }
  // Hide after 2 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
showNotification("Task added successfully ✅");

  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".container").classList.toggle("dark-mode");
});

// Clear Completed
document.getElementById("clear-completed-btn").addEventListener("click", () => {
  const completedTasks = document.querySelectorAll("#taskList li.completed");
  completedTasks.forEach(task => task.remove());
});