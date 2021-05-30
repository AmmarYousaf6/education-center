import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    FORGET_PASSWORD_FAIL, FORGET_PASSWORD_SUCCESS, RESET_PASSWORD_SUCCESS ,
    NOTIFICATIONS_FETCHED
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null ,
    notifications : []
  };
  
  export default function(state = initialState, action) {
    console.log("I am auth reducer" , action);
    const { type, payload } = action;  
    switch (type) {
      case NOTIFICATIONS_FETCHED :
        return {
          ...state,
          notifications: payload
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case REGISTER_SUCCESS:
        //localStorage.setItem('token', payload.token);
        return {
          ...state,
          ...payload,
          //isAuthenticated: true,
          loading: false
        };
      case FORGET_PASSWORD_SUCCESS:
        return {
          ...state,
          ...payload,
          loading: false
        };
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          ...payload,
          loading: false
        };
  
      case REGISTER_FAIL:
      case FORGET_PASSWORD_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
      case ACCOUNT_DELETED:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false
        };
  
      default:
        return state;
    }
  }
  