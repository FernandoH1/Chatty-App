import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBXN4On7nY0btFxyYWVphTnZCPGvLkhgIM",
  authDomain: "app-chatty-b9aae.firebaseapp.com",
  databaseURL: "https://app-chatty-b9aae-default-rtdb.firebaseio.com",
  projectId: "app-chatty-b9aae",
  storageBucket: "app-chatty-b9aae.appspot.com",
  messagingSenderId: "471412327949",
  appId: "1:471412327949:web:a197d16ec2985a58d83744",
  databaseURL: "https://app-chatty-b9aae-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();
