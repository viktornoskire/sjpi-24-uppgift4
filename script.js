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


function changeStatus(text, status) {
    let changeIndex = todoArray.map(t => t.name).indexOf(text);
    todoArray[changeIndex].completed = status;
    console.log(todoArray);
}

function searchExistingElement(input) {
    let searchArray = todoArray.map(t => t.name).includes(input);
    return searchArray;
}

function searchIndex(removedItem) {
    let index = todoArray.map(t => t.name).indexOf(removedItem);
    return index;
}

addBtn.addEventListener(
    "click",
    function () {
        let text = myInput.value;

        if (text == "") {
            infoText.innerHTML = "You have to write something!";
        }
        else {
            if (searchExistingElement(text)) {
                infoText.innerHTML = "Task already in your todo-list...";
            }
            else {
                // 
                infoText.innerHTML = "";
                const listItem = document.createElement('li');
                taskList.appendChild(listItem);

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

                const todoObject = {};
                todoObject.name = text;
                todoObject.completed = false;
                todoArray.push(todoObject);

            }
        }
        document.querySelector('#myInput').value = "";
    }

)
