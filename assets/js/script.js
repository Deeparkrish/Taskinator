var taskIdCounter = 0;
var formEl = document.querySelector("#task-form"); //the input form
var tasksTodoEl = document.querySelector("#tasks-to-do");// the id of ul

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
  formEl.reset();
    //Make the task name and type into a single Data object 
    var taskDataObj={
        name:taskNameInput,
        type:taskTypeInput
    }

    //call Create a task element 
    createTaskEl(taskDataObj,taskIdCounter);  

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
    console.log(taskActionsEl);
    
     // Add the li to <ul>list
     listItemEl.appendChild(taskActionsEl);

    tasksTodoEl.appendChild(listItemEl);

    taskIdCounter++;
    //console.log(taskIdCounter);
}
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
     statusSelectEl.name= "status-change";
     statusSelectEl.setAttribute("data-task-id",taskId);

     var statusChoices = ["To Do", "In Progress", "Completed"];
     for (i=0;i<statusChoices.length;i++)
     {
         //create option element 
         var statusOptionEl= document.createElement("option");
         statusOptionEl.textContent =statusChoices[i];
         statusOptionEl.setAttribute("value", statusChoices[i]);
     }
     //add to the div
     actionContainerEl.appendChild(statusSelectEl);

 
    return actionContainerEl;
};

formEl.addEventListener("submit",taskFormHandler);

