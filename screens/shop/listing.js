import React, { useContext, useEffect, useState } from "react";
import Dinero from "dinero.js";
import * as firebase from "firebase";
import "firebase/firestore";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import { Context } from "../../store/Context";
import Button from "../../components/Button";
import Container from "../../components/Container";

export default function Listing({ navigation }) {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    backgroundColor="transparent"
                    onPress={() => navigation.navigate("Bag")}
                    title={`Bag (${state.bag.items.length})`}
                />
            ),
        });
    }, [navigation, state]);

    useEffect(() => {
        const db = firebase.firestore();

        db.collection("catalog")
            .get()
            .then((querySnapshot) => {
                const products = querySnapshot.docs.map((doc) => doc.data());
                setIsLoading(false);
                dispatch({ type: "SET_CATALOG", payload: products });
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
                <FlatList
                    style={styles.list}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    data={state.catalog}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() =>
                                navigation.navigate("Details", {
                                    id: item.id,
                                })
                            }
                        >
                            <View style={styles.item}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.image }}
                                />
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.text}>
                                    {Dinero({
                                        amount: item.price,
                                        currency: "GBP",
                                    }).toFormat("$0,0.00")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        marginBottom: 25,
        marginHorizontal: 15,
        flex: 1,
        alignItems: "center",
    },
    text: {
        color: "#333",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 5,
    },
    image: {
        width: 150,
        height: 150,
    },
    pending: {
        flex: 1,
        justifyContent: "center",
    },
});
