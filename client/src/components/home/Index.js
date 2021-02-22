import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import MapComponent from './Map';
const Index = () => {
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
                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3><i className="ti-user"></i><span className="counter">5</span>M</h3>
                                        </div>
                                        <span className="cours-search-text">Over 5 Thousands student</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3><i className="ti-book"></i><span className="counter">30</span>K</h3>
                                        </div>
                                        <span class="cours-search-text">100 Tutors.</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3><i className="ti-layout-list-post"></i><span className="counter">20</span>K</h3>
                                        </div>
                                        <span className="cours-search-text">Learn Anythink Online.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}
                
                <div class="section-area section-sp1">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 m-b30">
                                <h2 class="title-head ">Learn a new skill online<br /> <span class="text-primary color-green"> on your time</span></h2>
                                
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                                <a href="#" class="btn button-md margin-fix-btm">Join Now</a>
                            </div>
                            <div class="col-lg-6">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div class="feature-container">
                                            <div class="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" class="icon-cell"><img src="assets/images/icon/icon1.png" alt="" /></a> 
                                            </div>
                                            <div class="icon-content">
                                                <h5 class="ttr-tilte text-center color-green text-big-cust">Search</h5>
                                                <p className="text-center">Find home tutor according to your requirement.Hire tutor on single click.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div class="feature-container">
                                            <div class="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" class="icon-cell"><img src="assets/images/icon/icon2.png" alt="" /></a> 
                                            </div>
                                            <div class="icon-content">
                                                <h5 class="ttr-tilte text-center color-green text-big-cust">Select</h5>
                                                <p className="text-center">View tutors profile and hire a tutor who suits you best according to your need.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div class="feature-container">
                                            <div class="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" class="icon-cell"><img src="assets/images/icon/icon3.png" alt="" /></a> 
                                            </div>
                                            <div class="icon-content">
                                                <h5 class="ttr-tilte text-center color-green text-big-cust">Schedule</h5>
                                                <p className="text-center">Schedule a trial class with your required tutor in just 30 minutes.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 m-b30">
                                        <div class="feature-container">
                                            <div class="feature-md text-white m-b20 text-center-fix">
                                                <a href="#" class="icon-cell"><img src="assets/images/icon/icon4.png" alt="" /></a> 
                                            </div>
                                            <div class="icon-content">
                                                <h5 class="ttr-tilte text-center color-green text-big-cust">Study</h5>
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
                <div class="content-block">
                    <div class="section-area section-sp2 popular-courses-bx">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 heading-bx left text-center">
                                    <h2 class="title-head title-head-cust text-uppercase">Best <span>Home Tutors</span></h2>
                                    <p>We are working with best home tutors.We are providing home tutors in lahore, home tutor in islamabad, home tutor in karachi as well as students can find tutors online.Each tutor has an overview and interview with us.</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 col-md-8 col-sm-12">
                                    <div class="row">
                                    <div class="col-md-6 col-lg-3 col-sm-6 m-b30">
                                            <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic1.jpg" alt=""/>
                                                </div>
                                                <div class="info-bx text-center">
                                                    <h5><a href="#">Maurice Bates</a></h5>
                                                    <span>Phd. Chemistry</span>
                                                </div>
                                                <div class="cours-more-info">
                                                    <div class="review">
                                                        <span>3 Review</span>
                                                        <ul class="cours-star">
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                        </ul>
                                                    </div>
                                                    <div class="price">
                                                        <del>$190</del>
                                                        <h5>$120</h5>
                                                    </div>
                                                </div>
                                                <div>
                                                    <table className="table tutor-table">
                                                        <tr>
                                                            <th width="20%">Subjects</th>
                                                            <td width="80%">Physics, Chemistry</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Classes</th><td>Primary, Secondary, Matric</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Experience</th><td>20 years</td>
                                                        </tr>
                                                    </table>
                                                    <a href="#" class="btn button-md hire-now-btn">Hire Now</a>
                                                    <Link to="/profile" class="btn button-md profile-view-btn">View Profile</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-3 col-sm-6 m-b30">
                                            <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic2.jpg" alt=""/>
                                                </div>
                                                <div class="info-bx text-center">
                                                    <h5><a href="#">Maurice Bates</a></h5>
                                                    <span>Phd. Chemistry</span>
                                                </div>
                                                <div class="cours-more-info">
                                                    <div class="review">
                                                        <span>3 Review</span>
                                                        <ul class="cours-star">
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                        </ul>
                                                    </div>
                                                    <div class="price">
                                                        <del>$190</del>
                                                        <h5>$120</h5>
                                                    </div>
                                                </div>
                                                <div>
                                                    <table className="table tutor-table">
                                                        <tr>
                                                            <th width="20%">Subjects</th>
                                                            <td width="80%">Physics, Chemistry</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Classes</th><td>Primary, Secondary, Matric</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Experience</th><td>20 years</td>
                                                        </tr>
                                                    </table>
                                                    <a href="#" class="btn button-md hire-now-btn">Hire Now</a>
                                                    <Link to="/profile" class="btn button-md profile-view-btn">View Profile</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-3 col-sm-6 m-b30">
                                            <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic3.jpg" alt=""/>
                                                </div>
                                                <div class="info-bx text-center">
                                                    <h5><a href="#">Jessie Russel</a></h5>
                                                    <span>Computer Engineer</span>
                                                </div>
                                                <div class="cours-more-info">
                                                    <div class="review">
                                                        <span>3 Review</span>
                                                        <ul class="cours-star">
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                        </ul>
                                                    </div>
                                                    <div class="price">
                                                        <del>$190</del>
                                                        <h5>$120</h5>
                                                    </div>
                                                </div>
                                                <div>
                                                    <table className="table tutor-table">
                                                        <tr>
                                                            <th width="20%">Subjects</th>
                                                            <td width="80%">Physics, Chemistry</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Classes</th><td>Primary, Secondary, Matric</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Experience</th><td>20 years</td>
                                                        </tr>
                                                    </table>
                                                    <a href="#" class="btn button-md hire-now-btn">Hire Now</a>
                                                    <Link to="/profile" class="btn button-md profile-view-btn">View Profile</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-3 col-sm-6 m-b30">
                                            <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic3.jpg" alt=""/>
                                                </div>
                                                <div class="info-bx text-center">
                                                    <h5><a href="#">Jessie Russel</a></h5>
                                                    <span>Computer Engineer</span>
                                                </div>
                                                <div class="cours-more-info">
                                                    <div class="review">
                                                        <span>3 Review</span>
                                                        <ul class="cours-star">
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li class="active"><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                        </ul>
                                                    </div>
                                                    <div class="price">
                                                        <del>$190</del>
                                                        <h5>$120</h5>
                                                    </div>
                                                </div>
                                                <div>
                                                    <table className="table tutor-table">
                                                        <tr>
                                                            <th width="20%">Subjects</th>
                                                            <td width="80%">Physics, Chemistry</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Classes</th><td>Primary, Secondary, Matric</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Experience</th><td>20 years</td>
                                                        </tr>
                                                    </table>
                                                    <a href="#" class="btn button-md hire-now-btn">Hire Now</a>
                                                    <Link to="/profile" class="btn button-md profile-view-btn">View Profile</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                <div class="section-area section-sp2">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 heading-bx left">
                                <h2 class="title-head text-uppercase text-center title-head-cust">what people <span>says</span></h2>
                                <p className="text-center">It is a long established fact that a reader will be distracted by the readable content of a page</p>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-8 col-sm-12">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-sm-12 m-b30">
                                    <div class="testimonial-bx">
                                        <div class="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic1.jpg" alt="" />
                                        </div>
                                        <div class="testimonial-info">
                                            <h5 class="name">Peter Packer</h5>
                                            <p>Student. FSC</p>
                                        </div>
                                        <div class="testimonial-content">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-12 m-b30">
                                    <div class="testimonial-bx">
                                        <div class="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic2.jpg" alt="" />
                                        </div>
                                        <div class="testimonial-info">
                                            <h5 class="name">Roy Daniels</h5>
                                            <p>Student. Matric</p>
                                        </div>
                                        <div class="testimonial-content">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <Footer />
        </Fragment>
    );
}

export default Index;