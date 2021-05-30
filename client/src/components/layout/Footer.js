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
                                    

                                        <h5 className="footer-title ">Follow Us</h5>
                                        <ul className="list-inline contact-social-bx">
                                            <li className="mr-2"><a href="#" className="radius-xl radius-color"><i className="fa fa-facebook"></i></a></li>
                                            <li className="mr-2"><a href="#" className="radius-xl radius-color"><i className="fa fa-instagram"></i></a></li>
                                        </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 text-center footer-bold">© Copyright 2021 Zubnee</div>
                        </div>
                    </div>
                </div>
            </footer>
            
            <button className="back-to-top fa fa-chevron-up" ></button>
        </Fragment>
    );
}

export default Footer;