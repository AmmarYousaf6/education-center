import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

const Contact = () => {
    return (
        <Fragment> 
            <Navbar />

            <div className="page-content bg-white">
        
                <div className="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)"}}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white text-uppercase">Contact Us</h1>
                            <div className="addr-header"><i className="ti-location-pin"></i>75k Newcastle St. Ponte Vedra Beach, FL 309382 New York</div>
                        </div>
                    </div>
                </div>
                
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
                
                <div className="page-banner contact-page section-sp2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-5 m-b30">
                                <div className="bg-primary text-white contact-info-bx">
                                    <h2 className="m-b10 title-head text-center">Contact <span>Information</span></h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    <div className="widget widget_getintuch">	
                                        <ul>
                                            <li><i className="ti-location-pin"></i>75k Newcastle St. Ponte Vedra Beach, FL 309382 New York</li>
                                            <li><i className="ti-mobile"></i>0800-123456 (24/7 Support Line)</li>
                                            <li><i className="ti-mobile"></i>0800-8372984</li>
                                            <li><i className="ti-email"></i>inquiries.hometutor@gmail.com</li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7">
                                <form className="contact-bx ajax-form">
                                <div className="ajax-message"></div>
                                    <div className="heading-bx left">
                                        <h2 className="title-head text-center title-head-cust">Get In <span>Touch</span></h2>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                    </div>
                                    <div className="row placeani">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <label>Your Name</label>
                                                    <input name="name" type="text" required className="form-control valid-character" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>Your Email Address</label>
                                                    <input name="email" type="email" className="form-control" required  />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <label>Your Phone</label>
                                                    <input name="phone" type="text" required className="form-control int-value" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <label>Subject</label>
                                                    <input name="subject" type="text" required className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <label>Type Message</label>
                                                    <textarea name="message" rows="4" className="form-control" required ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12 text-center">
                                            <button name="submit" type="submit" value="Submit" className="btn button-md"> Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 p-lr0 d-flex">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.1298878182047!2d-81.38369578541523!3d30.204840081824198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e437ac927a996b%3A0x799695b1a2b970ab!2sNona+Blue+Modern+Tavern!5e0!3m2!1sen!2sin!4v1548177305546" className="align-self-stretch d-flex" style={{width:"100%", width:"100%", minHeight: "300px"}} allowfullscreen></iframe>
					</div>
                    </div>
                    
                </div>
                
            </div>
            <Footer />
        </Fragment>
    );
}

export default Contact;