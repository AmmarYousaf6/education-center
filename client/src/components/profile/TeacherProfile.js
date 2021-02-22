import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

const TeacherProfile = () => {
    return (
        <Fragment>  
            <Navbar />

            <div class="page-content bg-white">
                <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner2.jpg)"}}>
                    <div class="container">
                        <div class="page-banner-entry">
                            <h1 class="text-white text-uppercase">About Hinata Hyuga</h1>
                        </div>
                    </div>
                </div>
                <div class="breadcrumb-row">
                    <div class="container">
                        <ul class="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>Tutor Details</li>
                        </ul>
                    </div>
                </div>

                <div class="content-block">
            
			        <div class="section-area section-sp1">
                        <div class="container">
					        <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-12 m-b30">
                                    <div class="course-detail-bx">
                                        
                                        <div class="course-buy-now text-center">
                                            <a href="#" class="btn radius-xl text-uppercase">Hire Me Now</a>
                                        </div>
                                        <div class="teacher-bx">
                                            <div class="teacher-info">
                                                <div class="teacher-thumb">
                                                    <img src="assets/images/testimonials/pic1.jpg" alt=""/>
                                                </div>
                                                <div class="teacher-name">
                                                    <h5>Hinata Hyuga</h5>
                                                    <span>Science Teacher</span>
                                                </div>
                                            </div>
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
                                            <div class="price categories">
                                                <span>Categories</span>
                                                <h5 class="text-primary">Frontend</h5>
                                            </div>
                                        </div>
                                        <div class="course-info-list scroll-page">
                                            <ul class="navbar">
                                                <li><a class="nav-link" href="#introduction"><i class="ti-zip"></i>Introduction</a></li>
                                                <li><a class="nav-link" href="#classes"><i class="ti-bookmark-alt"></i>Classes & Subjects</a></li>
                                                <li><a class="nav-link" href="#location"><i class="ti-user"></i>Preferred Location</a></li>
                                                <li><a class="nav-link" href="#details"><i class="ti-comments"></i>Details</a></li>
                                                <li><a class="nav-link" href="#reviews"><i class="ti-comments"></i>Reviews</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-8 col-md-8 col-sm-12">

                                    <div class="courese-overview" id="introduction">
                                        <h4 className="text-center">INTRODUCTION</h4>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-10">
                                                <ul class="course-features">
                                                    <li><i class="ti-book"></i> <span class="label">About Tutor</span> <span class="value">45yrs, Male</span></li>
                                                    <li><i class="ti-help-alt"></i> <span class="label">Qualification</span> <span class="value">MA education, bsc double math stat</span></li>
                                                    <li><i class="ti-time"></i> <span class="label">Experience</span> <span class="value">25 years</span></li>
                                                    <li><i class="ti-stats-up"></i> <span class="label">English Skills</span> <span class="value">High</span></li>
                                                    <li><i class="ti-smallcap"></i> <span class="label">Teaching In</span> <span class="value">Not specified</span></li>
                                                    <li><i class="ti-user"></i> <span class="label">No ofStudents</span> <span class="value">32</span></li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>  

                                    <div class="courese-overview" id="classes">
                                        <h4 className="text-center">CLASSES & SUBJECTS</h4>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-10">
                                                <ul class="course-features course-features-spec">
                                                    <li><i class="ti-book"></i> <span class="label lbl-header">PRIMARY</span> 
                                                        <span class="value">
                                                        <ul class="list-checked primary">
                                                            <li className="checked-items-li">All Subjects</li>
                                                        </ul>
                                                            <div class="widget_tag_cloud">
                                                                <div class="tagcloud"> 
                                                                    <a href="#">14,000 /Per Month (For all subjects)</a> 
                                                                    <a href="#">8,000 /Per Month (Per Subject)</a> 
                                                                    
                                                                </div>
                                                            </div>    
                                                        </span>
                                                    </li>
                                                    <li><i class="ti-book"></i> <span class="label lbl-header">SECONDARY</span> 
                                                        <span class="value">
                                                        <ul class="list-checked primary">
                                                            <li className="checked-items-li">All Subjects</li>
                                                        </ul>
                                                            <div class="widget_tag_cloud">
                                                                <div class="tagcloud"> 
                                                                    <a href="#">14,000 /Per Month (For all subjects)</a> 
                                                                    <a href="#">8,000 /Per Month (Per Subject)</a> 
                                                                    
                                                                </div>
                                                            </div>    
                                                        </span>
                                                    </li>
                                                    <li><i class="ti-book"></i> <span class="label lbl-header">O LEVELS</span> 
                                                        <span class="value">
                                                        <ul class="list-checked primary">
                                                            <li className="checked-items-li">English</li>
                                                            <li className="checked-items-li">Urdu</li>
                                                            <li className="checked-items-li">Science</li>
                                                        </ul>
                                                            <div class="widget_tag_cloud">
                                                                <div class="tagcloud"> 
                                                                    <a href="#">14,000 /Per Month (For all subjects)</a> 
                                                                    <a href="#">8,000 /Per Month (Per Subject)</a> 
                                                                    
                                                                </div>
                                                            </div>    
                                                        </span>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div> 

                                    <div class="courese-overview" id="location">
                                        <h4 className="text-center">PREFERRED LOCATION</h4>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-10">
                                            <ul class="list-checked primary">
                                                <li className="checked-items-li">Paragon City, Lahore, Pakistan</li>
                                                <li className="checked-items-li">DHA, Lahore, Pakistan</li>
                                                <li className="checked-items-li">Askari X, Lahore, Pakistan</li>
                                            </ul>
                                            </div>
                                        </div>
                                    </div>  

                                    <div class="courese-overview" id="details">
                                        <h4 className="text-center">DETAILS</h4>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-10">
                                                <p className="details-para">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ve
                                                </p>
                                            </div>
                                        </div>
                                    </div>  

                                    <div class="courese-overview" id="reviews">
                                        <h4 className="text-center">REVIEWS</h4>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-10">
                                            <div class="review-bx">
									<div class="all-review">
										<h2 class="rating-type">3</h2>
										<ul class="cours-star">
											<li class="active"><i class="fa fa-star"></i></li>
											<li class="active"><i class="fa fa-star"></i></li>
											<li class="active"><i class="fa fa-star"></i></li>
											<li><i class="fa fa-star"></i></li>
											<li><i class="fa fa-star"></i></li>
										</ul>
										<span>3 Rating</span>
									</div>
									<div class="review-bar">
										<div class="bar-bx">
											<div class="side">
												<div>5 star</div>
											</div>
											<div class="middle">
												<div class="bar-container">
													<div class="bar-5" style={{width:"90%" }}></div>
												</div>
											</div>
											<div class="side right">
												<div>150</div>
											</div>
										</div>
										<div class="bar-bx">
											<div class="side">
												<div>4 star</div>
											</div>
											<div class="middle">
												<div class="bar-container">
													<div class="bar-5" style={{width:"90%" }}></div>
												</div>
											</div>
											<div class="side right">
												<div>140</div>
											</div>
										</div>
										<div class="bar-bx">
											<div class="side">
												<div>3 star</div>
											</div>
											<div class="middle">
												<div class="bar-container">
													<div class="bar-5" style={{width:"90%" }}></div>
												</div>
											</div>
											<div class="side right">
												<div>120</div>
											</div>
										</div>
										<div class="bar-bx">
											<div class="side">
												<div>2 star</div>
											</div>
											<div class="middle">
												<div class="bar-container">
													<div class="bar-5" style={{width:"90%" }}></div>
												</div>
											</div>
											<div class="side right">
												<div>110</div>
											</div>
										</div>
										<div class="bar-bx">
											<div class="side">
												<div>1 star</div>
											</div>
											<div class="middle">
												<div class="bar-container">
													<div class="bar-5" style={{width:"90%" }}></div>
												</div>
											</div>
											<div class="side right">
												<div>80</div>
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
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default TeacherProfile;