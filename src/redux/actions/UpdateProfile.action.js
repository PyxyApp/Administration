import * as firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");

export const updateProfile = (email, displayName, phoneNumber) => {
    const user = firebase.auth().currentUser
};