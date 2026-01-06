// src/utils/registerPushNotifications.js
import { getToken } from "firebase/messaging";
import { messaging } from "../config/firebase-config";

export const registerForPushNotifications = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission denied");
  }

  const token = await getToken(messaging, {
    vapidKey: "BPgtK9wRvsgppA7He02Ne3uu4ZTLJuv8G_zViKYtMvthY8PDwn5dOCwngKazYUJ5HAWaiu96E_9tpb6AW0mc3tU",
  });

  if (!token) {
    throw new Error("Failed to get FCM token");
  }

  return token;
};
