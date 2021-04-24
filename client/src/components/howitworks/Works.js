import React, { Fragment , useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const Works = () => {
    const [sendingMessage, setSendingMessage] = useState(false);
    const [storeInfo , setStoreInfo] =  useState({});
    useEffect(()=>{
        // we define our url and parameters to be sent along
        let url = apiUrl+'settings/';
            
        // we use the fetch API to call HERE Maps with our parameters
        return fetch(url )
            // when a response is returned we extract the json data
            .then(response => response.json())
            // and this data we dispatch for processing in locations of teachers
            .then(data =>{
                console.log("We have settings details " , data.data);
                let objSerialized = [];
                data.data.forEach(d=>{
                    objSerialized[d.key]= d.value
                })
                setStoreInfo(objSerialized);
            })
            .catch(error => console.error(error))

    }, [])
    return (
        <Fragment> 
            <Navbar />

            <div className="page-content bg-white">
        
                <div className="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)"}}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white text-uppercase">How ZubNee works?</h1>
                        </div>
                    </div>
                </div>
                
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>How it works!</li>
                        </ul>
                    </div>
                </div>
                
                <div className="page-banner contact-page section-sp2">
                    <div className="container">
					</div>

                    
                </div>
                
            </div>
            <Footer />
        </Fragment>
    );
}

export default Works;