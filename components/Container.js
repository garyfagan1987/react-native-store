import React from "react";
import { StyleSheet, View } from "react-native";

export default function Container({ children }) {
    return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFF",
        flex: 1,
        padding: 30,
    },
});
