import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import GooglePlacesAutocomplete , { geocodeByAddress, getLatLng }  from "react-google-places-autocomplete";
import axios from 'axios';
// we are importing some of the beautiful semantic UI react components
import {
  Segment,
  Search,
  Divider,
  Button
} from "semantic-ui-react";

// here are our first two actions, we will be adding them in the next step, bear with me!
import {
  updateTextInput,
  updateCenter ,
  fetchPlaces ,
  searchMap
} from "../../actions/map_actions";

// to wait for the users input we will add debounce, this is especially useful for "postponing" the geocode requests
import { debounce } from "throttle-debounce";

import Settings from "./setting";

// some inline styles (we should move these to our index.css at one stage)
const segmentStyle = {
  zIndex: 999,
  position: "absolute",
  width: "400px",
  top: "20px",
  left: "50px",
  maxHeight: "550px",
  overflow: "auto",
  padding: "20px"
};

const MapControlsComponent = ({userTextInput ,results,isFetching , updateTextInput , fetchPlaces , updateCenter  }) => {

  useEffect(()=> {
    // we are wrapping fetchGeocodeResults in a 1 second debounce
    // this.fetchGeocodeResults = debounce(1000, this.fetchGeocodeResults)
  } , [] )

  // if the input has changed... fetch some results!
  const handleSearchChange = event => {
    //Dispatching an action that text is now changed
    updateTextInput({inputValue : event.target.value});

    
    debounce(1000 , fetchGeocodeResults() );
  }

  // if a user selects one of the geocode results update the input text field and set our center coordinates
  const handleResultSelect = (e, { result }) => {
    console.log("Result selected" , e , result)
    e.target.value = result.title;
    getLatLng(result.place_id);
  };

  // our method to fire a geocode request
  const fetchGeocodeResults = ()=> {
    // If the text input has more then 0 characters..
    if (userTextInput.length > 0) {
        fetchPlaces({
          inputValue: userTextInput
        })
    }
  }
  const getLatLng = async (placeId)=> {
    console.log('here')
    const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

    try {
      const res = await axios.get(apiUrl+'map/latlong/'+placeId);
      updateCenter({
        center: {latitude : res.data.data.lat  , longitude : res.data.data.lng}
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // The following constants are used in our search input which is also a semanticUI react component <Search... />
    <Segment style={segmentStyle}>
          <div>
            <span>
              Search tutors from <strong>Home Tutors</strong>
            </span>
          </div>
          <Divider />
          {/* they are tachyons css classes by the way..*/}
          <div className="flex justify-between items-center mt3">
            {/* more about the props can be read here https://react.semantic-ui.com/modules/search the most important part to mention here are our objects being fed to it. When a user types text into the input handleSearchChange is called. When the geocode API is called the variable loading will be set true to show the spinner (coming from state). The results are shown in a dropdown list (also coming from the state) and the value shown in the input is userTextInput (..also from state). */}
            <Search
              onKeyUp={handleSearchChange}
              onResultSelect={handleResultSelect}
              type="text"
              fluid
              input={{ fluid: true }}
              loading={isFetching}
              className="flex-grow-1 mr2"
              results={results}
              placeholder="Find Address ..."
            />
          </div>
          <div className="mt2"><Settings /></div>
        </Segment>
    )
}

MapControlsComponent.propTypes = {
  userTextInput : PropTypes.string , 
  results : PropTypes.array ,
  isFetching : PropTypes.bool
};
const mapStateToProps = state => ({
  userTextInput : state.Map.userInput,
  results : state.Map.geocodeResults,
  isFetching : state.Map.isFetching
});
const mapDispatchToProps = {
  updateTextInput ,
  updateCenter , 
  fetchPlaces ,
  searchMap 
}
export default connect(mapStateToProps, mapDispatchToProps  )( MapControlsComponent );
// export default MapComponent;