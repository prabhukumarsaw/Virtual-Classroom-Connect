// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDez4-d_UunK7ko9Gw88T6CNvDFNX5fubI",
  authDomain: "apnavirtualclass.firebaseapp.com",
  projectId: "apnavirtualclass",
  storageBucket: "apnavirtualclass.appspot.com",
  messagingSenderId: "1004336886207",
  appId: "1:1004336886207:web:3afd03a4ed54060f19b10a",
  measurementId: "G-W5BGP7HKMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;