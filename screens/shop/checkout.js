import React from "react";

import Button from "../../components/Button";
import Container from "../../components/Container";
import Divider from "../../components/Divider";
import LoginForm from "../../components/LoginForm";

export default function Checkout({ navigation }) {
    function onSuccess() {
        navigation.navigate("Pay");
    }

    return (
        <Container>
            <LoginForm handleSuccess={onSuccess} />
            <Divider />
            <Button
                backgroundColor="secondary"
                onPress={() => navigation.navigate("Pay")}
                title="Continue as guest"
            />
        </Container>
    );
}