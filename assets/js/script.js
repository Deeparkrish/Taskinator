var formEl = document.querySelector("#task-form");
var tasksTodoEl = document.querySelector("#tasks-to-do");
console.log(formEl);

var createTaskHandler=function(event){ 
    event.preventDefault();
    
    var listItemEl = document.createElement("li");
    listItemEl.textContent ="A new task";
    listItemEl.className = "task-item";
    tasksTodoEl.appendChild(listItemEl);
};
formEl.addEventListener("submit",createTaskHandler);

