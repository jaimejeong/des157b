let globalData;

async function getData() {
    const myDay = await fetch ('data/data.json');
    const data = await myDay.json();
    globalData = data;
    document.querySelector('nav ul').innerHTML = createButtons(data);
    createEvents();
}

// create days buttons
function createButtons(data) {
    let html = '';
    const dataPoints = Object.keys(data);
    dataPoints.forEach(function(eachPoint) {
        html += `<li><button id="${eachPoint}">${eachPoint}</button></li>`;
    })
    return html;
}

function createEvents() {
    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
        button.addEventListener('click', function(event) {
            const id = event.target.id;
            updateInterface(id, globalData);
        })
    }
}

// value == id
function updateInterface(value, jsonData) {
    console.log(value);
    let text = '<p>';
    let imgs = '';
    text += `On <b>${jsonData[value].day}</b>,<br> I was happy because ${jsonData[value].reason}`;
    text += '</p>';
    for (let i = 0; i < jsonData[value].images.length; i++) {
        imgs += `<img src="${jsonData[value].images[i]}" alt="image">`;
    }
    document.querySelector('#result').innerHTML = text;
    document.querySelector('#images').innerHTML = imgs;
}

// move to the portal page when back button is clicked
const backbtn = document.querySelector('#backbtn');
backbtn.addEventListener('click', function() {
    window.location.href = "../"
})

// call function to run
getData();