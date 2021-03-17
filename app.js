const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
const addBtn = document.querySelectorAll('.add-btn');

const listColumns = document.querySelectorAll('.drag-item-list');
const addItem = document.querySelectorAll('.add-item'); //Add item input box

const backlogUl = document.getElementById('backlog-list'); 
const progressUl = document.getElementById('progress-list'); 
const testingUl = document.getElementById('testing-list');
const completeUl = document.getElementById('complete-list'); 




//Toggle Add Item Input Box
addBtn[0].addEventListener('click', showInputBoxBacklog);
addBtn[2].addEventListener('click', showInputBoxProgress);
addBtn[4].addEventListener('click', showInputBoxTesting);
addBtn[6].addEventListener('click', showInputBoxComplete);

function showInputBoxBacklog() {
    addItemContainers[0].classList.toggle('display-block');
    saveItemBtns[0].classList.toggle('display-block');
}
function showInputBoxProgress() {
    addItemContainers[1].classList.toggle('display-block');
    saveItemBtns[1].classList.toggle('display-block');
}
function showInputBoxTesting() {
    addItemContainers[2].classList.toggle('display-block');
    saveItemBtns[2].classList.toggle('display-block');
}
function showInputBoxComplete() {
    addItemContainers[3].classList.toggle('display-block');
    saveItemBtns[3].classList.toggle('display-block');
}


//Add task on clicking and pressing enter
saveItemBtns[0].addEventListener('click', addTaskBacklog);
saveItemBtns[1].addEventListener('click', addTaskProgress);
saveItemBtns[2].addEventListener('click', addTaskTesting);
saveItemBtns[3].addEventListener('click', addTaskComplete);

function addTaskBacklog() {
    if (addItem[0].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[0].textContent);
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        li.setAttribute('ondragstart', 'drag(event)');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.setAttribute('id', 'drag1');
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        backlogUl.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[0].textContent = '';
    }
}
function addTaskProgress() {
    if (addItem[1].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[1].textContent);
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        li.setAttribute('ondragstart', 'drag(event)');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.setAttribute('id', 'drag2');
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        progressUl.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[1].textContent = '';
    }
}
function addTaskTesting() {
    if (addItem[2].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[2].textContent);
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        li.setAttribute('ondragstart', 'drag(event)');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.setAttribute('id', 'drag3');
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        testingUl.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[2].textContent = '';
    }
}
function addTaskComplete() {
    if (addItem[3].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[3].textContent);
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        li.setAttribute('ondragstart', 'drag(event)');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.setAttribute('id', 'drag4');
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        completeUl.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[3].textContent = '';
    }
}

addItem[0].addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addTaskBacklog();
    }
});
addItem[1].addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addTaskProgress();
    }
});
addItem[2].addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addTaskTesting();
    }
});
addItem[3].addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addTaskComplete();
    }
});


// Remove task clicking on the bin icon
function removeTask(e) {
    if(e.target.parentElement.classList.contains("drag-item")) {
        e.target.parentElement.remove();
        /* clearTaskLS(e.target.parentElement.parentElement); */
    } 
}

backlogUl.addEventListener('click', removeTask);
progressUl.addEventListener('click', removeTask);
testingUl.addEventListener('click', removeTask);
completeUl.addEventListener('click', removeTask);

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}



  
// When Item Enters Column Area
/* function dragEnter(column) {
    listColumns[column].classList.add('over');
    currentColumn = column;
  }
  
  // When Item Starts Dragging
  function drag(e) {
    draggedItem = e.target;
    dragging = true;
  }
  
  // Column Allows for Item to Drop
  function allowDrop(e) {
    e.preventDefault();
  }
  
  // Dropping Item in Column
  function drop(e) {
    e.preventDefault();
    const parent = listColumns[currentColumn];
    // Remove Background Color/Padding
    listColumns.forEach((column) => {
      column.classList.remove('over');
    });
    // Add item to Column
    parent.appendChild(draggedItem);
    // Dragging complete
    dragging = false;
    rebuildArrays();
  } */