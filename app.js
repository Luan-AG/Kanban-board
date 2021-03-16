const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogListEl = document.getElementById('backlog-list');
const progressListEl = document.getElementById('progress-list');
const completeListEl = document.getElementById('complete-list');
const onHoldListEl = document.getElementById('on-hold-list');

//Toggle Input Box
const addBtn = document.querySelectorAll('.add-btn');
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


const addItem = document.querySelectorAll('.add-item');


//Add task on clicking and pressing enter
function addTaskBacklog() {
    console.log(addItem);
    if (addItem[0].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[0].textContent);
        const ul = document.getElementById('backlog-list');
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        ul.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[0].textContent = '';
    }
}

function addTaskProgress() {
    if (addItem[1].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[1].textContent);
        const ul = document.getElementById('progress-list');
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        ul.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[1].textContent = '';
    }
}

function addTaskTesting() {
    if (addItem[2].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[2].textContent);
        const ul = document.getElementById('testing-list');
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        ul.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[2].textContent = '';
    }
}

function addTaskComplete() {
    if (addItem[3].textContent === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(addItem[3].textContent);
        const ul = document.getElementById('complete-list');
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/bin.svg');
        img.className = 'bin-icon';
        li.className = 'drag-item';
        li.draggable = true;
        li.appendChild(inputText);
        li.appendChild(img);
        ul.appendChild(li);
        /* storeTaskLS(inputTask.value); */
        addItem[3].textContent = '';
    }
}

saveItemBtns[0].addEventListener('click', addTaskBacklog);
saveItemBtns[1].addEventListener('click', addTaskProgress);
saveItemBtns[2].addEventListener('click', addTaskTesting);
saveItemBtns[3].addEventListener('click', addTaskComplete);

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


