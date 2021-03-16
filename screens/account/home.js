import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

import Button from "../../components/Button";
import Container from "../../components/Container";
import LoginForm from "../../components/LoginForm";

function Component({navigation}) {
    const user = firebase.auth().currentUser;

    function onSuccess() {
        navigation.navigate("Home");
    }

    async function handleLogout() {
        await firebase
            .auth()
            .signOut()
            .then(() => navigation.navigate("Login"))
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Container>
            {!user && <LoginForm handleSuccess={onSuccess} />}
            {user && (
                <React.Fragment>
                    <View style={styles.group}>
                        <Text style={styles.welcome}>Hello {user.email}</Text>
                    </View>
                    <View style={styles.group}>
                        <Button
                            onPress={() => navigation.navigate("Orders")}
                            title="Orders"
                        />
                    </View>
                    <View style={styles.group}>
                        <Button
                            onPress={() => navigation.navigate("Settings")}
                            title="Settings"
                        />
                    </View>
                    <Button
                        backgroundColor="secondary"
                        onPress={handleLogout}
                        title="Log out"
                    />
                </React.Fragment>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    group: {
        marginBottom: 15,
    },
    welcome: {
        fontSize: 18,
    },
});

export default Component;
