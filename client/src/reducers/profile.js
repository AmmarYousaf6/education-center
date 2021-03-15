import {
    SET_USER_TYPE
  } from '../actions/types';
  
  const initialState = {
    userType : ''
  }
      
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case SET_USER_TYPE:
            return {
                ...state, 
                userType: payload.userType
            };
        default:
            return state;
    }
  }
  