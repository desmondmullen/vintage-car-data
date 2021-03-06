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
    var userID = "XzO9ZPJbcQf2oKDwVyz7F3qFj4f1"; //on 1/27/19
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

    theData = [{ entrySort: '190124', entryDate: '1/24/19', entryOdometer: '123780', entryGallons: '8.34', entryQuarts: '', entryNotes: 'oil is right on. Replaced brake master cylinder reservoir bottom seals.' }, { entrySort: '190116', entryDate: '1/16/19', entryOdometer: '', entryGallons: '', entryQuarts: '1', entryNotes: '' }, { entrySort: '190115', entryDate: '1/15/19', entryOdometer: '123647', entryGallons: '', entryQuarts: '', entryNotes: 'topped-up tires to 36' }, { entrySort: '190112', entryDate: '1/12/19', entryOdometer: '123587', entryGallons: '7.71', entryQuarts: '', entryNotes: '' }, { entrySort: '190103', entryDate: '1/3/19', entryOdometer: '123412', entryGallons: '7.72', entryQuarts: '', entryNotes: '' }, { entrySort: '181220', entryDate: '12/20/18', entryOdometer: '', entryGallons: '', entryQuarts: '1', entryNotes: '' }, { entrySort: '181218', entryDate: '12/18/18', entryOdometer: '123228', entryGallons: '6.14', entryQuarts: '', entryNotes: '' }, { entrySort: '181212', entryDate: '12/12/18', entryOdometer: '123079', entryGallons: '6.6', entryQuarts: '', entryNotes: 'mpg may reflect some winter hubs-locked driving' }, { entrySort: '181206', entryDate: '12/6/18', entryOdometer: '122926', entryGallons: '8.1', entryQuarts: '', entryNotes: 'prior to this I realigned the front driveshaft and added an engine-to-frame ground cable' }, { entrySort: '181128', entryDate: '11/28/18', entryOdometer: '122724', entryGallons: '8.99', entryQuarts: '0.5', entryNotes: '' }, { entrySort: '181113', entryDate: '11/13/18', entryOdometer: '122502', entryGallons: '8.55', entryQuarts: '', entryNotes: '' }, { entrySort: '181106', entryDate: '11/6/18', entryOdometer: '122474', entryGallons: '', entryQuarts: '1', entryNotes: 'changed fan belt, removed AC belt' }, { entrySort: '181026', entryDate: '10/26/18', entryOdometer: '122281', entryGallons: '8.25', entryQuarts: '', entryNotes: '' }, { entrySort: '181015', entryDate: '10/15/18', entryOdometer: '122063', entryGallons: '7.05', entryQuarts: '', entryNotes: '' }, { entrySort: '180911', entryDate: '9/11/18', entryOdometer: '121894', entryGallons: '6', entryQuarts: '0.5', entryNotes: '' }, { entrySort: '180821', entryDate: '8/21/18', entryOdometer: '121729', entryGallons: '5.71', entryQuarts: '', entryNotes: '' }, { entrySort: '180817', entryDate: '8/17/18', entryOdometer: '121576', entryGallons: '6.39', entryQuarts: '', entryNotes: '' }, { entrySort: '180814', entryDate: '8/14/18', entryOdometer: '', entryGallons: '', entryQuarts: '', entryNotes: 'checked timing (right on). Warm idle is slightly high, couldn’t adjust it down. Changed plugs.' }, { entrySort: '180813', entryDate: '8/13/18', entryOdometer: '121455', entryGallons: '', entryQuarts: '', entryNotes: 'adjusted valves, tightened down rocker structure.' }, { entrySort: '180811', entryDate: '8/11/18', entryOdometer: '121406', entryGallons: '6.05', entryQuarts: '1', entryNotes: 'made new door panels!' }, { entrySort: '180808', entryDate: '8/8/18', entryOdometer: '121233', entryGallons: '6.61', entryQuarts: '', entryNotes: '' }, { entrySort: '180801', entryDate: '8/1/18', entryOdometer: '121057', entryGallons: '7.65', entryQuarts: '', entryNotes: 'installed float bowl venturi (seems to make a big difference).' }, { entrySort: '180730', entryDate: '7/30/18', entryOdometer: '120936', entryGallons: '', entryQuarts: '', entryNotes: 'replaced transmission rear main seal. Replaced gear oil in transmission, transfer case, and rear differential. Tried another JB Weld fix on the radiator.' }, { entrySort: '180726', entryDate: '7/26/18', entryOdometer: '120849', entryGallons: '5.99', entryQuarts: '', entryNotes: '' }, { entrySort: '180725', entryDate: '7/25/18', entryOdometer: '', entryGallons: '', entryQuarts: '', entryNotes: 'tail of transmission is leaking. Ordered new seal for that. Installed new temperature sensor by thermostat. Adjusted clutch travel. Installed gas pedal limit bolt (was missing).' }, { entrySort: '180724', entryDate: '7/24/18', entryOdometer: '', entryGallons: '', entryQuarts: '', entryNotes: 'replaced coolant hose at back of intake manifold, replaced air filter.' }, { entrySort: '180723', entryDate: '7/23/18', entryOdometer: '', entryGallons: '', entryQuarts: '', entryNotes: 'realized I installed one pad the wrong way before the brake bleed. Ended up gouging up a rotor. Replaced both rotors with new. All is well now!' }, { entrySort: '180722', entryDate: '7/22/18', entryOdometer: '120684', entryGallons: '6.5', entryQuarts: '', entryNotes: '' }, { entrySort: '180721', entryDate: '7/21/18', entryOdometer: '', entryGallons: '', entryQuarts: '', entryNotes: 'cleaned and polished pad pins on left front brake. Still grabbing there. Tried bleeding brakes (half-heartedly). Had brakes flushed and bled. Now they’re great!' }, { entrySort: '180719', entryDate: '7/19/18', entryOdometer: '120525', entryGallons: '7.11', entryQuarts: '', entryNotes: 'changed oil & filter (old stuff was nasty!). Used Castrol GTX High Mileage synthetic blend 10W-40.' }, { entrySort: '180717', entryDate: '7/17/18', entryOdometer: '120420', entryGallons: '', entryQuarts: '', entryNotes: 'removed carpet and seats, power-washed interior, cleaned seats. Cleaned air filter housing (tons of seed shells) and air filter. Cleaned inside carb with carb cleaner. Later did Seafoam spray-in treatment. Got new dome light bulb, new screws for fuel fill cover, thumbscrew for air filter, radio antenna, cleaned seats and parts of exterior with pink spray can cleaner. Temporarily fixed power amp fuse holder. Radio has electrical interference but otherwise good. New radiator cap.' }, { entrySort: '180716', entryDate: '7/16/18', entryOdometer: '120337', entryGallons: '4.89', entryQuarts: '', entryNotes: '' }, { entrySort: '180712', entryDate: '7/12/18', entryOdometer: '120212', entryGallons: '', entryQuarts: '', entryNotes: 'rear driveshaft put back in phase, front hubs unlocked (doh! Had been locked since I bought at end of June.' }, { entrySort: '180701', entryDate: '7/1/18', entryOdometer: '', entryGallons: '', entryQuarts: '', entryNotes: 'Lug bolts seized. Replaced drums with good used, replaced front hubs with good used and outer bearings with new. All lug nuts are new. New pads, shoes, and shoe springs. Did not adjust handbrake (works well). Mounted new tires.' }];

    theData.forEach(function (theLineObject) {
        let entrySort = theLineObject.entrySort;
        let entryDate = theLineObject.entryDate;
        let entryOdometer = theLineObject.entryOdometer;
        let entryGallons = theLineObject.entryGallons;
        let entryQuarts = theLineObject.entryQuarts;
        let entryNotes = theLineObject.entryNotes;
        database.ref("/entries").push({
            entrySort: entrySort,
            entryDate: entryDate,
            entryOdometer: entryOdometer,
            entryGallons: entryGallons,
            entryQuarts: entryQuarts,
            entryNotes: entryNotes,
        });
    });

    // let entryDate = "1/24/19";
    // let entrySort = entryDate.split("/");
    // for (let n = 0; n < entrySort.length; n++) {
    //     if (entrySort[n].length === 1) {
    //         entrySort[n] = "0" + entrySort[n];
    //     }
    // };
    // entrySortYear = entrySort.splice(2, 1);
    // entrySort.unshift(entrySortYear.toString());
    // entrySort = entrySort.join("");

});