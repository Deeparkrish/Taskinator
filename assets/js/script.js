var formEl = document.querySelector("#task-form"); //the input form
var tasksTodoEl = document.querySelector("#tasks-to-do");// the id of ul

var taskFormHandler=function(event){ 
    event.preventDefault();
    
    // Assign the user input task name to TaskNameInput
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //Assign thev task type chosen to task type input 
    var taskTypeInput =document.querySelector("select[name='task-type']").value;

    //Make the task name and type into a single Data object 
    var taskDataObj={
        name:taskNameInput,
        type:taskTypeInput
    }
    //call Create a task element 
    createTaskEl(taskDataObj);  

};
var createTaskEl =function(taskDataObj){
    //create  a list item 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //create a task info that contains both task name and task type 
    var taskInfoEl= document.createElement("div");
    taskInfoEl.className="task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";    
    // Add the task info to list item  <li>
     listItemEl.appendChild(taskInfoEl);
    // Add the li to <ul>list
    tasksTodoEl.appendChild(listItemEl);
}
formEl.addEventListener("submit",taskFormHandler);

