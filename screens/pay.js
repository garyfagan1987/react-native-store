import React, { useContext, useState } from 'react';
import Dinero from 'dinero.js';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { Context } from '../store/Context';
import { payload } from '../requests/order';
import Button from '../components/Button';
import Container from '../components/Container';

export default function Pay({ navigation }) {
	const [state, dispatch] = useContext(Context);
	const [isSubmitting, setIsSubmitting] = useState(false);

	React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderBackButton tintColor="#FFF" onPress={() => navigation.navigate('Bag')} label="Bag" />,
        });
      }, [navigation]);

	const initialValues = {
		email: state.user ? state.user : '',
		cardNumber: '',
		cvc: '',
		expiryDate: '',
	};

	const PaymentSchema = Yup.object().shape({
		email: Yup.string().email().required('Required'),
		cardNumber: Yup.string().min(16).max(16).required('Required'),
		expiryDate: Yup.string().min(5).max(5).required('Required'),
		cvc: Yup.string().min(3).max(3).required('Required'),
	  });

	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		errors,
	} = useFormik({
		validationSchema: PaymentSchema,
		initialValues,
		onSubmit: () => {
			setIsSubmitting(true);
			axios({
				method: "post",
				url: "https://app.fakejson.com/q",
				data: payload
			}).then(function (response) {
				navigation.navigate('Confirmation', {
					orderNumber: response.data.orderNumber,
				});
				dispatch({type: 'EMPTY_BAG'});
			});
		}
	  });

	return (
		<Container>
			{isSubmitting && (
				<View style={styles.pending}>
					<ActivityIndicator size="large" color="#333" />
					<Text style={styles.pendingText}>Placing your order</Text>
				</View>
			)}
			{!isSubmitting && (			
				<React.Fragment>
					<View style={styles.group}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={[styles.input, errors.email && styles.invalid]}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
						/>
					</View>
					<View style={styles.group}>
						<Text style={styles.label}>Card Number</Text>
						<TextInput
							style={[styles.input, errors.cardNumber && styles.invalid]}
							placeholder="4242424242424242"
							onChangeText={handleChange('cardNumber')}
							onBlur={handleBlur('cardNumber')}
							value={values.cardNumber}
							maxLength={16}
							keyboardType="numeric"
						/>
					</View>
					<View style={styles.group}>
						<Text style={styles.label}>Expiry Date</Text>
						<TextInput
							style={[styles.input, errors.expiryDate && styles.invalid]}
							placeholder="01/21"
							onChangeText={handleChange('expiryDate')}
							onBlur={handleBlur('expiryDate')}
							value={values.expiryDate}
							maxLength={5}
							keyboardType="numbers-and-punctuation"
						/>
					</View>
					<View style={styles.group}>
						<Text style={styles.label}>CVC</Text>
						<TextInput
							style={[styles.input, errors.cvc && styles.invalid]}
							placeholder="123"
							onChangeText={handleChange('cvc')}
							onBlur={handleBlur('cvc')}
							value={values.cvc}
							maxLength={3}
							keyboardType="numeric"
						/>
					</View>
					<Button
						onPress={handleSubmit}
						title={'Pay ' + Dinero({ amount: state.bag.total, currency: 'GBP' }).toFormat('$0,0.00')}
					/>
				</React.Fragment>
			)}
		</Container>
	);
}

const styles = StyleSheet.create({
	invalid: {
		borderColor: 'red',
	},
	group: {
		marginBottom: 15,
	},
	input: {
		borderColor: '#333',
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
		justifyContent: 'center',
	},
	pendingText: {
		fontSize: 20,
		textAlign: 'center',
		marginVertical: 15,
	}
  });