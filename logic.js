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
    var todaysDate = new Date().toLocaleDateString("en-US");
    var thePreviousGasFillupOdometer = 0;
    var theLastGasFillupOdometer = 0;
    var theLastGasFillupGallons = 0;
    var thePreviousOilFillupOdometer = 0;
    var theLastOilFillupOdometer = 0;
    var theLastOilFillupQuarts = 0;
    var theMPG = 0;
    var theMPQ = 0;

    database.ref("/entries").orderByChild("entrySort").on("value", function (snapshot) {
        //this first part gets the data into descending date order but extracts a few things on the way
        let tempArrayOfObjects = [];
        snapshot.forEach((child) => {
            let theKey = child.key;
            let theValue = child.val();
            theValue.entryKey = theKey;
            if (child.val().entryGallons > 0) {
                thePreviousGasFillupOdometer = theLastGasFillupOdometer;
                theLastGasFillupOdometer = child.val().entryOdometer;
                theLastGasFillupGallons = child.val().entryGallons;
                theMPG = ((theLastGasFillupOdometer - thePreviousGasFillupOdometer) / theLastGasFillupGallons).toFixed(2) + " mpg gas";
            }
            if (child.val().entryQuarts > 0) {
                thePreviousOilFillupOdometer = theLastOilFillupOdometer;
                theLastOilFillupOdometer = child.val().entryOdometer;
                theLastOilFillupQuarts = child.val().entryQuarts;
                theMPQ = ((theLastOilFillupOdometer - thePreviousOilFillupOdometer) / theLastOilFillupQuarts).toFixed(2) + " mpq oil";
            }
            theValue.entryMPG = theMPG;
            theValue.entryMPQ = theMPQ;
            tempArrayOfObjects.push(theValue);
        });
        theEntries = tempArrayOfObjects.reverse();
        let theString = "";
        theEntries.forEach(function (child) {
            let theKey = child.entryKey;
            let theDate = child.entryDate;
            let theOdometer = child.entryOdometer || "&nbsp;";
            let theGallons = child.entryGallons || "0";
            let theQuarts = child.entryQuarts || "0";
            let theNotes = child.entryNotes || "&nbsp;";
            let theMPG = child.entryMPG || "no mpg data yet";
            let theMPQ = child.entryMPQ || "no mpq data yet";
            theString = theString + "<div data-id='" + theKey + "' class='line-item'><span id='date" + theKey + "' class='date'>" + theDate + "</span><span id='btn-edit'>Edit</span><div id='odometer" + theKey + "'>" + theOdometer + "</div><div id='gallons" + theKey + "'>" + theGallons + "</div><div id='quarts" + theKey + "'>" + theQuarts + "</div><div id='notes" + theKey + "' class='notes'>" + theNotes + "</div><div id='mpg" + theKey + "'>" + theMPG + "</div><div id='mpq" + theKey + "'>" + theMPQ + "</div></div><br>";
        });
        $("#display-entries").html(theString);
    }, function (errorObject) {
        console.log("entries-error: " + errorObject.code);
    });

    database.ref("/statistics").on("value", function (snapshot) {
        thePreviousGasFillupOdometer = snapshot.val().previousGasFillupOdometer;
        theLastGasFillupOdometer = snapshot.val().lastGasFillupOdometer;
        theLastGasFillupGallons = snapshot.val().lastGasFillupGallons;
        thePreviousOilFillupOdometer = snapshot.val().previousOilFillupOdometer;
        theLastOilFillupOdometer = snapshot.val().lastOilFillupOdometer;
        theLastOilFillupQuarts = snapshot.val().lastOilFillupQuarts;
        $("#last-statistics").html("Last Statistics:<br>" + ((theLastGasFillupOdometer - thePreviousGasFillupOdometer) / theLastGasFillupGallons).toFixed(2) + " mpg gas.<br>" + ((theLastOilFillupOdometer - thePreviousOilFillupOdometer) / theLastOilFillupQuarts).toFixed(2) + " mpq oil.");
    }, function (errorObject) {
        console.log("statistics-error: " + errorObject.code);
    });

    $(document.body).on("click", "#btn-edit", function () {
        let theIDToEdit = $(this).attr('data-id');
        startLineItemEdit(theIDToEdit)
    });

    $(document).on('touchstart', '#btn-edit', function (event) {
        let theIDToEdit = $(this).attr('data-id');
        startLineItemEdit(theIDToEdit)
    });

    function startLineItemEdit(theIDToEdit) {
        window.scrollTo(0, 0);
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
    };

    $(".add-entry").on("click", function (event) {
        event.preventDefault();
        let entryDate = $("#input-date").val().trim();
        let entryOdometer = $("#input-odometer").val().trim();
        let entryGallons = $("#input-gallons").val().trim();
        let entryQuarts = $("#input-quarts").val().trim();
        let entryNotes = $("#input-notes").val().trim();
        let entrySort = entryDate.split("/");
        for (let n = 0; n < entrySort.length; n++) {
            if (entrySort[n].length === 1) {
                entrySort[n] = "0" + entrySort[n];
            }
        };
        entrySortYear = entrySort.splice(2, 1);
        entrySort.unshift(entrySortYear.toString());
        entrySort = entrySort.join("");
        if ($("#editing-id").val().trim() != "") {
            let theIDToEdit = $("#editing-id").val().trim();
            database.ref("/entries/" + theIDToEdit).set({
                entrySort: entrySort,
                entryDate: entryDate,
                entryOdometer: entryOdometer,
                entryGallons: entryGallons,
                entryQuarts: entryQuarts,
                entryNotes: entryNotes,
            });
        } else {
            database.ref("/entries").push({
                entrySort: entrySort,
                entryDate: entryDate,
                entryOdometer: entryOdometer,
                entryGallons: entryGallons,
                entryQuarts: entryQuarts,
                entryNotes: entryNotes,
            });
        };
        database.ref("/statistics").set({
            previousGasFillupOdometer: thePreviousGasFillupOdometer,
            lastGasFillupOdometer: theLastGasFillupOdometer,
            lastGasFillupGallons: theLastGasFillupGallons,
            previousOilFillupOdometer: thePreviousOilFillupOdometer,
            lastOilFillupOdometer: theLastOilFillupOdometer,
            lastOilFillupQuarts: theLastOilFillupQuarts,
        });

        emptyInputFields();
    });

    function emptyInputFields() {
        $("#input-date").val(todaysDate);
        $("#input-odometer").val("");
        $("#input-gallons").val("");
        $("#input-quarts").val("");
        $("#input-notes").val("");
        $("#editing-id").val("");
        showAddEntryButton();
    };

    function hideAddEntryButton() {
        $("#add-entry").css('display', 'none');
        $(".editing-id").css('display', 'inline-block');
        $("#editing-id").css('display', 'inline');
        $("#update-entry").css('display', 'inline');
        $("#delete-entry").css('display', 'inline');
        $("#cancel-update").css('display', 'inline');
    };

    function showAddEntryButton() {
        $("#add-entry").css('display', 'inline');
        $(".editing-id").css('display', 'none');
        $("#editing-id").css('display', 'none');
        $("#update-entry").css('display', 'none');
        $("#delete-entry").css('display', 'none');
        $("#cancel-update").css('display', 'none');
    };

    $("#cancel-update").on("click", function (event) {
        showAddEntryButton();
    });

    $("#delete-entry").on("click", function (event) {
        let theIDToEdit = $("#editing-id").val().trim();
        if (confirm("Are you sure you want to delete this entry?")) {
            database.ref("/entries/" + theIDToEdit).remove();
        };
        showAddEntryButton();
    });

    emptyInputFields();
});