/*
This is the first JavaScript file that runs once your iframe is loaded within a Zendesk product.
*/
import client from './zafClient';
import I18n from 'i18n';
import UserService from './services/UserService';

// Create a new ZAFClient


// add an event listener to detect once your app is registered with the framework
client.on('app.registered', (appData) => {
  UserService.getCurrentUser().then(userData => {
    // load translations based on the account's current locale
    I18n.loadTranslations(userData.locale);
    // look up app module for the current location
    let location = appData.context.location;
    let App = require(`./${location}.js`).default;
    // create a new instance of your app
    new App(appData);
  });
});