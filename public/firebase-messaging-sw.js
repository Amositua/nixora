importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDfcSp1ndzCIp7O3eqE7lWxRVQnm-yWVuA",
  authDomain: "nixora-web.firebaseapp.com",
  projectId: "nixora-web",
  messagingSenderId: "249772262718",
  appId: "1:249772262718:web:98f7be4f873d1a0a70186f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[SW] Background message:", payload);
 return self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.jpeg",
  });
});
