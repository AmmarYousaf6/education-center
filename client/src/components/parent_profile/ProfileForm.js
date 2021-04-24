import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router ,  Link , NavLink , Switch , Route , useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import  ProfileDetailsBasicForm  from "./ProfileDetails";
import TeacherProfileUpdate from "./profileDetailsTeacher";
import  ManageChildren  from "./children";
import ChildModal from "./../modals/editChildModal";

//For animation
import { AnimatePresence , motion } from 'framer-motion';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const ProfileForm = ({ auth: { user, isAuthenticated, loading } }) => {
    //For modals
    const [showModal , setShowModal] = useState(false);

    const location = useLocation();
    let match = useRouteMatch("/\profile/*/:link");
    let styles={ 
        transform : `translateX(${match?.params?.link == 'basic' ? 0 : 100}%)` 
    };
    useEffect(() => {
        console.log("What we have in match ", user);
        const fetchProfileData = async () => {
            let data = [];
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
                const profileDetails = await axios.get(`${apiUrl}users/`, config);
                if(user && user.user_type == null){
                    user.user_type = profileDetails.data.user.user_type;
                }
                console.log("Profile details fetched", profileDetails , user )

                // setProfile(profileDetails.data );
                // this will re render the view with new data            
            } catch (err) {
                console.log("Error occured in index", err);
            }
            return resultToReturn;
        }
        fetchProfileData();
    }, []);


    return (
        <Fragment>
            <Navbar />
            {/* Start of page tabs section */}
            <h1>Manage profile</h1>
            <div className="tabs">
                <input type="radio" id="tab1" name="tab-control" defaultChecked />
                <input type="radio" id="tab2" name="tab-control" />
                <ul>
                    <li title="Features">
                            <label htmlFor="tab1" role="button">
                                <svg viewBox="0 0 24 24">
                                    <path d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10H20C20,13.32 17.32,16 14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4C14.43,4 14.86,4.05 15.27,4.14L16.88,2.54C15.96,2.18 15,2 14,2M20.59,3.58L14,10.17L11.62,7.79L10.21,9.21L14,13L22,5M4.93,5.82C3.08,7.34 2,9.61 2,12A8,8 0 0,0 10,20C10.64,20 11.27,19.92 11.88,19.77C10.12,19.38 8.5,18.5 7.17,17.29C5.22,16.25 4,14.21 4,12C4,11.7 4.03,11.41 4.07,11.11C4.03,10.74 4,10.37 4,10C4,8.56 4.32,7.13 4.93,5.82Z" />
                                </svg>
                                <br />
                                <NavLink  activeClassName='active_tab1' to={"/profile/update/basic"} >
                                            <span>Personal Info</span>
                                </NavLink >
                          </label>
                    </li>
                    {user && user.user_type && user.user_type=='parent' && (
                        <li title="Delivery Contents">
                        <label htmlFor="tab2" role="button">
                            <svg viewBox="0 0 24 24">
                                <path d="M2,10.96C1.5,10.68 1.35,10.07 1.63,9.59L3.13,7C3.24,6.8 3.41,6.66 3.6,6.58L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.66,6.72 20.82,6.88 20.91,7.08L22.36,9.6C22.64,10.08 22.47,10.69 22,10.96L21,11.54V16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V10.96C2.7,11.13 2.32,11.14 2,10.96M12,4.15V4.15L12,10.85V10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V12.69L14,15.59C13.67,15.77 13.3,15.76 13,15.6V19.29L19,15.91M13.85,13.36L20.13,9.73L19.55,8.72L13.27,12.35L13.85,13.36Z" />
                            </svg>
                            <br />
                            <NavLink  activeClassName='active_tab2' to={"/profile/update/children"} >
                                <span>
                                    Children
                                </span>
                            </NavLink >
                        </label>
                    </li>

                    )}
                </ul>

                <div className="slider"  style={styles}>
                    <div className="indicator" >

                    </div>
                </div>
                {/* Teacher Update  */}
                {user && user.user_type && user.user_type=='teacher' && (
                    <TeacherProfileUpdate  />
                )}
                {user && user.user_type && user.user_type=='parent' && (

                <div className="content">                    
                    <AnimatePresence exitBeforeEnter>
                        <Switch location={location} key={location.pathname}>
                            <Route exact path="/profile/update/basic">
                                <ProfileDetailsBasicForm />
                            </Route> 
                            <Route exact path="/profile/update/children">
                                <ManageChildren showModal={showModal} setShowModal={setShowModal} />
                            </Route>                             
                        </Switch>
                    </AnimatePresence>    
                </div> )}
            </div>

            {/* End of page tabs section     */}
            <ChildModal showModal={showModal} setShowModal={setShowModal}/>

            <Toaster />
            <Footer />
        </Fragment>
    )
}

ProfileForm.propTypes = {
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProfileForm);
