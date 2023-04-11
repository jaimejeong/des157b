(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    let mode = 'dark';

    const colors = ['#fcbe02', '#f76663', '#d9d3d3', '#2f8fd9', '#157575', '#f29e31', '#f4b8c5', '#9edad7', '#ed6f78', '#08938a', '#df5087', '#4dbc92', '#ef6c4a', '#e73f51', '#d7e022', '#f55435', '#ecd257', '#4fa3a4', '#fdae39', '#fa5619', '#f1962d', '#dce1dc', '#e7cd39', '#f5b95c', '#51c8d2', '#f37b6c', '#ffaacf', '#c5dffa', '#bfedaa', '#fffbfa'];
    const grays = ['#e0dad1', '#2e3535', '#767972', '#545c58', '#a9a69a', '#5c5c5b', '#95938c', '#949084', '#5c6454', '#f0ebe4'];

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            // makeGrid();
            body.className = 'switch';
            // banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
            makeGrayDivs(); 
        } 
        else {
            body.removeAttribute('class');
            // banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark';
            makeColorDivs();
        }
    })

    makeColorDivs();

    function makeColorDivs() {
        banner.innerHTML = '';
        banner.className = 'colorBanner';
        let counter = 0;

        for (var i = 0; i < 440; i++) {
            banner.innerHTML += `<div id="block${counter}" class="colorDiv"></div>`;

            document.querySelector(`#block${counter}`).style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            counter++;
        }
    }

    function makeGrayDivs() {
        banner.innerHTML = '';
        banner.className = 'grayBanner';
        let counter = 0;

        for (var i = 0; i < 44; i++) {
            banner.innerHTML += `<div id="block${counter}" class="grayDiv"></div>`;

            document.querySelector(`#block${counter}`).style.backgroundColor = grays[Math.floor(Math.random() * grays.length)];
            counter++;
        }
    }

})()