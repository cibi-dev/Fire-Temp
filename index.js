var firebaseConfig = {
    apiKey: "AIzaSyDhhFvDex5v3-ue8ORL3bCM9wUmw57RFMo",
    authDomain: "my-firebase-acec5.firebaseapp.com",
    databaseURL: "https://my-firebase-acec5.firebaseio.com",
    projectId: "my-firebase-acec5",
    storageBucket: "my-firebase-acec5.appspot.com",
    messagingSenderId: "646739444821",
    appId: "1:646739444821:web:6dd3f7e6f12f00aefb80dc",
    measurementId: "G-YV15XLQLX6"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

let form = document.getElementById("form-control");

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        address: document.getElementById("address").value,
        pincode: document.getElementById("pincode").value,
        number: document.getElementById("phone").value,
        gender: document.getElementById("gender").value,
        physical: document.getElementById("physical").checked,
        sexual: document.getElementById("sexual").checked,
        verbal: document.getElementById("verbal").checked,
        emotional: document.getElementById("emotional").checked,
        economical: document.getElementById("economical").checked
    }

})
