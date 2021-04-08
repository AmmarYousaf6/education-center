import React, { Fragment , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

import './mailbox.css';
import './style.css';
import LatestMessagesComponent from './latestMessages';
import RequestModal from '../modals/requestModal';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

import  Sidebar  from './sidebar';
//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const MailBox =  () => {
    let [active , setActive] = useState(0);
    //For modals
    const [showModal , setShowModal] = useState(false);

    //Adding send message functionality
    let [message , setMessage ] = useState('');
    const sendMessage = ()=>{
            let data = [];
            //Making an object of header authorization
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            console.log("The token is "  , localStorage.token )
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
            let resultToReturn = [];
            axios.post(`${apiUrl}chat/message` , {sessionId : active.session_id , message : message } , config)
                .then(function (response) {
                        let temp = active ;
                        setActive({session_id: '__' } );
                        setActive(temp);
                  })
                  .catch(function (error) {
                    console.log(error , "send error");
                  })

    }

    return (
        <Fragment>  
            <Navbar />
        <main className="ttr-wrapper">
            <div className="container-fluid">
                <div className="db-breadcrumb d-flex">
                    <h4 className="breadcrumb-title">Mailbox</h4>
                    <ul className="db-breadcrumb-list">
                        <li><a href="#"><i className="fa fa-home"></i>Home</a></li>
                        <li>Mailbox</li>
                    </ul>
                    {/* <a href="mailbox-compose.html" className="btn btn-block col-2 ml-auto">Compose</a> */}
                </div>	
                <div className="row">
                    {/* <!-- Your Profile Views Chart --> */}
                    <div className="col-lg-12 m-b30">
                        <div className="widget-box">
                            <div className="email-wrapper">
                                {/* Start of email menu bar component */}
                                <div className="email-menu-bar">
                                    <div className="compose-mail">
                                        <a className="btn btn-block text-light" onClick={()=>setShowModal(true)}>View Requests</a>
                                    </div>
                                    {/* Start of Left User Menu List */}
                                    <Sidebar active={active} setActive={setActive} />
                                    {/* End of Left User Menu List  */}
                                </div>                               
                                {/* End of email menu bar componeenyt  */}                                
                                <div className="mail-list-container">
                                    <div className="mail-toolbar">                                        
                                        <div className="mail-search-bar">
                                            <input type="text" className="form-control" placeholder="Type Message" onChange={(evt)=>setMessage(evt.target.value)} />
                                        </div>
                                        <div className="dropdown all-msg-toolbar">
                                            <span className="btn btn-info-icon" data-toggle="dropdown" onClick={()=>sendMessage()}>Send</span>                                            
                                        </div> 
                                        <div className="next-prev-btn">
                                            <a href="#"><i className="fa fa-angle-left"></i></a>
                                            <a href="#"><i className="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                    <LatestMessagesComponent active={active}/>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* <!-- Your Profile Views Chart END--> */}

                    <RequestModal showModal={showModal} setShowModal={setShowModal} />
                </div>
            </div>
        </main>
        </Fragment>
);
}

export default MailBox;