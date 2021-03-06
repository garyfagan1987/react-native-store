import React from "react";

import Container from "../../components/Container";
import LoginForm from "../../components/LoginForm";

function Component({ navigation }) {
    function onSuccess() {
        navigation.navigate("Account");
    }

    return (
        <Container>
            <LoginForm handleSuccess={onSuccess} />
        </Container>
    );
}

export default Component;
