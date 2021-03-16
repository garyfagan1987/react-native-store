import React from "react";

import Container from "../../components/Container";
import RegisterForm from "../../components/RegisterForm";

function Component({ navigation }) {
    function onSuccess() {
        navigation.navigate("Account");
    }

    return (
        <Container>
            <RegisterForm handleSuccess={onSuccess} />
        </Container>
    );
}

export default Component;
