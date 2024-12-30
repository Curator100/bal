// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkXcgNQdTVUjPKNLlOlpNbbp7ov8Z6C5w",
  authDomain: "ray576.firebaseapp.com",
  projectId: "ray576",
  storageBucket: "ray576.firebasestorage.app",
  messagingSenderId: "362426615143",
  appId: "1:362426615143:web:25b0f7eef04e368949dbc2",
  measurementId: "G-T3QYRB5DXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// DOM elements
const userIdInput = document.getElementById("userIdInput");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");

// Fetch user data
async function fetchUserData(userId) {
  try {
    const userDoc = doc(db, "users", userId); // Reference to the user document
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      output.innerHTML = `Name: ${userData.name}<br>Roll: ${userData.roll}`;
    } else {
      output.innerHTML = "User ID not found!";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    output.innerHTML = "An error occurred while fetching data.";
  }
}

// Event listener for the button
submitBtn.addEventListener("click", () => {
  const userId = userIdInput.value.trim();
  if (userId) {
    fetchUserData(userId);
  } else {
    output.innerHTML = "Please enter a valid User ID.";
  }
});
