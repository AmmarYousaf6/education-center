import axios from 'axios';
import { setAlert, setForgetPasswordAlert } from './alert';
import {
    SET_USER_TYPE
} from './types';
  
export const setUserType = (userType) => dispatch => {
    dispatch({
      type: SET_USER_TYPE,
      payload: { userType }
    });
    
  };
export const saveBasicProfile = (formData) => async dispatch => {
    const config = {
        headers: {
        'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(formData);
    console.log(body);
    try {
        const res = await axios.put('/users/update-profile', body, config);
        // dispatch({
        //     type: BASICPROFILE_UPDATED,
        //     payload: res.data
        // });

        dispatch(setAlert(res.data.message, 'success'));
        //dispatch(loadUser());
    } catch (err) {
        console.log(err);
        const error = err.response.data;

        if (error) {
        //dispatch(setAlert(error.message, 'danger'));
        }
    }
};
  