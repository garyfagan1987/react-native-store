import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    DATABASE_URL,
} from "@env";

import Store from "./store/Context";

import Checkout from "./screens/checkout";
import Bag from "./screens/bag";
import Pay from "./screens/pay";
import Confirmation from "./screens/confirmation";
import Details from "./screens/details";
import Listing from "./screens/listing";

const Stack = createStackNavigator();

function App() {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: API_KEY,
            authDomain: AUTH_DOMAIN,
            projectId: PROJECT_ID,
            storageBucket: STORAGE_BUCKET,
            messagingSenderId: MESSAGING_SENDER_ID,
            appId: APP_ID,
            databaseURL: DATABASE_URL,
        });
    }

    return (
        <Store>
            <NavigationContainer>
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
                        options={{ title: "M&C Store" }}
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
            </NavigationContainer>
        </Store>
    );
}

export default App;
