(function () {
    'use strict';

    const areas = document.querySelectorAll('area');
    const thong = document.querySelector('#thong_article');
    const girl = document.querySelector('#girl_article');
    const farmer = document.querySelector('#farmer_article');

    for (const area of areas) {
        area.addEventListener('click', function(event) {
            event.preventDefault();
    
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
    }

})();