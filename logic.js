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
    database.ref("/entries").orderByChild("entryDate").on("value", function (snapshot) {
        //these five lines get the data into descending date order
        let tempArrayOfObjects = [];
        snapshot.forEach((child) => {
            let theKey = child.key;
            let theValue = child.val();
            theValue.entryKey = theKey;
            tempArrayOfObjects.push(theValue);
        });
        theEntries = tempArrayOfObjects.reverse();
        let theString = "";
        theEntries.forEach(function (child) {
            let theKey = child.entryKey;
            let theDate = child.entryDate;
            let theOdometer = child.entryOdometer;
            let theGallons = child.entryGallons;
            let theQuarts = child.entryQuarts;
            let theNotes = child.entryNotes;
            theString = theString + "<div data-id='" + theKey + "' class='line-item'><div id='date" + theKey + "'>" + theDate + "</div><div id='odometer" + theKey + "'>" + theOdometer + "</div><div id='gallons" + theKey + "'>" + theGallons + "</div><div id='quarts" + theKey + "'>" + theQuarts + "</div><div id='notes" + theKey + "'>" + theNotes + "</div></div><hr>";
        });
        $("#display-entries").html(theString);
    }, function (errorObject) {
        console.log("error: " + errorObject.code);
    });


    $(document.body).on("click", ".line-item", function () {
        let theIDToEdit = $(this).attr('data-id');
        // console.log(theIDToEdit);
        let entryDate = $("#date" + theIDToEdit).text();
        let entryOdometer = $("#odometer" + theIDToEdit).text();
        let entryGallons = $("#gallons" + theIDToEdit).text();
        let entryQuarts = $("#quarts" + theIDToEdit).text();
        let entryNotes = $("#notes" + theIDToEdit).text();
        $("#input-date").val(entryDate);
        $("#input-odometer").val(entryOdometer);
        $("#input-gallons").val(entryGallons);
        $("#input-quarts").val(entryQuarts);
        $("#input-notes").val(entryNotes);
        $("#editing-id").val(theIDToEdit);
        hideAddEntryButton()
    });

    $(".add-entry").on("click", function (event) {
        event.preventDefault();
        let entryDate = $("#input-date").val().trim();
        let entryOdometer = parseInt($("#input-odometer").val().trim());
        let entryGallons = parseInt($("#input-gallons").val().trim());
        let entryQuarts = parseInt($("#input-quarts").val().trim());
        let entryNotes = $("#input-notes").val().trim();

        if ($("#editing-id").val().trim() != "") {
            let theIDToEdit = $("#editing-id").val().trim();
            database.ref("/entries/" + theIDToEdit).set({
                entryDate: entryDate,
                entryOdometer: entryOdometer,
                entryGallons: entryGallons,
                entryQuarts: entryQuarts,
                entryNotes: entryNotes,
            });
        } else {
            database.ref("/entries").push({
                entryDate: entryDate,
                entryOdometer: entryOdometer,
                entryGallons: entryGallons,
                entryQuarts: entryQuarts,
                entryNotes: entryNotes,
            });
        };
        emptyInputFields();
    });

    function emptyInputFields() {
        $("#input-date").val("");
        $("#input-odometer").val("");
        $("#input-gallons").val("");
        $("#input-quarts").val("");
        $("#input-notes").val("");
        $("#editing-id").val("");
        showAddEntryButton();
    };

    function hideAddEntryButton() {
        $("#add-entry").css('display', 'none');
        $("#editing-id").css('display', 'inline');
        $("#update-entry").css('display', 'inline');
        $("#delete-entry").css('display', 'inline');
        $("#cancel-update").css('display', 'inline');
    };

    function showAddEntryButton() {
        $("#add-entry").css('display', 'inline');
        $("#editing-id").css('display', 'none');
        $("#update-entry").css('display', 'none');
        $("#delete-entry").css('display', 'none');
        $("#cancel-update").css('display', 'none');
        emptyInputFields();
    };

    $("#cancel-update").on("click", function (event) {
        showAddEntryButton();
    });

    $("#delete-entry").on("click", function (event) {
        let theIDToEdit = $("#editing-id").val().trim();
        database.ref("/entries/" + theIDToEdit).remove();
        showAddEntryButton();
    });


});