import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbQJ6MzwDwIs4gjVY8QfEybbqydLyEM0k",
  authDomain: "lab-task-a428f.firebaseapp.com",
  projectId: "lab-task-a428f",
  storageBucket: "lab-task-a428f.appspot.com",
  messagingSenderId: "540632382443",
  appId: "1:540632382443:web:41dc607e88cc390b5bb7ae",
  databaseURL: "https://lab-task-a428f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase

const db = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export {db};