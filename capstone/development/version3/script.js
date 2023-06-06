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

    for (const area of areas) {
        area.addEventListener('click', function(event) {
            event.preventDefault();
            console.log(`${area.id}`);
    
            if (event.target.id == 'thong') {
                thong.className = 'showing';
                girl.classsName = 'hidden';
                farmer.className = 'hidden';
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
                // allArticle.className = 'hidden';
                document.getElementById(`${area.id}_article`).className = 'hidden';
                console.log('clicked');
            })
        }
    }

    nextbtn.addEventListener('mouseover', function() {
        nextbtn.style.cursor = 'pointer';
    })
    nextbtn.addEventListener('click', function(event) {
        event.preventDefault();
        firstbottom.className = 'bottom hidden';
        secondbottom.className = 'bottom showing';

    })

})();