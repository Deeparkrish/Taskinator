var buttonEl = document.querySelector("#save-task");
var tasksTodoEl = document.querySelector("#tasks-to-do");
console.log(buttonEl);

var createTaskHandler=function(){ 
    alert("Button Clicked!");
    var listItemEl = document.createElement("li");
    listItemEl.textContent ="A new task";
    listItemEl.className = "task-item";
    tasksTodoEl.appendChild(listItemEl);
};
buttonEl.addEventListener("click",createTaskHandler);

