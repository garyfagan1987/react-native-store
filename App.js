import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountNavigator from './screens/navigators/account';
import ShopNavigator from './screens/navigators/shop';

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

const Tab = createBottomTabNavigator();

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
                <Tab.Navigator>
                    <Tab.Screen name="Shop" component={ShopNavigator} />
                    <Tab.Screen name="Account" component={AccountNavigator} />
                </Tab.Navigator>
            </NavigationContainer>
        </Store>
    );
}

export default App;
