import React, {useEffect} from "react";
import * as firebase from "firebase";

import Container from "../../components/Container";
import LoginForm from "../../components/LoginForm";

function Component({navigation}) {
    const user = firebase.auth().currentUser;

    useEffect(() => {
        if(user) {
            navigation.navigate("Account");
        }
    }, []);

    function onSuccess() {
        navigation.navigate("Account");
    }

    return (
        <Container>
            {!user && <LoginForm handleSuccess={onSuccess} />}
        </Container>
    );
}

export default Component;
