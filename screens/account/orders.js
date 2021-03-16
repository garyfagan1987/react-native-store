import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    StyleSheet,
    View,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

import Container from "../../components/Container";

function Component() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState({});

    const user = firebase.auth().currentUser;

    useEffect(() => {
        const db = firebase.firestore();

        db.collection("orders")
            .where("email", "==", user.email)
            .get()
            .then((querySnapshot) => {
                const orders = querySnapshot.docs.map((doc) => doc.data());
                setOrders(orders);
                setIsLoading(false);
            });
    }, []);

    return (
        <Container>
            {isLoading && (
                <View style={styles.pending}>
                    <ActivityIndicator size="large" color="#333" />
                </View>
            )}
            {!isLoading && orders.length < 1 && (
                <Text style={styles.empty}>You have no previous orders</Text>
            )}
            {!isLoading && orders.length > 0 && (
                <FlatList
                    numColumns={1}
                    keyExtractor={(item) => item.uuid.toString()}
                    data={orders}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.text}>
                                Order: {item.uuid.toString()}
                            </Text>
                        </View>
                    )}
                />
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    empty: {
        fontSize: 18,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        paddingVertical: 25,
    },
    pending: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
    },
});

export default Component;
