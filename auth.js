// Import the Firebase library
import firebase from "firebase/app";
import "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration here
};

firebase.initializeApp(firebaseConfig);

// Implement the logic for the login and registration forms
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Handle the login form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginForm["username"].value;
    const password = loginForm["password"].value;

    // Authenticate the user with Firebase
    firebase.auth().signInWithEmailAndPassword(username + "@example.com", password)
        .then((userCredential) => {
            // Handle successful login
            console.log("User logged in:", userCredential.user);
            loginDialog.close();
        })
        .catch((error) => {
            // Handle login error
            console.error("Login error:", error);
            alert("Login error: " + error.message);
        });
});

// Handle the registration form submission
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = registerForm["register-username"].value;
    const password = registerForm["register-password"].value;
    const email = registerForm["register-email"].value;

    // Create a new user with Firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Handle successful registration
            console.log("User registered:", userCredential.user);
            registerDialog.close();

            // Update the user's email to match the username
            userCredential.user.updateEmail(username + "@example.com")
                .then(() => {
                    console.log("User email updated");
                })
                .catch((error) => {
                    console.error("Error updating user email:", error);
                });
        })
        .catch((error) => {
            // Handle registration error
            console.error("Registration error:", error);
            alert("Registration error: " + error.message);
        });
});