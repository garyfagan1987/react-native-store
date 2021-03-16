import React, { useContext } from "react";
import Dinero from "dinero.js";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import * as firebase from "firebase";

import { Context } from "../../store/Context";
import Button from "../../components/Button";
import Container from "../../components/Container";

export default function Details({ navigation }) {
    const [state, dispatch] = useContext(Context);
    const quantity = state.bag.items.length;

    const user = firebase.auth().currentUser;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton
                    tintColor="#FFF"
                    onPress={() => navigation.navigate("Listing")}
                    label="Home"
                />
            ),
        });
    }, [navigation]);

    function removeFromBag(item) {
        dispatch({ type: "REMOVE_FROM_BAG", payload: { item } });
    }

    return (
        <Container>
            {state.bag.items.length < 1 && (
                <React.Fragment>
                    <Text style={styles.empty}>Your bag is empty</Text>
                    <Button
                        onPress={() => navigation.navigate("Listing")}
                        title="Start shopping"
                    />
                </React.Fragment>
            )}
            <FlatList
                numColumns={1}
                keyExtractor={(item) => item.uuid.toString()}
                data={state.bag.items}
                renderItem={({ item, index }) => (
                    <View
                        style={
                            state.bag.items.length - 1 !== index
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
                            <View style={styles.icons}>
                                <Button
                                    backgroundColor="secondary"
                                    fontSize={12}
                                    onPress={() => removeFromBag(item)}
                                    title="Remove"
                                />
                            </View>
                        </View>
                    </View>
                )}
            />
            {state.bag.items.length > 0 && (
                <React.Fragment>
                    <View style={styles.totals}>
                        <Text style={styles.totalText}>
                            {quantity} {quantity > 1 ? "Items" : "Item"}
                        </Text>
                        <Text style={styles.totalText}>
                            Total:{" "}
                            {Dinero({
                                amount: state.bag.total,
                                currency: "GBP",
                            }).toFormat("$0,0.00")}
                        </Text>
                    </View>
                    <Button
                        onPress={() => {
                            if (user) {
                                navigation.navigate("Pay");
                            } else {
                                navigation.navigate("Checkout");
                            }
                        }}
                        title="Checkout"
                    />
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
    empty: {
        fontSize: 24,
        textAlign: "center",
        marginVertical: 15,
    },
    flexRow: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
    },
    icons: {
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
        marginVertical: 15,
        paddingVertical: 15,
    },
    totalText: {
        color: "#666",
        fontSize: 16,
        fontWeight: "bold",
    },
});
