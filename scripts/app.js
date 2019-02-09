(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    storedDogs: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    onLine: navigator.onLine,
  };

  // document.getElementById('searchByZip').addEventListener('click', function () {

  //   const isValueZip = zip => {
  //     return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  //   }
  //   let inputZip = document.querySelector('.headerInput').value;

  //   if(isValueZip(inputZip)) {
  //     app.getNewDogs(inputZip);
  //   } else {
  //     alert('Please enter a valid zip code');
  //   }
  // });


  // app.updateDogCard = function(dog, timestamp = new Date()) {
  //   let dataLastUpdated = new Date(timestamp);

  //   const truncateText = (text, maxLength) => {
  //     if (text.length > maxLength) {
  //       text = text.substr(0, maxLength) + '...';
  //     }
  //     return text;
  //   };

  //   var card = app.visibleCards[dog.id.$t];

  //   if (!card) {
  //     card = app.cardTemplate.cloneNode(true);
  //     card.classList.remove('cardTemplate');
  //     card.classList.add('current-dog');
  //     card.querySelector('.name').textContent = dog.name.$t;
  //     card.removeAttribute('hidden');
  //     app.container.appendChild(card);
  //     app.visibleCards[dog.id.$t] = card;
  //   }

  //   // Verifies the data provide is newer than what's already visible
  //   // on the card, if it's not bail, if it is, continue and update the
  //   // time saved in the card
  //   var cardLastUpdatedElem = card.querySelector('.card-last-updated');
  //   var cardLastUpdated = cardLastUpdatedElem.textContent;
  //   if (cardLastUpdated) {
  //     cardLastUpdated = new Date(cardLastUpdated);
  //     // Bail if the card has more recent data then the data
  //     if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
  //       return;
  //     }
  //   }
  //   cardLastUpdatedElem.textContent = timestamp;

  //   if(dog.description.$t){
  //     card.querySelector('.description').textContent = truncateText(dog.description.$t, 140);
  //   }
  //   if(dog.media && dog.media.photos && dog.media.photos.photo){
  //     card.querySelector('.image').style.backgroundImage = `url(${dog.media.photos.photo[2].$t})`;
  //   } else {
  //     card.querySelector('.image').style.backgroundImage = `url('../not-available.jpg')`;
  //   }
    
    
  //   card.querySelector('.age').textContent = dog.age.$t;
  //   card.querySelector('.sex').textContent = dog.sex.$t;

  //   if (app.isLoading) {
  //     app.spinner.setAttribute('hidden', true);
  //     app.container.removeAttribute('hidden');
  //     app.isLoading = false;
  //   }
  // };


  // app.getNewDogs = (zipCode = 80205) => {

  //   app.storedDogs = [];
  //   localStorage.storedDogs = [];
  //   app.visibleCards = {};

  //   const removeElements = (elms) => [...elms].forEach(el => el.remove());
  //   removeElements(document.querySelectorAll(".current-dog"));

  //   let url = 'http://api.petfinder.com/pet.find';
  //   url += `?key=APIKEY&animal=dog&output=basic&format=json&location=${zipCode}`

  //   if ('caches' in window) {
  //     /*
  //      * Check if the service worker has already cached this
  //      * data. If the service worker has the data, then display the cached
  //      * data while the app fetches the latest data.
  //      */
  //     caches.match(url).then(function (response) {
  //       if (response) {
  //         response.json().then(function updateFromCache(data) {
  //           console.log('coming from cache!!');
  //           if (data && data.petfinder && data.petfinder.pets) {
  //             data.petfinder.pets.pet.map((dog) => {
  //               app.updateDogCard(dog);
  //               app.saveDogsLocally(dog, 'storedDogs')
  //             });
  //           } else {
  //             alert('Could not find any dogs using that zip code');
  //           }
  //         });
  //       } else {
  //         if (!app.onLine) {
  //           alert('Cannot get new dogs while you are offline');
  //           return;
  //         }
  //       }
  //     });
  //   } 
    
  //   fetch(url)
  //     .then(
  //       function (response) {
  //         if (response.status !== 200) {
  //           console.log('Looks like there was a problem. Status Code: ' +
  //             response.status);
  //           return;
  //         }
  //         response.json().then(function (data) {
  //           if(data && data.petfinder && data.petfinder.pets){
  //             data.petfinder.pets.pet.map((dog) => {
  //               app.updateDogCard(dog);
  //               app.saveDogsLocally(dog, 'storedDogs')
  //             });
  //           } else {
  //             alert('Could not find any dogs using that zip code');
  //           }
            
  //         });
  //       }
  //     )
  //     .catch(function (err) {
  //       console.log('Fetch Error :-S', err);
  //     });
  // };


  // app.saveDogsLocally = (dog, localTable) => {
  //   app[localTable].push(dog);
  //   let tempLocalTable = JSON.stringify(app[localTable]);
  //   localStorage[localTable] = tempLocalTable;
  // }




  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/



  //if dogs are in cache load from cache
  //if not go to network to get new dogs

  // if (localStorage.storedDogs) {
  //   if (localStorage.storedDogs) {
  //     app.storedDogs = JSON.parse(localStorage.storedDogs) || [];
  //     app.storedDogs.forEach(function (dog) {
  //       app.updateDogCard(dog);
  //     });
  //   }
  // } else {
  //   /* The user is using the app for the first time */
  //   app.getNewDogs();
  // }


  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', function () {
  //     navigator.serviceWorker.register('../service-worker.js').then(function (registration) {
  //       console.log('ServiceWorker registration successful with scope: ', registration.scope);
  //     }, function (err) {
  //       console.log('ServiceWorker registration failed: ', err);
  //     });
  //   });
  // }
})();
