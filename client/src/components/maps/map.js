import React , { useState, useRef , useEffect } from 'react';
import { connect } from 'react-redux';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { Link ,  useHistory  } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup, MapControl ,Rectangle , LayersControl , LayerGroup , Circle , FeatureGroup} from 'react-leaflet';
// we are importing some of the beautiful semantic UI react components
import {
  Segment,
  Search,
  Divider,
  Button
} from "semantic-ui-react";


import ReactLeafletSearch from "react-leaflet-search";

import MapControlsComponent from './controls'

import { Icon } from "leaflet";

import { searchMap } from '../../actions/map';
// here are our first two actions, we will be adding them in the next step, bear with me!
import {
  updateTextInput,
  updateCenter
} from "../../actions/map_actions";

//For toast notifications
import toast  , { Toaster } from 'react-hot-toast';

// to wait for the users input we will add debounce, this is especially useful for "postponing" the geocode requests
import { debounce } from "throttle-debounce"

import "./map.css";

const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

export const placeIcon = new Icon({
  iconUrl: "/assets/images/default.png",
  iconSize: [100, 100]
});
export const defaulticon = new Icon({
  iconUrl: "/assets/images/default.png",
  iconSize: [50, 50]
});


//File hosting api url i.e base url
const mediaBaseUrl = "https://res.cloudinary.com/home-tutor/image/upload/v1613943867/edu_tutor/";

 //End of my imports
 const center = [51.505, -0.09]
 const rectangle = [
   [51.49, -0.08],
   [51.5, -0.06],
 ]
 

// defining the container styles the map sits in
const style = {
  width: '100vw',
  height: '600px',
  position : 'relative'
}

// use these or add your own HERE Maps credentials
const hereAppCode = '0XXQyxbiCjVU7jN2URXuhg'
const hereAppId = 'yATlKFDZwdLtjHzyTeCK'

// using the reduced.day map styles, have a look at the imported hereTileLayers for more
const hereReducedDay = {
  appId: hereAppId,
  appCode: hereAppCode,
  scheme: 'reduced.day'
}

// we define our bounds of the map
const boundingBox = {
    north: -34.36,
    south: -47.35,
    west: 166.28,
    east: -175.81,
};

// a leaflet map consumes parameters, I'd say they are quite self-explanatory
const mapParams = {
  zoomControl: false,
  maxBounds: boundingBox,
  zoom: 10,
  scrollWheelZoom : false
  // layers: [markersLayer, isochronesLayer, hereReducedDay]
}

//Actual component 
const MapComponent = ({userInput , results ,  teachers , isFetching , isFetchingIsochrones ,  settings   }) => {
  const mapRef = useRef();
  let [activeTeacher , setActiveTeacher ] = useState(null);
  let [teacherFetching , setTeacherFetching] = useState(true);
  //Will be used for redirects
  let history = useHistory();

  //Pin pointing central point in other words centeral point of view 
  const [centralPoint ,setCentralPoint] = useState({latitude : 33.4786 ,longitude : 73.0789});
  
  let data =[];
  useEffect( ()=>{
    // setCentralPoint({ latitude :  , longitude : settings.center.longitude });
    if(centralPoint.latitude != settings.center.latitude || centralPoint.longitude !=settings.center.longitude)
      handleOnFlyTo(settings.center.latitude , settings.center.longitude);
  } , [settings , teachers]);
  
  const handleOnFlyTo = (lat, lng) => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    setCentralPoint({latitude : lat , longitude :lng});
    map.flyTo([lat  , lng ], 14, {
      duration: 2
    });
  }
  const fetchTeacherDetail = (teacher)=>{
      setTeacherFetching(true);

          // we define our url and parameters to be sent along
    let url = apiUrl+'map/detail/'+teacher.id;
      
    // we use the fetch API to call HERE Maps with our parameters
    return fetch(url )
      // when a response is returned we extract the json data
      .then(response => response.json())
      // and this data we dispatch for processing in locations of teachers
      .then(data =>{
        console.log("We have teacher details " , {...teacher ,...data.data[0]});
        setActiveTeacher({...teacher ,...data.data[0]})
        setTeacherFetching(false);
      })
      .catch(error => console.error(error))


    }
    //Mwthos to initiate view profile request
    const viewProfileClicked = (teacher)=>{
      //handling user not logged in
      if (!localStorage.token) {
          toast.error("Please login to view "+teacher.name+" details");

          // history.push("/login");
          return ;
      }
      history.push("/profile/details/"+teacher.id);        
    }    
    
    const CustomPopup = ()=> {
      let ratingOutOfFive  = 0;
      const subjects = []
      const ratings = []
      if(activeTeacher){
        if(activeTeacher.ratings)
          ratingOutOfFive = Math.floor(activeTeacher.ratings);
        //Composing rating html 
        for(let i=1 ; i < 6 ; i++){
          if(i <= ratingOutOfFive){
            ratings.push(<span className="fa fa-star checked" key={i}></span>)
            continue ;
          }
          ratings.push(<span className="fa fa-star" key={i}></span>)
        }
        //Composing subjects html
        if(activeTeacher.subjects)
        {  
          let tempSubjects = activeTeacher.subjects.split(",");
          let uniqueSubjects =  [...new Set(tempSubjects)];    
  
          for(let i=0 ; i < uniqueSubjects.length ; i++){
            subjects.push(<span className="badge" key={i}>{uniqueSubjects[i]}</span>)
          }
        }
      }
      return(
        <Popup position={[activeTeacher.latitude , activeTeacher.longitude ]} onClose={()=>{setActiveTeacher(null)}} >
          {teacherFetching ? <b>Fetching teacher details...</b> : 
            (<div>
              {/* Start Ratings  */}
              <div className="row">
                <div className="col-4">
                  <img src={`${mediaBaseUrl+activeTeacher.image}`}/>
                </div>
                <div className="col-8">
                  <a onClick={()=>viewProfileClicked(activeTeacher)} style={{cursor : 'pointer' ,color:"skyblue" ,fontWeight:"bold",textDecoration:"underline" }}>{activeTeacher.name}</a> 
                  <div>
                    {ratings }
                  <p>{activeTeacher.ratings ? activeTeacher.ratings.toFixed(1) : ''} average based on {activeTeacher.reviewscount} reviews.</p>
                  </div>
                </div>
              </div>
              {/* End Ratings */}
              {/* Start Description */}
                <p className="bold headings">Summary</p>
                <div>{activeTeacher.summary}</div>
              {/* End Description */}

              {/* Tags Start */}
                <p className="bold headings">Subjects</p>
                  {subjects}
              {/* End Tags */}
              <p>
              </p>

              {/* Start Location */}
                <p className="bold headings">
                  Location
                </p>
                {activeTeacher.location}
              {/* End Location */}
            </div>)
          }
        </Popup>
      );
    }

    return (
      <div style={{position:'absolute'}}>
         <MapControlsComponent style={{position:'relative'}} />
   
    <Map ref={mapRef}  center={[  centralPoint.latitude , centralPoint.longitude]} zoom={13} scrollWheelZoom={false} style={style}>
    <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    {teachers && (teachers.map((teacher,i)=>(
          <Marker position={[teacher.latitude , teacher.longitude]} key={i} icon={defaulticon} 
          onClick={()=>{ fetchTeacherDetail(teacher) }}
          >
          </Marker>
          )) )}

    {activeTeacher  && (    <CustomPopup /> )}    
     
    <Marker position={[centralPoint.latitude, centralPoint.longitude ]} icon={placeIcon} >
          <Popup>
              <h4>{userInput ? userInput : 'Defult location'}</h4>
          </Popup>
    </Marker>   
  </Map>
  <Toaster/>

    </div>
    )
};



Map.propTypes = {
  userInput: PropTypes.string, 
  results: PropTypes.array ,
  teachers: PropTypes.object,
  isFetching: PropTypes.bool,
  isFetchingIsochrones: PropTypes.bool,
  settings: PropTypes.object
};
const mapStateToProps = state => ({
  userInput: state.Map.userInput , 
  results: state.Map.geocodeResults ,
  teachers: state.Map.teachers ,
  isFetching: state.Map.isFetching ,
  isFetchingIsochrones: state.Map.isFetchingIsochrones ,
  settings: state.Map.settings
});
const mapDispatchToProps = {
  searchMap 
}
export default connect(mapStateToProps, mapDispatchToProps  )( MapComponent );
// export default MapComponent;