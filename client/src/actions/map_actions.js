import {
    UPDATE_TEXTINPUT,
    REQUEST_GEOCODE_RESULTS,
    RECEIVE_GEOCODE_RESULTS,
    RECEIVE_GEO_RESULTS,    
    UPDATE_CENTER,
     // new
    UPDATE_SETTINGS,
    SEARCH_MAP ,
    CLEAR_SEARCH 
  } from './types';
import setAuthToken from '../utils/setAuthToken';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

// use these or add your own credentials
const hereAppCode = '0XXQyxbiCjVU7jN2URXuhg'
const hereAppId = 'yATlKFDZwdLtjHzyTeCK'

  export const updateSettings = payload => dispatch =>{
    dispatch({type: UPDATE_SETTINGS, ...payload});

    // It dispatches a further action to let our state know that requests are about to be made (loading spinner listens to this!)
    dispatch(requestGeocodeResults())

    //Filter teachers based on new filters
    dispatch(searchMap(payload))
  }
export const searchMap = payload => dispatch => {  
    // we define our url and parameters to be sent along
    let url = apiUrl+'map/nearby';
    
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload.settings)
    };
  
    // we use the fetch API to call HERE Maps with our parameters
    return fetch(url , requestOptions)
      // when a response is returned we extract the json data
      .then(response => response.json())
      // and this data we dispatch for processing in locations of teachers
      .then(data =>{
        // console.log("We have data after filtesrs applied in search map actions " , data);
        dispatch({ type : RECEIVE_GEO_RESULTS ,  payload : data.data });
        // dispatch(processGeocodeResponse(data))
      })
      .catch(error => console.error(error))
}

export const fetchPlaces = payload => dispatch => {
  // It dispatches a further action to let our state know that requests are about to be made (loading spinner listens to this!)
  dispatch(requestGeocodeResults())

  // we define our url and parameters to be sent along
  let url = new URL(apiUrl+'map/places/'+payload.inputValue );

  // we use the fetch API to call HERE Maps with our parameters
  return fetch(url)
    // when a response is returned we extract the json data
    .then(response => response.json())
    // and this data we dispatch for processing in processGeocodeResponse
    .then(data => {
      dispatch(processGeocodeResponse(data.data))
    })
    .catch(error => console.error(error))
}

const processGeocodeResponse = (
  json
) => dispatch => {
  // let's let the loading spinner now that it doesn't have to spin anymore
  dispatch(receiveGeocodeResults(json))
}

export const receiveGeocodeResults = payload => ({
  type: RECEIVE_GEOCODE_RESULTS,
  results: payload
})

export const receiveFilteredGeoResults = payload => ({
  type: RECEIVE_GEOCODE_RESULTS,
  results: payload
})


export const requestGeocodeResults = payload => ({
  type: REQUEST_GEOCODE_RESULTS,
  ...payload
})

export const updateTextInput = payload => ({
  type: UPDATE_TEXTINPUT,
  payload
})

export const updateCenter = payload =>({
   type: UPDATE_CENTER,
   ...payload
})
