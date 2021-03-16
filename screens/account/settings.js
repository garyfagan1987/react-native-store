import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import "firebase/firestore";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import Button from "../../components/Button";
import Container from "../../components/Container";

function Component() {
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase
            .storage()
            .ref(`profilePictures/${user.uid}`)
            .getDownloadURL()
            .then((url) => {
                setImage(url);
            })
            .catch((error) => {
                console.log(error);
            });
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setIsUploading(true);
            uploadImage(result.uri, user.uid)
                .then(() => {
                    setIsUploading(false);
                    setImage(result.uri);
                })
                .catch(() => {
                    setIsUploading(false);
                });
        }
    };

    const uploadImage = async (uri, name) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child(`profilePictures/${name}`);
        return ref.put(blob);
    };

    return (
        <Container>
            <View style={styles.group}>
                <Text style={styles.label}>Profile Picture</Text>
                {isUploading && (
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item
                            width={200}
                            height={200}
                            borderRadius={4}
                        />
                    </SkeletonPlaceholder>
                )}
                {!isUploading && (
                    <React.Fragment>
                        {isLoadingImage && (
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item
                                    width={200}
                                    height={200}
                                    borderRadius={4}
                                />
                            </SkeletonPlaceholder>
                        )}
                        {image && (
                            <Image
                                onLoadEnd={() => setIsLoadingImage(false)}
                                onLoadStart={() => setIsLoadingImage(true)}
                                source={{ uri: image }}
                                style={{
                                    height: isLoadingImage ? 0 : 200,
                                    width: isLoadingImage ? 0 : 200,
                                }}
                            />
                        )}
                    </React.Fragment>
                )}
            </View>
            {!isUploading && (
                <Button onPress={pickImage} title="Change Image" />
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    group: {
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
});

export default Component;
