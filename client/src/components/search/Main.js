import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

const Main = () => {
    return (
        <Fragment>  
            <Navbar />

            <div class="page-content bg-white">
                <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)" }}>
                    <div class="container">
                        <div class="page-banner-entry">
                            <h1 class="text-white">LIST OF QUALIFIED TUTORS</h1>
                        </div>
                    </div>
                </div>
                <div class="breadcrumb-row">
                    <div class="container">
                        <ul class="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>Tutors</li>
                        </ul>
                    </div>
                </div>

                {/*  */}

                <div class="content-block">
                    <div class="section-area section-sp1">
                        <div class="container">
                            <div className="row">
                            <div class="col-lg-3 col-md-4 col-sm-12 m-b30"></div>
                            <div class="col-lg-9 col-md-8 col-sm-12">
                                <div className="row">
                                    <div className="col-md-8 search-term-text">Search Results for: "Search Term"</div>
                                    <div className="col-md-4 sort-field">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <select name="dzName" required class="form-control">
                                                    <option value="">Sort By Fee</option>
                                                    <option value="">High - Low</option>
                                                    <option value="">Low - High</option>
                                                
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-12 m-b30">
                                    <div class="widget courses-search-bx placeani">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <label>Search Tutor</label>
                                                <input name="dzName" type="text" required class="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget widget_archive">
                                        <h5 class="widget-title style-1">Advanced Search</h5>
                                        
                                        <div class="widget courses-search-bx placeani">
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <select name="dzName" required class="form-control">
                                                        <option value="">Select Class</option>
                                                        <option value="">Nursery</option>
                                                        <option value="">Prep</option>
                                                        <option value="">Primary</option>
                                                        <option value="">Secondary</option>
                                                        <option value="">Matric</option>
                                                        <option value="">FSC</option>
                                                        <option value="">Computer Science</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <select name="dzName" required class="form-control">
                                                        <option value="">Select Subject</option>
                                                        <option value="">English</option>
                                                        <option value="">Urud</option>
                                                        <option value="">Maths</option>
                                                        <option value="">Science</option>
                                                        <option value="">Computer</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <select name="dzName" required class="form-control">
                                                        <option value="">Select Experience</option>
                                                        <option value="">1 - 5 Years</option>
                                                        <option value="">5 - 10 Years</option>
                                                        <option value="">10 - 15 Years</option>
                                                        <option value="">15 - 20 Years</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <select name="dzName" required class="form-control">
                                                        <option value="">Select Gender</option>
                                                        <option value="">Male</option>
                                                        <option value="">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <select name="dzName" required class="form-control">
                                                        <option value="">Select Fee Range</option>
                                                        <option value="">5K to 10K</option>
                                                        <option value="">10K to 15K</option>
                                                        <option value="">15K to 20K</option>
                                                        <option value="">20K to 25K</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" class="btn button-md hirenow-btn">Search</a>
                                    
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12">
                                    
                                    <div class="row">
                                    <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                                            <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic1.jpg" alt=""/>
                                                    
                                                </div>
                                                <div class="info-bx text-center">
                                                    <h5><a href="#">Roy Daniels</a></h5>
                                                    <span>Electrical Engineer</span>
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                                            <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic2.jpg" alt=""/>
                                                    
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                                            <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic3.jpg" alt=""/>
                                                    
                                                </div>
                                                <div class="info-bx text-center">
                                                    <h5><a href="#">Roy Daniels</a></h5>
                                                    <span>Electrical Engineer</span>
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                                        <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic3.jpg" alt=""/>
                                                    
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                                        <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic1.jpg" alt=""/>
                                                    
                                                </div>
                                                <div class="info-bx text-center">
                                                    <h5><a href="#">Roy Daniels</a></h5>
                                                    <span>Electrical Engineer</span>
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                                        <div class="cours-bx">
                                                <div class="testimonial-thumb">
                                                    <img src="assets/images/testimonials/pic2.jpg" alt=""/>
                                                    
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
                                                    <a href="#" class="btn button-md profile-view-btn">View Profile</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 m-b20">
                                            <div class="pagination-bx rounded-sm gray clearfix">
                                                <ul class="pagination">
                                                    <li class="previous"><a href="#"><i class="ti-arrow-left"></i> Prev</a></li>
                                                    <li class="active"><a href="#">1</a></li>
                                                    <li><a href="#">2</a></li>
                                                    <li><a href="#">3</a></li>
                                                    <li class="next"><a href="#">Next <i class="ti-arrow-right"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Main;