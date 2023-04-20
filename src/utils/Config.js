import Firebase from 'firebase';
let config = {
    apiKey: 'AIzaSyChoI_Q2BpE9c8nN7nr8knLBzPRdG0jlw0',
    authDomain: 'wmt-chats.firebaseapp.com',
    projectId: 'wmt-chats',
    storageBucket: 'wmt-chats.appspot.com',
    messagingSenderId: '32626410055',
    appId: '1:32626410055:web:72d3ee42a52399d9266762',
    measurementId: 'G-EBTWW5HPGT',
};
Firebase.initializeApp(config);
export default Firebase;
