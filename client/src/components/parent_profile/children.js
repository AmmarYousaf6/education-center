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
import { AnimatePresence, motion } from 'framer-motion';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;
const pageTransitions = {
    in: {
        opacity: 1,
        x: 0
    },
    out: {
        opacity: 0,
        x: "+100vh"
    }
};

const ManageChildren = ({ auth: { user, isAuthenticated, loading } , showModal , setShowModal}) => {
    const [children, setChildren] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [beingSaved, setBeingSaved] = useState(false);

    //Will be used for redirects
    let history = useHistory();
    const fetchChildren = async () => {
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
            const childrenDetails = await axios.get(`${apiUrl}users/children`, config);
            console.log("Gonna set children value ", childrenDetails.data)
            setChildren(childrenDetails.data.data);
            // setProfile(childrenDetails.data );
            // this will re render the view with new data            
        } catch (err) {
            console.log("Error occured in index", err);
        }
        return resultToReturn;
    }
    useEffect(() => {        
        fetchChildren();
    }, [showModal]);
    //Method to initiate hiring request 
    const editClicked = (child)=>{
        //handling user not logged in
        if (!localStorage.token) {
            toast.error("Please login to edit child "+child.name);
            // history.push("/login");
            return ;
        }
        setShowModal(child)
    }
    const changeHandler = (event) => {
        const uploadFile = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
            // setFileUrl(URL.createObjectURL(event.target.files[0]));
            //Since a file is selected upload to server 
            let data = [];
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
                toast.error("Something went wrong while uoploading image");
            } finally {

            }
        };
        uploadFile(event);
    }
    const deleteChild = async (id)=>{
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
            const childrenDetails = await axios.delete(`${apiUrl}users/children/${id}`, config);
            console.log("Gonna set children value ", childrenDetails.data);
            toast.success(childrenDetails.data.message);
            fetchChildren();
        } catch (err) {
            console.log("Error occured in index", err);
            toast.error("Unable to delete child.");
        }        
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
                                <div className="widget-box col-12">
                                    <div className="wc-title">
                                        <h4 style={{display : "inline"}} > Children list</h4>
                                        <button className="btn button-sm pull-right" onClick={()=>setShowModal(true)}>Add child</button>
                                    </div>
                                    <div className="widget-inner row ">
                                        <div className="new-user-list col-12 row" style={{ }}>
                                            <ol className="col-12">
                                                {children!=null && children.length == 0 && (<h1>No childrens yet</h1>)}
                                                {children && children.map(child => (
                                                    <li key={child.id} className="row">
                                                        <span className="new-users-text col-12">
                                                            <span className="new-users-pic">
                                                                <img src={child.image} alt="" />
                                                            </span>
                                                            <ol className="course-features">
                                                                <li >
                                                                    <span className="label ">Name</span> 
                                                                    <span className="value new-users-name">{child.name}</span>
                                                                </li>
                                                                <li>
                                                                    <span className="label">Age</span> 
                                                                    <span className="value">{child.age}</span>
                                                                </li>
                                                                <li>
                                                                    <span className="label">Summary</span> 
                                                                    <span className="value">{child.summary}</span>
                                                                </li>
                                                                <li>
                                                                    <span className="label">Qualification</span> 
                                                                    <span className="value">{child.qualification}</span>
                                                                </li>
                                                            </ol>
                                                        </span>
                                                        <span className="new-users-btn" style={{margin :"0px 0px 0px auto"}}>                                                            
                                                            <a className="btn button-sm text-light" onClick={()=>editClicked(child)}>Edit</a>
                                                            <button className="btn button-sm btn-danger " onClick={()=>deleteChild(child.id)}>
                                                                Delete
                                                            </button>
                                                        </span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
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
ManageChildren.propTypes = {
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ManageChildren);