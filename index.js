import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Context } from "./store/Context";

import AccountNavigator from "./screens/navigators/account";
import ShopNavigator from "./screens/navigators/shop";

const Tab = createBottomTabNavigator();

const Component = () => {
    const [state] = useContext(Context);

    return (
        <React.Fragment>
            {state.isLoading && (
                <View style={styles.pending}>
                    <ActivityIndicator size="large" color="#333" />
                    <Text style={styles.pendingText}>Loading</Text>
                </View>
            )}
            {!state.isLoading && (
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Shop" component={ShopNavigator} />
                        <Tab.Screen
                            name="Account"
                            component={AccountNavigator}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            )}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    pending: {
        flex: 1,
        justifyContent: "center",
    },
    pendingText: {
        fontSize: 20,
        textAlign: "center",
        marginVertical: 15,
    },
});

export default Component;
