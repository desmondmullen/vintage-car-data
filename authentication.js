$(document).ready(function () {
    // var config = {
    //     apiKey: "AIzaSyBfFgBNA3J_iDvP2h90bVBo6REBBhuq4lQ",
    //     authDomain: "dsm-project01.firebaseapp.com",
    //     databaseURL: "https://dsm-project01.firebaseio.com",
    //     projectId: "dsm-project01",
    //     storageBucket: "dsm-project01.appspot.com",
    //     messagingSenderId: "407339333565"
    // };
    // firebase.initializeApp(config);
    // var database = firebase.database();
    var userEmail;
    var userEmailVerified;

    //Handles the sign in button press.
    function toggleSignIn() {
        console.log("toggleSignIn");
        if (firebase.auth().currentUser) {
            //do signout
            firebase.auth().signOut();
            firebase.database().ref('users/' + userID).set({
                email: userEmail,
                signedIn: "false"
            });
        } else {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email.length < 4) {
                alert('Please enter an email address.');
                return;
            }
            if (password.length < 4) {
                alert('Please enter a password.');
                return;
            }
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                document.getElementById('sign-in').disabled = false;
            });
        }
        document.getElementById('sign-in').disabled = true;
    }

    //Handles the sign up button press.
    function handleSignUp() {
        console.log("signup");
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    }

    function sendEmailVerification() {
        firebase.auth().currentUser.sendEmailVerification().then(function () {
            alert('Email Verification Sent!');
        });
    }

    function sendPasswordReset() {
        var email = document.getElementById('email').value;
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            alert('Password Reset Email Sent!');
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
            console.log(error);
        });
    }

    //initApp handles setting up UI event listeners and registering Firebase auth listeners:
    function initApp() {
        firebase.auth().onAuthStateChanged(function (user) {
            //exclude silent
            document.getElementById('verify-email').disabled = true;
            if (user) {
                // User is signed in.
                userEmail = user.email;
                userID = user.uid;
                userEmailVerified = user.emailVerified;
                userSignedIn = true;
                displayApplicationOrAuthentication();
                console.log(userID + " is signed in");
                document.getElementById('sign-in').textContent = 'Sign out';
                if (!userEmailVerified) {
                    document.getElementById('verify-email').disabled = false;
                }
                firebase.database().ref('users/' + userID).set({
                    email: userEmail,
                    signedIn: "true"
                });
            } else {
                // User is signed out.
                userSignedIn = false;
                console.log(userID + " is signed out");
                displayApplicationOrAuthentication();
                document.getElementById('sign-in').textContent = 'Sign in';
            }
            document.getElementById('sign-in').disabled = false;
        });
        $(document.body).on("click", "#sign-in", function () {
            toggleSignIn();
        });
        $(document.body).on("click", "#sign-up", function () {
            handleSignUp();
        });
        $(document.body).on("click", "#verify-email", function () {
            sendEmailVerification();
        });
        $(document.body).on("click", "#password-reset", function () {
            sendPasswordReset();
        });

        // document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
        // document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
        // document.getElementById('verify-email').addEventListener('click', sendEmailVerification, false);
        // document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
    }

    // window.onload = function () {
    initApp();
    console.log("v2.17");
    // };
});