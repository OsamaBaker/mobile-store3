'use strict'

let allMobiles = [];
let header = ['User', 'Type', 'Price', 'Condition'];

// Constructor function
function Mobile(name, type){
    this.name = name,
    this.type = type,
    this.price = 0,
    this.condition = '',

    

    allMobiles.push(this),
    setItem()
}

// localStorage set item
function setItem(){
    let setArr = JSON.stringify(allMobiles);
    localStorage.setItem('mobile', setArr)
}

// Random Price Generator
function randPrice(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

// Getting form
let form = document.getElementById('form');

// Getting results div
let resultsDiv = document.getElementById('resultsDiv');

// Creating table and appending it to the resultsDiv
let table = document.createElement('table');
resultsDiv.appendChild(table)

let tHeadRow = document.createElement('tr');
table.appendChild(tHeadRow);

// submitter function and event listener
form.addEventListener('submit', submitter);
function submitter(event){
    event.preventDefault();
    let name = event.target.username.value;
    let type = event.target.type.value;

    let newInstance = new Mobile(name, type)

    newInstance.render();
    
    setItem();
}


// making header for the table

function makingHeader(){
    for(let i = 0; i < header.length; i++){
        let tHead = document.createElement('th');
        tHeadRow.appendChild(tHead);
        tHead.textContent = `${header[i]}`
    }
}

makingHeader();

//Render function
Mobile.prototype.render = function(){
    let firstRow = document.createElement('tr');
    table.appendChild(firstRow);

    let firstTd = document.createElement('td');
    firstRow.appendChild(firstTd);

    let secondTd = document.createElement('td');
    firstRow.appendChild(secondTd);

    let thirdTd = document.createElement('td');
    firstRow.appendChild(thirdTd);

    let fourthTd = document.createElement('td');
    firstRow.appendChild(fourthTd)

    for(let i = 0; i < allMobiles.length; i++){
        firstTd.textContent = `${allMobiles[i].name}`;
        secondTd.textContent = `${allMobiles[i].type}`;
        thirdTd.textContent = randPrice(100,500);
        if(allMobiles[i].price < 200){
            fourthTd.textContent = 'Old';
            this.condition = 'Old';
        } else {
            fourthTd.textContent = 'New';
            this.condition = 'New';
        }

    }
    
}

// Getting localStorage
function getItem(){
    let data = localStorage.getItem('mobile');
    let getArr = JSON.parse(data)

    if (getArr){
        for(let i = 0; i < getArr.length; i++){
            new Mobile(getArr[i].name, getArr[i].type)
        }
    }
}

getItem();

for (let i = 0; i < allMobiles.length; i++){
    allMobiles[i].render()
}