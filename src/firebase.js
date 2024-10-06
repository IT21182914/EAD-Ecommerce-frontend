import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyABT_OJ8FC2kfsDy5hN9kiodNh4MVNdjCY",
  authDomain: "ecommerceead-c19d4.firebaseapp.com",
  projectId: "ecommerceead-c19d4",
  storageBucket: "ecommerceead-c19d4.appspot.com",
  messagingSenderId: "159907769318",
  appId: "1:159907769318:web:de2b20c0259a550ad14427",
  measurementId: "G-6KG9Y0863Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage}
