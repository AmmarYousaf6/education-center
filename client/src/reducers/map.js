import { act } from '@testing-library/react';
import {
    SEARCH_MAP ,
    CLEAR_SEARCH
  } from '../actions/types';
  
  const initialState = {
    //Initial central locations
     latitude : 33.6844 , 
     longitude : 73.0479 ,

    locationsLst : [ ]
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    console.log("I am map reducer"  ,state , "Action passed" , action )
    switch (type) {
      case SEARCH_MAP:
        return {
          ...state,
           locationsLst : action.payload 
        };
      case CLEAR_SEARCH:
        return {
            ...state,
             locationsLst : [] 
          };  
      default:
        return state;
    }
  }
  