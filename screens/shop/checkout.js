import React, {useContext} from "react";
import { StyleSheet, View } from "react-native";

import { Context } from "../../store/Context";

import Button from "../../components/Button";
import Container from "../../components/Container";
import LoginForm from "../../components/LoginForm";

export default function Checkout({ navigation }) {
    const [state, dispatch] = useContext(Context);

    function onSuccess() {
        navigation.navigate("Pay");
    }

    return (
        <Container>
            <LoginForm handleSuccess={onSuccess} />
            {!state.isLoggingIn && (
                <React.Fragment>
                    <View style={styles.divider}>
                        <Button
                            backgroundColor="secondary"
                            onPress={() => navigation.navigate("Pay")}
                            title="Continue as guest"
                        />
                    </View>
                </React.Fragment>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    divider: {
        borderTopColor: "#DDD",
        borderTopWidth: 1,
        marginTop: 15,
        paddingTop: 15,
    },
});
