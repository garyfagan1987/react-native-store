import React, { useEffect, useState } from "react";
import Dinero from "dinero.js";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

import Container from "../../components/Container";

export default function Details({ route }) {
    const { id } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState(undefined);

    useEffect(() => {
        const db = firebase.firestore();
        var docRef = db.collection("orders").doc(id);

        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setOrder(doc.data());
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []);

    return (
        <Container>
            {isLoading && (
                <View style={styles.pending}>
                    <ActivityIndicator size="large" color="#333" />
                </View>
            )}
            {!isLoading && (
                <React.Fragment>
                    <FlatList
                        numColumns={1}
                        keyExtractor={(item) => item.uuid.toString()}
                        data={order.items}
                        renderItem={({ item, index }) => (
                            <View
                                style={
                                    order.items.length - 1 !== index
                                        ? styles.divider
                                        : styles.flexRow
                                }
                            >
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.image }}
                                />
                                <View style={styles.cardText}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.text}>
                                        {Dinero({
                                            amount: item.price,
                                            currency: "GBP",
                                        }).toFormat("$0,0.00")}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                    <View style={styles.totals}>
                        <Text style={styles.totalText}>
                            {order.items.length}{" "}
                            {order.items.length > 1 ? "Items" : "Item"}
                        </Text>
                        <Text style={styles.totalText}>
                            Total:{" "}
                            {Dinero({
                                amount: order.total,
                                currency: "GBP",
                            }).toFormat("$0,0.00")}
                        </Text>
                    </View>
                </React.Fragment>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    cardText: {
        flex: 1,
        paddingTop: 20,
    },
    divider: {
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        paddingBottom: 25,
        flex: 1,
        flexDirection: "row",
    },
    flexRow: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
    },
    image: {
        width: 150,
        height: 150,
    },
    text: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
    },
    totals: {
        borderColor: "#DDD",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
    },
    totalText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "bold",
    },
    pending: {
        flex: 1,
        justifyContent: "center",
    },
});
