import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Account from '../account/home';
import Login from '../account/login';
import Orders from '../account/orders';
import Settings from '../account/settings';

function Component() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#414288",
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ headerLeft: null }}
            />
            <Stack.Screen
                name="Orders"
                component={Orders}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
            />
        </Stack.Navigator>
    );
}

export default Component;
