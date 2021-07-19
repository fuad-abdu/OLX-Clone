import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBmTPmMUOjtyg5Jyo7q2Mc0oyVP2V1SGK4",
    authDomain: "olx-clone-d54b6.firebaseapp.com",
    projectId: "olx-clone-d54b6",
    storageBucket: "olx-clone-d54b6.appspot.com",
    messagingSenderId: "705914238498",
    appId: "1:705914238498:web:6ba2171770f4184423fc7b",
    measurementId: "G-13H899K861"
};

export default firebase.initializeApp(firebaseConfig);