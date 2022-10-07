
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBNtOeCBM9OZgqQSsVgr-_TgSDCWt3s34",
  authDomain: "videoapp-92f3c.firebaseapp.com",
  projectId: "videoapp-92f3c",
  storageBucket: "videoapp-92f3c.appspot.com",
  messagingSenderId: "107076613674",
  appId: "1:107076613674:web:774a60e6b583152fee3553",
  measurementId: "G-VC7EPDE3S0",
  storageBucket: 'gs://videoapp-92f3c.appspot.com'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);