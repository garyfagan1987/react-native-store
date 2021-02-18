import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import Container from '../components/Container';

export default function Confirmation({ navigation, route }) {
	const {orderNumber} = route.params;
	return (
		<Container>
			<View style={styles.card}>
				<Text style={styles.cardHeading}>🎉 Thanks for you order: {orderNumber}</Text>
			</View>
			<Button onPress={() => navigation.navigate('Listing')} title="Continue Shopping" />
		</Container>
	);
}

const styles = StyleSheet.create({
	card: {
		borderColor: '#CCC',
		borderWidth: 2,
		marginBottom: 15,
		padding: 15,
	},
	cardHeading: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
  });