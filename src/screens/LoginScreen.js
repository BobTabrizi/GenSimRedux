/**
 *
 * @Component Login Screen
 * @Description Landing Page upon launch. Guest login / Prompt Registered Users for Login
 *
 */

import React, {useEffect, useState, Component} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {createGuest} from '../actions/authActions';

export default LoginScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('Guest');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registeredLogin, setRegisteredLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handlePassReset = () => {
    var auth = firebase.auth();
    Alert.alert(
      'Notice',
      'If your email address has been registered, a reset link has been sent to your inbox',
      [
        {
          text: 'OK',

          style: 'default',
        },
      ],
    );
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const handleGuest = () => {
    dispatch(createGuest(currentUser));
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        setErrorMessage(error.message);
        Alert.alert('Error', errorMessage, [
          {
            text: 'Retry',

            style: 'default',
          },
          {
            text: 'Forgot Password?',
            onPress: () => handlePassReset(),
          },
        ]);
      });
    setRegisteredLogin(true);
  };

  const handleSignUp = () => {
    setShowModal(false);
    //props.navigation.navigate('Register');
  };

  return (
    <>
      <ImageBackground
        source={require('../images/LoginScreenBG.jpg')}
        style={styles.bgImage}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position" enabled={true}>
            <Modal
              transparent={true}
              isVisible={showModal}
              onBackdropPress={() => setShowModal(false)}
              deviceWidth={Dimensions.get('window').width}
              deviceHeight={Dimensions.get('window').height}
              animationIn="pulse"
              hasBackdrop={true}
              backdropColor="black"
              style={{marginTop: '30%'}}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity>
                    <Icon
                      name="close"
                      size={24}
                      color="#000"
                      onPress={() => setShowModal(false)}
                      style={{}}
                    />
                  </TouchableOpacity>
                  <View style={styles.form}>
                    <Text style={{fontSize: 20, alignSelf: 'center'}}>
                      Sign in with Email
                    </Text>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      onChangeText={email => setEmail(email)}
                      value={email}
                    />

                    <View style={{marginTop: '10%'}}>
                      <Text style={styles.inputTitle}>Password</Text>
                      <TextInput
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={password => setPassword(password)}
                        value={password}
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.buttonModal}
                      onPress={() => handleLogin()}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '500',
                          fontSize: 24,
                          textAlign: 'center',
                        }}>
                        Log In
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        alignSelf: 'center',
                        marginTop: '5%',
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: '#000', fontSize: 13}}>
                        New to GenSim?{' '}
                      </Text>

                      <TouchableOpacity onPress={() => handleSignUp()}>
                        <Text
                          style={{
                            fontWeight: '500',
                            color: '#10A5F5',
                            marginLeft: 5,
                          }}>
                          Sign Up
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </KeyboardAvoidingView>

          <View style={styles.loginButtons}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                style={{
                  width: Dimensions.get('window').width / 1,
                  height: Dimensions.get('window').width / 3.9,
                  resizeMode: 'contain',
                  aspectRatio: 3,
                }}
                source={require('../images/SignIn.png')}></Image>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleGuest()}>
              <Image
                style={{
                  width: Dimensions.get('window').width / 1,
                  height: Dimensions.get('window').width / 3.9,
                  marginTop: '6%',
                  resizeMode: 'contain',
                  aspectRatio: 3,
                }}
                source={require('../images/GuestSignIn.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 1,
  },
  button: {
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 40,
    width: 130,
    alignSelf: 'center',
  },
  buttonModal: {
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 40,
    width: 130,
    alignSelf: 'center',
    marginTop: '10%',
  },
  form: {
    marginHorizontal: '10%',
  },
  homeGreet: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
  },
  Buttons: {
    marginTop: '50%',
  },
  loginButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profButton: {
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 60,
    width: 160,
    marginTop: '10%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputTitle: {
    marginTop: '5%',
    color: '#000',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#000',
  },
});
