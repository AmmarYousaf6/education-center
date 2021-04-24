import axios from 'axios';
import { setAlert, setForgetPasswordAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FORGET_PASSWORD_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  FORGET_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from './types';

import setAuthToken from '../utils/setAuthToken';

const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

export const loadUser = () => async dispatch => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(apiUrl+'users');
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  console.log(body);
  try {
    const res = await axios.post(apiUrl+'auth/login', body, config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(res));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};


export const socialLogin = (email, name, gender, image) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, name, gender, image });
  console.log(body);
  try {
    const res = await axios.post(apiUrl+'auth/social-login', body, config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(res));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Register User
export const register = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(formData);
  console.log(body);
  try {
    const res = await axios.post(apiUrl+'auth/signup', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert(res.data.message, 'success'));
    setTimeout(()=>{history.push('/login')} , 3000)

    dispatch(loadUser()); 
  } catch (err) {
    console.log(err);
    const error = err.response ? err.response.data : {message :'Something went wrong while registering'};

    if (error) {
      dispatch(setAlert(error.message, 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};


// Forget Password
export const forgetPassword = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(formData );
  console.log(body);
  try {
    const res = await axios.post(apiUrl+'users/forgot-password', body, config);
    console.log(res);
    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert(res.data.message, 'success'));
    //dispatch(setForgetPasswordAlert(res.data.message, 'success'));

  } catch (err) {
    console.log(err);
    const error = err.response.data;

    if (error) {
      dispatch(setAlert(error.message, 'danger'));
    }

    dispatch({
      type: FORGET_PASSWORD_FAIL
    });
  }
};

// Reset Password
export const resetPassword = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(formData );
  console.log(body);
  try {
    const res = await axios.post(apiUrl+'users/reset-password', body, config);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert(res.data.message, 'success'));

  } catch (err) {
    console.log(err);
    const error = err.response.data;

    if (error) {
      dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: RESET_PASSWORD_FAIL
    });
  }
};

export const logout = () => dispatch => {
  
  dispatch({
    type: LOGOUT
  });
};
