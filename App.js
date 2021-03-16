import * as React from "react";
import * as firebase from "firebase";

import Index from './index';

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
            <Index />
        </Store>
    );
}

export default App;
