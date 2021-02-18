import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

import Store from './store/Context';

import Checkout from './screens/checkout';
import Bag from './screens/bag';
import Pay from './screens/pay';
import Confirmation from './screens/confirmation';
import Details from './screens/details';
import Listing from './screens/listing';

const Stack = createStackNavigator();

function App() {

  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp({
      apiKey: "AIzaSyDL7pRQxNUMV45e-FIFsjcHG-OhdZGMGSE",
      authDomain: "react-native-shopify-6da80.firebaseapp.com",
      projectId: "react-native-shopify-6da80",
      storageBucket: "react-native-shopify-6da80.appspot.com",
      messagingSenderId: "305724333739",
      appId: "1:305724333739:web:db34faa7317b1ed68921ee",
      databaseURL: 'https://react-native-shopify-6da80.firebaseio.com',
    });
  }

  return (
    <Store>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Listing"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#414288',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Listing" component={Listing} options={{ title: 'M&C Stickers' }} />
          <Stack.Screen name="Details" component={Details} options={{ headerBackTitle: 'Home' }} />
          <Stack.Screen name="Bag" component={Bag} options={{ headerBackTitle: 'Home' }} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Pay" component={Pay} />
          <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerLeft: null }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Store>
  );
}

export default App;