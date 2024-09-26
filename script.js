// JS Code



// Declare variables
let completedCount = 0;
const todoArray = [];

// Declare HTML element
const addBtn = document.querySelector("#addTask");
const myInput = document.querySelector("#myInput");
const taskList = document.querySelector('#taskList');
const counter = document.querySelector('#countToDo')
const infoText = document.querySelector('#infoText')


// Declare a function to change status of objects in todoArray
function changeStatus(text, status) {
    let changeIndex = todoArray.map(t => t.name).indexOf(text);
    todoArray[changeIndex].completed = status;
    console.log(todoArray);
}

// Declare a function to check if the written input exists already in the todoArray and returns a bool
function searchExistingElement(input) {
    let searchArray = todoArray.map(t => t.name).includes(input);
    return searchArray;
}

// Declare a function to serach for the index of the clicked item to then use the index to remove object from todoArray
function searchIndex(removedItem) {
    let index = todoArray.map(t => t.name).indexOf(removedItem);
    return index;
}

// The event listener on the addBtn
addBtn.addEventListener(
    "click",
    function () {
        const text = myInput.value; // declaring a variable with the value of myInput

        // test if the user have written anything
        if (text == "") {
            infoText.innerHTML = "You have to write something!";
        }
        else {

            // testing if the text that the user wrote already is in the list
            if (searchExistingElement(text)) {
                infoText.innerHTML = "Task already in your todo-list...";
            }
            else {
                infoText.innerHTML = "";

                // Declaring a new li-element and appending it to the unorderd list
                const listItem = document.createElement('li'); 
                taskList.appendChild(listItem);
                // Declaring a span and the textContent is the text-variable, then appending that to the li-element
                const itemLabel = document.createElement('span');
                itemLabel.textContent = text;
                listItem.appendChild(itemLabel);

                // Create button for removing list item
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = "&#x1F5D1;";
                removeBtn.setAttribute("class", 'removeBtn');
                listItem.appendChild(removeBtn);

                // Add event listener to removeBtn
                removeBtn.addEventListener(
                    "click",
                    function () {
                        taskList.removeChild(listItem);
                        // if completed count is more than 0 then the counter goes down. 
                        // then using my searchIndex-function to remove object in todoArray
                        if (completedCount > 0) {
                            completedCount--;
                            let removeItem = searchIndex(text);
                            todoArray.splice(removeItem, 1);
                            console.log(todoArray);
                        }

                        counter.textContent = `${completedCount} completed`;
                    }
                )

                // Add completed class to list element
                itemLabel.addEventListener("click", function () {
                    if (listItem.getAttribute("class") == 'completed') {
                        completedCount--;
                        listItem.setAttribute("class", '');
                        changeStatus(itemLabel.textContent, false);
                    }
                    else {
                        completedCount++;
                        listItem.setAttribute("class", 'completed');
                        changeStatus(itemLabel.textContent, true);

                    }
                    counter.textContent = `${completedCount} completed`;


                })

                // declare an empty object and push it to the todoArray 
                const todoObject = {};
                todoObject.name = text;
                todoObject.completed = false;
                todoArray.push(todoObject);

            }
        }
        document.querySelector('#myInput').value = "";
    }

)
