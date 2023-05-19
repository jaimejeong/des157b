// Parse.initialize("APP_ID", "JS_KEY");
Parse.initialize("yhPX9M6bNaLppdtJuN04ydTyog2mwo1ZYPgDtsRo", "Qm1Nt8d28CFQiLtb6fMnKlE9LFm0WgTruhxjikY5");
Parse.serverURL = "https://parseapi.back4app.com/";

(function() {
    'use strict';

    const rightArrow = document.querySelector('#rightArrow');
    const rightArrow2 = document.querySelector('#rightArrow2');
    const leftArrow = document.querySelector('#leftArrow');
    const firstPage = document.querySelector('#first');
    const secondPage = document.querySelector('#second');
    const thirdPage = document.querySelector('#third')
    const dialogue = document.querySelector('#dialogue');
    const grid = document.querySelector('#grid')

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            const results = await query.ascending('lname').find();
            console.log(results);

            results.forEach(function(eachFriend) {
                const id = eachFriend.id;
                const name = eachFriend.get('name');
                const song = eachFriend.get('song');
                const artist = eachFriend.get('artist');
                console.log(id, name, song, artist);

                const theListItem = document.createElement('li');
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.innerHTML = `${name}, ${song}, ${artist}`

                thirdPage.append(theListItem);
            })
        }
        catch (error) {
            console.error('Error while fetching Friends', error);
        }
    }
    displayFriends();

    rightArrow.addEventListener('click', function() {
        secondPage.className = 'showing';
        rightArrow.className = 'hidden';
        rightArrow2.className = 'shwoing';
        leftArrow.className = 'showing';
        firstPage.className = 'hidden'
        startAnimation();
    })

    rightArrow2.addEventListener('click', function() {
        secondPage.className = 'hidden';
        thirdPage.className = 'showing';
        leftArrow.className = 'hidden';
        rightArrow2.className = 'hidden';
        // assign position number greater than 5808
        position = 6000;
        dialogue.className = 'hidden';  
    })

    leftArrow.addEventListener('click', function() {

    })










    //sprite css

    // based on: https://levelup.gitconnected.com/three-ways-to-animate-sprite-sheet-image-a5c000f0c579
    let animationInterval;
    const spriteSheet1 = document.getElementById("sprite-image1");
    const spriteSheet2 = document.getElementById("sprite-image2");
    const widthOfSpriteSheet = 6292;
    let widthOfEachSprite = widthOfSpriteSheet / 13;
    let position = widthOfEachSprite; //start position for the image

    function startAnimation() {
        const speed = 200; //in millisecond(ms)

        animationInterval = setInterval(function () {
            spriteSheet1.style.backgroundPositionX = `-${position}px`;
            spriteSheet2.style.backgroundPositionX = `-${position}px`;

            if (position < 5808) {
                //increment the position by the width of each sprite each time
                position += widthOfEachSprite;
            }

            else if (position == 5808) {
                widthOfEachSprite = 0;
                // bubble and text appear 
                dialogue.className = 'showing';
                dialogue.style.animation = "fadeIn 3s";
            }
        }, speed);
    }

  
   
})();