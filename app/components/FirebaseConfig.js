 import * as firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyBRITbkNoQJcKBAWjvVTXEVHzqaJjzANN0",
    authDomain: "moneytracker-6666.firebaseapp.com",
    databaseURL: "https://moneytracker-6666.firebaseio.com",
    projectId: "moneytracker-6666",
    storageBucket: "moneytracker-6666.appspot.com",
    messagingSenderId: "5128599820"
  };
 
 export const firebaseApp = firebase.initializeApp(config);
