// Parse.initialize("APP_ID", "JS_KEY");
Parse.initialize("s5uXTJ7mMZHYMSzAkyWDNxIu3nycZHzrWc6gzGB7", "oJeTfYXfuTpEJxfzy7B7ElpUkA6T5fTBZMEqT8iU");
Parse.serverURL = "https://parseapi.back4app.com/";

(function () {
    'use strict';
    console.log('reading');
    const allbtns = document.querySelectorAll('button');
    const button1 = document.querySelector('#button1');
    const button2 = document.querySelector('#button2');
    const button3 = document.querySelector('#button3');
    const button4 = document.querySelector('#button4');
    const button5 = document.querySelector('#button5');
    const homebtn = document.querySelector('#homebtn');

    const section1 = document.querySelector('#section1');
    const section2 = document.querySelector('#section2');
    const section3 = document.querySelector('#section3');
    const section4 = document.querySelector('#section4');

    const beginning = document.querySelector('#beginning');
    const response = document.querySelector('#response');

    for (const eachbtn of allbtns) {
        eachbtn.addEventListener('mouseover', function() {
            eachbtn.style.cursor = 'pointer';
        })
    }

    button1.addEventListener('click', function(event) {
        event.preventDefault();
        section1.className = 'overlay hidden';
        section2.className = 'overlay showing';
        console.log('clicked')
    })

    button2.addEventListener('click', function(event) {
        event.preventDefault();
        section2.className = 'overlay hidden';
        section3.className = 'overlay showing';
    })

    button3.addEventListener('click', function(event) {
        event.preventDefault();
        section2.className = 'overlay hidden';
        response.className = 'showing';
        beginning.className = 'hidden';

        document.body.style.backgroundColor = '#000438';
        thisRecord = event.target.getAttribute('id').slice(2);
        setForm(thisRecord);
        addFriend();
    })

    button4.addEventListener('click', function(event) {
        event.preventDefault();
        section3.className = 'overlay hidden';
        section4.className = 'overlay showing';
    })

    button5.addEventListener('click', function(event) {
        event.preventDefault();
        section4.className = 'overlay hidden';
        response.className = 'showing';
        beginning.className = 'hidden';

        document.body.style.backgroundColor = '#000438';
        thisRecord = event.target.getAttribute('id').slice(2);
        setForm(thisRecord);
        addFriend();
    })

    homebtn.addEventListener('click', function(event) {
        event.preventDefault();
        response.className = 'hidden';
        beginning.className = 'showing';
        section1.className = 'overlay showing';
        document.body.style.backgroundColor = 'white';
        resetFormFields();
    })


    // back4app
    const inputs = document.querySelectorAll('textarea');
    const macyContainer = document.querySelector('#macy-container');
    let thisRecord;
 
    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            const results = await query.find();
            results.forEach(function(eachFriend) {
                const id = eachFriend.id;
                const experience = eachFriend.get('experience');
                const improvement = eachFriend.get('improvement');
                
                console.log(experience, improvement);

                const macyItem = document.createElement('div');
                macyItem.setAttribute('id', `r-${id}`);
                macyItem.setAttribute('class', 'macy-item');
                macyItem.innerHTML = `
                    <p>${experience}</p>
                    <div id="borderline"></div>
                    <p>${improvement}</p>
                `;
                macyContainer.append(macyItem);
                macyContainer.insertBefore(macyItem, macyContainer.firstChild);
                
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
        if (newFriend.experience != '' && newFriend.improvement != '') {
            const newFriendData= new Parse.Object('Friends');
            newFriendData.set('experience', newFriend.experience);
            newFriendData.set('improvement', newFriend.improvement);
            try {
                const result = await newFriendData.save();
                // macyItem.innerHTML = '';
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
                document.getElementById('experience').value = thisFriend.get('experience');
                document.getElementById('improvement').value = thisFriend.get('improvement');
            })
        }
        catch (error) {
            console.error('Error while fetching Friends', error);
        }
    }

    function resetFormFields() {
        document.getElementById('experience').value = '';
        document.getElementById('improvement').value = '';
    }

    // macy.js
    const macyInstance = Macy({
        container: "#macy-container",
        trueOrder: false,
        waitForImages: false,
        margin: {
            x: 150,
            y: 50
        },
        columns: 2,
        breakAt: {
            400: 1
        } 
    })

})();