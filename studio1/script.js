(function() {
    'use strict';

    const fs = document.querySelector('.fa-expand');
    const myVideo = document.querySelector('#myVideo');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const loading = document.querySelector('.fa-mountain-sun');
    const lyrics = {
        start: [0, 4, 8],
        stop: [3, 7, 12],
        line: [line1, line2, line3]
    }

    const intervalID = setInterval(checkTime, 1000);

    function checkTime() {
        for (let i = 0; i < lyrics.start.length; i++) {
            if (lyrics.start[i] < myVideo.currentTime && myVideo.currentTime < lyrics.stop[i]) {
                lyrics.line[i].className = "showing";
            } 
            else {
                lyrics.line[i].className = "hidden";
            }
        }
    }

    fs.addEventListener('playing', function() {
        loading.style.display = 'none';
    })

    // full screen when clicked
    fs.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    })

    // saturation change depending on mouse x position
    myVideo.addEventListener('mousemove', function(event) {
        console.log(event.clientX);
        var saturation = 1 - (event.clientX/ window.innerWidth);
        console.log(saturation);
        myVideo.style.filter = "saturate(" + saturation + ")";
    })
})();