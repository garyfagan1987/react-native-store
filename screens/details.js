import React, { useContext } from 'react';
import Dinero from 'dinero.js';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Context } from '../store/Context';
import MandcButton from '../components/Button';
import Container from '../components/Container';

export default function Details({ navigation, route }) {
    const [state, dispatch] = useContext(Context);
    const {id} = route.params;
    const item = state.catalog.find(x => x.id === id);

    React.useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => (
              <MandcButton backgroundColor="transparent" onPress={() => navigation.navigate('Bag')} title={`Bag (${state.bag.items.length})`} />
          ),
      });
  }, [navigation, state]);

    function addToBag() {
      dispatch({type: 'ADD_TO_BAG', payload: [{ ...item, uuid: Math.floor(Math.random() * 90000) + 10000 }]});
      navigation.navigate('Bag');
    }

    return (
        <Container>
            <View style={styles.center}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{Dinero({ amount: item.price, currency: 'GBP' }).toFormat('$0,0.00')}</Text>
              <MandcButton onPress={() => addToBag()} title="Add to Bag" />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center'
    },
    title: {
      color: '#333',
      fontWeight: 'bold',
      fontSize: 25,
      marginVertical: 15,
    },
    price: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 15,
      },
    image: {
      marginBottom: 15,
      height: 300,
      width: 300,
    },
  });