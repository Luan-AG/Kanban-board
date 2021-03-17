const addBtns = document.querySelectorAll('.add-btn:not(.solid)'); //Array with all the 'add item' buttons
const saveItemBtns = document.querySelectorAll('.solid'); //Array with all the 'save item' buttons
const addItemContainers = document.querySelectorAll('.add-container'); // Array with all the hidden 'add container'
const addItems = document.querySelectorAll('.add-item'); // Array with all the <div> elements inside the 'add container'

const listColumns = document.querySelectorAll('.drag-item-list'); //Array with all the <ul> below together.
const backlogListEl = document.getElementById('backlog-list');  //Backlog <ul> element
const progressListEl = document.getElementById('progress-list'); //Progress <ul> element
const testingListEl = document.getElementById('complete-list'); //Testing <ul> element
const completeListEl = document.getElementById('on-hold-list'); //Complete <ul> element

