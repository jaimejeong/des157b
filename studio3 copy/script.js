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
    const macyContainer = document.querySelector('#macy-container');
    const macyItem = document.querySelector('.macy-item');

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            const results = await query.ascending('lname').find();
            console.log(results);

            results.forEach(function(eachFriend) {
                const id = eachFriend.id;
                let name = eachFriend.get('name').toLowerCase();
                // name = name.charAt(0).toUpperCase() + name.slice(1);
                let song = eachFriend.get('song').toLowerCase();
                // song = song.charAt(0).toUpperCase() + song.slice(1);
                let artist = eachFriend.get('artist').toLowerCase();
                // artist = artist.charAt(0).toUpperCase() + artist.slice(1);
                console.log(id, name, song, artist);
                


  

                const macyItem = document.createElement('div');
                macyItem.setAttribute('id', `r-${id}`);
                macyItem.setAttribute('class', 'macy-item');

                // const theListItem = document.createElement('div');
                // macyItem.setAttribute('id', `r-${id}`);
                macyItem.innerHTML = `
                    <div class="sticker"></div>
                    <p>"${song}"<br> by <br>${artist}</p>
                    <p class="name">${name}</p>
                `;
                // name.style.color = "blue";
                macyContainer.append(macyItem);
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

    async function addFriend() {
        const newFriend = {};
        
        for (let i = 0; i < inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newFriend[key] = value;
        }
        if (newFriend.name != '' && newFriend.song != '' && newFriend.artist != '') {
            const newFriendDat= new Parse.Obect('Friends');
            newFriendData.set('name', newFriend.name);
            newFriendData.set('song', newFriend.song);
            newFriendData.set('artist', newFriend.artist);

            try {
                const result = await newFriendData.save();
                macyItem.inneerHTML = '';
                displayFriends();
            }
            catch (error) {
                console.error('Error while creating friend: ', error);
            }
        }

    }


    async function setForm(recordId) {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        query.equalTo('objectId', recordId);
        // try {
        //     const results = await query.find();
        //     results.forEach(function(thisFriend) {
        //         document.getElementById('name').value = thisFriend.get('name');
        //         document.getElementById('')
        //     })
        // }
    }


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

    // macy.js
    const macyInstance = Macy({
        container: "#macy-container",
        trueOrder: false,
        waitForImages: false,
        margin: 60,
        columns: 3,
        breakAt: {
            1200: 3,
            520: 2,
            400: 1
        }
      
    })
  
   

  
})();