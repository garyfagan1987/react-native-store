import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

import Button from "../../components/Button";
import Container from "../../components/Container";
import Divider from "../../components/Divider";
import RegisterForm from "../../components/RegisterForm";

export default function Confirmation({ navigation, route }) {
    const [email, setEmail] = useState(undefined);
    const { orderNumber } = route.params;
    const user = firebase.auth().currentUser;

    useEffect(() => {
        const db = firebase.firestore();
        const docRef = db.collection("orders").doc(orderNumber);

        docRef.get().then((doc) => {
            if (doc.exists) {
                setEmail(doc.data().email)
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, []);

    function onSuccess() {
        navigation.navigate("Listing");
    }

    return (
        <Container>
            <View style={styles.card}>
                <Text style={styles.cardHeading}>
                    🎉 Thanks for you order: {orderNumber}
                </Text>
            </View>
            <Button
                backgroundColor="secondary"
                onPress={() => navigation.navigate("Listing")}
                title="Continue Shopping"
            />
            {!user && (
                <React.Fragment>
                    <Divider />
                    <Text style={styles.formHeading}>Create an account</Text>
                    {email && <RegisterForm email={email} handleSuccess={onSuccess} />}
                </React.Fragment>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    card: {
        borderColor: "#CCC",
        borderWidth: 2,
        marginBottom: 15,
        padding: 15,
    },
    cardHeading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    formHeading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
