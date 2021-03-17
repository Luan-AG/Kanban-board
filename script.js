const addBtns = document.querySelectorAll('.add-btn:not(.solid)'); //Array with all the 'add item' buttons
const saveItemBtns = document.querySelectorAll('.solid'); //Array with all the 'save item' buttons
const addItemContainers = document.querySelectorAll('.add-container'); // Array with all the hidden 'add container'
const addItems = document.querySelectorAll('.add-item'); // Array with all the <div> elements inside the 'add container'

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



// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add('drag-item');
  listEl.draggable = true;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
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
  // Complete Column
  testingUL.textContent = '';
  testingListArray.forEach((completeItem, index) => {
    createItemEl(testingUL, 2, completeItem, index);
  });
  testingListArray = filterArray(testingListArray);
  // On Hold Column
  completeUL.textContent = '';
  completeListArray.forEach((onHoldItem, index) => {
    createItemEl(completeUL, 3, onHoldItem, index);
  });
  completeListArray = filterArray(completeListArray);
  // Don't run more than once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

