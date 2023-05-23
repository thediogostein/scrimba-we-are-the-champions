// Set up  firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

import {
  getDatabase,
  ref,
  push,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://we-are-the-champions-ddeb0-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, 'endorsementList');

// Global variables
const formEl = document.querySelector('#form-el');
const listEl = document.querySelector('#output-el');

// Event listeners
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const endorsementEl = document.querySelector('#endorsement').value;

  push(endorsementListInDB, endorsementEl);

  formEl.reset();
});

onValue(endorsementListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val());

    clearList();

    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i];
      appendItemToList(currentItem);
    }
  }
});

function clearList() {
  listEl.innerHTML = '';
}

function appendItemToList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement('li');
  newEl.classList.add('endorsements__card');
  newEl.innerText = itemValue;
  listEl.append(newEl);
}
