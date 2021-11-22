/**
 *
 * @Component authReducer.js
 * @Description Reducer function for authentication & validation
 *
 */

import {CREATE_GUEST, CREATE_USER} from '../actions/types';

const initialState = {
  isCreating: false,
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GUEST:
      return {
        ...state,
        createType: 'guest',
      };
    default:
      return state;
  }
}
