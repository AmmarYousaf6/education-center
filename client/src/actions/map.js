import axios from 'axios';
import { setAlert } from './alert';
import {
    SEARCH_MAP ,
    CLEAR_SEARCH

} from './types';

import setAuthToken from '../utils/setAuthToken';

export const searchMap = (searchString) => async dispatch => {
  let data = [];
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/map/search/${searchString}` , config);
    console.log(res ," After searching results from map");
    dispatch({
      type: SEARCH_MAP ,
      payload: res.data
    });
    data = res.data;    
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, 'danger'));
    }
    dispatch({
      type: CLEAR_SEARCH
    });
  }
  return data;
};


export const logout = () => dispatch => {
  
  dispatch({
    type: CLEAR_SEARCH
  });
};
