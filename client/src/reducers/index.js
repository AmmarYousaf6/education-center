import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import Map from './map';

export default combineReducers({
    auth,
    alert,
    profile,
    Map
});
