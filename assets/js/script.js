var formEl = document.querySelector("#task-form"); //the input form
var tasksTodoEl = document.querySelector("#tasks-to-do");// the id of ul

var createTaskHandler=function(event){ 
    event.preventDefault();
    
    // Assign the user input task name to TaskNameInput
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    
    //Assign thev task type chosen to task type input 
    var taskTypeInput =document.querySelector("select[name='task-type']").value;

    // create a task info that contains both task name and task type 
    var taskInfoEl= document.createElement("div");
    taskInfoEl.className="task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    //create  a list item 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
   
    
    // Add the task info to <li>
    listItemEl.appendChild(taskInfoEl);

    // Add the li to <ul>
    tasksTodoEl.appendChild(listItemEl);

};
formEl.addEventListener("submit",createTaskHandler);

