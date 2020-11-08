const formElement = document.getElementById('form');
const todoInputElelment = document.getElementById('todoInput');
const todoListContainer = document.querySelector('.todo__list');
// const todaysDay = document.querySelector('#todaysDay');
// console.log(todaysDay);
let todaysDate = document.querySelector('#todaysDate');

function displayTodoDOM(todo) {
    const listElement = document.createElement("li");
    listElement.classList.add()
    listElement.innerHTML = `
    <span class="text">${todo}</span>
     <div class="options">
         <span id="check"><i class="fas fa-check"></i></span>
         <span id="edit"><i class="fas fa-edit"></i></span>
         <span id="trash"><i class="fas fa-trash"></i></span>
    </div>`;
    todoListContainer.prepend(listElement); 
}

function myDate() {
    let today = new Date();
    let date = today.getDate();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let monthsName = new Array(12);
    monthsName[0] = "January";
    monthsName[1] = "Febraury";
    monthsName[2] = "March";
    monthsName[3] = "April";
    monthsName[4] = "May";
    monthsName[5] = "June";
    monthsName[5] = "July";
    monthsName[7] = "August";
    monthsName[8] = "September";
    monthsName[9] = "October";
    monthsName[10] = "November";
    monthsName[11] = "December";

    let fullyear = today.getFullYear();
    let month = monthsName[today.getMonth()];
    let day = weekday[today.getDay()];

todaysDate.textContent = `${day} ${date} ${month}, ${fullyear}`;
}

myDate();

function itemToDelete(item) {
   if(item.classList.contains("fa-trash") || item.id === "trash"){
    const todoListElement = item.closest('li');
    todoListElement.classList.remove();
    todoListElement.classList.add();

    setTimeout(() => {
        todoListElement.remove()
    },1000);
    deleteDataFromStorage(item);
   }
}

function itemToEdit(item) {
    if(item.classList.contains("fa-edit") || item.id === "edit"){
        const todoListElement = item.closest('li');
        todoInputElelment.value = todoListElement.textContent.trim();
        todoListElement.remove();
        editedItemFromStorage(item);
}
}

function itemDone(item) {
    if(item.classList.contains("fa-check") || item.id === "check"){
        const crossItem = item.closest("li");
        crossItem.firstElementChild.classList.toggle('checked');
        crossItem.addEventListener('transitionend', () => {
            // crossItem.remove();
        })
        // displayDataFromLocalStorage(item);
 }
}

//local storage
function storeToLocalStorage(todo) {
    let todoArray = ""
    if (localStorage.getItem('todos') === null) {
        todoArray = [];
    }else {
        todoArray = JSON.parse(localStorage.getItem('todos'))
    }
    todoArray.push(todo);
    localStorage.setItem('todos',JSON.stringify(todoArray));
}


function displayDataFromLocalStorage() {
    let todoArray = JSON.parse(localStorage.getItem('todos')) || [];
    if(todoArray.length > 0){
        todoArray.forEach(function(item){
            todoListContainer.insertAdjacentHTML('afterbegin', 
            `
            <li><span class="text">${item}</span>
        <div class="options">
            <span id="check"><i class="fas fa-check"></i></span>
            <span id="edit"><i class="fas fa-edit"></i></span>
            <span id="trash"><i class="fas fa-trash"></i></span></li>
        </div>
            `
            );          
        })
    }
    
    
}

function deleteDataFromStorage(item) {
    const todoArray = JSON.parse(localStorage.getItem('todos'));
    const todoListElement = item.closest('li');

    const todoItemLeft = todoArray.filter((todo) => todoListElement.textContent.trim() !== todo);
    localStorage.setItem('todos', JSON.stringify(todoItemLeft));
}

function editedItemFromStorage(item) {
    deleteDataFromStorage(item);
}

document.addEventListener("DOMContentLoaded", displayDataFromLocalStorage());

todoListContainer.addEventListener('click', (e) => {
    itemToDelete(e.target);
    itemToEdit(e.target);
    itemDone(e.target);
})

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputTodo = todoInputElelment.value;
    if(!inputTodo) {
        alert('Please enter a todo item');
    }else {
        displayTodoDOM(inputTodo);
        storeToLocalStorage(inputTodo);
    }
    formElement.reset();
});
