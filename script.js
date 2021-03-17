const addBtns = document.querySelectorAll('.add-btn:not(.solid)'); //Array with all the 'add item' buttons
const saveItemBtns = document.querySelectorAll('.solid'); //Array with all the 'save item' buttons
const addItemContainers = document.querySelectorAll('.add-container'); // Array with all the hidden 'add container'
const addItems = document.querySelectorAll('.add-item'); // Array with all the <div> elements inside the 'add container'

const listColumns = document.querySelectorAll('.drag-item-list'); //Array with all the <ul> below together.
const backlogListEl = document.getElementById('backlog-list');  //Backlog <ul> element
const progressListEl = document.getElementById('progress-list'); //Progress <ul> element
const testingListEl = document.getElementById('complete-list'); //Testing <ul> element
const completeListEl = document.getElementById('on-hold-list'); //Complete <ul> element


// Initialize Arrays for each column 
let backlogListArray = [];
let progressListArray = [];
let testingListArray = [];
let completeListArray = [];
let listArrays = [];


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
