import axios from 'axios';

import { setAlert, setForgetPasswordAlert } from './alert';
import {
    SET_USER_TYPE
} from './types';

const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

export const setUserType = (userType) => dispatch => {
    dispatch({
      type: SET_USER_TYPE,
      payload: { userType }
    });
    
  };
export const saveBasicProfile = (formData , history) => async dispatch => {    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    const body = formData;
    console.log(body);
    try {
        const res = await axios.post(apiUrl+'users/update-teacher-profile', body, config);
        // dispatch({
        //     type: BASICPROFILE_UPDATED,
        //     payload: res.data
        // });

        dispatch(setAlert(res.data.message, 'success'));
        window.location.reload();
        // setTimeout(()=>{history.push('/')} , 3000)
        //dispatch(loadUser());
    } catch (err) {
        console.log(err);
        const error = err.response.data;

        if (error) {
        //dispatch(setAlert(error.message, 'danger'));
        }
    }
};
  