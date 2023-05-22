// Parse.initialize("APP_ID", "JS_KEY");
Parse.initialize("yhPX9M6bNaLppdtJuN04ydTyog2mwo1ZYPgDtsRo", "Qm1Nt8d28CFQiLtb6fMnKlE9LFm0WgTruhxjikY5");
Parse.serverURL = "https://parseapi.back4app.com/";

(function() {
    'use strict';

    const rightArrow = document.querySelector('#rightArrow');
    const rightArrow2 = document.querySelector('#rightArrow2');
    // const leftArrow = document.querySelector('#leftArrow');
    const firstPage = document.querySelector('#first');
    const secondPage = document.querySelector('#second');
    const thirdPage = document.querySelector('#third')
    const dialogue = document.querySelector('#dialogue');
    const inputs = document.querySelectorAll('input:not([type=submit]');
    const macyContainer = document.querySelector('#macy-container');
    const macyItem = document.querySelector('.macy-item');
    let thisRecord;
 
    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            const results = await query.find();
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
                macyItem.innerHTML = `
                    <div class="sticker"></div>
                    <p>"${song}"<br> by <br>${artist}</p>
                    <p class="name">${name}</p>
                `;
                macyContainer.append(macyItem);
                macyContainer.insertBefore(macyItem, macyContainer.firstChild)
                
                /*macyInstance.recalculate(true) method is called to recalculate the layout of the macyContainer after the new items are added. This ensures that the CSS styles are properly applied to the newly added items.*/

                macyInstance.recalculate(true);     
            })
        }
        catch (error) {
            console.error('Error while fetching Friends', error);
        }
    }

    async function addFriend() {
        const newFriend = {};
        
        for (let i = 0; i < inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newFriend[key] = value;
        }
        if (newFriend.name != '' && newFriend.song != '' && newFriend.artist != '') {
            const newFriendData= new Parse.Object('Friends');
            newFriendData.set('name', newFriend.name);
            newFriendData.set('song', newFriend.song);
            newFriendData.set('artist', newFriend.artist);

            try {
                const result = await newFriendData.save();
                // macyItem.inneerHTML = '';
                resetFormFields();
                displayFriends();
            }
            catch (error) {
                console.error('Error while creating friend: ', error);
            }
        }
        else {
            displayFriends();
        }
    }

    // not sure if this function is needed
    async function setForm(recordId) {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        query.equalTo('objectId', recordId);
        try {
            const results = await query.find();
            results.forEach(function(thisFriend) {
                document.getElementById('name').value = thisFriend.get('name');
                document.getElementById('song').value = thisFriend.get('song');
                document.getElementById('artist').value = thisFriend.get('artist');
            })
        }
        catch (error) {
            console.error('Error while fetching Friends', error);
        }
    }

    rightArrow.addEventListener('click', function() {
        secondPage.className = 'showing';
        rightArrow.className = 'hidden';
        rightArrow2.className = 'showing';
        // leftArrow.className = 'showing';
        firstPage.className = 'hidden'
        startAnimation();
    })

    rightArrow2.addEventListener('click', function(event) {
        event.preventDefault();
        secondPage.className = 'hidden';
        thirdPage.className = 'showing';
        // leftArrow.className = 'hidden';
        rightArrow2.className = 'hidden';
        // assign position number greater than 5808
        position = 6000;
        dialogue.className = 'hidden';  

        thisRecord = event.target.getAttribute('id').slice(2);
        setForm(thisRecord);
        addFriend();
    })

    // when enter key pressed, move on to the next page
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (firstPage.className == 'showing') {
                rightArrow.click();
            }
            else if (secondPage.className == 'showing') {
                rightArrow2.click();
            }
        }
    })

    // leftArrow.addEventListener('click', function() {
        // add to go back to the first page with information saved
    // })

    function resetFormFields() {
        document.getElementById('name').value = '';
        document.getElementById('song').value = '';
        document.getElementById('artist').value = '';
    }

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