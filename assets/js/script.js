var taskIdCounter = 0;

var formEl = document.querySelector("#task-form"); //the input form
var tasksTodoEl = document.querySelector("#tasks-to-do");// the id of ul
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


var taskFormHandler=function(event){ 
    event.preventDefault();
    
    // Assign the user input task name to TaskNameInput
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //Assign thev task type chosen to task type input 
    var taskTypeInput =document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;
  
    var isEdit = formEl.hasAttribute("data-task-id");
    if(isEdit)
    {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput,taskId);

    }
    else{
        //Make the task name and type into a single Data object 
        var taskDataObj={
            name:taskNameInput,
            type:taskTypeInput
        }
        //call Create a  new task element 
        createTaskEl(taskDataObj);  
    }

};
var createTaskEl =function(taskDataObj,taskIdCounter){
    //create  a list item 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add a custom data attribute for counter
    listItemEl.setAttribute("data-task-id" ,taskIdCounter);

    //create a task info that contains both task name and task type 
    var taskInfoEl= document.createElement("div");
    taskInfoEl.className="task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";    
    // Add the task info to list item  <li>
     listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
     // Add the li to <ul>list
    listItemEl.appendChild(taskActionsEl);
    tasksTodoEl.appendChild(listItemEl);

    taskIdCounter++;
    //console.log(taskIdCounter);
};
var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create a button for Edit 
    var editButtonEl =document.createElement("button");
    editButtonEl.textContent ="Edit";
    editButtonEl.className =" btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    //add to the div 
    actionContainerEl.appendChild(editButtonEl);
     //create a button for Delete 
     var deleteButtonEl =document.createElement("button");
     deleteButtonEl.textContent ="Delete";
     deleteButtonEl.className =" btn delete-btn";
     deleteButtonEl.setAttribute("data-task-id", taskId);
    // add to the div 
     actionContainerEl.appendChild(deleteButtonEl);

     var statusSelectEl =document.createElement("select");
     statusSelectEl.className="select-status";
     statusSelectEl.setAttribute("name", "status-change");
     statusSelectEl.setAttribute("data-task-id",taskId);
    //add to the div
    actionContainerEl.appendChild(statusSelectEl);

     var statusChoices = ["To Do", "In Progress", "Completed"];
     for (i=0;i<statusChoices.length;i++)
     {
         //create option element 
         var statusOptionEl= document.createElement("option");
         statusOptionEl.textContent =statusChoices[i];
         statusOptionEl.setAttribute("value", statusChoices[i]);
         statusSelectEl.appendChild(statusOptionEl);
        }
    return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };

var taskButtonHandler =function (event){
    //event.preventDefault();
    console.log(event.target); // where the event occurs 
    // get target element from event
    var targetEl = event.target;
     // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (event.target.matches(".delete-btn")) {
        //get the task  id 
        var taskId = event.target.getAttribute("data-task-id");
        console.log(taskId);
        // call the function to delete the task 
        deleteTask(taskId);
    }
};
var taskStatusChangeHandler = function(event) {
    console.log(event.target);
    var taskId = event.target.getAttribute("data-task-id");
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }
};
var editTask = function(taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //taskSelected.append();
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    formEl.setAttribute("data-task-id", taskId);
    document.querySelector("#save-task").textContent = "Save Task";

};

var deleteTask = function(taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};
formEl.addEventListener("submit",taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler)
pageContentEl.addEventListener("change", taskStatusChangeHandler);



