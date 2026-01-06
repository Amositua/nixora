// public/firebase-messaging-sw.js

messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Received background message ', payload);

  // 1. Ensure the payload has notification data
  const notificationTitle = payload.notification?.title || "Nixora Update";
  const notificationOptions = {
    body: payload.notification?.body || "Check your dashboard for updates",
    icon: '/logo.jpeg', // Ensure this exists in /public/
    badge: '/logo.jpeg',
    data: {
      url: payload.data?.url || '/' // Optional: for clicking the notification
    }
  };

  // 2. YOU MUST RETURN THE PROMISE
  return self.registration.showNotification(notificationTitle, notificationOptions);
});