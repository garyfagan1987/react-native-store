import React from "react";
import { StyleSheet, View } from "react-native";

const Component = () => (
    <View style={styles.divider} />
);

export default Component;

const styles = StyleSheet.create({
    divider: {
        borderTopColor: "#DDD",
        borderTopWidth: 1,
        marginTop: 15,
        paddingTop: 15,
    },
});
