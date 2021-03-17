import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import MapComponent from './Map';
//Importing all the modals 
import Modal from '../modals/hireMeModal';

import LatestTeachersComponent from './latestTeachers';

// var createReactClass = require('create-react-class');
//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = 'https://hometutorpk.herokuapp.com/' ;


const Index =  () => {    
    //For modals
    const [showModal , setShowModal] = useState(false);

    // const [showModal , setShowModal] = useState(true);
    useEffect(()=>{
        
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
                                <h5>Own Your Feature Learning New Skills Online</h5>
                                <form className="cours-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="What do you want to learn today?	"/>
                                        <div className="input-group-append">
                                            <Link to="/search" className="btn" >Search</Link> 
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mw800 m-auto">
                        <h4 className="whiteText" >Your access to tutors verified by Our Scandinavian team of psychologists.</h4>
                        </div>
                    </div>
                </div>

                {/*  */}
                
                <div className="section-area section-sp1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 m-b30">
                                <h2 className="title-head ">Why Home Tution?</h2>
                                
                                <p>Recent studies have shown that engaging home tutors to increase our children’s academic abilities has shown a significant positive impact by augmenting the child’s academic performance. For the sake of individual attention and care home tuition is regarded as more effective than academies.</p>
                                <a href="#" className="btn button-md margin-fix-btm">Join Now</a>
                            </div>
                            <div className="col-lg-6">
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
                                    <p>If a child can’t learn the way we teach, maybe we should teach the way they learn” Ignacio Estrada</p>
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
                <div className="section-area section-sp2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 heading-bx left">
                                <h2 className="title-head text-uppercase text-center title-head-cust">what people <span>says</span></h2>
                                <p className="text-center">What a teacher is, is more important than what he teaches" Karl Menninger and remove it’s body.</p>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-8 col-sm-12">
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 m-b30">
                                    <div className="testimonial-bx">
                                        <div className="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic1.jpg" alt="" />
                                        </div>
                                        <div className="testimonial-info">
                                            <h5 className="name">Peter Packer</h5>
                                            <p>Student. FSC</p>
                                        </div>
                                        <div className="testimonial-content">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 m-b30">
                                    <div className="testimonial-bx">
                                        <div className="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic2.jpg" alt="" />
                                        </div>
                                        <div className="testimonial-info">
                                            <h5 className="name">Roy Daniels</h5>
                                            <p>Student. Matric</p>
                                        </div>
                                        <div className="testimonial-content">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
                                        </div>
                                    </div>
                                </div>
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

export default Index;