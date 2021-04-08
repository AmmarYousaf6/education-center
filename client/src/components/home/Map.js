import React , { useState } from 'react';
import { connect } from 'react-redux';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup, MapControl } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import { Icon } from "leaflet";

import { searchMap } from '../../actions/map';
import { Link } from 'react-router-dom';

export const icon = new Icon({
  iconUrl: "/assets/images/headoffice.webp",
  iconSize: [100, 100]
});

//File hosting api url i.e base url
const mediaBaseUrl = "https://res.cloudinary.com/home-tutor/image/upload/v1613943867/edu_tutor/";

const boundingBox = {
    north: -34.36,
    south: -47.35,
    west: 166.28,
    east: -175.81,
};


//Actual component 
const MapComponent = ({searchMap , latitude , longitude   }) => {
    //Pin pointing central point in other words centeral point of view 
    const centralPoint = { latitude : latitude , longitude : longitude };

    let data =[];
    const customProvider = {
      search: async (inputValue) => {
        let data = await searchMap(inputValue);
        // let data =locationsLst; 
        console.log("Data variable" , data  );

        //In case no data is returned 
        if(data == undefined){
          data = [];
        }else{
          //After adding some further information
          data =  (data.map(obj=>({...obj,bounds : boundingBox})));
        }
        return {
          info : data ,
          raw : data 
        }
      }
    };
    const customPopup = (searchInfo)=> {
      let thisResult  = searchInfo.raw.filter(obj => (obj.latitude == searchInfo.latLng.lat && obj.longitude == searchInfo.latLng.lng ))[0];
      //Calculations based on ratings
      thisResult.ratingTotal = 247;
      thisResult.ratingObtained = 200; 
      let rating = (thisResult.ratingObtained/thisResult.ratingTotal * 100 * 5) /100;
      let ratingOutOfFive = Math.floor(rating);

      //Composing rating html 
      const ratings = []

      for(let i=1 ; i < 6 ; i++){
        if(i <= ratingOutOfFive){
          ratings.push(<span className="fa fa-star checked" key={i}></span>)
          continue ;
        }
        ratings.push(<span className="fa fa-star" key={i}></span>)
      }
      //Composing subjects html
      const subjects = []
      thisResult.subjects = ["english" , "urdu" , "maths" , "physics"];
      for(let i=0 ; i < thisResult.subjects.length ; i++){
        subjects.push(<span className="badge" key={i}>{thisResult.subjects[i]}</span>)
      }
      return(
        <Popup>
          <div>
            {/* Start Ratings  */}
            <div className="row">
              <div className="col-4">
                <img src={`${mediaBaseUrl+thisResult.profile_img}`}/>
              </div>
              <div className="col-8">
                <Link to={`/profile/${thisResult.id}`}  >{thisResult.name}</Link> 
                <div>
                  {ratings }
                <p>{rating.toFixed(1)} average based on {thisResult.ratingTotal} reviews.</p>
                </div>
              </div>
            </div>
            {/* End Ratings */}
            {/* Start Description */}
              <p className="bold headings">Summary</p>
              <div>{thisResult.summary}</div>
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
              {thisResult.location}
            {/* End Location */}
          </div>
        </Popup>
      );
    }
    let [activePark , setActivePark  ] = React.useState(null);
    // const SearchComponent2 = (props) => <ReactLeafletSearch customProvider={customProvider}  />;
    const SearchComponent3 = (props) =>
      <ReactLeafletSearch customProvider = {customProvider} popUp={customPopup}     closeResultsOnClick={false} >                
      </ReactLeafletSearch>;

    return (
        <Map center={[centralPoint.latitude , centralPoint.longitude ]} zoom={10} scrollWheelZoom={false} style={{ width: '100%', height: '600px' }}>
        <SearchComponent3 />

        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {   
            // Mapping data to the marker
            data.map(obj => ( 
                <Marker 
                    key={obj.latitude+'__'+obj.longitude} 
                    position={[obj.latitude , obj.longitude]} 
                    icon={new Icon({iconUrl : obj.icon ? "/assets/images/"+obj.icon : "/assets/images/default.png" , iconSize : [100 , 100 ]})}
                    onClick={()=>{setActivePark(obj); console.log("active park" , activePark , setActivePark ); }}
                >            
                </Marker>)
            )
        }
        {/* Popup for handling on click */}
        {activePark  && 
            (<Popup
                    position={[activePark.latitude , activePark.longitude]} 
                    onClose={()=>{setActivePark(null)}}
                >
                    <div>
                        <h2>{activePark.name}</h2><br/>
                        <span>{activePark.summary}</span>
                    </div>
            </Popup>)}    


        <Marker position={[centralPoint.latitude, centralPoint.longitude ]} icon={icon} >
            <Popup>
                <h4>Home Tutor Head office</h4>
                Islamabad city,<br /> 
                Main Branch.
            </Popup>
        </Marker>
    </Map>)
};



Map.propTypes = {
  latitude : PropTypes.number ,
  longitude : PropTypes.number ,
  // locationsLst : PropTypes.arrayOf(PropTypes.object) ,
  searchMap : PropTypes.func
};
const mapStateToProps = state => ({
  latitude: state.Map.latitude ,
  longitude : state.Map.longitude ,
  // locationsLst : state.Map.locationsLst
});
const mapDispatchToProps = {
  searchMap 
}
export default connect(mapStateToProps, mapDispatchToProps  )( MapComponent );
// export default MapComponent;