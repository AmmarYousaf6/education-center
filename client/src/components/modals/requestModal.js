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
const RequestModal = ({ showModal, setShowModal }) => {
    const [inviteLst , setInviteLst ] = useState(false);
    const [rating , setRating ] = useState(false);
    const [beingUpdated , setBeingUpdated ] = useState(false);
    const [error_message  , setErrorMessage ] = useState(null);

    const fetchRequests =async () =>{
        setBeingUpdated(true);
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        let resultToReturn = [];
        try {
            //Making an object of header authorization
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const requestLstData = await axios.get(`${apiUrl}users/my-pending-invites` , {} , config);
            console.log("Requests fetched " , requestLstData);
            if (!requestLstData.data) {
                throw "Something went wrong. Please try again";
            }    
            setInviteLst(requestLstData.data.data);        

        } catch (err) {
            console.log("Error occured "   , err);
            if(err.config && err.config.url){
                setErrorMessage("Connection error occured.");
                setTimeout(()=>setErrorMessage(false) , 5000)

            }else{
                toast.error(err);
                setShowModal(false);
            }
        } finally {
            setBeingUpdated(false);
        }
    }
    useEffect(() => {
        fetchRequests();
        console.log("Show rating modal details", showModal)
    }, []);
    const star = {
        size: 50,
        count: 5,
        color1: '#216044',
        color2: '#216044',
        colot: '#216044',
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
            //ratedTo, rating, feedback
            let dataBody = {
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

    const updateRequest = async (id, status) => {
        console.log("Session id" , id);
        setBeingUpdated(true);
        
        //check if setModal has actually teacher data
        let data = [];
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            let dataBody = {
                id : id ,
                status : status
            };
            const statusChanged = await axios.post(`${apiUrl}users/invite` , JSON.stringify(dataBody) , config);
            if (!statusChanged.data) {
                throw "Something went wrong. Please try again";
            }            
            toast.success(statusChanged.data.message);
            setShowModal(false);

            fetchRequests();
        } catch (err) {
            console.log("Error occured "   , err);
            if(err.config && err.config.url){
                setErrorMessage("Connection error occured.");
                setTimeout(()=>setErrorMessage(false) , 5000)

            }else{
                toast.error(err);
                setShowModal(false);
            }
        } finally {
            setBeingUpdated(false);
        }
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
                                    <div className="card mt-5 pb-5" style={{width: '500px'}}>
                                        <div className="d-flex flex-row justify-content-between p-3 adiv "> 
                                            <i className="fas "></i> 
                                            <span className="pb-3">Requests List</span> 
                                            <i className="closeModal" onClick={()=>setShowModal(false)}>x</i> 
                                        </div>
                                        <div className="mt-2 p-4 text-center">
                                        {inviteLst && (
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Sr.</th>
                                                        <th>Name</th>
                                                        <th>Gender</th>
                                                        <th>Summary</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inviteLst.map((inv , k)=>(
                                                    <tr key={inv.session_id}>
                                                        <td>{k+1}</td>
                                                        <td>{inv.name}</td>
                                                        <td>{inv.gender}</td>
                                                        <td style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak : 'break-all'}}>{inv.summary}</td>
                                                        <td>
                                                        <button className="btn btn-xs " style={{padding: "5px"}} onClick={()=>updateRequest(inv.session_id, 'accepted')}>Accept</button>
                                                        <button className="btn btn-xs btn-danger m-1" style={{padding: "5px"}} onClick={()=>updateRequest(inv.session_id, 'reject')}>Reject</button>
                                                        </td>
                                                    </tr>
                                                    ))
                                                    }
                                                    

                                                </tbody>
                                            </table>
                                        )}
                                        {typeof inviteLst == 'object' && inviteLst.length == 0 && (<span>No requests found</span>)}
                                            { error_message && 
                                                (<div className="validation-errors">{error_message}</div>)
                                            }
                                            <div className="mt-2"> 
                                                <button type="button" className="btn btn-primary btn-block">
                                                    {beingUpdated && (
                                                        <img src="assets/images/loader.gif" className="ratingLoader" />
                                                        )
                                                    }
                                                </button> 
                                            </div>
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

export default RequestModal;

