import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Checkout from "../shop/checkout";
import Bag from "../shop/bag";
import Pay from "../shop/pay";
import Confirmation from "../shop/confirmation";
import Details from "../shop/details";
import Listing from "../shop/listing";

const Stack = createStackNavigator();

function Component() {
    return (
        <Stack.Navigator
            initialRouteName="Listing"
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
                name="Listing"
                component={Listing}
                options={{ title: "Store" }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{ headerBackTitle: "Home" }}
            />
            <Stack.Screen
                name="Bag"
                component={Bag}
                options={{ headerBackTitle: "Home" }}
            />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Pay" component={Pay} />
            <Stack.Screen
                name="Confirmation"
                component={Confirmation}
                options={{ headerLeft: null }}
            />
        </Stack.Navigator>
    );
}

export default Component;
