import React from "react";
import * as firebase from "firebase";

import { useFocusEffect } from "@react-navigation/native";

import Button from "../../components/Button";
import Container from "../../components/Container";
import Divider from "../../components/Divider";

function Component({ navigation }) {
    useFocusEffect(
        React.useCallback(() => {
            const user = firebase.auth().currentUser;

            if (user) {
                navigation.navigate("Account");
            }
        }, [])
    );

    return (
        <Container>
            <Button
                onPress={() => navigation.navigate("Login")}
                title="Login"
            />
            <Divider />
            <Button
                backgroundColor="secondary"
                onPress={() => navigation.navigate("Register")}
                title="Register"
            />
        </Container>
    );
}

export default Component;
