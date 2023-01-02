import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const config  = {
  firebaseConfig: {
    apiKey: "AIzaSyBbftvjCqOhnWZhDJ_CNz3ugk8cDAR5yds",
    authDomain: "expense-tracker-b031c.firebaseapp.com",
    projectId: "expense-tracker-b031c",
    storageBucket: "expense-tracker-b031c.appspot.com",
    messagingSenderId: "82991527900",
    appId: "1:82991527900:web:54143716b086e81e03c119",
    measurementId: "G-XBDG9WTSFF"
  }
}

const app = initializeApp(config.firebaseConfig);
export const db = getDatabase(app);