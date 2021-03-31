(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyAVM5n8yMqZ0-TKKsF2uq5jGyvP79vgvPc",
      authDomain: "coffeerun-7c17c.firebaseapp.com",
      databaseURL: "https://coffeerun-7c17c-default-rtdb.firebaseio.com",
      projectId: "coffeerun-7c17c",
      storageBucket: "coffeerun-7c17c.appspot.com",
      messagingSenderId: "228059847526",
      appId: "1:228059847526:web:4b3350d53d417a44acc6a7",
      measurementId: "G-4Q5DG2GM7S"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    
    function RemoteDataStore(url) {
      if(!url){throw new Error('No remote URL supplied.');}
      this.serverUrl = url;
    }

    var firestore = firebase.firestore();

    RemoteDataStore.prototype.add = function(key, val) {
      // $.post(this.serverUrl, val, function(serverResponse){
      //   console.log(serverResponse);
      // });
      firestore.collection("orders").doc(key).set(val);
    };

    RemoteDataStore.prototype.getAll = function(cb) {
      // return this.data[key];
      // $.get(this.serverUrl, function(serverResponse){
      //   console.log(serverResponse);
      //   //cb(serverResponse);
      // });
      var allDocuments = firestore.collection("orders").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        })
        return allDocuments;
      })
    };

    RemoteDataStore.prototype.get = function(key) {
      var docRef = firestore.collection("orders").doc(key);

      docRef.get().then((doc) => {
          if(doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            console.log("No such document!");
          }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    };
  
    RemoteDataStore.prototype.remove = function(key) {
      // delete this.data[key];
      // $.ajax(this.serverUrl + '/' + key,{type: 'DELETE'});
      firestore.collection("orders").doc(key).delete();
    };
  
    // RemoteDataStore.prototype.removeAll = function(key) {
    //   // delete this.data[key];
    //   $.ajax(this.serverUrl, {type: 'DELETE'});
    // };
  
    RemoteDataStore.prototype.addTestData = function () {
      firestore.collection("orders").doc("coffee").set({
        caffeineRating: 1,
        coffeeOrder: "soothing green tea",
        email: "dr@bignerdranch.com",
        flavorShot: "caramel",
        size: "grande"
      });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
  })(window);
  