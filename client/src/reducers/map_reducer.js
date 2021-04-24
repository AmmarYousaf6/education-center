import { act } from '@testing-library/react';

import {
    UPDATE_TEXTINPUT,
    REQUEST_GEOCODE_RESULTS,
    RECEIVE_GEOCODE_RESULTS,
    RECEIVE_GEO_RESULTS ,
    UPDATE_CENTER,
     // new
    UPDATE_SETTINGS,
    SEARCH_MAP ,
    CLEAR_SEARCH 
  } from '../actions/types'

  // these are our initial isochrones settings
const ControlsState = {
  userInput: "",
  geocodeResults: [],
  teachers: [] ,
  isFetching: false,
  isFetchingIsochrones: false,
  settings: {
    center: {
        latitude : 33.495895, 
        longitude : 73.105629
    },
    range: {
      max: 500,
      value: 0
    },
    rangetype: "distance",
  }
}

// our reducer constant returning an unchanged or updated state object depending on the users action, many cases will follow
export default function MapReducer (state = ControlsState, action){
  switch (action.type) {
      // when a user inputs text we update the userInput :) easy!
case UPDATE_TEXTINPUT:
    return {
      ...state,
      userInput: action.payload.inputValue
    }
  // let the app know the request is being made (for our spinner)
  case REQUEST_GEOCODE_RESULTS:
    return {
      ...state,
      isFetching: true
    }
  // when results are returned by the API update the state with addresses and let the app know it is no longer fetching
  case RECEIVE_GEOCODE_RESULTS:
    return {
      ...state,
      geocodeResults: action.results,
      isFetching: false
    }
  // when results are returned by the API update the state with teacher locations and let the app know it is no longer fetching
  case RECEIVE_GEO_RESULTS:
    return {
      ...state,
      teachers: action.payload,
      isFetching: false
    }  
  // update the Center we will use later from the coordinates of the selected address
  case UPDATE_CENTER:
    return {
      ...state,
      settings: {
        ...state.settings,
        center: action.center ,
        geocodeResults : []
      }
    }
    case UPDATE_SETTINGS:
      console.log("Update settings reducer is called" , action);
        return {
          ...state,
          settings: action.settings
        }
    default:
      return state
  }
}


// // creates a root reducer and combines different reducers if needed
// const rootReducer = combineReducers({
//   isochronesControls
// })

// export default rootReducer


  
//   const initialState = {
//     //Initial central locations
//      latitude : 33.6844 , 
//      longitude : 73.0479 ,

//     locationsLst : [ ]
//   };
  
//   export default function(state = initialState, action) {
//     const { type, payload } = action;
//     console.log("I am map reducer"  ,state , "Action passed" , action )
//     switch (type) {
//       case SEARCH_MAP:
//         return {
//           ...state,
//            locationsLst : action.payload 
//         };
//       case CLEAR_SEARCH:
//         return {
//             ...state,
//              locationsLst : [] 
//           };  
//       default:
//         return state;
//     }
//   }
  