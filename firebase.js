import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Analytics natif (nécessite google-services.json / GoogleService-Info.plist
// et un build natif — ne fonctionne pas dans Expo Go, voir README.md)
import analytics from "@react-native-firebase/analytics";

// Configuration du projet Firebase "Navira TSA"
const firebaseConfig = {
  apiKey: "AIzaSyDodm5Ot02VSkpvOkC1zhGRH3lc7RRLZ7o",
  authDomain: "navira-tsa-371c8.firebaseapp.com",
  projectId: "navira-tsa-371c8",
  storageBucket: "navira-tsa-371c8.firebasestorage.app",
  messagingSenderId: "1062349149824",
  appId: "1:1062349149824:web:680bbabb15608f21cbb865",
  measurementId: "G-9XMPR8QXDS",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
