/**
 *
 * @Component authActions.js
 * @Description Action functions for authentication/validation
 *
 */

import {CREATE_GUEST} from './types';
import * as firebase from 'firebase';

export const createGuest = currentUser => async (dispatch, getState) => {
  dispatch({type: CREATE_GUEST});

  firebase
    .auth()
    .signInAnonymously()
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  var subscribe = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let checkUser = firebase
        .database()
        .ref('users/' + user.uid + '/UserType');
      checkUser.on('value', snapshot => {
        var typeUser = snapshot.val();
        //console.log(typeUser);
        if (typeUser === 'Registered') {
          // setCurrentUser('Registered');
          return;
        }
      });

      if (currentUser === 'Guest') {
        firebase
          .database()
          .ref('users/' + user.uid)
          .update({
            UserType: 'Guest',
            TotalPulls: 0,
            TotalFour: 0,
            TotalFive: 0,
          })
          .catch(error => console.log(error.message));

        firebase
          .database()
          .ref('users/' + user.uid + '/BannerData/Standard/')
          .update({
            TotalPulls: 0,
            TotalFour: 0,
            TotalFive: 0,
            FourPity: 0,
            FivePity: 0,
          });

        firebase
          .database()
          .ref('users/' + user.uid + '/BannerData/Weapon/')
          .update({
            TotalPulls: 0,
            TotalFour: 0,
            TotalFive: 0,
            FourPity: 0,
            FivePity: 0,
          });

        firebase
          .database()
          .ref('users/' + user.uid + '/BannerData/Featured/')
          .update({
            TotalPulls: 0,
            TotalFour: 0,
            TotalFive: 0,
            FourPity: 0,
            FivePity: 0,
          });
      }
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};
