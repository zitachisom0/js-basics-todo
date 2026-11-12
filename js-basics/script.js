// Step 1: Variables & Data Types
// This is where JS "lives" for our page. Open the browser console
// (right-click page > Inspect > Console tab) to see output from console.log().

console.log("Script is connected!");
let task = "Sign Attendance";
let isDone = false;
console.log(task);
console.log(isDone);


//function example
function addTask(taskText) {
    console.log("Added task: " + taskText)
}
addTask("Buy Milk")

//assigning variables
let input = document.getElementById("taskInput");
let button = document.getElementById("addBtn");
let list = document.getElementById("taskList")

//click function
let tasks = [];
button.addEventListener("click", function() {
    if (input.value === "") {
        console.log("Please type something!!")
    } else {

        let listItem = document.createElement("li");
        listItem.textContent = input.value;
        list.appendChild(listItem)
        tasks.push(input.value);

        //delete
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        listItem.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", function() {
                event.stopPropagation(); // stops the click from reaching listItem too
            listItem.remove();
        })

        //toggle
        listItem.addEventListener("click", function() {
            listItem.classList.toggle("done");
        })

        //loops
        for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]);
        }

        //forEach
        tasks.forEach(function(item) {
            console.log(item)
        })

        console.log(tasks);
        input.value = "";


    }


}) 

