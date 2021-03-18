const addBtns = document.querySelectorAll('.add-btn:not(.solid)'); //Array with all the 'add item' buttons
const saveItemBtns = document.querySelectorAll('.solid'); //Array with all the 'save item' buttons
const addItemContainers = document.querySelectorAll('.add-container'); // Array with all the hidden 'add container'
const addItems = document.querySelectorAll('.add-item'); // Array with all the <div> elements inside the 'add container'
const closeBtns = document.querySelectorAll('.btn-close');// Array with all the <div .btn-close>

const listColumns = document.querySelectorAll('.drag-item-list'); //Array with all the <ul> below together.
const backlogUL = document.getElementById('backlog-list');  //Backlog <ul> element
const progressUL = document.getElementById('progress-list'); //Progress <ul> element
const testingUL = document.getElementById('complete-list'); //Testing <ul> element
const completeUL = document.getElementById('on-hold-list'); //Complete <ul> element


// Items
let updatedOnLoad = false; //False means that when we load the page the content from LS was not yet downloaded, when it turns true it means it was loaded and we don't run it again.

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
  if (localStorage.getItem('backlogItems')) { //if the localstorage already exists, get the values and parse into the empty arrays
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    testingListArray = JSON.parse(localStorage.completeItems);
    completeListArray = JSON.parse(localStorage.onHoldItems);
  } else { // else use this template arrays
    backlogListArray = ['Task One', 'Task Three'];
    progressListArray = ['Task Two', 'Task Four'];
    testingListArray = ['Task Six', 'Task Seven'];
    completeListArray = ['Task Five'];
  }
}

// Create/Update the localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, testingListArray, completeListArray]; //Defining the listArrays to all the columns arrays
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold']; // Define an array with names for each LS
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index])); // Set the LS with the name of each column and the respective items. 
  });
}

// Filter Array to remove empty values
function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const binIcon = document.createElement('img');
  binIcon.setAttribute('src', 'images/bin.svg');
  binIcon.className = 'bin-icon';
  

  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;//get the position of the item in the array
  listEl.classList.add('drag-item');
  listEl.draggable = true; //means I can get the item
  /* listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`); *///event listener to delete if empty or updated if changed
  listEl.setAttribute('ondragstart', 'drag(event)');
  /* listEl.contentEditable = true; */
  // Append
  columnEl.appendChild(listEl);
  listEl.appendChild(binIcon);
}

// Get items from LS and Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) { //if the value of the variable 'updatedOnLoad' is false, then get the data from local storage, else skip it.
    getSavedColumns();
  }
  // Populate the Backlog Column with the LS items
  backlogUL.textContent = ''; //reset the ul just in case
  backlogListArray.forEach((backlogItem, index) => { //Get all the items and index positions from the LS array
    createItemEl(backlogUL, 0, backlogItem, index);//Populate the UI column for each item of the array from LS
  });

  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressUL.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressUL, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);
  // Testing Column
  testingUL.textContent = '';
  testingListArray.forEach((completeItem, index) => {
    createItemEl(testingUL, 2, completeItem, index);
  });
  testingListArray = filterArray(testingListArray);
  // Complete Column
  completeUL.textContent = '';
  completeListArray.forEach((onHoldItem, index) => {
    createItemEl(completeUL, 3, onHoldItem, index);
  });
  completeListArray = filterArray(completeListArray);
  // Don't run more than once, Update Local Storage
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




// Update Item - Delete if necessary, or update Array value
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
  addBtns[column].style.display = 'flex';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  closeBtns[column].style.display = 'none'
  addToColumn(column);
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
  draggedItem = e.target;// Get the target element and store into the variable 'draggedItem'
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
}

// On Load
updateDOM();