// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// // Your Firebase configuration
// // Get this from Firebase Console > Project Settings > General > Your apps
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
//   measurementId: "YOUR_MEASUREMENT_ID"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Cloud Messaging
// const messaging = getMessaging(app);

// export { messaging, getToken, onMessage };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfcSp1ndzCIp7O3eqE7lWxRVQnm-yWVuA",
  authDomain: "nixora-web.firebaseapp.com",
  projectId: "nixora-web",
  storageBucket: "nixora-web.firebasestorage.app",
  messagingSenderId: "249772262718",
  appId: "1:249772262718:web:98f7be4f873d1a0a70186f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
