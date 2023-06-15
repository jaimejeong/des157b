(function () {
    'use strict';

    const areas = document.querySelectorAll('area');
    const thong = document.querySelector('#thong_article');
    const girl = document.querySelector('#girl_article');
    const farmer = document.querySelector('#farmer_article');
    const closebtns = document.querySelectorAll('.fa-circle-xmark');
    const nextbtn = document.querySelector('.fa-chevron-right');
    const firstbottom = document.querySelector('#firstbottom');
    const secondbottom = document.querySelector('#secondbottom');

    const thong_th = document.querySelector('#thong_th');
    const girl_th = document.querySelector('#girl_th');
    let zindex = 1;

    thong_th.addEventListener('click', function(event) {
        thong_th.style.transform = 'scale(2) rotate(75deg) ';
        thong.className = 'showing';
        zindex = zindex + 1;
        thong_th.style.zIndex = zindex;
        // console.log(zindex);
        return zindex;
    })

    girl_th.addEventListener('click', function(event) {
        console.log(zindex);
    })
    

    for (const area of areas) {
        area.addEventListener('click', function(event) {
            event.preventDefault();
            console.log(`${area.id}`);
    
            if (event.target.id == 'thong_th') {
                thong.className = 'showing';
                girl.classsName = 'hidden';
                farmer.className = 'hidden';
                thong_th.style.transform = 'rotate(90deg)';
                
      
            }
            else if (event.target.id == 'girl') {
                girl.className = 'showing';
                thong.className = 'hidden';
                farmer.className = 'hidden';
            }
            else {
                farmer.className = 'showing'
                thong.className = 'hidden';
                girl.className = 'hidden';
            }
        })

        for (const closebtn of closebtns) {
            closebtn.addEventListener('mouseover', function() {
                closebtn.style.cursor = 'pointer';
            })
            closebtn.addEventListener('click', function(event) {
                event.preventDefault();
                thong_th.style.transform = 'scale(1) rotate(0deg)';
                // allArticle.className = 'hidden';
                document.getElementById(`${area.id}_article`).className = 'hidden';
                console.log('clicked');
            })
        }
    }

    // document.getElementById("myDIV").style.transform = "rotate(7deg)";

    nextbtn.addEventListener('mouseover', function() {
        nextbtn.style.cursor = 'pointer';
    })
    nextbtn.addEventListener('click', function(event) {
        event.preventDefault();
        firstbottom.className = 'bottom hidden';
        secondbottom.className = 'bottom showing';

    })

})();