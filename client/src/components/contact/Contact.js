import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

const Contact = () => {
    return (
        <Fragment> 
            <Navbar />

            <div class="page-content bg-white">
        
                <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)"}}>
                    <div class="container">
                        <div class="page-banner-entry">
                            <h1 class="text-white text-uppercase">Contact Us</h1>
                            <div className="addr-header"><i class="ti-location-pin"></i>75k Newcastle St. Ponte Vedra Beach, FL 309382 New York</div>
                        </div>
                    </div>
                </div>
                
                <div class="breadcrumb-row">
                    <div class="container">
                        <ul class="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
                
                <div class="page-banner contact-page section-sp2">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-5 col-md-5 m-b30">
                                <div class="bg-primary text-white contact-info-bx">
                                    <h2 class="m-b10 title-head text-center">Contact <span>Information</span></h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    <div class="widget widget_getintuch">	
                                        <ul>
                                            <li><i class="ti-location-pin"></i>75k Newcastle St. Ponte Vedra Beach, FL 309382 New York</li>
                                            <li><i class="ti-mobile"></i>0800-123456 (24/7 Support Line)</li>
                                            <li><i class="ti-mobile"></i>0800-8372984</li>
                                            <li><i class="ti-email"></i>info@hometutor.com</li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-7">
                                <form class="contact-bx ajax-form">
                                <div class="ajax-message"></div>
                                    <div class="heading-bx left">
                                        <h2 class="title-head text-center title-head-cust">Get In <span>Touch</span></h2>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                    </div>
                                    <div class="row placeani">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <label>Your Name</label>
                                                    <input name="name" type="text" required class="form-control valid-character" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <div class="input-group"> 
                                                    <label>Your Email Address</label>
                                                    <input name="email" type="email" class="form-control" required  />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <label>Your Phone</label>
                                                    <input name="phone" type="text" required class="form-control int-value" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <label>Subject</label>
                                                    <input name="subject" type="text" required class="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <label>Type Message</label>
                                                    <textarea name="message" rows="4" class="form-control" required ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-lg-12 text-center">
                                            <button name="submit" type="submit" value="Submit" class="btn button-md"> Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 p-lr0 d-flex">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.1298878182047!2d-81.38369578541523!3d30.204840081824198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e437ac927a996b%3A0x799695b1a2b970ab!2sNona+Blue+Modern+Tavern!5e0!3m2!1sen!2sin!4v1548177305546" class="align-self-stretch d-flex" style={{width:"100%", width:"100%", minHeight: "300px"}} allowfullscreen></iframe>
					</div>
                    </div>
                    
                </div>
                
            </div>
            <Footer />
        </Fragment>
    );
}

export default Contact;