(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    storedDogs: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    // addDialog: document.querySelector('.dialog-container'),
    // daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  // document.getElementById('butRefresh').addEventListener('click', function() {
  //   // Refresh all of the forecasts
  //   app.updateForecasts();
  // });

  // document.getElementById('butAdd').addEventListener('click', function() {
  //   // Open/show the add new city dialog
  //   app.toggleAddDialog(true);
  // });

  document.getElementById('searchByZip').addEventListener('click', function () {

    const isValueZip = zip => {
      return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    }
    let inputZip = document.querySelector('.headerInput').value;

    if(isValueZip(inputZip)) {
      app.getNewDogs(inputZip);
    } else {
      alert('Please enter a valid zip code');
    }
    // // Add the newly selected city
    // var select = document.getElementById('selectCityToAdd');
    // var selected = select.options[select.selectedIndex];
    // var key = selected.value;
    // var label = selected.textContent;
    // if (!app.selectedCities) {
    //   app.selectedCities = [];
    // }
    // app.getForecast(key, label);
    // app.selectedCities.push({ key: key, label: label });
    // app.saveSelectedCities();
    // app.toggleAddDialog(false);
  });

  // document.getElementById('butAddCancel').addEventListener('click', function() {
  //   // Close the add new city dialog
  //   app.toggleAddDialog(false);
  // });


  app.updateDogCard = function(dog, timestamp = new Date()) {
    let dataLastUpdated = new Date(timestamp);

    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        text = text.substr(0, maxLength) + '...';
      }
      return text;
    };

    var card = app.visibleCards[dog.id.$t];

    if (!card) {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.name').textContent = dog.name.$t;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[dog.id.$t] = card;
    }

    // Verifies the data provide is newer than what's already visible
    // on the card, if it's not bail, if it is, continue and update the
    // time saved in the card
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
    cardLastUpdatedElem.textContent = timestamp;

    if(dog.description.$t){
      card.querySelector('.description').textContent = truncateText(dog.description.$t, 140);
    }
    card.querySelector('.image').style.backgroundImage = `url(${dog.media.photos.photo[2].$t})`;
    card.querySelector('.age').textContent = dog.age.$t;
    card.querySelector('.sex').textContent = dog.sex.$t;

    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };



   
  app.getNewDogs = (zipCode = 80205) => {

    app.storedDogs = [];
    localStorage.storedDogs = app.storedDogs;

    let url = 'http://api.petfinder.com/pet.find';
    url += `?key=c8f9ca2d4894964d1154f0fa768a67da&animal=dog&output=basic&format=json&location=${zipCode}`

    fetch(url)
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json().then(function (data) {
            data.petfinder.pets.pet.map((dog) => {
              app.updateDogCard(dog);
              app.saveDogsLocally(dog, 'storedDogs')
            });
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  };


  app.saveDogsLocally = (dog, localTable) => {
    app[localTable].push(dog);

    // //only ever want to store 25 dogs locally
    // let dogCount = app[localTable].length;
    // if (dogCount > 25) {
    //   app[localTable].slice(dogCount - 25);
    // }
    // console.log('dogCount: ', dogCount);
    let tempLocalTable = JSON.stringify(app[localTable]);
    console.log('tempLocalTable: ', tempLocalTable);
    localStorage[localTable] = tempLocalTable;
  }




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

  if (localStorage.storedDogs) {
    if (localStorage.storedDogs) {
      app.storedDogs = JSON.parse(localStorage.storedDogs) || [];
      app.storedDogs.forEach(function (dog) {
        app.updateDogCard(dog);
      });
    }

    console.log('app: ', app);

  } else {
    /* The user is using the app for the first time */
    app.getNewDogs();
  }

  // TODO add service worker code here
})();
