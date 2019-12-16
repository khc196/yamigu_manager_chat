  
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'  

var config = {
    apiKey: "AIzaSyBsj79Z5lMUC2G8yaIOHdeTRB1IbA6_vNg",
    authDomain: "yamigu-5fcaa.firebaseapp.com",
    databaseURL: "https://yamigu-5fcaa.firebaseio.com",
    projectId: "yamigu-5fcaa",
    storageBucket: "yamigu-5fcaa.appspot.com",
    messagingSenderId: "529017550501",
    appId: "1:529017550501:web:4ad5b3dee203d72477bf4c",
    measurementId: "G-DTW7CB3NHC"
};

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export default firebase