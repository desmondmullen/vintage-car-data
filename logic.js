$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyDKQWsJyXa1feKOaTucpMssvIbYQvqdj8s",
        authDomain: "vintage-car-data.firebaseapp.com",
        databaseURL: "https://vintage-car-data.firebaseio.com",
        projectId: "vintage-car-data",
        storageBucket: "vintage-car-data.appspot.com",
        messagingSenderId: "875988524272"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    // Initial Values

    var initialBid = 0;
    var initialBidder = "None";
    var highPrice = initialBid;
    var highBidder = initialBidder;

    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");
    connectedRef.on("value", function (connectedSnapshot) {
        if (connectedSnapshot.val()) {
            var theConnection = connectionsRef.push(true);
            theConnection.onDisconnect().remove();
        };
    });
    connectionsRef.on("value", function (connectionsSnapshot) {
        $("#connected-viewers").text(connectionsSnapshot.numChildren());
    });
    // Number of online users is the number of objects in the presence list.

    // At the page load and subsequent value changes, get a snapshot of the local data.
    // This function allows you to update your page in real-time when the values within the firebase node bidderData changes
    database.ref("/bidderData").on("value", function (snapshot) {

        // If Firebase has a highPrice and highBidder stored (first case)
        if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

            // Set the local variables for highBidder equal to the stored values in firebase.
            highBidder = snapshot.val().highBidder;
            highPrice = parseInt(snapshot.val().highPrice);

            // change the HTML to reflect the newly updated local values (most recent information from firebase)
            $("#highest-bidder").text(snapshot.val().highBidder);
            $("#highest-price").text("$" + snapshot.val().highPrice);
        }

        // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
        else {

            // Change the HTML to reflect the local value in firebase
            $("#highest-bidder").text(highBidder);
            $("#highest-price").text("$" + highPrice);
        }

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // --------------------------------------------------------------

    // Whenever a user clicks the submit-bid button
    $("#submit-bid").on("click", function (event) {
        event.preventDefault();

        // Get the input values
        var bidderName = $("#bidder-name").val().trim();
        var bidderPrice = parseInt($("#bidder-price").val().trim());

        // Log to console the Bidder and Price (Even if not the highest)


        if (bidderPrice > highPrice) {

            // Alert
            alert("You are now the highest bidder.");

            // Save the new price in Firebase
            database.ref("/bidderData").set({
                highBidder: bidderName,
                highPrice: bidderPrice
            });

            // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
            highBidder = bidderName;
            highPrice = parseInt(bidderPrice);

            // Change the HTML to reflect the new high price and bidder
            $("#highest-bidder").text(bidderName);
            $("#highest-price").text("$" + bidderPrice);

        }
    });
});