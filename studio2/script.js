let globalData;
async function getData() {
    const myDay = await fetch ('data/data.json');
    const data = await myDay.json();
    globalData = data;
    console.log(data);
    document.querySelector('nav ul').innerHTML = createButtons(data);

}


function createButtons(data) {
    let html = '';
    const dataPoints = Object.keys(data);
    console.log(dataPoints);
    dataPoints.forEach(function(eachPoint) {
        html += `<li><button id="${eachPoint}">${eachPoint}</button></li>`;
    })
    return html;
}

getData();