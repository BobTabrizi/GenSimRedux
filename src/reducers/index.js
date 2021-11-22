/**
 *
 * @Component index.js
 * @Description Combines reducers in folder and exports
 *
 */

import {combineReducers} from 'redux';
import authReducer from './authReducer';
export default combineReducers({
  auth: authReducer,
});
