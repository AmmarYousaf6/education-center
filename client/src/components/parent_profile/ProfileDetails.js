import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

//For animation
import { AnimatePresence , motion } from 'framer-motion';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;
const pageTransitions = {
    in : {
        opacity : 1 ,
        x: 0
    },
    out : {
        opacity : 0 ,
        x : "+20vh"
    }
};

const ProfileDetailsBasicForm = ({ auth: { user, isAuthenticated, loading } }) => {
    const [profile, setProfile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [beingSaved, setBeingSaved] = useState(false);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [summary, setSummary] = useState('');
    //Will be used for redirects
    let history = useHistory();

    useEffect(() => {
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
                console.log("Profile details fetched", profileDetails)


                setName(profileDetails.data.user.name);
                setAge(profileDetails.data.user.age);
                setSummary(profileDetails.data.user.summary);
                setFileUrl(profileDetails.data.user.image);

                // setProfile(profileDetails.data );
                // this will re render the view with new data            
            } catch (err) {
                console.log("Error occured in index", err);
            }
            return resultToReturn;
        }
        fetchProfileData();
    }, []);
    const saveChanges = async () => {
        setBeingSaved(true);
        let data = [];

        let resultToReturn = [];
        try {
            if (!fileUrl) {
                throw { msg: "Please attach an image", validationFailed: true };
            }
            //validating
            if (!name || name.length < 6) {
                throw { msg: "Name must be atleast 6 characters long.", validationFailed: true };
            }
            if (!age || age < 10) {
                throw { msg: "Age must be at least 10.", validationFailed: true };
            }
            if (!summary || summary.length < 6) {
                throw { msg: "Summary must be atleast 6 characters long.", validationFailed: true };
            }

            let dataBody = {
                name: name,
                age: age,
                summary: summary,
                file: fileUrl
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };


            const updateProfile = await axios.post(`${apiUrl}users/update-profile-desc`, dataBody, config);
            if (!updateProfile.data) {
                throw "Something went wrong. Please try again";
            }
            toast.success("User updated.");
        } catch (err) {
            console.log("Error occured ", err);
            if (err.config && err.config.url) {
                toast.error("Connection error occured.");
            } else if (err.validationFailed) {
                toast.error(err.msg);
            } else {
                toast.error("Something went wrong");
            }

        } finally {
            setBeingSaved(false);
        }

    }

    const changeHandler = (event) => {
        const uploadFile = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
            // setFileUrl(URL.createObjectURL(event.target.files[0]));
            //Since a file is selected upload to server 
            let data = [];
            console.log(event.target.files, "<<<Files array >>>>");
            let resultToReturn = [];
            try {
                //ratedTo, rating, feedback
                let dataBody = {
                    file: event.target.files[0],
                };
                let fd = new FormData();
                fd.append("file", selectedFile);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };


                const uploadImage = await axios.post(`${apiUrl}users/upload-image`, fd, config);
                console.log(uploadImage, "Image uploaded");
                if (!uploadImage.data) {
                    throw "Something went wrong. Please try again";
                }
                setFileUrl(uploadImage.data.url);
            } catch (err) {
                console.log("Error occured ", err);
                toast.error("Something went wrong while uploading image");
            } finally {

            }
        };
        uploadFile(event);
    }

    return (
            <motion.section className="courese-overview" id="introduction"
                                        exit="out" 
                                        animate="in" 
                                        initial="out"
                                        variants={pageTransitions} >
                        <div className="page-content bg-white">
                            <div className="content-block">
                                <div className="section-area section-sp1">
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-lg-12 col-md-8 col-sm-12">
                                                <div className="tab-pane" id="edit-profile">
                                                    <form className="edit-profile">
                                                        <div className="">
                                                            <div className="form-group row">
                                                                <div className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label containerImg">
                                                                    {!isSelected && (
                                                                        <img src={user ? user.image : 'default.png'} alt="Avatar" className="image" />
                                                                    )}
                                                                    {isSelected && (
                                                                        <img className="image-upload-ph image" src={fileUrl} />
                                                                    )}
                                                                    <div className="middle">
                                                                        <div className="text" onClick={() => document.getElementById("profile_img").click()}>Change Image</div>
                                                                        <input type="file" id="profile_img" name="profile_image" onChange={changeHandler} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                                    <h3 className="mt-auto">Personal Details</h3>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Full Name</label>
                                                                <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                                    <input className="form-control" type="text" value={name ? name : ''} onChange={(event) => setName(event.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Email</label>
                                                                <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                                    <input className="form-control" disabled type="text" value={user && user.email ? user.email : ''} />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Age </label>
                                                                <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                                    <input className="form-control" type="text" value={age ? age : ''} onChange={(event) => setAge(event.target.value)} />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Summary </label>
                                                                <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                                    <input className="form-control" type="text" value={summary ? summary : ''} onChange={(event) => setSummary(event.target.value)} />
                                                                    <span className="help">A statement which defines you.</span>
                                                                </div>
                                                            </div>

                                                            <div className="seperator"></div>

                                                        </div>
                                                        <div className="">
                                                            <div className="">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-3 col-md-3 col-lg-2">
                                                                    </div>
                                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                                        <button type="reset" className="btn" onClick={saveChanges} >
                                                                            Save changes
                                                                            {
                                                                                beingSaved && (
                                                                                    <img src="assets/images/loader.gif" className="ratingLoader" />
                                                                                )
                                                                            }
                                                                        </button>
                                                                        <button type="reset" className="btn-secondry" onClick={() => history.push('/')}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </motion.section>
    )
}
ProfileDetailsBasicForm.propTypes = {
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProfileDetailsBasicForm);