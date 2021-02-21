import React , { useState } from 'react';
import { render } from '@testing-library/react';
import { Map, TileLayer, Marker, Popup, MapControl } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import { Icon } from "leaflet";
import { Link } from 'react-router-dom';

export const icon = new Icon({
  iconUrl: "/assets/images/headoffice.webp",
  iconSize: [100, 100]
});
//fetching data 
// import * as data from "data/pk";
let data = require(`./pk.json`);

//Pin pointing central point in other words centeral point of view 
const centralPoint = {latitude : 33.6844, longitude : 73.0479};

//Just search bar on map
const SearchComponent = (props) => <ReactLeafletSearch position="topright" />;
const boundingBox = {
    north: -34.36,
    south: -47.35,
    west: 166.28,
    east: -175.81,
  };
//After adding some further information
  data = (data.map(obj=>({...obj,bounds : boundingBox})));

  const customProvider = {
    search: async (inputValue) => {
        let dataAfterFilter = data.filter(d=>(d.name.toLowerCase().includes(inputValue.toLowerCase() ) || d.title.toLowerCase().includes(inputValue.toLowerCase() ) || d.city.toLowerCase().includes(inputValue.toLowerCase())) );
        console.log("After searching" , dataAfterFilter  , "Value passedd" , inputValue);
      // do fetch or anything
      return {
        info: dataAfterFilter ,
        raw: "data"
      };
    }
  };
  const SearchComponent2 = (props) => <ReactLeafletSearch customProvider={customProvider} showMarker={false} showPopup={false} />;

//Actual component 
const MapComponent = () => {
    let [activePark , setActivePark  ] = React.useState(null);
    // let setActivePark = (point)=>{
    //     activePark , setActivePark = point;
    //     console.log("Gonna set value " , point )
    // }
    return (
        <Map center={[centralPoint.latitude , centralPoint.longitude ]} zoom={12} scrollWheelZoom={false} style={{ width: '100%', height: '600px' }}>
        <SearchComponent2 />

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
                                <Link to="/profile"><h2>{activePark.title}</h2></Link> 
                                    <span>{activePark.description}</span>
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

export default MapComponent;