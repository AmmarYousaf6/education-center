import React, { Fragment, useEffect , useState } from 'react';
//For routing
import { BrowserRouter as Router ,  Link , NavLink , Switch , Route , useRouteMatch, useLocation } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

//For animation
import { AnimatePresence , motion } from 'framer-motion';
//For ajax calls
import axios from 'axios';

import  Inbox  from './../mailbox/inbox';
import setAuthToken from '../../utils/setAuthToken';

//Importing all the modals 
import Modal from './../modals/hireMeModal';
import RatingModal from './../modals/ratingsModal';

//For toast notifications
import toast  , { Toaster } from 'react-hot-toast';

import './style.css';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = 'https://hometutorpk.herokuapp.com/';

const pageTransitions = {
    in : {
        opacity : 1 ,
        y: 0
    },
    out : {
        opacity : 0 ,
        y : "+100vh"
    }
};
//Changes first letter of string to upper case
const capitalize = (s)=>{
    if(s== undefined || s.length < 2)
        return '';
    return s[0].toUpperCase() + s.slice(1)
};

const Introduction = (props) => {
    return (
            <motion.div className="courese-overview" id="introduction"
            exit="out" 
            animate="in" 
            initial="out"
            variants={pageTransitions} >
                <h4 className="text-center">INTRODUCTION</h4>
                <div className="row">
                    <div className="col-md-12 col-lg-10">
                        <ul className="course-features">
                            <li><i className="ti-book"></i> <span className="label">About Tutor</span> <span className="value">{props?.userInfo.age ? (props?.userInfo?.age +"yrs,") : ''} {props.userInfo ? capitalize(props?.userInfo?.gender):''}</span></li>
                            <li><i className="ti-help-alt"></i> <span className="label">Qualification</span> <span className="value">{props?.userInfo?.qualification}</span></li>
                            <li><i className="ti-time"></i> <span className="label">Experience</span> <span className="value">{props?.userInfo.experience ? (props?.userInfo?.experience +"years") : 'Not provided'}</span></li>
                            <li><i className="ti-stats-up"></i> <span className="label">English Skills</span> <span className="value">High</span></li>
                            <li><i className="ti-smallcap"></i> <span className="label">Teaching In</span> <span className="value">Not specified</span></li>
                            <li><i className="ti-user"></i> <span className="label">No ofStudents</span> <span className="value">32</span></li>

                        </ul>
                    </div>
                </div>
            </motion.div>
    )
}

const ClassesAndSubjects = (props) => {
    let subjects = props?.userInfo.subjects;
    let grades = props?.userInfo.grades;
    return (
                <motion.div className="courese-overview" id="classes"
                exit="out" 
                animate="in" 
                initial="out"
                variants={pageTransitions} >
                    <h4 className="text-center">CLASSES & SUBJECTS</h4>
                    <div className="row">
                        <div className="col-md-12 col-lg-10">
                            <ul className="course-features course-features-spec">
                                { typeof grades == "object" && grades.map(grade => (
                                    <li >
                                        <i className="ti-book"></i> <span className="label lbl-header">{grade.name}</span>                                    
                                    </li>
                                ))}

                                <li><i className="ti-books"></i> <span className="label lbl-header"></span>
                                    <span className="value">
                                        <ul className="list-checked primary">
                                            {subjects && subjects.map(subject=>(
                                                <li className="checked-items-li">{subject.name}</li>
                                            ))}
                                        </ul>
                                        <div className="widget_tag_cloud">
                                            <div className="tagcloud">
                                                <a href="#">{props?.userInfo.salary} /Per Month (For all subjects)</a>
                                            </div>
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
    )
}
const PreferredLocations = (props) => {
    let preferredLocations = props?.userInfo?.areas;
    return (
        <motion.div className="courese-overview" id="location"
        exit="out" 
        animate="in" 
        initial="out"
        variants={pageTransitions} >
                    <h4 className="text-center">PREFERRED LOCATIONS</h4>
                    <div className="row">
                        <div className="col-md-12 col-lg-10">
                            <ul className="list-checked primary">
                                { preferredLocations && preferredLocations.map(loc=>(
                                   <li className="checked-items-li">{loc.name}</li>
                                ))}
 
                                
                            </ul>
                        </div>
                    </div>
        </motion.div>
    )
}
const Details = (props)=>{
    let summary = props?.userInfo?.summary;
    return (
        <motion.div className="courese-overview" id="details" 
        exit="out" 
        animate="in" 
        initial="out"
        variants={pageTransitions} >
            <h4 className="text-center">DETAILS</h4>
            <div className="row">
                <div className="col-md-12 col-lg-10">
                    <p className="details-para">
                        {summary}
                    </p>
                </div>
            </div>
        </motion.div>        
    )
}
const Reviews = (props) =>{
    let ratings = props?.userInfo?.ratings;
    // Making groups of ratings
    let groupedRatings =new Array(5);

    //Check if ratings are provided or not
    if(ratings)
    {
        for(let i=0 ; i < 5 ; i++){
            groupedRatings[i] = [];
            groupedRatings[i]["count"] = ratings.filter(rat =>rat.rating == i+1).length;
            groupedRatings[i]["avgRating"] = groupedRatings[i]["count"]/ratings.length *100;
        }
    }
    // console.log("After ratings done" , groupedRatings)
    return (
        <motion.div className="courese-overview" id="reviews" 
            exit="out" 
            animate="in" 
            initial="out"
            variants={pageTransitions} >
                    <h4 className="text-center">REVIEWS</h4>
                    <div className="row">
                        <div className="col-md-12 col-lg-10">
                            <div className="review-bx">
                                <div className="all-review">
                                    <h2 className="rating-type">{props?.userInfo?.rating}</h2>
                                    <ul className="cours-star">
                                        {[...Array(5).keys()].map(key=>(
                                            <li key={key} className={props?.userInfo?.rating && props?.userInfo?.rating > key ? "active" : ""}><i className="fa fa-star"></i></li>
                                        ))}
                                    </ul>
                                    <span>{props.userInfo ? props?.userInfo?.ratings.length : ''} Rating{props.userInfo && props?.userInfo?.ratings.length > 1 ? 's' :'' }</span>
                                </div>
                                <div className="review-bar">
                                    {[...Array(5).keys()].map(key=>(                                

                                    <div className="bar-bx" key={key}>
                                        <div className="side">
                                            <div>{5-key} star</div>
                                        </div>
                                        <div className="middle">
                                            <div className="bar-container">
                                                <div className="bar-5" style={{ width: groupedRatings[5-key-1] ? groupedRatings[5-key-1].avgRating+"%" : "0%" }}></div>
                                            </div>
                                        </div>
                                        <div className="side right">
                                            <div>{groupedRatings[5-key-1] ? groupedRatings[5-key-1].count : 0}</div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            {/* End of Main Section */}
                        </div>
                    </div>
                </motion.div>
    )
}
const TeacherProfile = () => {
    //For modals
    const [showModal , setShowModal] = useState(false);
    const [showRatingModal , setShowRatingModal] = useState(false);

    let match = useRouteMatch("/\profile/*/:id");
    const location = useLocation();

    let [teacherInfo , setTeacherInfo] = useState(0);

    //Method to initiate hiring request 
    const hireMeClicked = (teacher)=>{
        //handling user not logged in
        if (!localStorage.token) {
            toast.error("Please login to hire "+teacher.name);
            // history.push("/login");
            return ;
        }
        setShowModal(teacher)
    }
    //Method tp rate user
    const rateClicked = (teacher)=>{
        console.log("Ratings" , teacher)
        //handling user not logged in
        if (!localStorage.token) {
            toast.error("Please login to hire "+teacher.name);
            // history.push("/login");
            return ;
        }
        setShowRatingModal(teacher)
    } 
    //Fetching teacher info
    useEffect( ()=>{
        const fetchAllteacherInfo  = async () => {
            let data = [];
            //Making an object for data filtering 
            let filters = {
                skip : 0 ,
                limit : 10 ,
                search : ''
            };
            //Making an object of header authorization
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
            let resultToReturn = [];
            try {    
                const allTeacherInfo = await axios.get(`${apiUrl}users/profile/${match.params.id}` , filters , config);
                data = allTeacherInfo.data.user;
                console.log("Data which is fetched" , data , allTeacherInfo);

                setTeacherInfo(data);
                // setShowModal(data);
                // this will re render the view with new data            
            } catch (err) {
                console.log("Error occured in index" , err);        
            }
            return resultToReturn;
        }
        fetchAllteacherInfo() }, [] );

    return (
        <Fragment>  
            <Navbar />

            <div className="page-content bg-white">
                <div className="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner2.jpg)"}}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white text-uppercase">About {teacherInfo?.name}</h1>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>Tutor Details</li>
                        </ul>
                    </div>
                </div>

                <div className="content-block">
            
			        <div className="section-area section-sp1">
                        <div className="container">
					        <div className="row">
                                {/* Left Sidebar */}
                                <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                                    <div className="course-detail-bx">
                                        
                                        <div className="course-buy-now text-center">
                                            <button className="btn radius-xl text-uppercase" onClick={()=>hireMeClicked(teacherInfo)}>Hire Me Now</button>
                                        </div>
                                        <div className="teacher-bx">
                                            <div className="teacher-info">
                                                <div className="teacher-thumb">
                                                    <img src={mediaBaseUrl+teacherInfo.image} alt=""/>
                                                </div>
                                                <div className="teacher-name">
                                                    <h5>{teacherInfo?.name}</h5>
                                                    <span>{teacherInfo.qualification}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cours-more-info">
                                            <div className="review">
                                                <span>{teacherInfo ? teacherInfo.ratings.length : 0} Review{teacherInfo && teacherInfo.ratings.length > 1 ? 's' : '' }</span>
                                                <ul className="cours-star">
                                                    {[...Array(5).keys()].map(key=>(
                                                        <li key={key} className={teacherInfo && teacherInfo.rating > key ? "active" : "" } key={key}><i className="fa fa-star"></i></li>
                                                    ))}
                                               </ul>
                                               <button className="btn radius-xl" onClick={()=>rateClicked(teacherInfo)}>Rate</button>                                              
                                            </div>
                                            <div className="price categories">
                                                <span>Categories</span>
                                                <h5 className="text-primary">{teacherInfo ? teacherInfo?.user_type?.toUpperCase() : '' }</h5>
                                            </div>
                                        </div>    
                                        <div className="course-info-list scroll-page">
                                            <ul className="navbar">
                                                    <li>
                                                        <NavLink  activeClassName='active' to={"/profile/details/"+(match ? match.params.id : '')} className="nav-link" >
                                                        <i className="ti-zip"></i>Introduction
                                                        </NavLink >
                                                    </li>
                                                    <li>
                                                        <NavLink  activeClassName='active' to={"/profile/details/classes/"+(match ? match.params.id : '')} className="nav-link" >
                                                            <i className="ti-bookmark-alt"></i>Classes & Subjects
                                                        </NavLink >
                                                    </li>
                                                    <li>
                                                        <NavLink  activeClassName='active' to={"/profile/details/preferred-locations/"+(match ? match.params.id : '')} className="nav-link" >
                                                        
                                                            <i className="ti-user"></i>Preferred Location
                                                        </NavLink >
                                                    </li>
                                                    <li>
                                                        <NavLink  activeClassName='active' to={"/profile/details/details/"+(match ? match.params.id : '')} className="nav-link" >
                                                            <i className="ti-comments"></i>Details
                                                        </NavLink >
                                                    </li>
                                                    <li>
                                                        <NavLink  activeClassName='active' to={"/profile/details/reviews/"+(match ? match.params.id : '')} className="nav-link" >
                                                            <i className="ti-comments"></i>Reviews
                                                        </NavLink >
                                                    </li>
                                                    
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* End of Left Sidebar */}

                                {/* Start of body */}
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    {/* <Switch>
                                        <Route exact path="/profile/details/:id" component={ProfileDetails}></Route>
                                        <Route exact path="/profile/inbox" component={Inbox}></Route>
                                    </Switch> */}
                                    <AnimatePresence exitBeforeEnter>
                                        <Switch location={location} key={location.pathname}>
                                            <Route exact path="/profile/details/:id" render={(props) => <Introduction userInfo={teacherInfo}/>}/>
                                            <Route exact path="/profile/details/classes/:id" render={(props) => <ClassesAndSubjects userInfo={teacherInfo}/>}/>
                                            <Route exact path="/profile/details/preferred-locations/:id" render={(props) => <PreferredLocations userInfo={teacherInfo}/>} />
                                            <Route exact path="/profile/details/details/:id" render={(props) => <Details userInfo={teacherInfo}/>}/>
                                            <Route exact path="/profile/details/reviews/:id" render={(props) => <Reviews userInfo={teacherInfo}/>}/>                        
                                        </Switch>
                                    </AnimatePresence>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />            
            <Modal showModal={showModal} setShowModal={setShowModal}/>
            <RatingModal showModal={showRatingModal} setShowModal={setShowRatingModal}/>
        </Fragment>
    )
}

export default TeacherProfile;