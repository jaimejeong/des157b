// JS here
(function() {
    'use strict';

    // Parse.initialize("APP_ID", "JS_KEY");
    Parse.initialize("TNCxPR4aPYROWc7NqZG3O4Aeh9zX11eySFh2VTOZ", "vll86UBUsucgAUgivQqGUjiVCxsJtjUtZoJ98At3");
    Parse.serverURL = "https://parseapi.back4app.com/";
    
    const newBtn = document.getElementById('newbtn');
    const editBtns = document.querySelectorAll('.fa-edit');
    const addFriendForm = document.getElementById('add-friend');
    const editFriendForm = document.getElementById('edit-friend');
    const friendList = document.querySelector('main ol');

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
        addFriendForm.className = 'add-friend-offscreen';
    });

    // loop to add an event listener to each edit button, opening edit form
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', function(event) {
            event.preventDefault();
            editFriendForm.className = 'edit-friend-onscreen';
        });
    };

    // save/close the edit form
    editFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        editFriendForm.className = 'edit-friend-offscreen';
    });
    
})();
