const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid'); 
const addItemContainers = document.querySelectorAll('.add-container'); 
const addItems = document.querySelectorAll('.add-item'); 
const closeBtns = document.querySelectorAll('.btn-close');

const listColumns = document.querySelectorAll('.drag-item-list'); 
const backlogUL = document.getElementById('backlog-list'); 
const progressUL = document.getElementById('progress-list'); 
const testingUL = document.getElementById('complete-list'); 
const completeUL = document.getElementById('on-hold-list'); 


// Items
let updatedOnLoad = false; 

// Initialize Arrays for each column 
let backlogListArray = [];
let progressListArray = [];
let testingListArray = [];
let completeListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) { 
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    testingListArray = JSON.parse(localStorage.completeItems);
    completeListArray = JSON.parse(localStorage.onHoldItems);
  } else { 
    backlogListArray = ['Task One', 'Task Three'];
    progressListArray = ['Task Two'];
    testingListArray = ['Task Six', 'Task Seven'];
    completeListArray = ['Task Five', 'Task Four'];
  }
}

// Create/Update the localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, testingListArray, completeListArray]; 
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold']; 
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index])); 
  });
}

// Filter Array to remove empty values
function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
 
  const binIcon = document.createElement('img');
  binIcon.setAttribute('src', 'images/bin.svg');
  binIcon.className = 'bin-icon';
  
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add('drag-item');
  listEl.draggable = true; 
  listEl.setAttribute('ondragstart', 'drag(event)');
  columnEl.appendChild(listEl);
  listEl.appendChild(binIcon);
}

// Get items from LS and Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  if (!updatedOnLoad) { 
    getSavedColumns();
  }
  // Populate the Backlog Column with the LS items
  backlogUL.textContent = ''; 
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogUL, 0, backlogItem, index);
  });

  backlogListArray = filterArray(backlogListArray);
 
  progressUL.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressUL, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);
 
  testingUL.textContent = '';
  testingListArray.forEach((completeItem, index) => {
    createItemEl(testingUL, 2, completeItem, index);
  });
  testingListArray = filterArray(testingListArray);
 
  completeUL.textContent = '';
  completeListArray.forEach((onHoldItem, index) => {
    createItemEl(completeUL, 3, onHoldItem, index);
  });
  completeListArray = filterArray(completeListArray);

  updatedOnLoad = true;
  updateSavedColumns();
}

function deleteEvents() {
  backlogUL.addEventListener('click', function(e) {
    if(e.target.parentElement.classList.contains("drag-item")) {
      const id = e.target.parentElement.id;
      delete backlogListArray[id];
      console.log(id);
      updateDOM();
    } 
  })
  progressUL.addEventListener('click', function(e) {
    if(e.target.parentElement.classList.contains("drag-item")) {
      const id = e.target.parentElement.id;
      delete progressListArray[id];
      console.log(id);
      updateDOM();
    } 
  })
  testingUL.addEventListener('click', function(e) {
    if(e.target.parentElement.classList.contains("drag-item")) {
      const id = e.target.parentElement.id;
      delete testingListArray[id];
      console.log(id);
      updateDOM();
    } 
  })
  completeUL.addEventListener('click', function(e) {
    if(e.target.parentElement.classList.contains("drag-item")) {
      const id = e.target.parentElement.id;
      delete completeListArray[id];
      console.log(id);
      updateDOM();
    } 
  })
}
deleteEvents();



// Update Item 
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumn[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumn[id].textContent;
    }
    updateDOM();
  }
}

// Add to Column List, Reset Textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM(column);
}

// Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.display = 'none';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
  closeBtns[column].style.display = 'flex'
}

// Hide Item Input Box When click Save
function hideInputBox(column) {
  if(addItems[column].textContent === ''){
    addItems[column].parentElement.style.border = '2px solid red';
    document.querySelector(`.msg${column}`).style.display = 'block';
    setTimeout(function() {
      addItems[column].parentElement.style.border = 'none';
      document.querySelector(`.msg${column}`).style.display = 'none';
    }, 2000);
  } else {
    addBtns[column].style.display = 'flex';
    saveItemBtns[column].style.display = 'none';
    addItemContainers[column].style.display = 'none';
    closeBtns[column].style.display = 'none'
    addToColumn(column);
  }
}

// Hide Item Input Box When pressed Enter
function hideInputBoxEnter(event, column) {
  if (event.key === 'Enter') {
    if(addItems[column].textContent === ''){
      addItems[column].parentElement.style.border = '2px solid red';
      document.querySelector(`.msg${column}`).style.display = 'block';
      setTimeout(function() {
        addItems[column].parentElement.style.border = 'none';
        document.querySelector(`.msg${column}`).style.display = 'none';
      }, 2000);
    } else {
        addBtns[column].style.display = 'flex';
        saveItemBtns[column].style.display = 'none';
        addItemContainers[column].style.display = 'none';
        closeBtns[column].style.display = 'none'
        addToColumn(column);
    }
  }
}

// Hide Item Input Box When click close
function closeInputBox(column) {
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  closeBtns[column].style.display = 'none'
  addBtns[column].style.display = 'flex';
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  backlogListArray = [];
  for (let i = 0; i < backlogUL.children.length; i++) {
    backlogListArray.push(backlogUL.children[i].textContent);
  }
  progressListArray = [];
  for (let i = 0; i < progressUL.children.length; i++) {
    progressListArray.push(progressUL.children[i].textContent);
  }
  testingListArray = [];
  for (let i = 0; i < testingUL.children.length; i++) {
    testingListArray.push(testingUL.children[i].textContent);
  }
  completeListArray = [];
  for (let i = 0; i < completeUL.children.length; i++) {
    completeListArray.push(completeUL.children[i].textContent);
  }
  updateDOM();
}

// When Item Enters Column Area
function dragEnter(column) {
  listColumns[column].classList.add('over'); //
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
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });
  parent.appendChild(draggedItem);
  dragging = false;
  rebuildArrays();
}

// On Load
updateDOM();