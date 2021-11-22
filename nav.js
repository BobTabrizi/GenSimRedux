import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import FirebaseKeys from './config';
import * as firebase from 'firebase';

var firebaseConfig = FirebaseKeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const switchStack = createSwitchNavigator(
  {
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(switchStack);
