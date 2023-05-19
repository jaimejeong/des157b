// JS here
// Parse.initialize("APP_ID", "JS_KEY");
Parse.initialize("TNCxPR4aPYROWc7NqZG3O4Aeh9zX11eySFh2VTOZ", "vll86UBUsucgAUgivQqGUjiVCxsJtjUtZoJ98At3");
Parse.serverURL = "https://parseapi.back4app.com/";

(function() {
    'use strict';
    
    const newBtn = document.getElementById('newbtn');
    const editBtns = document.querySelectorAll('.fa-edit');
    const addFriendForm = document.getElementById('add-friend');
    const editFriendForm = document.getElementById('edit-friend');
    const friendList = document.querySelector('main ol');
    const inputs = document.querySelectorAll('#add-friend input:not([type=submit])');
    let thisRecord;

    async function displayFriends() {
        // extanding Friends class, has to match the class name
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            // async - await
            const results = await query.ascending('lname').find();
            // console.log(results);

            // for (const eachFriend of results)
            results.forEach(function(eachFriend) {
                const id = eachFriend.id;
                const lname = eachFriend.get('lname');
                const fname = eachFriend.get('fname');
                const email = eachFriend.get('email');
                const facebook = eachFriend.get('facebook');
                const twitter = eachFriend.get('twitter');
                const instagram = eachFriend.get('instagram');
                const linkedin = eachFriend.get('linkedin');

                const theListItem = document.createElement('li');
                // putting r- because some id from the database starts with a number, and id from html needs to start with a letter
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.innerHTML = `
                    <div class="name">
                        ${fname} ${lname}
                    </div>
                    <div class="email">
                        <i class="fas fa-envelope-square"></i> ${email}
                    </div>
                    <div class="social">
                        <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                        <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                        <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                        <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                    </div>
                    
                    <i class="fas fa-edit" id="e-${id}"></i>
                    <i class="fas fa-times-circle" id="d-${id}"></i>
                `; 
                // e for edit, d for delete

                friendList.append(theListItem);
            });
        }
        catch (error) {
            console.error('Error while fetching Friends', error);
        }
    }

    displayFriends();
    // open the new friend form
    newBtn.addEventListener('click', function(event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
    });

    // close the new friend form
    addFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // addFriendForm.className = 'add-friend-offscreen';
        addFriend();
    });

    async function addFriend() {
        const newFriend = {};

        for (let i = 0; i < inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newFriend[key] = value;
            // ex) newFriend.fname = Bill
        }
        // check if the inputs are empty string b/c they are required
        if (newFriend.fname != "" && newFriend.lname != "" && newFriend.email != "") {
            const newFriendData = new Parse.Object('Friends');
            newFriendData.set('fname', newFriend.fname);
            newFriendData.set('lname', newFriend.lname);
            newFriendData.set('email', newFriend.email);
            newFriendData.set('facebook', newFriend.facebook);
            newFriendData.set('twitter', newFriend.twitter);
            newFriendData.set('instagram', newFriend.instagram);
            newFriendData.set('linkedin', newFriend.linkedin);

            try {
                const result = await newFriendData.save();
                // console.log('friends created', result);
                resetFormFields();
                addFriendForm.className = "add-friend-offscreen";
                friendList.innerHTML = '';
                displayFriends();
            }
            catch (error) {
                console.error('Error while creating friend: ', error);
            }
        }
        else {
            addFriendForm.className = "add-friend-offscreen";
        }
    }

    // loop to add an event listener to each edit button, opening edit form
    // for (let i = 0; i < editBtns.length; i++) {
    //     editBtns[i].addEventListener('click', function(event) {
    //         event.preventDefault();
    //         editFriendForm.className = 'edit-friend-onscreen';
    //     });
    // };

    // event delegation...
    document.addEventListener('click', function(event) {
        if (event.target.matches('.fa-edit')) {
            // slice the first 2 characters which are 'r-'
            thisRecord = event.target.getAttribute('id').slice(2);
            // console.log(thisRecord);
            setForm(thisRecord);
        }
        if (event.target.matches('.fa-times-circle')) {
            thisRecord = event.target.getAttribute('id').slice(2);
            deleteRecord(thisRecord);
        }
    }, false);

    // save/close the edit form
    editFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // editFriendForm.className = 'edit-friend-offscreen';
        updateRecord(thisRecord);
    });

    // ******* what is this function for??? *******
    // putting the text in when they want to edit?
    async function setForm(recordId) {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        query.equalTo('objectId', recordId);
        try {
            const results = await query.find();
            results.forEach(function(thisFriend){
                document.getElementById('fname-edit').value = thisFriend.get('lname');;
                document.getElementById('lname-edit').value = thisFriend.get('fname');;
                document.getElementById('email-edit').value = thisFriend.get('email');;
                document.getElementById('fbook-edit').value = thisFriend.get('facebook');;
                document.getElementById('twitter-edit').value = thisFriend.get('twitter');;
                document.getElementById('insta-edit').value = thisFriend.get('instagram');;
                document.getElementById('linkedin-edit').value = thisFriend.get('linkedin');;
            });
            editFriendForm.className = 'edit-friend-onscreen';
        }
        catch (error) {
            console.error('Error while fetching Friends', error);
        }
    }

    async function updateRecord(recordId) {
        const theFields = document.querySelectorAll('#edit-friend input:not([type=submit])');
        const editedRecord = {};
        let key;
        let value;
        for (let i = 0; i < theFields.length; i++) {
            key = theFields[i].getAttribute('name');
            value = theFields[i].value;
            editedRecord[key] = value;
        }
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        try {
            const object = await query.get(recordId);
            object.set('fname', editedRecord.fname);
            object.set('lname', editedRecord.lname);
            object.set('email', editedRecord.email);
            object.set('facebook', editedRecord.facebook);
            object.set('twitter', editedRecord.twitter);
            object.set('instagram', editedRecord.instagram);
            object.set('linkedin', editedRecord.linkedin);
            try {
                await object.save();
                editFriendForm.className = 'edit-friend-offscreen';
                friendList.innerHTML = '';
                displayFriends();
            }
            catch (error) {
                console.error('Error while updating friends', error);
            }
        }
        catch (error) {
            console.error('Error while retrieving object friends', error);
        }
    }

    async function deleteRecord(recordId) {
        const youAreSure = confirm(
            'Are you sure you want to delete this record?'
        );
        if (youAreSure) {
            const query = new Parse.Query('Friends');
            try {
                const object = await query.get(recordId);
                try {
                    // delete record
                    await object.destroy();
                    document.getElementById(`r-${recordId}`).className = 'remove';
                    // deleting the dom
                    setTimeout(function() {
                        const elem = document.getElementById(`r-${recordId}`);
                        elem.parentNode.removeChild(elem);
                    }, 1500);
                }
                catch (error) {
                    console.error('Error while deleting ParseObject', error);
                }
            }
            catch (error) {
                console.error('Error while retrieving ParseObject', error);
            }
        }
    } 

    // helper functions
    function resetFormFields() {
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('fbook').value = 'https://facebook.com';
        document.getElementById('twitter').value = 'https://twitter.com';
        document.getElementById('insta').value = 'https://instagram.com';
        document.getElementById('linkedin').value = 'https://linkedin.com';
    }
    
})();
