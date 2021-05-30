import React, { Fragment, useEffect, useState } from 'react';
import { Link  , useHistory} from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import MapComponent from './../maps/map';
//Importing all the modals 
import Modal from '../modals/hireMeModal';

import LatestTeachersComponent from './latestTeachers';
import GooglePlacesAutocomplete , { geocodeByAddress, getLatLng }  from "react-google-places-autocomplete";

import { searchMap } from "../../actions/map_actions";
import { queryData } from "../../actions/search";

// var createReactClass = require('create-react-class');
//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/' ;
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;



const Index =  ({inpSearch , searchMap , queryData}) => {    
    //For modals
    const [showModal , setShowModal] = useState(false);
    const [locationValue, setLocationValue] = useState([]);
    //For searching
    const [searchInp , setSearchInp] = useState('');
    //For redirects
    const history = useHistory();
    //For testimonials
    const [testimonials , setTestimonials] =  useState();
    //For Settings
    const [settings , setSettings] = useState();

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
                setSettings(objSerialized);
            })
            .catch(error => console.error(error))

    }, []);

    const handleValueChange = (e) => {
        setSearchInp(e.target.value) ;
    }
    const applySearch = ()=>{
        //Update redux first
        queryData(searchInp);
        history.push('/search');
    }
    // const [showModal , setShowModal] = useState(true);
    useEffect(()=>{
        //Fetch all teachers for map
        searchMap({settings : { all : 'true' }})
        //Fetch Testimonial Data
        const fetchTestimonials =  async () => {
            try {    
                const allTestimonials = await axios.get(`${apiUrl}testimonials` );
                let data = allTestimonials.data.data;

                setTestimonials(data);
                // this will re render the view with new data            
            } catch (err) {
                console.log("Error occured in index fetch testimonials " , err);        
            }
        }

        fetchTestimonials();
    }, []);
     return (
        <Fragment>  
            <Navbar />

            <div className="page-content bg-white">
        
                <div className="section-area section-sp1 ovbl-dark bg-fix online-cours" style={{backgroundImage: "url(assets/images/banner/banner2.jpg)" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center text-white">
                                <h2>FIND YOUR DESIRED TUTOR</h2>
                                <h5>Get your child prepared for the future</h5>
                                <form className="cours-search">
                                    {/* <div className="input-group main-search"> */}
                                        {/* <input type="text" className="form-control" onChange={handleValueChange} placeholder="Search tutors by name or location"/> */}
                                        <div className="input-group-append">
                                            <button to="/search" className="btn" style={{width : '100%'}} onClick={()=>applySearch()}>Search</button> 
                                        </div>
                                    {/* </div> */}
                                </form>
                            </div>
                        </div>
                        <div className="mw800 m-auto">
                        <h4 className="whiteText" style={{"textAlign":"center"}} >
                                Your access to a world of tutors on a platform delivered by our Scandinavian Team of Psychologists
                            </h4>
                        </div>
                    </div>
                </div>

                {/*  */}
                
                <div className="section-area section-sp1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 m-b30">
                                <h2 className="title-head " style={{"textAlign":"center"}} >Why Home Tution?</h2>
                                
                                <p>Recent studies have shown that engaging home tutors to increase our children’s academic abilities has shown a significant positive impact by augmenting the child’s academic performance. For the sake of individual attention and care home tuition is regarded as more effective than academies.</p>
                                {/* <a href="#" className="btn button-md margin-fix-btm">Join Now</a> */}
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div className="feature-container">
                                            <div className="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" className="icon-cell"><img src="assets/images/icon/icon1.png" alt="" /></a> 
                                            </div>
                                            <div className="icon-content">
                                                <h5 className="ttr-tilte text-center color-green text-big-cust">Search</h5>
                                                <p className="text-center">“Find a trusted home tutor from your neighbourhood according to your child’s needs and requirements.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div className="feature-container">
                                            <div className="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" className="icon-cell"><img src="assets/images/icon/icon2.png" alt="" /></a> 
                                            </div>
                                            <div className="icon-content">
                                                <h5 className="ttr-tilte text-center color-green text-big-cust">Select</h5>
                                                <p className="text-center">View tutors profiles and select the one that suits you.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div className="feature-container">
                                            <div className="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" className="icon-cell"><img src="assets/images/icon/icon3.png" alt="" /></a> 
                                            </div>
                                            <div className="icon-content">
                                                <h5 className="ttr-tilte text-center color-green text-big-cust">Schedule</h5>
                                                <p className="text-center">Our Scandinavian team of psychologists have already carefully selected tutors. You and your child can now focus on study.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div className="feature-container">
                                            <div className="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" className="icon-cell"><img src="assets/images/icon/icon4.png" alt="" /></a> 
                                            </div>
                                            <div className="icon-content">
                                                <h5 className="ttr-tilte text-center color-green text-big-cust">Study</h5>
                                                <p className="text-center">TheTutors handles the behind the scenes stuff so you can focus on your study.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="content-block">
                    <div className="section-area section-sp2 popular-courses-bx">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 heading-bx left text-center">
                                    <h2 className="title-head title-head-cust text-uppercase">Best <span>Home Tutors</span></h2>
                                    <p>“If a child can’t learn the way we teach, maybe we should teach the way they learn” </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-8 col-sm-12">
                                        {/* Start of teacher dynamic section  */}
                                    {  <LatestTeachersComponent setShowModal={setShowModal}/> }
                                        {/* End of Four teachers section */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map */}
                <div className="row">
                    <MapComponent/>
                </div>
                {/*  */}
                <div className="section-area section-sp2" style={{marginTop:'600px'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 heading-bx left">
                                <h2 className="title-head text-uppercase text-center title-head-cust">what people <span>say</span></h2>
                                <p className="text-center">{settings && settings['WHAT_PEOPLE_SAYS']}</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-8 col-sm-12">
                            <div className="row">
                                {testimonials && testimonials.map(tm=>(
                                    <div className="col-md-6 col-lg-6 col-sm-12 m-b30" key={tm.id}> 
                                        <div className="testimonial-bx">
                                            <div className="testimonial-thumb">
                                                <img src={"assets/images/testimonials/"+tm.image} alt="" />
                                            </div>
                                            <div className="testimonial-info">
                                                <h5 className="name">{tm.name}</h5>
                                                <p>{tm.role}</p>
                                            </div>
                                            <div className="testimonial-content">
                                                <p>{tm.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal}/>

            {/*  */}
            <Footer />
        </Fragment>
    );
}
  Index.propTypes = {
    inpSearch : PropTypes.string
  };
  const mapStateToProps = state => ({
    inpSearch: state.Map.userInput ,
  });
  const mapDispatchToProps = {
    searchMap ,
    queryData
  }
export default connect(mapStateToProps, mapDispatchToProps  )( Index );