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
    //----------------------
    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");
    connectedRef.on("value", function (connectedSnapshot) {
        if (connectedSnapshot.val()) {
            var theConnection = connectionsRef.push(true);
            theConnection.onDisconnect().remove();
        };
    });
    connectionsRef.on("value", function (connectionsSnapshot) {
        // $("#connected-viewers").text(connectionsSnapshot.numChildren());
    });
    // Number of online users is the number of objects in the presence list.
    //----------------------
    database.ref("/entries").on("value", function (snapshot) {
        theEntries = snapshot.val();
        snapshot.forEach(function (child) {
            let theDate = theEntries[child.key].entryDate
            let theOdometer = theEntries[child.key].entryOdometer
            let theGallons = theEntries[child.key].entryGallons
            let theQuarts = theEntries[child.key].entryQuarts
            let theNotes = theEntries[child.key].entryNotes
            $("#display-entries").append(theDate, theOdometer, theGallons, theQuarts, theNotes + "<hr>");
        });
    }, function (errorObject) {
        console.log("error: " + errorObject.code);
    });

    $("#add-entry").on("click", function (event) {
        event.preventDefault();
        var entryDate = $("#input-date").val().trim();
        var entryOdometer = parseInt($("#input-odometer").val().trim());
        var entryGallons = parseInt($("#input-gallons").val().trim());
        var entryQuarts = parseInt($("#input-quarts").val().trim());
        var entryNotes = $("#input-notes").val().trim();

        database.ref("/entries").push({
            entryDate: entryDate,
            entryOdometer: entryOdometer,
            entryGallons: entryGallons,
            entryQuarts: entryQuarts,
            entryNotes: entryNotes,
        });
    });
});