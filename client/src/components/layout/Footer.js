import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Footer = () => {
    return (
        <Fragment> 
<footer>
                <div className="footer-top">
                    
                    <div className="container">
                        <div className="row pt-5">
                            <div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
                                <div className="widget">
                                    <h5 className="footer-title ">Sign Up For A Newsletter</h5>
                                    <p className="text-capitalize m-b20">Weekly Breaking news analysis and cutting edge advices on job searching.</p>
                                    <div className="subscribe-form m-b20">
                                        <form className="subscription-form" method="post">
                                            <div className="ajax-message"></div>
                                            <div className="input-group">
                                                <input name="email" required="required"  className="form-control" placeholder="Your Email Address" type="email" />
                                                <span className="input-group-btn">
                                                    <button name="submit" value="Submit" type="submit" className="btn color-adj"><i className="fa fa-arrow-right"></i></button>
                                                </span> 
                                            </div>
                                        </form>
                                    </div>

                                        <h5 className="footer-title ">Follow Us</h5>
                                        <ul className="list-inline contact-social-bx">
                                            <li className="mr-2"><a href="#" className="btn outline radius-xl radius-color"><i className="fa fa-facebook"></i></a></li>
                                            <li className="mr-2"><a href="#" className="btn outline radius-xl radius-color"><i className="fa fa-twitter"></i></a></li>
                                            <li className="mr-2"><a href="#" className="btn outline radius-xl radius-color"><i className="fa fa-linkedin"></i></a></li>
                                            <li className="mr-2"><a href="#" className="btn outline radius-xl radius-color"><i className="fa fa-google-plus"></i></a></li>
                                        </ul>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8 col-md-12 col-sm-12">
                                <div className="row">
                                <div className="">
                                        <div className="container">
                                            <div className="row align-items-center d-flex">
                                                <div className="col-lg-5 col-md-12">
                                                    <h5 className="footer-title ">Our Story</h5>
                                                    <p className="text-capitalize m-b20">It is a long established fact that a reade.</p>
                                                    <p className="font-size-adj-p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                    <a href="#" className="btn color-adj">Read More</a>
                                                </div>
                                                <div className="col-lg-7 col-md-12 heading-bx p-lr">
                                                    <div className="video-bx">
                                                        <img src="assets/images/about/pic1.jpg" alt=""/>
                                                        <a href="https://www.youtube.com/watch?v=x_sJzVe9P_8" className="popup-youtube video"><i className="fa fa-play"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 text-center footer-bold">© Copyright 2021 Home Tutor</div>
                        </div>
                    </div>
                </div>
            </footer>
            
            <button className="back-to-top fa fa-chevron-up" ></button>
        </Fragment>
    );
}

export default Footer;