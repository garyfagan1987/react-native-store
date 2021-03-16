import React, { useContext } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as firebase from "firebase";

import { Context } from "../store/Context";
import Button from "../components/Button";

export default function Component({ handleSuccess }) {
    const [state, dispatch] = useContext(Context);

    const initialValues = {
        email: "",
        password: "",
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email().required("Required"),
        password: Yup.string().min(8).max(16).required("Required"),
    });

    async function signIn(email, password) {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch({
                    type: "IS_LOGGING_IN",
                    payload: false,
                });

                handleSuccess();
            })
            .catch((error) => {
                dispatch({
                    type: "IS_LOGGING_IN",
                    payload: false,
                });

                Alert.alert("There was an error", error.message);
            });
    }

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues,
        onSubmit: (values) => {
            const { email, password } = values;

            dispatch({
                type: "IS_LOGGING_IN",
                payload: true,
            });

            signIn(email, password);
        },
    });

    return (
        <React.Fragment>
            {state.isLoggingIn && (
                <View style={styles.pending}>
                    <ActivityIndicator size="large" color="#333" />
                    <Text style={styles.pendingText}>Logging in</Text>
                </View>
            )}
            {!state.isLoggingIn && (
                <React.Fragment>
                    <View style={styles.group}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.email && styles.invalid,
                            ]}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                        />
                    </View>
                    <View style={styles.group}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.password && styles.invalid,
                            ]}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button onPress={handleSubmit} title="Login" />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

Component.defaultProps = {
    handleSuccess: () => {},
};

const styles = StyleSheet.create({
    invalid: {
        borderColor: "#FF0000",
    },
    group: {
        marginBottom: 15,
    },
    input: {
        borderColor: "#333",
        borderWidth: 1,
        padding: 15,
        fontSize: 18,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    pending: {
        flex: 1,
        justifyContent: "center",
    },
    pendingText: {
        fontSize: 20,
        textAlign: "center",
        marginVertical: 15,
    },
});
