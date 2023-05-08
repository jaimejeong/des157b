let globalData;
async function getData() {
    const myDay = await fetch ('data/data.json');
    const data = await myDay.json();
    globalData = data;
    // console.log(data);
    document.querySelector('nav ul').innerHTML = createButtons(data);
    createEvents();
}

function createButtons(data) {
    let html = '';
    const dataPoints = Object.keys(data);
    // console.log(dataPoints);
    dataPoints.forEach(function(eachPoint) {
        html += `<li><button id="${eachPoint}">${eachPoint}</button></li>`;
    })
    return html;
}

function createEvents() {
    const buttons = document.querySelectorAll('button');
    // console.log(buttons);

    for (const button of buttons) {
        button.addEventListener('click', function(event) {
            const id = event.target.id;
            // console.log(id);
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
    // if (jsonData[value].hasOwnProperty('images')) {
        for (let i = 0; i < jsonData[value].images.length; i++) {
            // console.log(jsonData[value].images[i]);
            imgs += `<img src="${jsonData[value].images[i]}" alt="image">`;
        }
    // }
    // else {
    //     // images = '';
    // }
    document.querySelector('#result').innerHTML = text;
    document.querySelector('#images').innerHTML = imgs;
}

getData();