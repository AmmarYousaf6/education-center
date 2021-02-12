import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Footer = () => {
    return (
        <Fragment> 
<footer>
                <div class="footer-top">
                    
                    <div class="container">
                        <div class="row pt-5">
                            <div class="col-lg-4 col-md-12 col-sm-12 footer-col-4">
                                <div class="widget">
                                    <h5 class="footer-title ">Sign Up For A Newsletter</h5>
                                    <p class="text-capitalize m-b20">Weekly Breaking news analysis and cutting edge advices on job searching.</p>
                                    <div class="subscribe-form m-b20">
                                        <form class="subscription-form" method="post">
                                            <div class="ajax-message"></div>
                                            <div class="input-group">
                                                <input name="email" required="required"  class="form-control" placeholder="Your Email Address" type="email" />
                                                <span class="input-group-btn">
                                                    <button name="submit" value="Submit" type="submit" class="btn color-adj"><i class="fa fa-arrow-right"></i></button>
                                                </span> 
                                            </div>
                                        </form>
                                    </div>

                                        <h5 class="footer-title ">Follow Us</h5>
                                        <ul class="list-inline contact-social-bx">
                                            <li className="mr-2"><a href="#" class="btn outline radius-xl radius-color"><i class="fa fa-facebook"></i></a></li>
                                            <li className="mr-2"><a href="#" class="btn outline radius-xl radius-color"><i class="fa fa-twitter"></i></a></li>
                                            <li className="mr-2"><a href="#" class="btn outline radius-xl radius-color"><i class="fa fa-linkedin"></i></a></li>
                                            <li className="mr-2"><a href="#" class="btn outline radius-xl radius-color"><i class="fa fa-google-plus"></i></a></li>
                                        </ul>
                                </div>
                            </div>
                            <div class="col-12 col-lg-8 col-md-12 col-sm-12">
                                <div class="row">
                                <div class="">
                                        <div class="container">
                                            <div class="row align-items-center d-flex">
                                                <div class="col-lg-5 col-md-12">
                                                    <h5 class="footer-title ">Our Story</h5>
                                                    <p class="text-capitalize m-b20">It is a long established fact that a reade.</p>
                                                    <p class="font-size-adj-p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                    <a href="#" class="btn color-adj">Read More</a>
                                                </div>
                                                <div class="col-lg-7 col-md-12 heading-bx p-lr">
                                                    <div class="video-bx">
                                                        <img src="assets/images/about/pic1.jpg" alt=""/>
                                                        <a href="https://www.youtube.com/watch?v=x_sJzVe9P_8" class="popup-youtube video"><i class="fa fa-play"></i></a>
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
                <div class="footer-bottom">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 text-center footer-bold">© Copyright 2021 Home Tutor</div>
                        </div>
                    </div>
                </div>
            </footer>
            
            <button class="back-to-top fa fa-chevron-up" ></button>
        </Fragment>
    );
}

export default Footer;