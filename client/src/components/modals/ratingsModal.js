import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

//For toast notifications
import toast, { Toaster } from 'react-hot-toast';

//For rating
import ReactStars from 'react-rating-stars-component'

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;



const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}
const modalTransitions = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "10px",
        opacity: 1,
        transition: { delay: 0.5 }
    }
}
const RatingModal = ({ showModal, setShowModal }) => {
    const [feedBack , setFeedBack ] = useState(false);
    const [rating , setRating ] = useState(false);
    const [beingUpdated , setBeingUpdated ] = useState(false);
    const [error_message  , setErrorMessage ] = useState(null);


    useEffect(() => {
        console.log("Show rating modal details", showModal)
    }, []);
    const star = {
        size: 50,
        count: 5,
        color1: '#216044',
        color2: '#216044',
        emptyIcon: `<i className='far fa-star'></i>`,
        halfIcon: `<i className='fa fa-star-half-alt'></i>`,
        fullIcon: `<i className='fa fa-star'></i>`,
        onChange: newValue => {
            setRating(newValue)
        }
    }
    //Clearing form
    // clearForm
    //Making a funtion to initiate hiring request      
    const rate = async () => {
        setBeingUpdated(true);
        let teacherInfo = showModal;

        //check if setModal has actually teacher data
        if (!showModal) {
            console.log("Set modal has no data", showModal);
            return;
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
            if (!teacherInfo) {
                throw "No data found";
            }
            //validating
            if(!rating || isNaN(rating)){
                throw {msg : "Please select stars to rate" , validationFailed : true };
            }
            if(!feedBack || feedBack.length  < 10){
                throw { msg : "Please write feedback of at least 10 characters." , validationFailed : true };
            }
            //ratedTo, rating, feedback
            let dataBody = {
                feedBack : feedBack ,
                rating : rating ,
                ratedTo : teacherInfo.id
            };
            console.log("Request body" , dataBody);
            const ratingProvided = await axios.post(`${apiUrl}users/ratings` , JSON.stringify(dataBody) , config);
            console.log("Ratings after provision" , ratingProvided);
            if (!ratingProvided.data) {
                throw "Something went wrong. Please try again";
            }            
            setShowModal(false);
            toast.success(ratingProvided.data.message)
        } catch (err) {
            console.log("Error occured "   , err);
            if(err.config && err.config.url){
                setErrorMessage("Connection error occured.");
                setTimeout(()=>setErrorMessage(false) , 5000)

            }else if(err.validationFailed){
                setErrorMessage(err.msg);
                setTimeout(()=>setErrorMessage(false) , 5000)
            }else{
                toast.error(err);
                setShowModal(false);
            }

        } finally {
            setBeingUpdated(false);
        }
        return resultToReturn;
    }

    const feedbackProvided = (evt) => {
        setFeedBack(evt.target.value);
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
                                    <div className="card mt-5 pb-5">
                                        <div className="d-flex flex-row justify-content-between p-3 adiv "> 
                                            <i className="fas "></i> 
                                            <span className="pb-3">Feedback of  {showModal.name}</span> 
                                            <i className="closeModal" onClick={()=>setShowModal(false)}>x</i> </div>
                                        <div className="mt-2 p-4 text-center">
                                            <ReactStars
                                                {...star}  />
                                            <div className="form-group mt-4"> 
                                                <textarea className="form-control" rows="4" placeholder="Feedback" onChange={feedbackProvided}></textarea> 
                                            </div>
                                            { error_message && 
                                                (<div className="validation-errors">{error_message}</div>)
                                            }
                                            <div className="mt-2"> 
                                                <button type="button" className="btn btn-primary btn-block" onClick={(evt)=>rate()}>
                                                    <span>Send feedback</span>
                                                    {beingUpdated && (
                                                        <img src="assets/images/loader.gif" className="ratingLoader" />
                                                        )
                                                    }
                                                </button> 
                                            </div>
                                            <p className="mt-3 cursor-pointer " onClick={()=>setShowModal(false)}>Continue without rating and feedback</p>
                                        </div>
                                    </div>
                                {/* <div className="card p-3 py-4">
                                    <div className="text-center"> 
                                        <h2>Ratings</h2>
                                        <ReactStars
                                            {...star} />
                                    </div>
                                </div> */}
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
            <Toaster />
        </AnimatePresence>

    )
}

export default RatingModal;

