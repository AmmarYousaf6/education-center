import React, { useEffect } from 'react';
import { Link  } from 'react-router-dom';
import { motion , AnimatePresence } from 'framer-motion';

import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';


//For toast notifications
import toast  , { Toaster } from 'react-hot-toast';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = 'https://hometutorpk.herokuapp.com/';

const backdrop ={
    visible : { opacity : 1 },
    hidden : { opacity : 0 }
}
const modalTransitions = {
    hidden : {
        y : "-100vh",
        opacity : 0
    } ,
    visible : {
        y : "100px",
        opacity : 1 , 
        transition : { delay : 0.5}
    }
}
const Modal = ({showModal , setShowModal}) =>{
      
    useEffect( () => {
        //Fetch if user has already requested data showModal
        console.log("Show modal details" , showModal)
    } , [] );
    //Making a funtion to initiate hiring request
    const hire  = async (teacherInfo) => {
        //check if setModal has actually teacher data
        if(!showModal)
        {   
            console.log("Set modal has no data" , showModal);
            return ;
        }
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
            if(!teacherInfo)
            {
                throw "No data found";
            }
            const allTeachers = await axios.get(`${apiUrl}users/invite/${teacherInfo.id}` , config);
            if(!allTeachers.data)
            {
                throw "Something went wrong. Please try again";
            }
            if(allTeachers.data.message.includes("Exist")){
                throw allTeachers.data.message;
            }

            toast.success(allTeachers.data.message)
            
        } catch (err) {
            toast.error(err);
        } finally{
            setShowModal(false);
        }
        return resultToReturn;
    }
    
    return (
        <AnimatePresence exitBeforeEnter>
            {
                showModal && (
                    <motion.div className="backdrop"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div className="modal-body"
                            variants={modalTransitions}
                        >
                            {/* <p>Are you sure you want to hire me?</p>
                            <button className="btn margin-fix-btm mr-4  " onClick={()=>setShowModal(false)}>
                               Yes 
                            </button>
                            <button className="btn btn-danger margin-fix-btm" onClick={()=>setShowModal(false)}>
                               Cancel 
                            </button> */}

                            <div className="container d-flex justify-content-center">
                                <div className="card p-3 py-4">
                                    <div className="text-center"> 
                                        <img src={showModal && (mediaBaseUrl+showModal.image)} width="100" className="rounded-circle" />
                                        <h3 className="mt-2">Hire {showModal && (showModal.name)}?</h3> 
                                        <span className="mt-1 clearfix">{showModal && (showModal.qualification)}</span> 
                                        <small className="mt-4">
                                            Click yes to hire me
                                        </small>
                                        <div>
                                            <button className="btn margin-fix-btm mr-4  " onClick={()=>hire(showModal)}>
                                                Yes 
                                            </button>
                                            <button className="btn btn-danger margin-fix-btm" onClick={()=>setShowModal(false)}>
                                                Cancel 
                                            </button>
                                        </div>
                                        <div className="social-buttons mt-5"> 
                                            <button className="neo-button">
                                                <i className="fa fa-facebook fa-1x"></i> 
                                            </button> 
                                            <button className="neo-button">
                                                <i className="fa fa-linkedin fa-1x"></i>
                                            </button> 
                                            <button className="neo-button">
                                                <i className="fa fa-google fa-1x"></i> 
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
            <Toaster/>
        </AnimatePresence>

    )
}

export default Modal;

