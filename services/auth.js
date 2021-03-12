import { useContext } from "react";
import * as firebase from "firebase";
import "firebase/firestore";

// * these are examples
export async function registration(email, password) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;

        const db = firebase.firestore();
        db.collection("users").doc(currentUser.uid).set({
            email: currentUser.email,
        });
    } catch (err) {
        Alert.alert("There is something wrong!!!!", err.message);
    }
}

// * these are examples
export async function loggingOut() {
    try {
        await firebase.auth().signOut();
    } catch (err) {
        Alert.alert("There is something wrong!", err.message);
    }
}
